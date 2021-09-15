import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
  diffDate(date: Date) {
    const current = new Date();
    if (current.getFullYear() != date.getFullYear()) return `${current.getFullYear() - date.getFullYear()} năm trước`;
    if (current.getMonth() != date.getMonth()) return `${current.getMonth() - date.getMonth()} tháng trước`
    if (current.getDate() != date.getDate()) return `${current.getDate() - date.getDate()} ngày trước`
    if (current.getHours() != date.getHours()) return `${current.getHours() - date.getHours()} ngày trước`;
    if (current.getMinutes() != date.getMinutes()) return `${current.getMinutes() - date.getMinutes()} phút trước`;
    if (current.getSeconds() != date.getSeconds()) return `${current.getSeconds() - date.getSeconds()} giây trước`;
    return date.toDateString().toString();
  }
  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    if (d < 1) return `${(d * 1000).toFixed(0)} m`; else return `${d.toFixed(1)} km`
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }
}
