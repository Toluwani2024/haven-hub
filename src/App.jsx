import React from 'react'
import Navbar from './component/Navbar.jsx'
import Hero from './component/Hero'
import Section1 from './Section1/Section1'
import  Section2 from './Section2/Section2'
import Section3 from './Section3/Section3'
import Footer from './component/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Section1/>
      <Section2/>
      <Section3/>
      <Footer/>
    </div>
  )
}

export default App