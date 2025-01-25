import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

// project imports
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  // Placeholder for admin details (can be dynamically fetched)
  const admin = {
    name: 'Super Admin',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShSABvRXBi7tLMm2xZ9h-CH5SY-lsWlFTtJTklHglWHQUFKi4c0rp3YyNpUTt6FnY8VYU&usqp=CAU', // Replace with the actual path or URL of the admin photo
  };

  return (
    <>
      {/* Logo, Admin Photo, Welcome Message, and Toggle Button */}
      <Box
        sx={{
          width: 300,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.dark.main,
          padding: theme.spacing(1),
          borderRadius: theme.shape.borderRadius,
          gap: theme.spacing(2),
        }}
      >
        {/* Toggle Button */}
        <ButtonBase
          sx={{
            borderRadius: '8px',
            overflow: 'hidden',
            
          }}
          onClick={handleLeftDrawerToggle}
        >
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor:'white',
              color: theme.palette.dark.main,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              boxShadow: theme.shadows[3],
            }}
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>

        {/* Admin Photo */}
        <Avatar
          alt={admin.name}
          src={admin.photo}
          sx={{
            width: 48,
            height: 48,
            border: `2px solid ${theme.palette.background.paper}`,
          }}
        />

        {/* Welcome Message */}
        <Box>
          <Typography
            sx={{
              fontSize: '0.875rem',
              color: theme.palette.background.paper,
              lineHeight: 1.2,
            }}
          >
            Welcome,
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: theme.palette.background.paper,
            }}
          >
            {admin.name}
          </Typography>
        </Box>
      </Box>

      {/* Spacer for Flex Alignment */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Notification & Profile Section */}
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
