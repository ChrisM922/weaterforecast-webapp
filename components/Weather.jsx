import React from 'react'
import Image from 'next/image'

const watherData = ({ data }) => {

  console.log(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

  return (
    <div className='relative flex flex-col justify-between max-w-[350px] w-full mt-[-50px] p-4 text-gray-300 z-30'>
      <div className='relative flex justify-between pt-12'>
        <div className='flex flex-col items-center'>
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="/"
            width="100"
            height="100"
          />
          <p className='text-2xl'>{data.weather[0].main}</p>
        </div>
        <p className='text-9xl'>{((data.main.temp - 32) * 5 / 9).toFixed(0)}&#176;</p>
      </div>
      <div className='relative bg-black/75 p-8 rounded-md'>
        <p className='text-2xl text-center pb-6'>Weather in {data.name}</p>
        <div className='flex justify-between text-center'>
          <div>
            <p className='font-bold text-2xl'>{((data.main.feels_like - 32) * 5 / 9).toFixed(0)}&#176;</p>
            <p className='text-xl'>Feels like</p>
          </div>
          <div>
            <p className='font-bold text-2xl'>{data.main.humidity}%</p>
            <p className='text-xl'>Humidity</p>
          </div>
          <div>
            <p className='font-bold text-2xl'>{data.wind.speed.toFixed(0)} mph</p>
            <p className='text-xl'>Wind</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default watherData