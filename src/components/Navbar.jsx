import React, { useState, useEffect } from 'react';
import { Nav, NavItem} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { Find } from './Find.jsx';
import { Likes } from './Likes.jsx';
import { Bio } from './Bio.jsx';
let likesIcon, bioIcon, findIcon = '';

export const Navbar = ({setGreeting, user, btnColor}) => {
  // const [ currentPage, setCurrentPage ] = useState('Find');

  // useEffect(() => {
  //   setGreeting(`${user}'s Favorites`)
  // }, [user]);

  const tabs = [{
    route: "/home/likes",
    icon: likesIcon,
    label: "Likes"
  },{
    route: "/home/find",
    icon: findIcon,
    label: "Find"

  },{
    route: "/home/bio",
    icon: bioIcon,
    label: "Profile"
  }]

  return (
    // <div className='navContainer'>
    //   <nav className='nav'>
    //     <Link to='/home/likes'>
    //       Likes
    //     </Link>
    //     |
    //     <Link to='/home/find'>
    //       Find
    //     </Link>
    //     |
    //     <Link to='/home/bio'>
    //       Bio
    //     </Link>
    //   </nav>
    // </div>
    <nav style={{border: 'none', boxShadow: '0px 5px 20px'}}className="navbar fixed-bottom navbar-light" role="navigation">
        <Nav className="w-100">
          <div id='nav' className=" d-flex flex-row justify-content-between w-100">
            {
              tabs.map((tab, index) =>(
                <NavItem key={`tab-${index}`}>
                  <NavLink to={tab.route} className="nav-link" activeclassname="active">
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      {/* <FontAwesomeIcon size="lg" icon={tab.icon}/> */}
                      <div className='navText' style={{backgroundColor: {btnColor}}}>{tab.label}</div>
                    </div>
                  </NavLink>
                  {/* <div>
                  {(tabs[index + 2 === 'undefined']) ? '' : '|'}
                </div> */}
                </NavItem>
              ))
            }
          </div>
        </Nav>
      </nav>
  );
}