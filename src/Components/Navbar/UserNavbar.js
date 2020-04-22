import React, { useState } from 'react';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { membershipState } from '../../Enums';
import logo from '../Navbar/sce_logo.png';

export default function UserNavBar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const unauthedRoutes = [{ title: 'Events', route: '/events' }];

  return (
    <div className='user-nav'>
      <Navbar light expand='md'>
        <NavbarBrand href='/'>
          <div>
            <img
              src={logo}
              alt={'sce logo'}
              style={{
                width:50,
                marginTop: -7,
                marginBottom: -7,
                marginLeft: 10
              }}
            />
          </div>
        </NavbarBrand>
        <NavbarToggler
          onClick={() => setCollapsed(!collapsed)}
          className='mr-2'
        />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className='ml-auto sce-nav' navbar>
            {props.user && props.user.accessLevel >= membershipState.MEMBER && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret
                  style={{color: 'white', fontWeight: 'bold'}}
                >
                  Printing
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/2DPrinting'>2D Printing</DropdownItem>
                  <DropdownItem href='/3DPrintingForm'>
                    3D Printing
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
            {unauthedRoutes.map((link, index) => {
              return (
                <NavItem key={index}>
                  <NavLink
                    style={{color: 'white', fontWeight: 'bold'}}
                    href={link.route}
                  >
                    {link.title}
                  </NavLink>
                </NavItem>
              );
            })}
            {props.authenticated && props.user ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{color: 'white'}}>
                  <svg
                    style={{ width: '30px', height: '30px' }}
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#AAAAAA'
                      d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,
                      12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,
                      19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,
                      8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,
                      22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z'
                    />
                  </svg>
                  {props.user.firstName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/profile'>Profile</DropdownItem>
                  {props.user.accessLevel >= membershipState.OFFICER && (
                    <DropdownItem href='/dashboard'>Admin</DropdownItem>
                  )}
                  <DropdownItem>
                    <div onClick={() => props.handleLogout()}>
                      <svg
                        style={{ width: '18px', height: '18px' }}
                        viewBox='0 0 24 24'
                      >
                        <path d='M17,17.25V14H10V10H17V6.75L22.25,12L17,
                        17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,
                        2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z' />
                      </svg>
                      Logout
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret
                  style={{color: 'white', marginRight: 10, fontWeight: 'bold'}}
                >
                  Join Us!
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/register'>
                    Membership Application
                  </DropdownItem>
                  <DropdownItem href='/login'>
                    Login
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
