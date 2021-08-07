
declare var System: any;
interface IUser {
       email: string
       password: string
}

interface INews {
       id?: string;
       header?: string;
       content?: string;
       pubDate?: Date;
       img?: string;
       publisher?: IPublisher;
}
interface IPublisher {
       id?: string;
       img?: string;
       name?: string;
}
interface IVolunteerGroup {
       id?: string;
       name?: string;
       numVolunteer?: number;
}

interface IUrgentRequest {
       id?: string;
       isSupported?: boolean;
       data?: string;
       status?: string;
       typeRequest?: string;
       senderName?: string;
       senderPhone?: string;
       senderAddress?: string;
       img?: string;
       position?: IPosition;
}
interface IPosition {
       lat?: number;
       lng?: number;
}
interface IHospital {
       id?: string;
       name?: string;
       address?: string;
       numPatient?: number;
       numBeds?: number;
       statusList?: IHospitalStatus[];
       needSupport?: boolean;
}

interface IBlocked {
       id?: string;
       needSupport?: boolean;
       name?: string;
       address?: string;
       numHouseholds?: number;
       statusList?: IBlockedStatus[];

}

interface IBlockedStatus {
       value: number;
       key: string;
}

interface IHospitalStatus {
       value: number;
       key: string;
}
interface IHandBook {
       id?: string;
       name?: string;
       content?: string;
       pubDate?: Date;
}
interface IVolunteerGroupGeneral {
       numGroup?: number;
}
interface IUrgentRequestGeneral {
       numRequest?: number;
       numSupported?: number;
       numUnsupported?: number;
       requests?: IUrgentRequest[];
}
interface IHospitalGeneral {
       numHospital?: number;
       numNeedSupport?: number;
       numStable?: number;
       hospitals?: IHospital[];
}
interface IBlockedGeneral {
       numBlocked?: number;
       numNeedSupport?: number;
       numStable?: number;
       blockeds?: IBlocked[];
}

