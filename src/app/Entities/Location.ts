export class LocationDto {
    id?: string;
    name?: string;
    longitude?: number;
    latitude?: number;
}

export class ExtremeLocationsDto {
    northLocation?: LocationDto;
    eastLocation?: LocationDto;
    westLocation?: LocationDto;
    southLocation?: LocationDto;
}