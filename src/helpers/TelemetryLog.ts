import * as Bacon from 'baconjs';
import * as moment from 'moment';
import KalmanFilter, { IKalmanOptions } from 'kalmanjs';

interface ITelemetryData {
	date: Date;
	value: number;
}

export default class TelemetryLog<E> {
	private property: Bacon.Property<E, ITelemetryData>;

	constructor(property: Bacon.Property<E, number>) {
		this.property = property.map(value => {
			return {
				date: moment().toDate(),
				value
			};
		});
	}

	public getStream(): Bacon.Property<E, ITelemetryData> {
		return this.property;
	}

	public derivative(): Bacon.Property<E, ITelemetryData> {
		return this.property
			.diff({
				date: moment().toDate(),
				value: 0
			}, (a, b) => {
				const diff = b.value - a.value;
				const timeDiff = b.date.getTime() - a.date.getTime();
				return {
					date: moment().toDate(),
					value: diff / timeDiff
				};
			});
	}

	public distance(): Bacon.Property<E, ITelemetryData> {
		return this.property
			.diff({
				date: moment().toDate(),
				value: 0
			}, (a, b) => {
				return {
					date: moment().toDate(),
					value: Math.abs(b.value - a.value)
				};
			});
	}

	public average(bufferSize: number = 4): Bacon.Property<E, ITelemetryData> {
		return this.property
			.slidingWindow(bufferSize, 2)
			.map(historicalValue => {
				const sum = historicalValue.reduce((a, b) => a + b.value, 0);
				return {
					date: moment().toDate(),
					value: sum / historicalValue.length
				};
			});
	}

	/**
	 * Uses 1-dimensional kalman filter
	 * @param  {Number} options.R Process noise - noise power desirable
	 * @param  {Number} options.Q Measurement noise - noise power estimated
	 * @param  {Number} options.A State vector - how easily react to changes
	 * @param  {Number} options.B Control vector
	 * @param  {Number} options.C Measurement vector
	 * @return {KalmanFilter}
	 */
	public kalmanFilter(options: IKalmanOptions = { R: 0.01, Q: 20, A: 1.1 }): Bacon.Property<E, ITelemetryData> {
		const kalmanFIlter = new KalmanFilter(options);
		return this.property
			.map(log => {
				return {
					date: log.date,
					value: kalmanFIlter.filter(log.value)
				};
			});
	}
}
