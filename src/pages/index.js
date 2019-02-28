import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Node from '../components/node'
import Arrows, { Arrow } from '../components/arrows'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

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
      <Heading>Illustrated Boundary Chain Model</Heading>
      <Description>
        Boundary organizations coproduce climate information by working in the
        space between the organizations that produce the information (for
        example, universities) and the organizations that use it to make
        decisions (for example, city managers). In a boundary chain model, the
        organizations that use information are connected, not just to producers,
        but also to each other, like links in a chain. This configuration
        enables organizations to collaborate to exchange information and
        customize it to fit their different needs. The diagram below uses the
        case of the Great Lakes Climate Adaptation Network (GLCAN) to illustrate
        how organizations collaborated to develop a template to assess climate
        vulnerability in Great Lakes cities.
      </Description>
      <Instructions>
        Click on each link in the chain to learn more about that organizations
        role in helping cities adapt to climate change.
      </Instructions>

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

      <GlobalStyles />
    </>
  )
}

export default IndexPage

const data = {
  id: 'data',
  title: 'Climate Data',
  shape: 'Rectangle',
  content: `Historical observations and future projections.`,
}

const glisa = {
  id: 'glisa',
  title: 'GLISA',
  shape: 'Rounded',
  image: 'glisa.png',
  content: `
**Great Lakes Integrated Sciences and Assessments** *(GLISA)* climatologists extracted climate information from
historical records and global climate models.
`,
}

const glcan = {
  id: 'glcan',
  title: 'GLCAN',
  shape: 'Rounded',
  content: `
The **Great Lakes Climate Adaptation Network** *(GLCAN)* recognized that cities needed information on expected climate impacts and socioeconomic vulnerability. It applied for a
grant to develop the Vulnerability Assessment template in 2017.

`,
}

const hrwc = {
  id: 'hrwc',
  title: 'HRWC',
  shape: 'Rectangle',
  image: 'hrwc.png',
  content: `
*Rebecca Esselman* with the **Huron River Watershed Council** *(HRWC)* worked with Great Lakes cities to develop the Vulnerability Assessment template and incorporate GLISA’s climate information.

<iframe src="https://www.youtube.com/embed/EUjwSRtQo6I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`,
}

const headwaters = {
  id: 'headwaters',
  title: 'Headwaters Economics',
  shape: 'Rectangle',
  image: 'headwaters.png',
  content: `
**Headwaters Economics** extracted socioeconomic data from the census and incorporates it into the template.
`,
}
const evanston = {
  id: 'evanston',
  title: 'Evanston',
  shape: 'Circle',
  image: 'evanston.png',
  content: `

Kumar Jensen, Sustainability Coordinator for the **City of Evanston**, helped start a Climate Action and Resilience Plan (CARP) made up of 17 community members. The group used the template to identify the city’s vulnerable physical and natural infrastructure.

<iframe src="https://www.youtube.com/embed/SDfwE914nrY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`,
}

const indianapolis = {
  id: 'indianapolis',
  title: 'Indianapolis',
  shape: 'Circle',
  image: 'indianapolis.png',
  content: `

Jeff Meek, Sustainability Planner for **Indianapolis**, drew on projections in the template to argue for including an adaptation strategy in the city’s Sustainability Plan, and to make decisions that improve the city’s resilience.

<iframe src="https://www.youtube.com/embed/mDNOO_-0EP0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
  grid-gap: 0.8em 3.8em;
  grid-template-areas:
    '.   .      .          .     cleveland'
    '.   .      hrwc       .     evanston'
    'data glisa .          glcan dearborn'
    '.   .      headwaters .     indianapolis'
    '.   .      .          .     annarbor';

  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  max-width: 1000px;
  margin: auto;

  @media (max-width: 500px) {
    grid-gap: 1.2em 1em;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-template-areas:
      '.          data      .           '
      '.          glisa     .           '
      'hrwc       .         headwaters  '
      '.          glcan     .           '
      'evanston   .         indianapolis'
      '.          dearborn  .           '
      'cleveland  .         annarbor    ';
  }
`
const Heading = styled.h3`
  color: #252728;
  text-align: center;
`
const Description = styled.section`
  color: #252728;
  margin-left: 10%;
  margin-right: 10%;
  font: 0.8em 'Fira Sans', sans-serif;
  font-weight: 300;
  text-align: left;
`
const Instructions = styled.section`
  padding-top: 1em;
  margin-left: 10%;
  margin-right: 10%;
  padding-bottom: 2.5em;
  color: #99a8ab;
  font-style: italic;
  text-align: center;
  font: 0.8em 'Fira Sans', sans-serif;
`
