import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Box } from '@material-ui/core';
import Book from '@material-ui/icons/Book';
import BugReport from '@material-ui/icons/BugReport';
import Question from '@material-ui/icons/QuestionAnswer';
import ChatBubble from '@material-ui/icons/ChatBubble';
import AddComment from '@material-ui/icons/AddComment';
import {
  useTranslate,
  MenuItemLink
} from 'react-admin';
import SubMenu from './SubMenu';


const Menu = ({ onMenuClick, logout, dense = false }) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('xs')
  );
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  useSelector((state) => state.theme); // force rerender on theme change

  const handleToggle = (menu) => {
    setState(state => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box mt={1}>
      {' '}
      <MenuItemLink
        to={`/vaccine`}
        primaryText={"вакцины"}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
        leftIcon={<Book />}
      />
      <MenuItemLink
        to={`/diseas`}
        primaryText={"болезни"}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
        leftIcon={<BugReport />}
      />
      <SubMenu
        handleToggle={() => handleToggle('menuSales')}
        isOpen={state.menuSales}
        sidebarIsOpen={open}
        name="вопросник"
        dense={dense}
        icon={<Question />}
      >
        <MenuItemLink
          to={`/questions`}
          primaryText={"вопросы"}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          leftIcon={<ChatBubble />}
          dense={dense}
        />
        <MenuItemLink
          to={`/answers`}
          primaryText={"ответы"}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          leftIcon={<AddComment />}
          dense={dense}
        />
      </SubMenu>
      {isXSmall && logout}
    </Box>
  );
};

export default Menu;