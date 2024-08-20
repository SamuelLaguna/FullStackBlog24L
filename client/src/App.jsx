import { useEffect, useState } from "react";
import {Container, Button, Row, Col} from 'react-bootstrap'
import NavBar from "./components/NavBar";
import CarouselHero from "./components/CarouselHero"
import Dashboard from "./components/Dashboard";

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('Theme')
    if(currentTheme)
    {
      setIsDarkMode(currentTheme === 'dark')
    }
  
    
  }, [])

  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    
  }, [isDarkMode])
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode)
  }
  

  return (
    <>
    <Container className="p-0" fluid>


  
    <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
  
    </Container>
    <Container fluid 
      className={` ${
        isDarkMode ? 'bg-dark text-light' : 'bg-light '
      }`}
      style={{minHeight:"100vh", padding: '0px'}}
    
    >
      <CarouselHero  isDarkMode={isDarkMode}/>
      <Row className="text-center">
        <Col>
        <h1>Our Blog</h1>
        </Col>
      </Row>
      <Dashboard isDarkMode={isDarkMode}/>
      {/* <h1 className="text-center mb-5">Hello Blog</h1>
      <h1>{isDarkMode ? 'Dark Theme' : 'Light Theme'}</h1>

      {
        isDarkMode ? (
          <Button variant="outline-primary" onClick={toggleDarkMode}>Dark Theme</Button>
        ) : (
          <Button variant="outline-dark" onClick={toggleDarkMode}>Light Theme</Button>
        )
      } */}
      <BlogPage />
    </Container>
    </>
  )
}

export default App;