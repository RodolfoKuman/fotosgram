import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl:any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa;

  constructor() { }

  ngOnInit() {

    
  }

  ngAfterViewInit() {
    const latlng = this.coords.split(',');
    const lat = Number(latlng[0]);
    const lng = Number(latlng[1]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kb2xmb2t1bWFuIiwiYSI6ImNraDlwd214NDAya3kycnBsMjI0ZnlzZ3MifQ.iKSE1ukY9Neh4SVx4MpgnA';
    const map = new mapboxgl.Map({
      container:  this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
          .setLngLat([ lng, lat] )
          .addTo(map);
  }

}
