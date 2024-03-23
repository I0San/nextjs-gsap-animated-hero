"use client"
import React, { useEffect, useRef } from 'react'
import gsap from "gsap"
import styles from './index.module.css'
import Icon from "@/components/@core/icons"
import { heroSlides } from '@/constants/hero-slides'

let order = [0, 1, 2, 3, 4, 5]
let detailsEven = true
let offsetTop = 200
let offsetLeft = 700
let cardWidth = 200
let cardHeight = 300
let gap = 40
let numberSize = 50
const ease = "sine.inOut"
let clicks = 0

export default function Home() {
    const shouldFetch = useRef(true) // used only to prevent double run in development mode
    const set = gsap.set

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false

            const [active, ...rest] = order
            const detailsActive = detailsEven ? "#details-even" : "#details-odd"
            const detailsInactive = detailsEven ? "#details-odd" : "#details-even"
            const { innerHeight: height, innerWidth: width } = window
            offsetTop = height - 430
            offsetLeft = width - 830

            gsap.set("#pagination", {
                top: offsetTop + 330,
                left: offsetLeft,
                y: 200,
                opacity: 0,
                zIndex: 60,
            })

            gsap.set("nav", { y: -200, opacity: 0 })

            gsap.set(getCard(active), {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            })

            gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 })
            gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 })
            gsap.set(detailsInactive, { opacity: 0, zIndex: 12 })
            gsap.set(`${detailsInactive} .gText`, { y: 100 })
            gsap.set(`${detailsInactive} .gTitle1`, { y: 100 })
            gsap.set(`${detailsInactive} .gTitle2`, { y: 100 })
            gsap.set(`${detailsInactive} .gDesc`, { y: 50 })
            gsap.set(`${detailsInactive} .gCta`, { y: 60 })

            gsap.set(".gProgF", { width: 500 * (1 / order.length) * (active + 1) })

            rest.forEach((i, index) => {
                gsap.set(getCard(i), {
                    x: offsetLeft + 400 + index * (cardWidth + gap),
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: 30,
                    borderRadius: 10,
                })
                gsap.set(getCardContent(i), {
                    x: offsetLeft + 400 + index * (cardWidth + gap),
                    zIndex: 40,
                    y: offsetTop + cardHeight - 100,
                })
                gsap.set(getSliderItem(i), { x: (index + 1) * numberSize })
            })

            gsap.set(".indicator", { x: -window.innerWidth })

            const startDelay = 0.6

            gsap.to("#cover", {
                x: width + 400,
                delay: 0.5,
                ease,
                onComplete: () => {
                    setTimeout(() => {
                        loop()
                    }, 500)
                },
            })

            rest.forEach((i, index) => {
                gsap.to(getCard(i), {
                    x: offsetLeft + index * (cardWidth + gap),
                    zIndex: 30,
                    ease,
                    delay: startDelay,
                })
                gsap.to(getCardContent(i), {
                    x: offsetLeft + index * (cardWidth + gap),
                    zIndex: 40,
                    ease,
                    delay: startDelay,
                })
            })
            gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay })
            gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay })
            gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCard = (i: number) => {
        return `#card${i}`
    }

    const getCardContent = (i: number) => {
        return `#card-content-${i}`
    }

    const getSliderItem = (i: number) => {
        return `#slide-item-${i}`
    }

    const step = () => {
        if (!document) return

        return new Promise((resolve) => {
            order.push(order.shift() ?? 0)
            detailsEven = !detailsEven

            const detailsActive = detailsEven ? "#details-even" : "#details-odd"
            const detailsInactive = detailsEven ? "#details-odd" : "#details-even"

            const _placeBoxText = document.querySelector(`${detailsActive} .gText`)
            if (_placeBoxText) _placeBoxText.textContent = heroSlides[order[0]].place
            const _title1 = document.querySelector(`${detailsActive} .gTitle1`)
            if (_title1) _title1.textContent = heroSlides[order[0]].title
            const _title2 = document.querySelector(`${detailsActive} .gTitle2`)
            if (_title2) _title2.textContent = heroSlides[order[0]].title2
            const _desc = document.querySelector(`${detailsActive} .gDesc`)
            if (_desc) _desc.textContent = heroSlides[order[0]].description

            gsap.set(detailsActive, { zIndex: 22 })
            gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease })
            gsap.to(`${detailsActive} .gText`, {
                y: 0,
                delay: 0.1,
                duration: 0.7,
                ease,
            })
            gsap.to(`${detailsActive} .gTitle1`, {
                y: 0,
                delay: 0.15,
                duration: 0.7,
                ease,
            })
            gsap.to(`${detailsActive} .gTitle2`, {
                y: 0,
                delay: 0.15,
                duration: 0.7,
                ease,
            })
            gsap.to(`${detailsActive} .gDesc`, {
                y: 0,
                delay: 0.3,
                duration: 0.4,
                ease,
            })
            gsap.to(`${detailsActive} .gCta`, {
                y: 0,
                delay: 0.35,
                duration: 0.4,
                onComplete: resolve,
                ease,
            })
            gsap.set(detailsInactive, { zIndex: 12 })

            const [active, ...rest] = order
            const prv = rest[rest.length - 1]

            gsap.set(getCard(prv), { zIndex: 10 })
            gsap.set(getCard(active), { zIndex: 20 })
            gsap.to(getCard(prv), { scale: 1.5, ease })
            gsap.to(getCardContent(active), {
                y: offsetTop + cardHeight - 10,
                opacity: 0,
                duration: 0.3,
                ease,
            })
            gsap.to(getSliderItem(active), { x: 0, ease })
            gsap.to(getSliderItem(prv), { x: -numberSize, ease })
            gsap.to(".gProgF", {
                width: 500 * (1 / order.length) * (active + 1),
                ease,
            })
            gsap.to(getCard(active), {
                x: 0,
                y: 0,
                ease,
                width: window.innerWidth,
                height: window.innerHeight,
                borderRadius: 0,
                onComplete: () => {
                    const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap)
                    gsap.set(getCard(prv), {
                        x: xNew,
                        y: offsetTop,
                        width: cardWidth,
                        height: cardHeight,
                        zIndex: 30,
                        borderRadius: 10,
                        scale: 1,
                    })
                    gsap.set(getCardContent(prv), {
                        x: xNew,
                        y: offsetTop + cardHeight - 100,
                        opacity: 1,
                        zIndex: 40,
                    })
                    gsap.set(getSliderItem(prv), { x: rest.length * numberSize })
                    gsap.set(detailsInactive, { opacity: 0 })
                    gsap.set(`${detailsInactive} .gText`, { y: 100 })
                    gsap.set(`${detailsInactive} .gTitle1`, { y: 100 })
                    gsap.set(`${detailsInactive} .gTitle2`, { y: 100 })
                    gsap.set(`${detailsInactive} .gDesc`, { y: 50 })
                    gsap.set(`${detailsInactive} .gCta`, { y: 60 })
                    clicks -= 1
                    if (clicks > 0) {
                        step()
                    }
                }
            })

            rest.forEach((i, index) => {
                if (i !== prv) {
                    const xNew = offsetLeft + index * (cardWidth + gap)
                    gsap.set(getCard(i), { zIndex: 30 })
                    gsap.to(getCard(i), {
                        x: xNew,
                        y: offsetTop,
                        width: cardWidth,
                        height: cardHeight,
                        ease,
                        delay: 0.1 * (index + 1)
                    })
                    gsap.to(getCardContent(i), {
                        x: xNew,
                        y: offsetTop + cardHeight - 100,
                        opacity: 1,
                        zIndex: 40,
                        ease,
                        delay: 0.1 * (index + 1)
                    })
                    gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease })
                }
            })
        })
    }

    const animate = (target: any, duration: number, properties: any) => {
        return new Promise((resolve) => {
            gsap.to(target, {
                ...properties,
                duration: duration,
                onComplete: resolve
            })
        })
    }

    const loop = async () => {
        await animate(".indicator", 2, { x: 0 })
        await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 })
        set(".indicator", { x: -window.innerWidth })
        await step()
        loop()
    }

    return (
        <main>

            <div id="demo">
                {heroSlides.map((i, index) =>
                    <div key={index} className="card" id={`card${index}`} style={{ backgroundImage: `url(${i.image})` }}>
                        <div className="card-content" id={`card-content-${index}`}>
                            <div className="content-start"></div>
                            <div className="content-place">${i.place}</div>
                            <div className="content-title-1">${i.title}</div>
                            <div className="content-title-2">${i.title2}</div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.details} id="details-even">
                <div className={styles.placeBox}>
                    <div className={`${styles.text} gText`}>Switzerland Alps</div>
                </div>
                <div className={styles.titleBox1}>
                    <div className={`${styles.title1} gTitle1`}>SAINT</div>
                </div>
                <div className={styles.titleBox2}>
                    <div className={`${styles.title2} gTitle2`}>ANTONIEN</div>
                </div>
                <div className={`${styles.desc} gDesc`}>
                    Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic
                    retreat for those seeking tranquility and adventure alike. It&apos;s a hidden
                    gem for backcountry skiing in winter and boasts lush trails for hiking
                    and mountain biking during the warmer months.
                </div>
                <div className={`${styles.cta} gCta`}>
                    <button className={styles.bookmark}>
                        <Icon name="bookmark" />
                    </button>
                    <button className={styles.discover}>Discover Location</button>
                </div>
            </div>

            <div className={styles.details} id="details-odd">
                <div className={styles.placeBox}>
                    <div className={`${styles.text} gText`}>Switzerland Alps</div>
                </div>
                <div className={styles.titleBox1}>
                    <div className={`${styles.title1} gTitle1`}>SAINT</div>
                </div>
                <div className={styles.titleBox2}>
                    <div className={`${styles.title2} gTitle2`}>ANTONIEN</div>
                </div>
                <div className={`${styles.desc} gDesc`}>
                    Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic
                    retreat for those seeking tranquility and adventure alike. It&apos;s a hidden
                    gem for backcountry skiing in winter and boasts lush trails for hiking
                    and mountain biking during the warmer months.
                </div>
                <div className={`${styles.cta} gCta`}>
                    <button className={styles.bookmark}>
                        <Icon name="bookmark" />
                    </button>
                    <button className={styles.discover}>Discover Location</button>
                </div>
            </div>

            <div className={styles.pagination} id="pagination">
                <div className={`${styles.arrow} arrow-left`}>
                    <Icon name="arrow-left" />
                </div>
                <div className={`${styles.arrow} arrow-right`}>
                    <Icon name="arrow-right" />
                </div>
                <div className={`${styles.progressSubContainer}`}>
                    <div className={`${styles.progressSubBackground}`}>
                        <div className={`${styles.progressSubForeground} gProgF`}></div>
                    </div>
                </div>
                <div className={styles.slideNumbers} id="slide-numbers">
                    {heroSlides.map((i, index) =>
                        <div key={`slide${index}`} className={styles.item} id={`slide-item-${index}`}>{index + 1}</div>
                    )}
                </div>
            </div>

            <div className="cover" id="cover"></div>

        </main>
    )
}
