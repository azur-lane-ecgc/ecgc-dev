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
  const [caption, setCaption] = useState(true)
  const [userInteract, setuserInteract] = useState(false)

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

  // automatically disable / enable caption at small screen size transition
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 540 && caption && !userInteract) {
        setCaption(false)
      }
      if (window.innerWidth >= 540 && !caption && !userInteract) {
        setCaption(true)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [caption])

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {data.map((item, index) => (
          <div
            className={`slide ${slide === index ? "active" : ""}`}
            key={index}
          >
            <img
              loading="lazy"
              className="carousel-image"
              src={item.src}
              alt={item.alt || item.caption}
            />
            {caption && (
              <div className="carousel-caption">
                <p>{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <i
        className={`carousel-toggle cc fa-solid ${
          caption ? "fa-eye" : "fa-eye-slash"
        }`}
        onClick={() => {
          setCaption((prev) => !prev)
          setuserInteract(true)
        }}
      />
      {!isOneElement && (
        <>
          <i
            className={`carousel-toggle cycle fa-solid ${
              play ? "fa-pause" : "fa-play"
            }`}
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
              {data.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setSlide(index)}
                  className={slide === index ? "indicator active" : "indicator"}
                ></span>
              ))}
            </span>
          )}
        </>
      )}
    </div>
  )
}
