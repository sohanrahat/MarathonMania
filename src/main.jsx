import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/colors.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Router.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import ThemeProvider from './Context/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)