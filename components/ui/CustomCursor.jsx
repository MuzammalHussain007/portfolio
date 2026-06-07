'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let mouseX = 0, mouseY = 0
    let outlineX = 0, outlineY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
      dot.style.transform = 'translate(-50%, -50%)'
    }

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.15
      outlineY += (mouseY - outlineY) * 0.15
      outline.style.left = `${outlineX}px`
      outline.style.top = `${outlineY}px`
      outline.style.transform = 'translate(-50%, -50%)'
      requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      outline.style.width = '60px'
      outline.style.height = '60px'
      outline.style.borderColor = 'rgba(255,255,255,0.7)'
      dot.style.opacity = '0'
    }

    const onMouseLeaveLink = () => {
      outline.style.width = '36px'
      outline.style.height = '36px'
      outline.style.borderColor = 'rgba(255,255,255,0.4)'
      dot.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove)
    animate()

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink)
      link.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={outlineRef} className="cursor-outline hidden lg:block" />
    </>
  )
}
