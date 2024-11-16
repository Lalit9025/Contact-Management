import { useState } from 'react'
import './App.css'
import ContactForm from './Pages/ContactForm'
import ContactTable from './Pages/ContactTable'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster/>
      <ContactTable/>
    </>
  )
}

export default App
