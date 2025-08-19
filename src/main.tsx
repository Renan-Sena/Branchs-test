import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SOPBranchTree from './pages/SOPs/index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SOPBranchTree />
  </StrictMode>,
)
