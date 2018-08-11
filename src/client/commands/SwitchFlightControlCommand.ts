import { IClientCommand } from './IClientCommand';
import { FlightMode } from '../../Drone/Snapshot/FlightMode';

export class SwitchFlightControlCommand implements IClientCommand {
	public mode: FlightMode;
	public name: string;

	constructor(mode: FlightMode) {
		this.name = 'SwitchFlightMode';
		this.mode = mode;
	}
}
