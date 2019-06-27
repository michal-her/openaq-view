import { Meta } from "./MeasurmentsModel";

export type CitiesResponse = {
    meta:Meta;
    results:Array<City>;
}



export type City = {
    city:string;
    count:number;
    country:string;
    locations:number
}
