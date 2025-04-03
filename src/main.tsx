/* eslint-disable @typescript-eslint/no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SOPBranchTree from './pages/SOPs/index'
// import SOPTree from './pages/SOPs/gosop'
// import Diagram from './pages/SOPs/gosop'
// import SOPJointTree from './pages/SOPs/SOPjoint'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SOPBranchTree />
  </StrictMode>,
)
