import React from 'react'
import Slider from '../components/Slider';
import Card from "../components/Card";

function Home() {

  return (
    <div className='w-full flex flex-col bg-slate-200 items-center justify-center'>
      <Slider></Slider>
      <Card></Card>
    </div>
  )
}

export default Home