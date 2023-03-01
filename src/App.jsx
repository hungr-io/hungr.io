import React,  { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from './components/Navbar.jsx';
import { Header } from './components/Header.jsx';
import { Home } from './components/Home.jsx';
import { Find } from './components/Find.jsx';
import { Login } from './components/Login.jsx';
import { Bio } from './components/Bio.jsx';
import { Likes } from './components/Likes.jsx';
import { Signup } from './components/Signup.jsx';

function App() {
  const [selectedPage, setSelectedPage] = useState('');
  const [user, setUser] = useState('Rylan');
  const navigate = useNavigate();


  return (

   <>
    <div className='home'>
      <Routes>
        {/* route to login */}
        <Route path='/' element={ <Login user={user} setUser={setUser} selectedPage={selectedPage}/> } />
        {/* route to navbar/header */}
        <Route path='/home/*' element={ <Home user={user}  /> } />
        <Route path='/signup' element={ <Signup user={user} />} />
      </Routes>
    </div>
   </>

  );
};

export default App;

// {/* <div className="App"> */}
    //   <Routes>
    //     {/* if NOT LOGGED IN, show signup OR login page */}
    //     <Route exact={true} path ="/" element={ <Login/> } />
    //     {/* if LOGGED IN, show NavBar */}
    //     <Route path="/home" render={() => (
    //       <React.Fragment>
    //         <Navbar />
    //           <div>
    //             <Route path="/home/find" element={ <Find /> } />
    //             <Route path="/home/bio" element={ <Bio /> } />
    //             <Route path="/home/likes" element={ <Likes /> } />
    //             {/* <Route exact={true} path="/home" element={ <Find /> } /> */}
                
    //           </div>
    //         </React.Fragment>
    //     )} />
        
    //   </Routes>
    // {/* </div> */}