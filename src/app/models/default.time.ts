import {TimeModel} from "./time.model";

export class DefaultTime {
  public static getDefault(): TimeModel {
    return {
      seconds: 3,
      minutes: 0
    }
  }
}
