import type { CitiesResponse } from './../model/CityModel';
import type { LatestResponse } from '../model/MeasurmentsModel';

export class FetchUtils {
    static COUNTRY_CODE="GB"
    static baseUrl:string = "https://api.openaq.org/v1/"
    
    static async getCities():Promise<CitiesResponse> {
        const url = new URL("cities",FetchUtils.baseUrl);
        url.searchParams.append("country",FetchUtils.COUNTRY_CODE)
        url.searchParams.append("limit","300");
        const r = await fetch(url.toString());
         return await r.json();
    }

    static async getLatestMeasurments(city:string):Promise<LatestResponse> {
        const url = new URL("latest",FetchUtils.baseUrl);
        url.searchParams.append("city",city);
        url.searchParams.append("country",FetchUtils.COUNTRY_CODE);
        const r = await fetch(url.toString());
        return await r.json();
    }
}