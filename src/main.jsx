import AppProvider from '@context/app/context-provider.jsx'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom"
import App from './app/App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <HashRouter >
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>
)
