import useScrollObserver from "@/hooks/useScrollObserver"
import { findScrollContainer } from "@/lib/utils"
import React, {
  Children,
  ReactElement,
  ReactNode,
  MouseEvent,
} from "react"


type ScrollSpyProps = {
  activeClass?: string
  activeAttr?: boolean
  offsetTop?: number
  offsetLeft?: number
  behavior?: ScrollBehavior
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  onClickEach?: (
    e: MouseEvent<HTMLAnchorElement>,
    internalHandler: () => void,
    container: HTMLElement
  ) => void
  onChangeActiveId?: (newId: string, oldId: string | null) => void
  children?: ReactNode
}

const ScrollSpy: React.FC<ScrollSpyProps> = ({
  activeClass = "",
  activeAttr = false,
  offsetTop = 0,
  offsetLeft = 0,
  behavior = "smooth",
  root = null,
  rootMargin = "0px",
  threshold = [0, 0.25, 0.5, 0.75, 1],
  onClickEach,
  onChangeActiveId,
  children,
}) => {
  const { idsRef, activeLink } = useScrollObserver({
    root,
    rootMargin,
    threshold,
    onChangeActiveId,
  })

  const modifiedChildren = (nodes: ReactNode): ReactNode => {
    return Children.map(nodes, (child) => {
      if (!React.isValidElement(child)) return child

      const { type, props } = child as ReactElement<any>
      const { href, className, onClick: childOnClick, children } = props

      // Prevent infinite recursion
      if (type === ScrollSpy) return child

      if (type === "a" && typeof href === "string" && href.startsWith("#") ) {
        const id = href.slice(1)
        const isActive = id === activeLink

        if (!idsRef.current.find((el: { id: string }) => el.id === id)) {
          idsRef.current.push({ id, ratio: 0 })
        }

        return React.cloneElement(child as ReactElement<{ onClick?: (e: any) => void }>, {
          className: isActive
            ? [className, activeClass].filter(Boolean).join(" ")
            : className,
          ...(activeAttr ? { "data-active": isActive } : {}),
          onClick: (e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault()

            if (typeof childOnClick === "function") {
              childOnClick(e)
            }

            const content = document.getElementById(id)
            if (!content) return

            const container = findScrollContainer(content)

            const clickHandlerInternal = () => {
              const scrollContainer = container as HTMLElement
              container.scrollTo({
                top:
                  content.offsetTop -
                  scrollContainer.offsetTop -
                  offsetTop,
                left:
                  content.offsetLeft -
                  scrollContainer.offsetLeft -
                  offsetLeft,
                behavior,
              })
            }

            if (typeof onClickEach === "function") {
              onClickEach(e, clickHandlerInternal, container as HTMLElement)
            } else {
              clickHandlerInternal()
            }
          },
        } as any)
      }

      if (children) {
        return React.cloneElement(child, {
          ...props,
          children: modifiedChildren(children),
        })
      }

      return child
    })
  }

  return <>{modifiedChildren(children)}</>
}

export default ScrollSpy
