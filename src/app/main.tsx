import { StrictMode } from 'react'

import { App } from '@/app/App'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '@/shared/styles/index.scss'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
