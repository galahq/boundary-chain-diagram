import React, { useState } from 'react'

import Node from '../components/Node'

const glisa = {
  id: 1,
  title: 'GLISA',
  shape: 'Rectangle',
  content: `
*GLISA* climatologists extract climate information from
historical records and global climate models.
`,
}

const glcan = {
  id: 2,
  title: 'GLCAN',
  shape: 'Rectangle',
  content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/n3OfxQKInq4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

GLCAN recognized that cities needed information on expected
climates and **socioeconomic vulnerability**. It applied for a
grant to develop the Vulnerability Assessment template in
2017.
`,
}

function IndexPage() {
  const [visibleTooltip, setVisibleTooltip] = useState(null)

  const stuff = [glisa, glcan]
  return (
    <>
      {stuff.map(el => {
        const tooltipVisible = visibleTooltip === el.id
        return (
          <Node
            {...el}
            tooltipVisible={tooltipVisible}
            onClick={() => {
              if (tooltipVisible) {
                setVisibleTooltip(null)
              } else {
                setVisibleTooltip(el.id)
              }
            }}
          />
        )
      })}
    </>
  )
}

export default IndexPage
