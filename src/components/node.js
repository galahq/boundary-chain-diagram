import React, { forwardRef, useRef, useEffect, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'
import ReactMarkdown from 'react-markdown'
import Popper from 'popper.js'

function Node(
  { id, image, title, shape, content, tooltipVisible, onClick },
  ref
) {
  const itemProps = content !== '' ? { onClick, as: 'button' } : {}
  const itemRef = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(
    () => {
      tooltipRef.current && tooltipRef.current.focus()
    },
    [tooltipVisible, tooltipRef.current]
  )

  const popperRef = useRef(null)
  useLayoutEffect(
    () => {
      if (tooltipVisible) {
        popperRef.current = new Popper(itemRef.current, tooltipRef.current, {
          modifiers: {
            flip: {
              behavior: ['left', 'bottom', 'top', 'right'],
            },
            offset: {
              offset: '10, 10',
            },
            preventOverflow: {
              boundariesElement: 'viewport',
            },
          },
        })
      }

      return () => {
        popperRef.current = null
      }
    },
    [tooltipVisible, itemRef.current, tooltipRef.current]
  )

  const imageRef = useRef(null)
  useEffect(() => {
    function updatePopper() {
      popperRef.current && popperRef.current.scheduleUpdate()
    }

    imageRef.current && imageRef.current.addEventListener('load', updatePopper)

    return () => {
      imageRef.current &&
        imageRef.current.removeEventListener('load', updatePopper)
    }
  })

  return (
    <Container ref={ref} id={id}>
      <Item ref={itemRef} shape={shape} {...itemProps}>
        {title}
      </Item>

      {tooltipVisible && (
        <>
          <Tooltip ref={tooltipRef} tabIndex="0">
            <VisuallyHiddenOnDesktop>
              <button onClick={onClick}>Close</button>
            </VisuallyHiddenOnDesktop>
            {image && (
              <Image ref={imageRef} src={require(`../images/${image}`)} />
            )}
            <ReactMarkdown source={content} escapeHtml={false} />
            <VisuallyHidden>
              <button onClick={onClick}>Close</button>
            </VisuallyHidden>
          </Tooltip>
        </>
      )}
    </Container>
  )
}

export default forwardRef(Node)

const Container = styled.div`
  position: relative;
  grid-area: ${p => p.id};
  align-self: stretch;
`

const Item = styled.div`
  background-color: #99a8ab;
  color: #ffffff;
  padding: 1.2rem;
  text-align: center;
  font: 0.9em 'Fira Sans', sans-serif;
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: 4px 4px 5px -5px rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  ${p => {
    if (p.shape === 'Circle') {
      return css`
        border-radius: 50%;
      `
    } else if (p.shape === 'Rectangle') {
      return css`
        border-radius: 0%;
      `
    } else if (p.shape === 'Rounded') {
      return css`
        border-radius: 10px;
      `
    }
  }}

  ${p => {
    if (p.as === 'button') {
      return css`
        cursor: pointer;
        background-color: #4c5b72;

        &:focus {
          outline: 2px solid #b5c0c2;
          outline-offset: 2px;
        }

        &:hover {
          background-color: #7c8da8;
        }
      `
    }
  }}
`

const Image = styled.img`
  max-width: 9em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #99a8ab;
`

const Tooltip = styled.div`
  background-color: #edf0f0;
  min-width: 20em;
  font: 0.8em 'Fira Sans', sans-serif;
  z-index: 10;
  border: 1px solid #99a8ab;
  padding: 0.8em 0.8em 0em 0.8em;
  margin-bottom: 0em;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 4px 8px rgba(16, 22, 26, 0.2),
    0 18px 46px 6px rgba(16, 22, 26, 0.2);

  strong {
    color: #534838;
  }

  iframe {
    max-width: 100%;
  }
`

const VisuallyHidden = styled.div`
  position: absolute;

  &:not(:focus-within) {
    left: -9999999px;
    top: -999999px;
  }
`

const VisuallyHiddenOnDesktop = styled(VisuallyHidden)`
  @media (max-width: 500px) {
    position: static;
  }
`
