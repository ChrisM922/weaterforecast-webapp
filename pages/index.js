import { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import { Input } from "postcss";
import Weather from "@/components/Weather";
import Spinner from "@/components/Spinner";
export default function Home() {
  const [city, setCity] = useState("");
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
        {weather.main && <Weather data={weather} />}
      </div>
    );
  }
}
