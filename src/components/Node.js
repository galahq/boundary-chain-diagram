import React from 'react'
import styled, { css } from 'styled-components'
import ReactMarkdown from 'react-markdown'

function Node({ id, image, title, shape, content, tooltipVisible, onClick }) {
  return (
    <Container id={id}>
      <Button
        shape={shape}
        round={shape === 'Circle'}
        cloud={shape === 'Cloud'}
        onClick={onClick}
      >
        {title}
      </Button>
      {tooltipVisible && (
        <Tooltip>
          {image && <Image src={require(`../images/${image}`)} />}
          <ReactMarkdown source={content} escapeHtml={false} />
        </Tooltip>
      )}
    </Container>
  )
}

export default Node

const Container = styled.div`
  position: relative;
  grid-area: ${p => p.id};
  align-self: stretch;
`

const Button = styled.button`
  background-color: #4c5b72;
  color: #ffffff;
  padding: 1.8em;
  text-align: center;
  font: 1em 'Fira Sans', sans-serif;
  border-radius: 10%;

  ${p => {
    if (p.shape === 'Circle') {
      return css`
        border-radius: 50%;
      `
    } else if (p.shape === 'Cloud') {
    }
  }}

  ${p => {
    if (p.square) {
      return css`
        border-radius: 0%;
      `
    }
  }}

  &:focus {
    outline-color: #b5c0c2;
    outline-offset: 2px;
  }

  &:hover {
    background-color: #7c8da8;
  }
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
`
