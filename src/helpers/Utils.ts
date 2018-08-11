import * as BABYLON from 'babylonjs';

interface IRollPitchYaw {
	roll: number;
	pitch: number;
	yaw: number;
}

export class Utils {
	public static negate(value: boolean): boolean {
		return !value;
	}

	public static deepExtend(target: any, source: any): any {
		for (const prop in source) {
			if (prop in target && typeof target[prop] === 'object') {
				Utils.deepExtend(target[prop], source[prop]);
			} else {
				target[prop] = source[prop];
			}
		}
		return target;
	}

	public static toRadians = (degrees: any): number => {
		return degrees * Math.PI / 180;
	}

	public static toDegrees = (radians: any): number => {
		return radians * 180 / Math.PI;
	}

	public static parseQuaternion(quaternion: BABYLON.Quaternion) {
		return new BABYLON.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
	}

	public static parseVector3(vector: BABYLON.Vector3) {
		return new BABYLON.Vector3(vector.z, vector.y, vector.z);
	}

	public static toRollPitchYawDegrees(quaternion: BABYLON.Quaternion): IRollPitchYaw {
		const euler = quaternion.toEulerAngles();
		const fitMidRangeAngle = (angle: number) => {
			if (angle >= 180) {
				return angle - 360;
			} else {
				return angle;
			}
		};
		const result: IRollPitchYaw = {
			pitch: fitMidRangeAngle(BABYLON.Angle.FromRadians(-euler.x).degrees()),
			roll: fitMidRangeAngle(BABYLON.Angle.FromRadians(euler.z).degrees()),
			yaw: BABYLON.Angle.FromRadians(euler.y).degrees()
		};
		return result;
	}
}
