import React, { useState, useEffect, useHistory} from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Sidebardata } from './Sidebardata';
import {IconContext} from 'react-icons';
import { db, auth } from "./firebase";





function Navbar({name}) {
  const[sidebar,setSidebar] = useState(false);

  const showSidebar = () =>setSidebar(!sidebar);

    return (
      <div>
      
              <IconContext.Provider value={{color: '#fff'}}>
        <nav className="navbar" >
          <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
            <ul className = 'nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to ='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </Link>
              </li>
              {Sidebardata.map((item,index) =>{
                return(
                  <li key={index} className={item.cName}>
                      <Link to={item.path}>
                      {item.icon}
                      <span className="Sidebar_Name">{item.title}</span>
                      </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
           
         
            
         <Link to="/">
            <img
              className="user_icon"
              src={"./user_icon1.png"}
              alt=""
              onClick={() => auth.signOut()}
           
            />
            <h6 className="username">{name}</h6>
            </Link> 
        </nav>
        </IconContext.Provider>
        
        </div>

    );
}

export default Navbar
