import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch('/api/logout', {
          method: 'GET',
          credentials: 'same-origin',
        });

        if (response.ok) {
          window.localStorage.removeItem("x_user");
          navigate('/login');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return <div></div>;
}

export default Logout;