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
        year: number,
        month: number,
        day: number,
        hour?: number,
    ) {
        if (!this.model) throw new Error(); // just for getting around ts error.

        const allData = getMockWeatherInfo();
        const filteredData: WeatherInfo[] = [];
        for (let i = 0; i < allData.length; i++) {
            const w = allData[i];
            if (
                forecast !== w.forecast ||
                country.toLowerCase() !== w.country.toLowerCase() ||
                city.toLowerCase() !== w.city_ascii.toLowerCase() ||
                (month && month !== w.month) ||
                (day && day !== w.day) ||
                (year && year !== w.year) ||
                (hour && hour !== w.hour)
            ) {
                continue;
            }
            filteredData.push(w);
        }
        return filteredData;
    }
}
