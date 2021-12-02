import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  capitals: string = '/assets/data/usa-capitals.json';
  branch: string = '/assets/data/ampm-branch.json';

  constructor(
    private http: HttpClient,
    private popupService: PopupService
    ) { }

  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);


        marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));

        marker.addTo(map);
      }
    });
  }

  makeBranchMarkers(map: L.Map): void {
    this.http.get(this.branch).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        const circle = L.circle([lat, lon], 500); // 500 m

        marker.bindPopup(this.popupService.makeBranchPopup(c.properties));

        marker.addTo(map);
        circle.addTo(map);
      }
    });
  }

  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon]);

        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));

        circle.addTo(map);
      }
    });
  }
}
