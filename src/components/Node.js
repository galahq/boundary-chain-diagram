import React from 'react'
import styled, { css } from 'styled-components'
import ReactMarkdown from 'react-markdown'

function Node({ id, title, shape, content, tooltipVisible, onClick }) {
  return (
    <Container>
      <Button round={shape === 'Circle'} onClick={onClick}>
        {title}
      </Button>
      {tooltipVisible && (
        <Tooltip>
          <ReactMarkdown source={content} escapeHtml={false} />
        </Tooltip>
      )}
    </Container>
  )
}

export default Node

const Container = styled.div`
  position: relative;
  width: 10em;
`

const Button = styled.button`
  background-color: #ededed;
  padding: 2em;
  text-align: center;

  ${p => {
    if (p.round) {
      return css`
        border-radius: 50%;
      `
    }
  }}

  &:focus {
    outline-color: red;
    outline-offset: 3px;
  }
`

const Tooltip = styled.div`
  position: absolute;
  top: calc(100% - 1em);
  left: 50%;
  background-color: darkgrey;
  width: 20em;

  strong {
    color: darkblue;
  }
`
