import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { AppClient } from './app.client';
import { AppState } from './app.state';
import { ExtremeLocationsDto } from './Entities/Location';

@Injectable({ providedIn: 'root' })
export class AppFacade {

  constructor(
    private appState: AppState,
    private appClient: AppClient,
  ) { }


  getLocations(): BehaviorSubject<ExtremeLocationsDto | undefined>{
    this.appState.setLoading(true);
    this.appClient
      .getExtremeLocations()
      .pipe(
        first(),
        finalize(() => this.appState.setLoading(false))
      )
      .subscribe({
        next: (res) => this.appState.setExtremeLocations(res),
        error: (err) => this.appState.setExtremeLocations(undefined),
      })
        
    return this.appState.getExtremeLocations();
  }
  
}
