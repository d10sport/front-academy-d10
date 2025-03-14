import AppProvider from '@context/app/context-provider.jsx'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom"
import App from './app/App.jsx'
import './index.css'

// fonts
import "./fonts/Robson-Bold.otf";
import "./fonts/Robson-Extrabold.otf";
import "./fonts/Robson-Extralight.otf";
import "./fonts/Robson-Light.otf";
import "./fonts/Robson-Medium.otf";
import "./fonts/Robson-Regular.otf";
import "./fonts/Robson-Semibold.otf";
import "./fonts/Robson-Thin.otf";

createRoot(document.getElementById('root')).render(
  <HashRouter >
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>
)
