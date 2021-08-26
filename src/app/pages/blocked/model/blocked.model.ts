export class Blocked implements IBlocked {
  public id?: string;
  public name?: string;
  public address?: string;
  public numHouseholds?: number;
  public statusList?: IBlockedStatus[];
}
