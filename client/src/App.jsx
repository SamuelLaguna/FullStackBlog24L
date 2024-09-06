import { useEffect, useState } from "react";
import {Container, Button, Row, Col} from 'react-bootstrap'
import NavBar from "./Components/NavBar";
import CarouselHero from "./Components/CarouselHero"
import Dashboard from "./Components/Dashboard"
import BlogPage from "./Components/BlogPage";
import CreateAccount from "./Components/CreateAccount";
import Login from "./Components/Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("UserData"));
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);//Trigger re-render
  }

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
  
  useEffect(() => {
    const storedUser = localStorage.getItem("UserData");
  
  if(storedUser)
  {
    let Userstored = JSON.parse(storedUser);
    setUser(Userstored);
  }
    
  }, [])
  

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode)
  }
  

  return (
    <>
    <BrowserRouter>
      <Container className="p-0" fluid>
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} user={storedUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
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
          <Routes>
            <Route path="/" element={<BlogPage/>}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/CreateAccount" element={<CreateAccount />}/>
            <Route path="/Dashboard" element={<Dashboard isDarkMode={isDarkMode} onLogin={handleLogin} /> }/>
          </Routes>
        </Row>
        {/* <Dashboard isDarkMode={isDarkMode}/> */}
        {/* <h1 className="text-center mb-5">Hello Blog</h1>
        <h1>{isDarkMode ? 'Dark Theme' : 'Light Theme'}</h1>
        {
          isDarkMode ? (
            <Button variant="outline-primary" onClick={toggleDarkMode}>Dark Theme</Button>
          ) : (
            <Button variant="outline-dark" onClick={toggleDarkMode}>Light Theme</Button>
          )
        } */}
       
      </Container>
    </BrowserRouter>
    </>
  )
}

export default App;