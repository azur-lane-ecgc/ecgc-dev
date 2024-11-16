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
  let isOneElement = data.length <= 1

  const [slide, setSlide] = useState(0)

  const slideChange = (newIndex: number) => {
    setSlide((slide + newIndex + data.length) % data.length)
  }

  return (
    <div className="container">
      <div className="carousel">
        {!isOneElement && (
          <i
            className="fa-solid fa-chevron-left arrow"
            onClick={() => slideChange(-1)}
          />
        )}
        {data.map((item, index) => (
          <img
            className={slide === index ? "slide" : "hidden"}
            src={item.src}
            alt={item.alt || item.caption}
            key={index}
          />
        ))}
        {!isOneElement && (
          <i
            className="fa-solid fa-chevron-right arrow"
            onClick={() => slideChange(1)}
          />
        )}
        {!isOneElement && (
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
        )}
      </div>
    </div>
  )
}
