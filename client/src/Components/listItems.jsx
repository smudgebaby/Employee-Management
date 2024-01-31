import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {NavLink} from 'react-router-dom';
import {ListSubheader} from '@mui/material';

export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Employee
    </ListSubheader>
    <ListItemButton component={NavLink} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/visa-status">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Visa Status" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/onboard-application">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Onboard Application" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/personal-info">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Personal Info" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/personal-document">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Personal Document" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      HR
    </ListSubheader>
    <ListItemButton component={NavLink} to="/employee-visa-status">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Employee Visa Status" />
    </ListItemButton>
    <ListItemButton component={NavLink} to="/employee-profiles">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Employee profiles" />
    </ListItemButton>
  </React.Fragment>
);