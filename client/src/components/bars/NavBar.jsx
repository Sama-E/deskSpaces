import "/src/assets/css/components/bars/navBar.scss";
import { DarkModeContext } from "/src/context/darkModeContext";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { TextField, InputAdornment, Button } from '@mui/material';


import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "/src/context/authContext";
import axios from "axios";

const NavBar = () => {

  const navigate = useNavigate();
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [openTab, setOpenTab] = useState(false);

  const { logout } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  
  return (
    <div className="navbar">

      {/* LEFT SIDE - LARGE/MEDIUM SCREENS */}
      <div className="left">

        {/* LOGO */}
        <Link to="/">
          <h2>moreDeskSpace</h2>
        </Link>


      </div>

      {/* RIGHT SIDE - LARGE/MEDIUM SCREENS */}
      <div className="right">

        {/* MENU ICONS */}
        <div className="menu_icons">
        {/* SEARCH */}
        <TextField
          variant="standard"
          sx={{ width: 200 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
          {/* { darkMode ?
            ( <WbSunnyOutlinedIcon onClick={toggle} /> )
            :
            ( <DarkModeOutlinedIcon onClick={toggle} /> )
          } */}
          <NotificationsNoneOutlinedIcon />
        </div>
        <div className="user" onClick={()=>setOpenTab(!openTab)}>
          {currentUser.profilePic ? (
          <img src= {"/upload/" + currentUser.profilePic} alt="" />
          ):(
            <img src="/images/noavatar.jpg" alt="" />
          )}
          <span>{currentUser.firstName}</span>
          { openTab &&             
            <table className="options">
              <thead></thead>
              <tbody>
                <tr>
                <Link to="/blog/">
                  <Button size="small">
                    <td>Blog</td>
                    <td><ArtTrackOutlinedIcon /></td>
                  </Button>
                </Link>
                </tr>
                <tr>
                <Button size="small">
                  <td>Projects</td>
                  <td><AccountTreeOutlinedIcon /></td>
                </Button>
                </tr>
                <tr>
                <Button size="small">
                  <td>Recipes</td>
                  <td><ChecklistRtlOutlinedIcon /></td>
                </Button>
                </tr>
                <tr>
                <Button size="small">
                  <td>Job Search</td>
                  <td><WorkOutlineOutlinedIcon /></td>
                </Button>
                </tr>
                <tr>
                <Button size="small">
                  <td>Photos</td>
                  <td><CollectionsOutlinedIcon /></td>
                </Button>
                </tr>
                <tr>
                <Link to={`/profile/${currentUser.id}`}>
                  <Button size="small">
                    <td>Profile</td>
                    <td><AccountBoxOutlinedIcon /></td>
                  </Button>
                </Link>
                </tr>

                <tr>
                <Button 
                  type="submit" 
                  onClick={handleLogout} 
                  size="small"
                >
                    <td>Logout</td>
                </Button>
                </tr>

                </tbody>
              <tfoot></tfoot>
            </table>
          }
        </div>
      </div>
      </div>
      
  )
}

export default NavBar;