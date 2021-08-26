import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrgentLevelService {
  static getUrgentLevels(): string[] {
    throw new Error('Method not implemented.');
  }

  constructor() {}
  priorityTypes: IPriorityType[] = [
    {
      type: 'high',
      name: 'Rất nguy cấp',
    },
    {
      type: 'normal',
      name: 'Nguy cấp',
    },
  ];
  getUrgentLevels() {
    return this.priorityTypes;
  }
}
