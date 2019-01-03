import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

function Node({ title, shape, content, tooltipVisible, onClick }) {
  return (
    <Container onClick={onClick}>
      {title}
      {tooltipVisible && (
        <Tooltip>
          <ReactMarkdown source={content} />
        </Tooltip>
      )}
    </Container>
  )
}

export default Node

const Container = styled.button`
  background-color: #ededed;
  padding: 2em;
  position: relative;
  text-align: center;
  width: 10em;
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
