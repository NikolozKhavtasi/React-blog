import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './Navbar';

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;