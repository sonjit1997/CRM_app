import React,{useState} from 'react'
import { Modal} from "react-bootstrap";
import '../style/navbar.css'
import { CSidebar,CSidebarNav,CNavItem} from '@coreui/react'

const Sidebar = () => {
  const [userModal, setUserModal] = useState(false);

  const closeUserModal = () => {
    setUserModal(false);
  };


  const logoutFn=()=>{
    localStorage.clear()
    window.location.href = '/';
  }

  const userDetail=()=>{
   setUserModal(true);
  }
  return (
    <>
    <CSidebar unfoldable colorScheme className='vh-100' id='nav'>
  <CSidebarNav>
  <CNavItem href="#" className='text-center' id='logo'>
  <i className="bi bi-wifi display-6  me-2"></i>
   <h3 className ='my-1'>TETHERX</h3>
   
    </CNavItem>
    <CNavItem href="#" className='item' onClick={userDetail}>
     <i className='bi bi-person-circle'></i>  <h6 className='mx-5 my-1'>User Profile</h6>
    </CNavItem>
    <CNavItem href="#" className='text-center' onClick={logoutFn}>
     <i className='bi bi-box-arrow-in-left '></i> <h6 className='mx-5 my-1'>Log Out</h6>
    </CNavItem>
  </CSidebarNav>
</CSidebar>

{userModal ? (
            <Modal
              show={userModal}
              onHide={closeUserModal}
              backdrop="static"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                  <div className="p-1">
                      <div className=" box text-success" >
                        Name :  {localStorage.getItem("name")}
                      </div>
                      <div className=" box text-success mt-2" >
                        Email :  {localStorage.getItem("email")}
                      </div>
                      <div className="box text-success   mt-2 ">
                        USER ID : {localStorage.getItem("userId")}
                      </div>
                      <div className="box text-success   mt-2 ">
                        STATUS : {localStorage.getItem("userStatus")}
                      </div>
                   
                  </div>
              </Modal.Body>
            </Modal>
          ) : (
            ""
          )}
</>
  )
}

export default Sidebar