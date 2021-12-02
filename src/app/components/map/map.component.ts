import { AfterViewInit, Component, OnInit } from '@angular/core';
import { latLng, tileLayer, Icon, icon, Marker } from "leaflet";

import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "@asymmetrik/ngx-leaflet";

import { MapService } from 'src/app/services/map.service';
import { ShapeService } from 'src/app/services/shape.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private states: any;

  constructor(
    private markerService: MapService,
    private shapeService: ShapeService
  ) { }

  private highlightFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }

  private resetFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      }),

      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }

  ngAfterViewInit(): void {
    this.initMap();

    this.markerService.makeBranchMarkers(this.map);

    // this.markerService.makeCapitalMarkers(this.map);
    // this.markerService.makeCapitalCircleMarkers(this.map);
    // this.shapeService.getStateShapes().subscribe(states => {
    //   this.states = states;
    //   this.initStatesLayer();
    // });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [4.687645, 107.969057],
      zoom: 7
    });


    L.Routing.control({
      waypoints: [L.latLng(1.643081325, 103.611114084), L.latLng(1.665021904, 103.59419664)],
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: false
    }).addTo(this.map);

    // L.Routing.control({
    //   waypoints: [L.latLng(1.643081325, 103.611114084), L.latLng(1.665021904, 103.59419664)],
    //   addWaypoints: false,
    //   routeWhileDragging: false,
    //   fitSelectedRoutes: false
    // }).addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

}
