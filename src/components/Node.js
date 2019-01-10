import React, { forwardRef, useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import ReactMarkdown from 'react-markdown'

function Node(
  { id, image, title, shape, content, tooltipVisible, onClick },
  ref
) {
  const itemProps = content !== '' ? { onClick, as: 'button' } : {}

  const [shouldFocus, setShouldFocus] = useState(false)

  const tooltipRef = useRef(null)
  useEffect(
    () => {
      tooltipRef.current && tooltipRef.current.focus()
    },
    [tooltipVisible]
  )

  return (
    <Container ref={ref} id={id}>
      <Item shape={shape} {...itemProps}>
        {title}
      </Item>
      {tooltipVisible && (
        <>
          <Tooltip ref={tooltipRef} tabIndex="0">
            {image && <Image src={require(`../images/${image}`)} />}
            <ReactMarkdown source={content} escapeHtml={false} />
          </Tooltip>
          <VisuallyHidden>
            <button onClick={onClick}>Close</button>
          </VisuallyHidden>
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
  padding: 0.5em;
`

const Item = styled.div`
  background-color: #99a8ab;
  color: #ffffff;
  padding: 1.8em;
  text-align: center;
  font: 1em 'Fira Sans', sans-serif;
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
  max-width: 10em;
`

const Tooltip = styled.div`
  position: absolute;
  top: calc(100% - 1em);
  left: 50%;
  background-color: #edf0f0;
  min-width: 20em;
  font: 0.9em 'Fira Sans', sans-serif;
  z-index: 10;
  border: 1px solid #99a8ab;
  padding: 0.8em 0.8em 0em 0.8em;
  margin-bottom: 0em;

  strong {
    color: #534838;
  }

  &:focus {
    outline: 2px solid #b5c0c2;
    outline-offset: 2px;
  }
`

const VisuallyHidden = styled.div`
  position: absolute;

  &:not(:focus-within) {
    left: -9999999px;
    top: -999999px;
  }
`
