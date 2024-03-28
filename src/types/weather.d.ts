export type WeatherInfo = {
    id: string;
    run_id: string;
    city_ascii: string;
    country: string;
    temperature_2m: number;
    pressure_msl: number;
    windspeed_10m: number;
    relativehumidity_2m: number;
    date: Date;
    hour: number; // 0 - 23
    day: number; // 1 - 31
    month: number; // 1 - 12
    year: number;
    forecast: boolean;
};
