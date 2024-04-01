import type { WeatherInfo } from "../types";
import { v4 } from "uuid";

const countries: { [key: string]: string[] } = {
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
};

function createHourlyWeather(
    country: string,
    city: string,
    year: number,
    month: number,
    day: number,
) {
    const data: WeatherInfo[] = [];
    for (let h = 0; h < 24; h++) {
        const w: WeatherInfo = {
            id: v4(),
            run_id: v4() + v4(),
            city_ascii: city,
            country: country,
            date: new Date(year, month, day, h),
            year: year,
            month: month + 1, // because in js date month starts from 0
            day: day,
            hour: h,
            temperature_2m: parseFloat((Math.random() * 30 + 10).toFixed(0)),
            pressure_msl: parseFloat(
                (Math.random() * (1040 - 980) + 980).toFixed(0),
            ),
            windspeed_10m: parseFloat((Math.random() * 15 + 2).toFixed(0)),
            relativehumidity_2m: Math.floor(Math.random() * 70 + 10),
            forecast: false,
        };
        data.push(w);
        data.push({ ...w, forecast: true });
    }
    return data;
}

export function getMockWeatherInfo() {
    const data: WeatherInfo[] = [];

    for (const country of Object.keys(countries)) {
        const cities = countries[country];
        for (let city of cities) {
            for (let y = 2023; y < 2026; y++) {
                for (let m = 0; m < 12; m++) {
                    let days;
                    if (m % 2 === 0) {
                        days = 31;
                    } else if (m === 1) {
                        if (y === 2024) {
                            days = 29;
                        } else {
                            days = 28;
                        }
                    } else {
                        days = 30;
                    }
                    for (let i = 1; i <= days; i++) {
                        data.push(
                            ...createHourlyWeather(country, city, y, m, i),
                        );
                    }
                }
            }
        }
    }
    return data;
}
