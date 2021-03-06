import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

const sections = [
  { text: 'Home', link: true },
  { text: 'Search', active: true },
]

const BreadcrumbSectionPropExample = () => (
  <Breadcrumb sections={sections} />
)

export default BreadcrumbSectionPropExample
