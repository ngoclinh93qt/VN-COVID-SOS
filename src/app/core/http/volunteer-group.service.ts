import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { RestService } from './rest.service';
@Injectable({
  providedIn: 'root',
})
export class VolunteerGroupService extends RestService<IVolunteerGroup> {
  constructor(http: HttpClient) {
    super(http, 'groups');
  }
  getGeneralData() {
    var res: IVolunteerGroupGeneral = {
      numGroup: this.getNumVolunteerGroups(),
    };
    return res;
  }
  getNumVolunteerGroups() {
    return 1;
  }

  getGroup() {
    return this.groups;
  }

  addMemberGroup(groupId: any, body: any){
    return this.http.post<{ data: any}>(`${this.host}/groups/${groupId}/members`, body).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  removeMemberGroup(groupId: any, body: any){
    return this.http.delete<{ data: any}>(`${this.host}/groups/${groupId}/members`, {body: body}).pipe(
      map((res) => {
        return res;
      })
    );
  }

  delete(id: string){
    return this.http.delete(`${this.host}/groups/${id}`);
  }



  groups: IVolunteerGroup[] = [
    {
      id: '1',
      name: 'Nhóm thiện nguyện từ tâm',
      location: '123 Nguyen Van Cu, P.1, Quận 5, TP Hồ Chí Minh',
      verify_status:
        'Nhóm đang cần thêm lương thực, nhu yếu phẩm để đi trợ giúp. Mọi thông tin liên hệ số điện thoại: 012345664',
    },
    {
      id: '2',
      name: 'Nhóm thiện nguyện A',
      location: '123 Võ Văn Tần, P.1, Quận 1, TP Hồ Chí Minh',
      verify_status:
        'Nhóm đang cần thêm lương thực, nhu yếu phẩm để đi trợ giúp. Mọi thông tin liên hệ số điện thoại: 038123456',
    },
    {
      id: '3',
      name: 'Nhóm thiện nguyện B',
      location: '39 Hoa Cuc, P.1, Quận 1, TP Hồ Chí Minh',
      verify_status:
        'Nhóm đang cần thêm nhu yếu phẩm để đi trợ giúp. Mọi thông tin liên hệ số điện thoại: 012345664',
    },
    {
      id: '4',
      name: 'Nhóm thiện nguyện C',
      location: '123 Le Hong Phong, P.1, Quận 1, TP Hồ Chí Minh',
      verify_status: 'Nhóm đang cần thêm lương thực.',
    },
  ];
}
