import { IDroneRealTimeTelemetry } from './IDroneRealTimeTelemetry';
import { Utils } from '../../helpers/Utils';

export class DroneRealTimeTelemetryParser {
	public static parse(data: IDroneRealTimeTelemetry): IDroneRealTimeTelemetry {
		const parsedTelemetry: IDroneRealTimeTelemetry = {
			battery: data.battery,
			orientation: Utils.parseQuaternion(data.orientation),
			pong: data.pong
		};

		if (data.simulation !== undefined) {
			parsedTelemetry.simulation = {
				orientation:  Utils.parseQuaternion(data.simulation.orientation),
				position: Utils.parseVector3(data.simulation.position)
			};
		}

		return parsedTelemetry;
	}

	public static serialize(data: IDroneRealTimeTelemetry): {} {
		return data;
	}
}
