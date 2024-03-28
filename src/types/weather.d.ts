export type WeatherInfo = {
    id: string;
    date: Date;
    run_id: string;
    city_ascii: string;
    country: string;
    temperature_2m: number;
    pressure_msl: number;
    windspeed_10m: number;
    relativehumidity_2m: number;
    forecast: boolean;
};
