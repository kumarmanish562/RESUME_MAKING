import React, {  useContext } from 'react'
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';

const DashboardLayout = ({activeMenu, children}) => {

  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar 
     activeMenu={activeMenu} />
      { user && (
        <div className=' container  mx-auto pt-4 pb-4 '>{children}</div>
      )}
    </div>
  )
}

export default DashboardLayout