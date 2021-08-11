import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrgentLevelService {

  constructor() { }
  getUrgentLevels()
  {
    return ["Rất nguy cấp","Nguy cấp"];
  }
}
