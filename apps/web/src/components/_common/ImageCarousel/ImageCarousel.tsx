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

// Show an image carousel with keyboard-accessible playback and caption controls.
export const ImageCarousel: React.FC<ImageCarouselProps> = ({ data }) => {
  const isOneElement = data.length <= 1
  const [slide, setSlide] = useState(0)
  const [play, setPlay] = useState(true)
  const [caption, setCaption] = useState(true)
  const [userInteract, setUserInteract] = useState(false)

  const changeSlide = (offset: number) =>
    setSlide((current) => (current + offset + data.length) % data.length)

  // automatic looping
  useEffect(() => {
    if (play && data.length > 1) {
      const interval = window.setInterval(() => {
        setSlide((current) => (current + 1) % data.length)
      }, 6000)
      return () => window.clearInterval(interval)
    }
  }, [play, data.length])

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
  }, [caption, userInteract])

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {data.map((item, index) => (
          <div
            className={`slide ${slide === index ? "active" : ""}`}
            key={item.src}
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

      <button
        type="button"
        aria-label={caption ? "Hide captions" : "Show captions"}
        aria-pressed={caption}
        className={`carousel-toggle cc fa-solid ${
          caption ? "fa-eye" : "fa-eye-slash"
        }`}
        onClick={() => {
          setCaption((prev) => !prev)
          setUserInteract(true)
        }}
      />
      {!isOneElement && (
        <>
          <button
            type="button"
            aria-label={play ? "Pause slideshow" : "Play slideshow"}
            aria-pressed={play}
            className={`carousel-toggle cycle fa-solid ${
              play ? "fa-pause" : "fa-play"
            }`}
            onClick={() => setPlay((prev) => !prev)}
          />
          <button
            type="button"
            aria-label="Previous slide"
            className="fa-solid fa-chevron-left arrow"
            onClick={() => changeSlide(-1)}
          />
          <button
            type="button"
            aria-label="Next slide"
            className="fa-solid fa-chevron-right arrow"
            onClick={() => changeSlide(1)}
          />
          {data.length <= 5 && (
            <span className="indicators">
              {data.map((item, index) => (
                <button
                  type="button"
                  key={item.src}
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={slide === index ? "true" : undefined}
                  onClick={() => setSlide(index)}
                  className={slide === index ? "indicator active" : "indicator"}
                />
              ))}
            </span>
          )}
        </>
      )}
    </div>
  )
}
