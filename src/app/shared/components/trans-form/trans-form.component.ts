import { SupportTransService } from '../../../core/http/support-trans.service';
import { SupportTypesService } from '../../../core/http/support-types.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-trans-form',
  templateUrl: './trans-form.component.html',
  styleUrls: ['./trans-form.component.scss'],
})
export class TransFormComponent implements OnInit {
  supportTypes: ISupportType[] = [];
  currentTime: Date = new Date();
  supportObject: ISupport[] = [];
  defaultObject: ISupport = { amount: 1, name: '', type: '', unit: '' };
  constructor(
    public dialogRef: MatDialogRef<TransFormComponent>,
    private SupportTypesService: SupportTypesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private SupportTransService: SupportTransService
  ) {
    this.fetchInit();
    this.supportObject = data.supportObject;
  }
  fetchInit() {
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result;
    });
  }
  onClose(): void {
    this.dialogRef.close();
    console.log('closeForm');
  }
  async onSubmit(data: ITransaction) {
    data.type = 'user';
    data.id = 'customerc74de9034800804c5be2197f986ec520';
    data.sos_request_id = this.data.request_id;
    console.log(data);
    this.SupportTransService.create(data, {}).subscribe((res) =>
      this.dialogRef.close(res)
    );
  }
  show(data: any) {
    console.log(data);
  }
  changeAmount(form: any, index: number, value: any) {
    form.support_list[index].amount = parseInt(value);
  }
  changeUnit(form: any, index: number, value: any) {
    form.support_list[index].unit = value;
  }
  changeName(form: any, index: number, value: any) {
    form.support_list[index].name = value;
    form.support_list[index].type = this.removeAccents(value);
  }
  removeObject(form: any, index: number) {
    form.support_list.splice(index, 1);
  }
  removeAccents(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(' ', '_');
  }
  add(data: ITransaction, object: ISupport) {
    if (data.support_list == undefined) data.support_list = [object];
    else data.support_list.push(object);
    console.log(data);
    console.log(object);
  }
  checkSubmit(data: any) {
    console.log(data);
    // if (data.status == "VALID") this.onClose();
  }
  ngOnInit(): void {}
}
