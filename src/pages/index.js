import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Node from '../components/Node'

function IndexPage() {
  const [visibleTooltip, setVisibleTooltip] = useState(null)

  // A way to get and maintain a reference to a real dom node
  // openTooltipRef.current will be changed as needed by React
  const openTooltipRef = useRef(null)

  // Side effect that occurs on render
  useEffect(() => {
    function closeTooltip(e) {
      if (
        visibleTooltip !== null &&
        openTooltipRef.current &&
        !openTooltipRef.current.contains(e.target)
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

  const stuff = [
    data,
    glisa,
    hrwc,
    headwaters,
    glcan,
    evanston,
    indianapolis,
    annarbor,
    cleveland,
    dearborn,
  ]
  return (
    <Grid>
      {stuff.map(el => {
        const tooltipVisible = visibleTooltip === el.id && el.content !== ''
        return (
          <Node
            ref={tooltipVisible ? openTooltipRef : {}}
            {...el}
            tooltipVisible={tooltipVisible}
            onClick={e => {
              if (tooltipVisible) {
                setVisibleTooltip(null)
              } else {
                setVisibleTooltip(el.id)
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
  content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/n3OfxQKInq4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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
`,
}

const indianapolis = {
  id: 'indianapolis',
  title: 'Indianapolis',
  shape: 'Circle',
  image: 'indianapolis.png',
  content: `

Jeff Meek, Sustainability Planner for the **City of Indianapolis**, draws on projections in the template to argue for including an adaptation strategy in the city’s Sustainability Plan, and to make decisions that improve the city’s resilience.

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
  grid-gap: 1em;
  grid-template-areas:
    '. . . . . . . . cleveland'
    '. . . . hrwc . . . evanston'
    'data . glisa . . . glcan . dearborn'
    '. . . . headwaters . . . indianapolis'
    '. . . . . . . . annarbor';

  ${'' /* @media (max-width: 500px) {
    grid-template-areas:
      '.    base .'
      'hrwc .    indianapolis';
  } */}
`

const Backdrop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`
