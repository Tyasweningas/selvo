'use client'

import React, { ReactNode } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useArrowButtons } from '@/hooks/landing-page/carousel/arrow-button'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type PropType = {
    children: ReactNode
    options?: EmblaOptionsType
    showArrows?: boolean
    containerClass?: string
    spacingClass?: string
}

const ProductCarousel: React.FC<PropType> = ({
    children,
    options,
    showArrows = true,
    containerClass = "",
    spacingClass = "gap-3 sm:gap-4 lg:gap-6"
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        ...options
    })

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useArrowButtons(emblaApi)

    return (
        <div className={`relative group/carousel ${containerClass}`}>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className={`flex ${spacingClass}`}>
                    {children}
                </div>
            </div>

            {/* Navigation Buttons */}
            {showArrows && (
                <div className="contents sm:block">
                    <button
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-5 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#1A252B]/90 hover:bg-[#2A3B42] border border-[#2A3B42] rounded-full flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none shadow-lg backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100"
                        aria-label="Previous slide"
                    >
                        <FiChevronLeft size={20} className="text-white" />
                    </button>
                    <button
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-5 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#1A252B]/90 hover:bg-[#2A3B42] border border-[#2A3B42] rounded-full flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none shadow-lg backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100"
                        aria-label="Next slide"
                    >
                        <FiChevronRight size={20} className="text-white" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProductCarousel
