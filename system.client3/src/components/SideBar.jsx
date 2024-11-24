import "../styles/SideBarStyle.css"
import React, { useState } from "react";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { useNavigate } from 'react-router-dom';

function SideBar({ name }) {
    const navigate = useNavigate();

    const pageEnum = {
        Orders: 1,
        Reservations: 2,
        Catalog: 3,
        Taxes: 4
    }

  return (
      <div className="sidenav">
          <div className={pageEnum[name] == 1 ? "active" : ""} onClick={() => { navigate('/'); }}>
              <StarBorderRoundedIcon />
              <p>Orders</p>
          </div>
          <div className={pageEnum[name] == 2 ? "active" : ""} onClick={() => { navigate('/Reservations');}} >
              <StarBorderRoundedIcon />
              <p>Reservations</p>
          </div>
          <div className={pageEnum[name] == 3 ? "active" : ""} onClick={() => { navigate('/Catalog'); }} >
              <StarBorderRoundedIcon />
              <p>Catalog</p>
          </div>
          <div className={pageEnum[name] == 4 ? "active" : ""} onClick={() => { navigate('/Taxes') }}>
              <StarBorderRoundedIcon />
              <p>Taxes</p>
          </div>
      </div>
  );
}

export default SideBar;