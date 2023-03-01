import React, { useState, useEffect } from 'react';
import { Nav, NavItem} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { Find } from './Find.jsx';
import { Likes } from './Likes.jsx';
import { Bio } from './Bio.jsx';
import likesIcon from '/src/assets/heart.png';
import bioIcon from '/src/assets/me.jpeg';
import findIcon from '/src/assets/search.png';

export const Navbar = ({setGreeting, user, btnColor, fetchData, img}) => {
  // const [ currentPage, setCurrentPage ] = useState('Find');

  const tabs = [{
    route: "/home/likes",
    icon: likesIcon,
    label: "Likes",
    style: {},
    onClick: () => 'clicked'
  },{
    route: "/home/find",
    icon: findIcon,
    label: "Find",
    style: {},
    onClick: fetchData
  },{
    route: "/home/bio",
    icon: img,
    label: "Profile",
    style: {  
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '50%'},
    onClick: () => 'clicked'
  }]

  return (

    <nav style={{border: 'none', 
    boxShadow: '0px 5px 20px'
    }}className="navbar fixed-bottom navbar-light" role="navigation">
        <Nav className="w-100">
          <div id='nav' className=" d-flex flex-row justify-content-between w-100">
            {
              tabs.map((tab, index) =>(
                <NavItem key={`tab-${index}`}>
                  <NavLink to={tab.route} className="nav-link" activeclassname="active">
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      {/* <FontAwesomeIcon size="lg" icon={tab.icon}/> */}
                      <div className='navText' 
                      onClick={tab?.onClick}
                      style={{backgroundColor: {btnColor}}}>
                        <img style={tab.style} src={tab.icon} alt="" />
                        </div>
                    </div>
                  </NavLink>
                </NavItem>
              ))
            }
          </div>
        </Nav>
      </nav>
  );
}