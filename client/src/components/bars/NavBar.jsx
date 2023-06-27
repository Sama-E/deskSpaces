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
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Logo from "/src/assets/images/deskSpaceLogo.png";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "/src/context/authContext";
import axios from "axios";

const NavBar = () => {

  const navigate = useNavigate();
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [openTab, setOpenTab] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8800/api/auths/logout")
    navigate("/login");
  };

  

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <img src={Logo} alt="desk Space" />
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search ..." />
        </div>
      </div>
      <div className="right">
        <div className="menu_icons">
          <ArtTrackOutlinedIcon />
          <AccountTreeOutlinedIcon />
          <ChecklistRtlOutlinedIcon />
          <WorkOutlineOutlinedIcon />
          <CollectionsOutlinedIcon />
          { darkMode ?
            ( <WbSunnyOutlinedIcon onClick={toggle} /> )
            :
            ( <DarkModeOutlinedIcon onClick={toggle} /> )
          }
          <NotificationsNoneOutlinedIcon />
        </div>
        <div className="user" onClick={()=>setOpenTab(!openTab)}>
          <img src= {"/upload/" + currentUser.profilePic} alt="" />
          <span>{currentUser.firstName}</span>
          { openTab &&             
            <div className="options">
              <button type="submit" onClick={handleLogout}>Logout</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar;