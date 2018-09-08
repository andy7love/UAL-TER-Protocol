export declare interface IKalmanOptions {
	R?: number,
	Q?: number,
	A?: number,
	B?: number,
	C?: number
}

declare class KalmanFilter {
	/**
	 * Uses 1-dimensional kalman filter
	 * @param  {Number} options.R Process noise
	 * @param  {Number} options.Q Measurement noise
	 * @param  {Number} options.A State vector
	 * @param  {Number} options.B Control vector
	 * @param  {Number} options.C Measurement vector
	 * @return {KalmanFilter}
	 */
    constructor(options: IKalmanOptions);
    filter(filter: number): number;
}

export default KalmanFilter;
