import { useEffect, useState } from "react"

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

  // automatic looping
  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        slideChange(1)
      }, 6000)

      return () => clearInterval(interval)
    }
  }, [play, slide])

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {data.map((item, index) => (
          <img
            className={`slide ${slide === index ? "active" : ""}`}
            key={index}
            src={item.src}
            alt={item.alt || item.caption}
          />
        ))}
      </div>
      {!isOneElement && (
        <>
          <i
            className={`cycle-toggle fa-solid ${play ? "fa-pause" : "fa-play"}`}
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
          {data.length <= 5 && (
            <span className="indicators">
              {data.map((_, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => setSlide(index)}
                    className={
                      slide === index ? "indicator active" : "indicator"
                    }
                  ></span>
                )
              })}
            </span>
          )}
        </>
      )}
    </div>
  )
}
