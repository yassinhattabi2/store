import React, { useState, useRef, useEffect, Suspense, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';

// Material UI
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';

// Project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// Icons
import { IconLogout, IconSettings, IconUser, IconShoppingCart } from '@tabler/icons-react';
import { logout } from '../../../../store/Slices/authSlice';

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const anchorRef = useRef(null);
  const handleNavigation = (path) => {
    startTransition(() => {
      navigate(path);
    });
  };
  // Extract token and user information
  const token = localStorage.getItem('token');
  let userImage = '';
  let userRole = '';

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the payload
      userImage = decodedToken.profileImage || 'assets/images/users/user-round.svg';
      userRole = decodedToken.role || '';
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const handleLogout = () => {
    startTransition(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
      navigate('/login');
    });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    startTransition(() => {
      setOpen((prevOpen) => !prevOpen);
    });
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `black !important`,
            color: 'white',
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={userImage}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <List>
                    

                    {/* Orders - Only for clients */}
                    {userRole === 'client' && (
                    < > <ListItemButton onClick={() => handleNavigation("/orders")}>
                        <ListItemIcon>
                          <IconShoppingCart stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">My Orders</Typography>} />
                      </ListItemButton>
                      <ListItemButton onClick={() => handleNavigation("/profile")}>
                      <ListItemIcon>
                        <IconUser stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">Profile Settings</Typography>} />
                    </ListItemButton></>
                      
                    )
                    }
                   
                    

                    {/* Logout */}
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <IconLogout stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Suspense>
  );
};

export default ProfileSection;
