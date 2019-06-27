import { CitiesResponse } from './../model/CityModel';
import  * as  QS  from 'query-string';
import { LatestResponse } from '../model/MeasurmentsModel';

export class FetchUtils {
    static baseUrl:String = "https://api.openaq.org/v1"
    
    static async getCities():Promise<CitiesResponse> {
        const query=QS.stringify({country:"GB", limit:300});
        const r = await fetch(`${FetchUtils.baseUrl}/cities?${query}`);
         return await r.json();
    }

    static async getLatestMeasurments(city:string):Promise<LatestResponse> {
        const query = QS.stringify({city:city});
        const r = await fetch(`${FetchUtils.baseUrl}/latest?${query}`);
        return await r.json();
    }
}