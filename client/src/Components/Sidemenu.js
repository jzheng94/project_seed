import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Container } from 'semantic-ui-react'
import Seedling from "../Components/Seedling"
import { Link } from 'react-router-dom';

const Side= () => (

  

  <div className="sideMenu">

  <Link to="/main"><div className="customItem">
   <i className="users icon"></i> &nbsp;
    Featured Projects 
   </div></Link>
   <Link to="#"><div className="customItem">
   <i className="child icon"></i> &nbsp;
   Join A Team 
   </div></Link>
   <Link to="/ideas"><div className="customItem">
   <i className="lightbulb outline icon"></i> &nbsp;
    Post A Project Idea
   </div></Link>
   
  </div>
  
    
)

export default Side
