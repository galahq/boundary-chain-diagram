import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Node from '../components/node'
import Arrows, { Arrow } from '../components/arrows'

function IndexPage() {
  const [visibleTooltip, setVisibleTooltip] = useState(null)

  // A way to get and maintain a reference to a real dom node
  // openTooltipRefRef.current will be changed as needed by React
  const openTooltipRefRef = useRef(null)

  // Side effect that occurs on render
  useEffect(() => {
    function closeTooltip(e) {
      if (
        visibleTooltip !== null &&
        openTooltipRefRef.current.current &&
        !openTooltipRefRef.current.current.contains(e.target)
      ) {
        setVisibleTooltip(null)
      }
    }

    /* Do effect */
    window.addEventListener('click', closeTooltip)
    return () => {
      /* Clean up after yourself */
      window.removeEventListener('click', closeTooltip)
    }
  })

  const nodes = {
    data: { node: data, ref: useRef(null) },
    glisa: { node: glisa, ref: useRef(null) },
    hrwc: { node: hrwc, ref: useRef(null) },
    headwaters: { node: headwaters, ref: useRef(null) },
    glcan: { node: glcan, ref: useRef(null) },
    evanston: { node: evanston, ref: useRef(null) },
    indianapolis: { node: indianapolis, ref: useRef(null) },
    annarbor: { node: annarbor, ref: useRef(null) },
    cleveland: { node: cleveland, ref: useRef(null) },
    dearborn: { node: dearborn, ref: useRef(null) },
  }

  return (
    <>
      <h3>The Boundary Chain</h3>
      <Grid>
        {Object.values(nodes).map(({ node, ref }) => {
          const tooltipVisible =
            visibleTooltip === node.id && node.content !== ''

          if (tooltipVisible) {
            openTooltipRefRef.current = ref
          }

          return (
            <Node
              ref={ref}
              {...node}
              tooltipVisible={tooltipVisible}
              onClick={e => {
                if (tooltipVisible) {
                  setVisibleTooltip(null)
                } else {
                  setVisibleTooltip(node.id)
                }

                // Prevent the event from bubbling up to the window listener and
                // immediately reclosing the new tooltip, if we're clicking from
                // one to another
                e.stopPropagation()
              }}
            />
          )
        })}
      </Grid>

      <Arrows>
        <Arrow from={nodes.data.ref} to={nodes.glisa.ref} />
        <Arrow from={nodes.glisa.ref} to={nodes.hrwc.ref} />
        <Arrow from={nodes.glisa.ref} to={nodes.headwaters.ref} />
        <Arrow from={nodes.hrwc.ref} to={nodes.glcan.ref} />
        <Arrow from={nodes.headwaters.ref} to={nodes.glcan.ref} />
        <Arrow from={nodes.glcan.ref} to={nodes.cleveland.ref} />
        <Arrow from={nodes.glcan.ref} to={nodes.evanston.ref} />
        <Arrow from={nodes.glcan.ref} to={nodes.indianapolis.ref} />
        <Arrow from={nodes.glcan.ref} to={nodes.dearborn.ref} />
        <Arrow from={nodes.glcan.ref} to={nodes.annarbor.ref} />
      </Arrows>
    </>
  )
}

export default IndexPage

const data = {
  id: 'data',
  title: 'Data',
  shape: 'Rectangle',
  content: ``,
}

const glisa = {
  id: 'glisa',
  title: 'GLISA',
  shape: 'Rounded',
  image: 'glisa.png',
  content: `
**Great Lakes Integrated Sciences and Assessments** *(GLISA)* climatologists extract climate information from
historical records and global climate models.
`,
}

const glcan = {
  id: 'glcan',
  title: 'GLCAN',
  shape: 'Rounded',
  content: `
The **Great Lakes Climate Action Network** *(GLCAN)* recognized that cities needed information on expected
climates and socioeconomic vulnerability. It applied for a
grant to develop the Vulnerability Assessment template in
2017.

`,
}

const hrwc = {
  id: 'hrwc',
  title: 'HRWC',
  shape: 'Rectangle',
  image: 'hrwc.png',
  content: `
*Rebecca Esselman* with **Huron River Watershed Council** *(HRCW)* worked with Great Lakes cities to develop the Vulnerability Assessment template and incorporate GLISA’s climate information.

<iframe width="560" height="315" src="https://www.youtube.com/embed/EUjwSRtQo6I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`,
}

const headwaters = {
  id: 'headwaters',
  title: 'Headwaters Economics',
  shape: 'Rectangle',
  image: 'headwaters.png',
  content: `
**Headwaters Economics** extracts socioeconomic data from the census and incorporates it into the template.
`,
}
const evanston = {
  id: 'evanston',
  title: 'Evanston',
  shape: 'Circle',
  image: 'evanston.png',
  content: `

Kumar Jensen, Sustainability Coordinator for the **City of Evanston**, started a Climate Action and Resilience Group of community members. The group used the template to identify the city’s vulnerable physical and natural infrastructure.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Nvitv--PEeA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`,
}

const indianapolis = {
  id: 'indianapolis',
  title: 'Indianapolis',
  shape: 'Circle',
  image: 'indianapolis.png',
  content: `

Jeff Meek, Sustainability Planner for the **City of Indianapolis**, draws on projections in the template to argue for including an adaptation strategy in the city’s Sustainability Plan, and to make decisions that improve the city’s resilience.

<iframe width="560" height="315" src="https://www.youtube.com/embed/QSTQBkLQwSg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`,
}

const cleveland = {
  id: 'cleveland',
  title: 'Cleveland',
  shape: 'Circle',
  content: ``,
}

const annarbor = {
  id: 'annarbor',
  title: 'Ann Arbor',
  shape: 'Circle',
  content: ``,
}

const dearborn = {
  id: 'dearborn',
  title: 'Dearborn',
  shape: 'Circle',
  content: ``,
}

const Grid = styled.div`
  display: grid;
  grid-gap: 1em 4em;
  grid-template-areas:
    '.   .      .          .     cleveland'
    '.   .      hrwc       .     evanston'
    'data glisa .          glcan dearborn'
    '.   .      headwaters .     indianapolis'
    '.   .      .          .     annarbor';

  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);

  @media (max-width: 500px) {
    grid-gap: 1.2em 1em;
    grid-template-areas:
      '.          data      .           '
      '.          glisa     .           '
      'hrwc       .         headwaters  '
      '.          glcan     .           '
      'evanston   .         indianapolis'
      '.          dearborn  .           '
      'cleveland  .         annarbor    '   ;
  }
`

const MainHeader = styled.h3`
  color: red;
`
