
declare var System: any;
interface IUser {
      email: string
      password: string
}

interface INews{

}

interface IHospital {
       id?: string;
       name?: string;
       address?: string;
       numPatient?: number;
       numBeds?: number;
       statusList?: IHospitalStatus[];
    
}

interface IBlocked {
       id?: string;
       name?: string;
       address?: string;
       numHouseholds?: number;
       statusList?: IBlockedStatus[];
    
}

interface IBlockedStatus {
       value: string;
       key: string;
}

interface IHospitalStatus{
       value: string;
       key: string;
}