export class Hospital implements IHospital {
  public id?: string;
  public name?: string;
  public address?: string;
  public numPatient?: number;
  public numBeds?: number;
  public statusList?: IHospitalStatus[];

  constructor() {}
}
