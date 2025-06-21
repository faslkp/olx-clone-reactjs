import React from 'react'
import "./Banner.css"
import bannerImg from "../../assets/images/banner.png"

function Banner() {
  return (
    <div>
        <img src={bannerImg} alt="" className='banner-img' />
    </div>
  )
}

export default Banner