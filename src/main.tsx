import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style/index.css'
import { store } from './state/store.ts'
import { Provider } from 'react-redux'
import { CssVarsProvider } from '@mui/joy'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider defaultMode='dark'>
        <App />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>,
)
