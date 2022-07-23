import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { ExtremeLocationsDto } from "./Entities/Location";

@Injectable()
export class AppClient {
    private urlToGetLocations: string = "https://localhost:7008/Location/Get";

    constructor(
        private http: HttpClient,
    ) { }

    getExtremeLocations(): Observable<ExtremeLocationsDto> {
        let options_ = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.get(this.urlToGetLocations, options_)
    }

}


