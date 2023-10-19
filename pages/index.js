import { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import { Input } from "postcss";
import Weather from "@/components/Weather";
import Spinner from "@/components/Spinner";
import Head from 'next/head';

export default function Home() {
  const [city, setCity] = useState(" 1");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
    setCity("");
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='h-full'>
        <head>
          <title>Weather forecast - by Chris Mace</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-startup-image" href="/splash-startup.png" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="HandheldFriendly" content="true" />
          <meta name="MobileOptimized" content="width" />
        </head>
        {/* Overlay */}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-[1]' />

        {/** Backgound Image */}
        <Image
          src='https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&q=80&w=3288&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='lightning'
          layout='fill'
          className='object-cover relative '
        />

        {/** Search */}
        <div className='relative flex justify-between items-center max-w-[350px] w-full m-auto pt-4 text-white z-10'>
          <form
            onSubmit={fetchWeather}
            className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'
          >
            <div>
              <input
                className='bg-transparent border-none text-white focus:outline-none text-2xl'
                onChange={(e) => setCity(e.target.value)}
                type='text'
                placeholder='Search City'
              />
            </div>
            <button className='mr-5' onClick={fetchWeather}>
              <BsSearch size={30} />
            </button>
          </form>
        </div>

        {/** Weather */}
        <div className='max-h-[25%]'>
          {weather.main && <Weather data={weather} />}
        </div>
      </div>
    );
  }
}
