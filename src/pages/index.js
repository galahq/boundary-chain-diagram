import React, { useState } from 'react'

import Node from '../components/Node'

const glisa = {
  id: 'glisa',
  title: 'GLISA',
  shape: 'Square',
  content: `
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
**Great Lakes Integrated Sciences and Assessments** *(GLISA)* climatologists extract climate information from
historical records and global climate models.
`,
}

const glcan = {
  id: 'glcan',
  title: 'GLCAN',
  shape: 'Rectangle',
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
  content: `
*Rebecca Esselman* with **Huron River Watershed Council** *(HRCW)* worked with Great Lakes cities to develop the Vulnerability Assessment template and incorporate GLISA’s climate information.
`,
}

const headwaters = {
  id: 'headwaters',
  title: 'Headwaters Economics',
  shape: 'Rectangle',
  content: `
**Headwaters Economics** extracts socioeconomic data from the census and incorporates it into the template.
`,
}
const evanston = {
  id: 'evanston',
  title: 'City of Evanston',
  shape: 'Circle',
  content: `

Kumar Jensen, Sustainability Coordinator for the **City of Evanston**, started a Climate Action and Resilience Group of community members. The group used the template to identify the city’s vulnerable physical and natural infrastructure.
`,
}

const indianapolis = {
  id: 'indianapolis',
  title: 'City of Indianapolis',
  shape: 'Circle',
  content: `

Jeff Meek, Sustainability Planner for the **City of Indianapolis**, draws on projections in the template to argue for including an adaptation strategy in the city’s Sustainability Plan, and to make decisions that improve the city’s resilience.

`,
}

function IndexPage() {
  const [visibleTooltip, setVisibleTooltip] = useState(null)

  const stuff = [glisa, glcan, hrwc, headwaters, evanston, indianapolis]
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
