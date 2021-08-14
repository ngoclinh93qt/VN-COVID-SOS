import { IconResolver } from "@angular/material/icon";

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
interface IProvince {
       code?: number;
       codename?: string;
       created_by?: string;
       created_time?: Date;
       division_type?: string;
       id: string;
       name?: string;
       phone_code?: number;
       updated_by?: string;
       updated_time?: Date;
       districts?: IDistrict[];
}
interface IWards {
       code?: number;
       codename?: string;
       division_type?: string;
       name?: string;
       short_codename?: string;
}
interface IDistrict {
       code?: number;
       codename?: string;
       division_type?: string;
       name?: string;
       short_codename?: string;
       wards?: IWards[];
}
interface IContacInfo {
       name: string;
       phone_number: string;
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
interface IRequesterObjectStatus {
       content_type?: string;
       group?: string;
       id?: string;
       key?: string;
       name?: string;
       order?: number;
       type?: string;
       value?: string;
       value_obj?: object;
}
interface ISupportType {
       name?: string;
       type?: string;
}
interface ISOSRequest {
       address_info?: IAddressInfo;
       contact_info?: IContacInfo;
       created_by?: string;
       created_time?: Date;
       description?: string;
       id?: string;
       location?: string;
       medias?: IMedias[];
       requester_info?: string;
       requester_object_status?: IRequesterObjectStatus[];
       requester_type?: string;
       status?: string;
       subject?: string;
       support_types?: ISupportType[];
       supporters?: [];
       updated_by?: string;
       updated_time?: Date;
       verify_status?: string;

}


interface IMedias {
       mime_type?: string;
       url?: string;
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

interface IQueryPrams {
       limit?: number;
       offset?: number;
       start_date?: string;
       end_date?: string;
       created_time?: string;
}
