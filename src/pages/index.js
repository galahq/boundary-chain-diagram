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
  content: `
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
      {stuff.map(el => (
        <Node
          {...el}
          tooltipVisible={visibleTooltip === el.id}
          onClick={() => setVisibleTooltip(el.id)}
        />
      ))}
    </>
  )
}

export default IndexPage
