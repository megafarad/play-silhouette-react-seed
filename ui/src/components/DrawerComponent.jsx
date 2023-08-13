import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

function DrawerComponent( { user } ) {
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {user ? <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/">{user.fullName}</Link>
            </ListItemText>
          </ListItem> : null}
          {user && user.loginInfo.providerID === 'credentials' ? <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/password/change">{ t('change.password')}</Link>
            </ListItemText>
          </ListItem> : null}
          { user ? <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/signOut">{ t('sign.out') }</Link>
            </ListItemText>
          </ListItem> : null}
          { !user ? <>
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/signIn">{ t('sign.in') }</Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/signUp">{ t('sign.up') }</Link>
              </ListItemText>
            </ListItem>
          </> : null}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
