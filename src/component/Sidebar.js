import React from 'react'
import { CSidebar,CSidebarNav,CNavItem} from '@coreui/react'

const Sidebar = () => {
  const logoutFn=()=>{
    localStorage.clear()
    window.location.href = '/';
  }
  return (
    <>
    <CSidebar unfoldable colorScheme className=' bg-success vh-100'>
  <CSidebarNav>
  <CNavItem href="#" className='bg-danger text-center'>
  <i className="bi bi-wifi display-6  me-2"></i>
   <h3 className ='my-1'>TETHERX</h3>
    </CNavItem>
    <CNavItem href="#" className='text-center'>
     <i className='bi bi-person-circle '></i> <h6 className='mx-5 my-1'>User Profile</h6>
    </CNavItem>
    <CNavItem href="#" className='text-center' onClick={logoutFn}>
     <i className='bi bi-box-arrow-in-left '></i> <h6 className='mx-5 my-1'>Log Out</h6>
    </CNavItem>
  </CSidebarNav>
</CSidebar>
</>
  )
}

export default Sidebar