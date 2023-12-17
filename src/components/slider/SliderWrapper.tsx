import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderWrapper(props: any) {
  return (
    <div className='custom-slider-wrapper mb-12'>
      <Slider {...props.settings} className={props.className}>
        {props.children}
      </Slider>
    </div>
  )
}
