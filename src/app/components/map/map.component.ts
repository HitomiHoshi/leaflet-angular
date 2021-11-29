import { Component, OnInit } from '@angular/core';
import  * as L from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void{
      this.map = L.map('map').setView([3.1390, 101.6869], 15)
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(this.map);


  }

}
