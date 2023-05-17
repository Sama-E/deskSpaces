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
import Logo from "/src/assets/images/deskSpaceLogo.png";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "/src/context/authContext";

const NavBar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

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
        <div className="user">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default NavBar;