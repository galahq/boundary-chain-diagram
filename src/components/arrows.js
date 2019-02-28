import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useWindowSize } from 'the-platform'
const Container = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`
function Arrows({ children }) {
  return (
    <Container>
      <defs>
        <marker
          id="arrowhead"
          viewBox="-10 -10 20 20"
          refX="0"
          refY="0"
          markerWidth="20"
          markerHeight="20"
          stroke-width="1"
          orient="auto"
        >
          <polyline
            stroke-linejoin="bevel"
            points="-6.75,-6.75 0,0 -6.75,6.75"
          />
        </marker>
      </defs>
      {children}
    </Container>
  )
}

export default Arrows

function Arrow({ from, to }) {
  if (typeof window === 'undefined') {
    return null
  }

  const [fromX, setFromX] = useState(0)
  const [fromY, setFromY] = useState(0)
  const [toX, setToX] = useState(0)
  const [toY, setToY] = useState(0)

  const windowSize = useWindowSize()

  useLayoutEffect(
    () => {
      if (from.current == null || to.current == null) return

      const fromRect = from.current.getBoundingClientRect()
      const toRect = to.current.getBoundingClientRect()

      if (windowSize.width > 500) {
        setFromX(fromRect.right)
        setFromY((fromRect.top + fromRect.bottom) / 2)
        setToX(toRect.left)
        setToY((toRect.top + toRect.bottom) / 2)

      } else {
        setFromX((fromRect.left + fromRect.right) / 2)
        setFromY(fromRect.bottom)
        setToX((toRect.left + toRect.right) / 2)
        setToY(toRect.top)
    }},
    [from.current, to.current, windowSize]
  )

  return (
    <path
      stroke="#99A8AB"
      fill="none"
      d={`M ${fromX},${fromY} L ${toX},${toY}`}
    />
  )
}

export { Arrow }
