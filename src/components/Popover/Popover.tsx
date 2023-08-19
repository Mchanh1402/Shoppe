import { FloatingPortal, arrow, useFloating, shift, offset, type Placement } from '@floating-ui/react'
import { useRef, useState, useId, ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const id = useId()
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, middlewareData, strategy } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='absolute z-[1] -translate-y-[97%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              ></span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
