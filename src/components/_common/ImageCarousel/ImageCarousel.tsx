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

  // State variables for animation classes
  const [isSlideStart, setIsSlideStart] = useState(false)
  const [isSlideEnd, setIsSlideEnd] = useState(false)
  const [isSlidePrev, setIsSlidePrev] = useState(false)
  const [isSlideNext, setIsSlideNext] = useState(false)

  const slideRight = () => {
    const nextSlide = (slide + 1) % data.length

    setIsSlideStart(true)
    setIsSlideNext(true)

    setTimeout(() => {
      setSlide(nextSlide)
      setIsSlideStart(false)
      setIsSlideNext(false)
    }, 600)
  }

  const slideLeft = () => {
    const nextSlide = (slide - 1 + data.length) % data.length

    setIsSlideEnd(true)
    setIsSlidePrev(true)

    setTimeout(() => {
      setSlide(nextSlide)
      setIsSlideEnd(false)
      setIsSlidePrev(false)
    }, 600)
  }

  return (
    <div className="container">
      <div className="carousel">
        <div className="carousel-inner">
          {data.map((item, index) => (
            <div
              className={`slide ${slide === index ? "active" : ""}
                ${isSlidePrev && slide === (index - 1 + data.length) % data.length ? "slide-prev" : ""}
                ${isSlideNext && slide === (index + 1) % data.length ? "slide-next" : ""}
                ${isSlideStart && slide === index ? "slide-start" : ""}
                ${isSlideStart && slide === (index + 1) % data.length ? "slide-start" : ""}
                ${isSlideEnd && slide === index ? "slide-end" : ""}
                ${isSlideEnd && slide === (index - 1 + data.length) % data.length ? "slide-end" : ""}
              `}
              key={index}
            >
              <img src={item.src} alt={item.alt || item.caption} key={index} />
            </div>
          ))}
        </div>
        {!isOneElement && (
          <>
            <i
              className={`cycleToggle fa-solid ${play ? "fa-play" : "fa-pause"}`}
              onClick={() => setPlay((prev) => !prev)}
            />
            <i className="arrow fa-solid fa-chevron-left" onClick={slideLeft} />
            <i
              className="arrow fa-solid fa-chevron-right"
              onClick={slideRight}
            />
            <span className="indicators">
              {data.map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSlide(index)}
                    className={
                      slide === index ? "indicator active" : "indicator"
                    }
                  ></button>
                )
              })}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
