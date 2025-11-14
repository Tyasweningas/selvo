
'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, useArrowButtons } from '@/hooks/landing-page/carousel/arrow-button'
import { banner_1, banner_2, banner_3 } from '@/assets/banner'
import type { StaticImageData } from 'next/image'

const TWEEN_FACTOR_BASE = 0.2

type PropType = {
  slides?: StaticImageData[]
  options?: EmblaOptionsType
}

const BannerCarousel: React.FC<PropType> = ({ slides = [banner_1, banner_2, banner_3], options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useArrowButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi
      .slideNodes()
      .map((slideNode) => slideNode.querySelector('.embla__parallax__layer') as HTMLElement)
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          })
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100
        const tweenNode = tweenNodes.current[slideIndex]
        tweenNode.style.transform = `translateX(${translate}%)`
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax)
  }, [emblaApi, tweenParallax])

  return (
   <div className="embla relative">
  <div className="embla__viewport rounded-3xl overflow-hidden" ref={emblaRef}>
    <div className="embla__container">
      {slides.map((src, index) => (
        <div className="embla__slide" key={index}>
          <div className="embla__parallax">
            <div className="embla__parallax__layer">
              <img
                className="embla__slide__img embla__parallax__img"
                src={src.src}
                alt={`Banner ${index + 1}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>


  <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
  <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
</div>

  )
}

export default BannerCarousel
