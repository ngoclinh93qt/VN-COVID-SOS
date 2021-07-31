import { HospitalStatus } from './hospital.status.mode';

export class Hospital {
  public id?: string;
  public name?: string;
  public address?: string;
  public numPatient?: number;
  public numBeds?: number;
  public statusList?: HospitalStatus[];

  constructor() {}
}
