import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExtremeLocationsDto } from './Entities/Location';

@Injectable({ providedIn: 'root' })
export class AppState {
    private loading$ = new BehaviorSubject<boolean>(false);
    private extremeLocations$ = new BehaviorSubject<ExtremeLocationsDto | undefined>(undefined);

    getLoading() {
        return this.loading$;
    }

    setLoading(loading: boolean) {
        this.loading$.next(loading);
    }

    getExtremeLocations() {
        return this.extremeLocations$;
    }

    setExtremeLocations(extremeLocations: ExtremeLocationsDto | undefined) {
        this.extremeLocations$.next(extremeLocations);
    }

}
