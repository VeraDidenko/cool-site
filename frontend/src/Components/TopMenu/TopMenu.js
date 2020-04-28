import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './TopMenu.css';
//import {withRouter, Link} from 'react-router-dom';

import { useTranslation } from 'react-i18next';


const TopMenu = props => {

   const { t } = useTranslation();

   const changeLanguage = code => e => {
      localStorage.setItem('language', code);
      window.location.reload();
    }

  const { location } = props;
  return (
      <Navbar bg="dark" variant="dark"  fixed="top">
         <Navbar.Brand href="/">CoolSite</Navbar.Brand>
         <Nav className="mr-auto" activeKey={location.pathname}>
            <Nav.Link href="/">{t('main.topmenu.home')}</Nav.Link>
            <Nav.Link href="/books">{t('main.topmenu.books')}</Nav.Link>
            <Nav.Link href="/about">{t('main.topmenu.about')}</Nav.Link>
            <Nav.Link href="/orders">{t('main.topmenu.orders')}</Nav.Link>
         </Nav>
         <ButtonGroup aria-label="Languages">
            <Button variant="warning" onClick={changeLanguage('en')}>{t('main.topmenu.en')}</Button>
            <Button variant="warning" onClick={changeLanguage('ua')}>{t('main.topmenu.ua')}</Button>
         </ButtonGroup>
      </Navbar>
  );
}

export default TopMenu;
