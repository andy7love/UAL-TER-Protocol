import * as BABYLON from 'babylonjs';
import { IBatteryState } from './IBatteryState';
import { ISimulationTelemetry } from './ISimulationTelemetry';

export interface IDroneRealTimeTelemetry {
	pong: number;
	battery: IBatteryState;
	orientation: BABYLON.Quaternion;
	// position: will be LON,LAT
	// mpm: measurements - measurement processing module : speed, acceleration
	// radar: 6 faces of distance to obstacle.
	simulation?: ISimulationTelemetry;
}
