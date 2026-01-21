"use client"

import { useEffect, useState } from "react"

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

            const id = entry.target.getAttribute("id")

            console.log(entry.intersectionRatio)

            if(entry.intersectionRatio > 0) {
                // setActiveId(id)
                console.log(id)
            }

        //   if (entry.isIntersecting) {
        //     setActiveId(entry.target.id)
        //   }
        })
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
