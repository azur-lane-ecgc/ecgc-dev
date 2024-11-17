import { useState } from "react"

import "./styles.css"

interface ImageData {
  src: string
  caption: string
  alt?: string
}

interface ImageCarouselProps {
  data: ImageData[]
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ data }) => {
  const isOneElement = data.length <= 1
  const [slide, setSlide] = useState(0)
  const [play, setPlay] = useState(true)

  const slideChange = (newIndex: number) => {
    setSlide((slide + newIndex + data.length) % data.length)
  }

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {data.map((item, index) => (
          <img
            className={`slide ${slide === index ? "active" : ""}`}
            src={item.src}
            alt={item.alt || item.caption}
            key={index}
          />
        ))}
      </div>
      {!isOneElement && (
        <>
          <i
            className={`cycleToggle fa-solid ${play ? "fa-play" : "fa-pause"}`}
            onClick={() => setPlay((prev) => !prev)}
          />
          <i
            className="fa-solid fa-chevron-left arrow"
            onClick={() => slideChange(-1)}
          />
          <i
            className="fa-solid fa-chevron-right arrow"
            onClick={() => slideChange(1)}
          />
          <span className="indicators">
            {data.map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setSlide(index)}
                  className={slide === index ? "indicator active" : "indicator"}
                ></button>
              )
            })}
          </span>
        </>
      )}
    </div>
  )
}
