import React from 'react';
import styles from './navbar.module.scss';
const iconLogo = '/images/logo.png';
const iconProfile = '/icons/profile.svg';
const iconArrow = '/icons/arrow_dropdown_white.svg';
import storybook from '@talentumlab/storybook-design-system';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT } from '@consts/index';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import MenuMobile from '@common/sidebar/menuMobile.jsx';
import { useAuth } from '@hooks/useAuth';
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";

import LogoWhite from "../../../public/images/imagen1.png";
import user1 from "../../../public/images/logo.png";


const Header = ({showMobmenu }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };


  const { width } = useWindowSize();

  const { user, logout, changePassword } = useAuth();

  const {
    showMenu,
    resetPermissions,
    changeTabState,
    cleanFilters,
    cleanCheckedsReport,
    systemColor,
  } = useStore(
    (state) => ({
      showMenu: state.showMenu,
      resetPermissions: state.resetPermissions,
      changeTabState: state.changeTabState,
      cleanFilters: state.cleanFilters,
      cleanCheckedsReport: state.cleanCheckedsReport,
      systemColor: state.systemColor,
    }),
    shallow,
  );

  const itemsMenu = (
    <div className={styles.button__common_icon}>
      {showMenu ? <MenuMobile /> : null}
      {/* <storybook.Image src={iconMenu} /> */}
    </div>
  );

  const itemsLogo = (
    <div className={styles.icon_logo}>
      <storybook.Image src={iconLogo} />
    </div>
  );

  const itemsProfile = (
    <div className={styles.nav__profile}>
      {width <= BREAKPOINT ? null : (
        <div>
          <Image src={iconProfile} alt="profile" width="40px" height="40px" />
        </div>
      )}
      {width <= BREAKPOINT ? (
        <div>
          <storybook.DropDownV2
            minWidth="4rem"
            srcDown={iconArrow}
            width="4rem"
            height="4rem"
            backgroundColor="transparent"
            initialValue={{ value: { id: 0, name: user && user.username }, id: '' }}
            // className={styles.chartjs_options}
            valueSelected={() => {
              cleanFilters();
              cleanCheckedsReport();
              logout();
              resetPermissions();
              changeTabState({ id: 0, text: 'Dashboard' });
            }}
            options={[
              { id:0, name: 'Cambiar contraseña'},
              { id:1, name: 'Actualizar datos'},
              { id: 2, name: 'Cerrar sesión' }
            ]}
            // keepOpen
            colorOptions="#000000"
            textColor="#ffffff"
            dropdownGap={1}
          />
        </div>        
      ) : (
        <div>
          <storybook.DropDownV2
            minWidth="6.8rem"
            srcDown={iconArrow}        
            backgroundColor="transparent"
            initialValue={{ value: { id: 0, name: user && user.username }, id: '' }}
            // className={styles.chartjs_options}
            valueSelected={() => {
              cleanFilters();
              cleanCheckedsReport();
              logout();
              resetPermissions();
              changeTabState({ id: 0, text: 'Dashboard' });
            }}
            options={[
              { id:0, name: 'Cambiar contraseña'},
              { id:1, name: 'Actualizar datos'},
              { id: 2, name: 'Cerrar sesión' }
            ]}            
            colorOptions="#000000"
            textColor="#ffffff"
            dropdownGap={1}
          />
        </div>
      )}
    </div>
  );

  return (
    <Navbar color="dark" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <Image src={LogoWhite} alt="logo" />
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar style={{justifyContent:'start'}}>
        <Image
        src={LogoWhite}
        className="rounded-circle"
        width="190"
        height="60"
        />                    
        </Nav>
        <div style={{width:'4.5rem', justifyContent:'center'}}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{boxShadow: 'none !important'}}>
          <DropdownToggle color="light">
            <div style={{ lineHeight: "0px" }}>
              <Image
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Información</DropdownItem>
            <DropdownItem>Mi cuenta</DropdownItem>
            <DropdownItem>Editar perfil</DropdownItem>
            <DropdownItem divider />                        
            <DropdownItem onClick={()=>logout()}>Cerrar Sesión</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        </div>
        
      </Collapse>
    </Navbar>
    /*
    <div className={styles.container__nav}>      
      <storybook.Navbar
        width="100%"
        height="4rem"
        itemsLeft={width <= BREAKPOINT ? itemsMenu : itemsLogo}
        itemsCenter={width <= BREAKPOINT ? itemsLogo : ''}
        itemsRight={itemsProfile}
        bgColor={systemColor}
      />
    </div>
    */
  );
};

export default Header;
