
declare var System: any;
interface IUser {
       email: string
       password: string
}

interface ISignIn {
       username: string
       password: string
       grant_type: string
       scope: string
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
       id: string;
       name?: string;
       address_info: IAddressInfo;
       admin_id: string;
       contact_info: IContacInfo;
       created_by: string;
       created_time: string;
       detail_info: {
              support_types?: ISupportType[]
       };
       location: string;
       members: IGroupMember[];
       type: string;
       updated_by: string;
       updated_time: string;
       verify_info: any;
       verify_status: string;

}

interface IAddressInfo {
       address: string
       district_code: number
       district_name: string
       province_id: string
       province_name: string
       ward_code: number
       ward_name: string
}

interface IContacInfo {
       name: string;
       phone_number: string;
}

interface ISupportType {
       name: string;
       type: string;
}

interface IGroupMember {
       first_name: string
       id: string
       last_name: string
       phone_number: string
       role: string
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

interface IComment{
       content?: string;
       postTime?: string;
}

interface IQueryPrams {
       limit?: number;
       offset?: number;
       start_date?: string;
       end_date?: string;
       created_time?: string;
}
