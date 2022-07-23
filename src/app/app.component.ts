import { Component, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { AppFacade } from './app.facade';
import { AppState } from './app.state';
import { ExtremeLocationsDto, LocationDto } from './Entities/Location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//TODO: Create separated component for map
export class AppComponent implements AfterViewInit {

  constructor(
    private appFacade: AppFacade,
    private appState: AppState,
  ) { }
  
  private map!: L.Map;
  public locations$: BehaviorSubject<ExtremeLocationsDto | undefined> = this.appFacade.getLocations();
  public loading$: BehaviorSubject<boolean> = this.appState.getLoading();

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([57.0, 25.0], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.showExtremeLocationsOnMap();
    });
  }

  // TODO: set markers only once
  showExtremeLocationsOnMap() {
    const extremeLocations = this.locations$.getValue();
    if(extremeLocations) {
      let locationProperty: keyof typeof extremeLocations;

      for (locationProperty in extremeLocations) {
        const location = extremeLocations[locationProperty];
        this.setUpMarker(location ?? new LocationDto());
      }
    }
  }

  setUpMarker(location: LocationDto) {
    let marker = L.marker([location.latitude ?? 0, location.longitude ?? 0]).addTo(this.map);
    marker.bindPopup(location.name ?? "Error, no name");
  }

}
