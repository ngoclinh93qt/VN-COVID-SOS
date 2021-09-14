declare var System: any;
interface IUser {
  phone_number:String;
  address?:String;
  first_name?:String;
  last_name?:String;
  role?:String;
  avatar?:String;
  time_zone?:Date;
  password?:String;
  debug?:String;
  confirm_code?:String;
  groups?:[]
}

interface INorUser {
  phone_number: String;
  confirm_code: String;
}

interface ISignIn {
  username: string;
  password: string;
  grant_type: string;
  scope: string;
}

interface INews {
  id?: string;
  header?: string;
  content?: string;
  pubDate?: Date;
  img?: string;
  publisher?: IPublisher;
}
interface INew {
  content?: string;
  created_by_id?: string;
  created_by_name?: string;
  created_time?: Date;
  detail_info?: object;
  id?: string;
  medias?: IMedias[];
  published_by_id?: string;
  published_by_name?: string;
  published_time?: Date;
  status?: string;
  subject?: string;
  target_id?: string;
  target_type?: string;
  updated_by_id?: string;
  updated_by_name?: string;
  updated_time?: Date;
}
interface IPublisher {
  id?: string;
  img?: string;
  name?: string;
}
interface IVolunteerGroup {
  id?: string;
  name?: string;
  avatar?:String;
  address_info?: IAddressInfo;
  admin_id?: string;
  contact_info?: IContacInfo;
  created_by?: string;
  created_time?: string;
  detail_info?: {
    support_types?: ISupportType[];
  };
  location?: string;
  members?: IGroupMember[];
  type?: string;
  updated_by?: string;
  updated_time?: string;
  verify_info?: any;
  verify_status?: string;
}

interface IAddressInfo {
  address: string;
  district_code: number;
  district_name: string;
  province_id: string;
  province_name: string;
  ward_code: number;
  ward_name: string;
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
  first_name?: string;
  last_name?: string;
  name: string;
  phone_number: string;
}

interface IGroupMember {
  first_name: string;
  id: string;
  last_name: string;
  phone_number: string;
  role: string;
}

interface IPriorityType {
  type: string;
  name: string;
}
interface IRequestStatus {
  type: string;
  name: string;
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
interface IRequestFilter {
  lat_position: number;
  long_position: number;
  support_types?: string[];
  priority_type?: string[];
  status?: string[];
  keyword?: string;
  distance?: number;
  object_status?: string[];
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
  type: string;
}
interface ISOSRequest {
  is_bookmarked?:boolean;
  is_group_bookmarked?:boolean;
  address_info?: IAddressInfo;
  contact_info?: IContacInfo;
  created_by?: string;
  created_time?: Date;
  description?: string;
  id?: string;
  location?: string;
  medias?: IMedias[];
  requester_info?: string;
  requester_id?: string;
  requester_object_status?: IRequesterObjectStatus[];
  requester_type?: string;
  status?: string;
  subject?: string;
  support_types?: ISupportType[];
  supporters?: [];
  updated_by?: string;
  updated_time?: Date;
  verify_status?: string;
  priority_type?: string;
  color_info?: any;
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
interface IJoinRequest {
  type: string;
  supporter_id: string;
  support_date?: string;
  description?: string;
}
interface ISupporterUpdate {
  type: string;
  supporter_id: string;
  support_status: string;
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

interface IComment {
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

interface IHospitalPost {
  title?: string;
  url?: string;
  author?: string;
  postTime?: string;
}

interface IUserProfile {}

interface ICustomerProfile {
  addresses: [];
  avatar: string;
  delivery_addresses: [];
  dob: string;
  email: string;
  first_name: string;
  gender: string;
  customer_id: string;
  last_name: string;
  phone_number: string;
  referral_code: string;
  referred_by: string;
  time_zone: string;
  type: string;
  updated_by_id: string;
}
interface ISupport {
  type: string;
  amount: number;
  unit: string;
  name: string;
}
interface ISupporterInfo {
  contact_info: IContacInfo;
  id: string;
  name: string;
  type: string;
}
interface ITransaction {
  sos_request_id: string;
  type: string;
  id: string;
  support_time: Date;
  medias?: IMedias[];
  support_list?: ISupport[];
  description?: string;
  created_time?: Date;
  created_by?: string;
  requester_info?: object;
  status?: string;
  supporter_info?: ISupporterInfo;
  updated_by?: string;
  updated_time?: string;
}

interface IpresignedUrl{
  expired_duration: number;
  url: string;
}
interface IBaseStatus {
  action_view: string
  action: string
  status: string
  status_view: string
  next_step: string[]
  color?: string
  bg_color?: string
  icon? :string
}
