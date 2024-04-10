CREATE KEYSPACE IF NOT EXISTS weather_data
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE weather_data;

CREATE TABLE IF NOT EXISTS actual_weather (
    run_id text,
    id text,
    city_ascii text,
    country text,
    date timestamp,
    temperature_2m double,
    pressure_msl double,
    windspeed_10m double,
    relativehumidity_2m double,
    PRIMARY KEY (id, date)
);

CREATE TABLE IF NOT EXISTS forecast_weather (
    run_id text,
    id text,
    city_ascii text,
    country text,
    date timestamp,
    temperature_2m double,
    pressure_msl double,
    windspeed_10m double,
    relativehumidity_2m double,
    PRIMARY KEY (id, date)
);
