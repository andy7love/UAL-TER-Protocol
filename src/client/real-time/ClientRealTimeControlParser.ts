import { IClientRealTimeControl } from './IClientRealTimeControl';

export class ClientRealTimeControlParser {
	public static parse(data: IClientRealTimeControl): IClientRealTimeControl {
		const parsedControl: IClientRealTimeControl = {
			ping: data.ping,
			joystick: data.joystick
		};

		return parsedControl;
	}

	public static serialize(data: IClientRealTimeControl): {} {
		return data;
	}
}
