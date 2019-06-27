import { CitiesResponse } from './../model/CityModel';
import  * as  QS  from 'query-string';
import { LatestResponse } from '../model/MeasurmentsModel';

export class FetchUtils {
    static COUNTRY_CODE="GB"
    static baseUrl:String = "https://api.openaq.org/v1"
    
    static async getCities():Promise<CitiesResponse> {
        const query=QS.stringify({country:FetchUtils.COUNTRY_CODE, limit:300});
        const r = await fetch(`${FetchUtils.baseUrl}/cities?${query}`);
         return await r.json();
    }

    static async getLatestMeasurments(city:string):Promise<LatestResponse> {
        const query = QS.stringify({city:city, country:FetchUtils.COUNTRY_CODE},);
        const r = await fetch(`${FetchUtils.baseUrl}/latest?${query}`);
        return await r.json();
    }
}