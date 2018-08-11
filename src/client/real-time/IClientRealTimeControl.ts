import { IJoystickState } from './IJoystickState';

export interface IClientRealTimeControl {
	ping: number;
	joystick: IJoystickState;
}
