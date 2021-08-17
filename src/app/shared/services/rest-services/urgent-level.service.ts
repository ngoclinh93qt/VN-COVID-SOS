import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrgentLevelService {
  static getUrgentLevels(): string[] {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  getUrgentLevels()
  {
    return ["Rất nguy cấp","Nguy cấp"];
  }
}
