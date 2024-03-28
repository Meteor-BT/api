import type { WeatherInfo } from "../types";
import { WeatherModel } from "../db";
import { getMockWeatherInfo } from "../db/mock_factory";

export default class WeatherService {
    constructor(private model: typeof WeatherModel) {}

    // private async getWeatherInfo() {}

    async getWeatherInfo(
        forecast: boolean,
        country: string,
        city: string,
        year = new Date().getFullYear(),
        month = new Date().getMonth(),
        day = new Date().getDay(),
        hour = new Date().getHours(),
    ) {
        if (!this.model) throw new Error(); // just for getting around ts error.

        const allData = getMockWeatherInfo();
        const filteredData: WeatherInfo[] = [];
        for (let i = 0; i < allData.length; i++) {
            const w = allData[i];
            if (
                forecast !== w.forecast ||
                country !== w.country ||
                city !== w.city_ascii ||
                month !== w.month ||
                day !== w.day ||
                year !== w.year ||
                hour !== w.hour
            ) {
                continue;
            }
            filteredData.push(w);
        }
        return filteredData;
    }
}
