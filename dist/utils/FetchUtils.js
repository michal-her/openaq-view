const FetchUtils2 = class {
  static async getCities() {
    const url = new URL("cities", FetchUtils2.baseUrl);
    url.searchParams.append("country", FetchUtils2.COUNTRY_CODE);
    url.searchParams.append("limit", "300");
    const r = await fetch(url.toString());
    return await r.json();
  }
  static async getLatestMeasurments(city) {
    const url = new URL("latest", FetchUtils2.baseUrl);
    url.searchParams.append("city", city);
    url.searchParams.append("country", FetchUtils2.COUNTRY_CODE);
    const r = await fetch(url.toString());
    return await r.json();
  }
};
export let FetchUtils = FetchUtils2;
FetchUtils.COUNTRY_CODE = "GB";
FetchUtils.baseUrl = "https://api.openaq.org/v1/";
