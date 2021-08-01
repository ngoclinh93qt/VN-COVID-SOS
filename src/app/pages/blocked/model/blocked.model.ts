import { BlockedStatus } from "./blocked.status.model";

export class Blocked {
  public id?: string;
  public name?: string;
  public address?: string;
  public numHouseholds?: number;
  public statusList?: BlockedStatus[];

  constructor() {}
}
