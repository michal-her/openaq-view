export interface Meta {
    name: string;
    license: string;
    website: string;
    page: number;
    limit: number;
    found: number;
}

export interface AveragingPeriod {
    value: number;
    unit: string;
}

export interface Measurement {
    parameter: string;
    value: number;
    lastUpdated: Date;
    unit: string;
    sourceName: string;
    averagingPeriod: AveragingPeriod;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface LatestData {
    location: string;
    city: string;
    country: string;
    distance: number;
    measurements: Measurement[];
    coordinates: Coordinates;
}

export interface LatestResponse {
    meta: Meta;
    results: LatestData[];
}