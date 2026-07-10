import { Navigate } from 'react-router';

const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    const decoded = JSON.parse(atob(parts[1]));
    return decoded;
  } catch {
    return null;
  }
};

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = decodeToken(token);
  
  if (decoded?.rol !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export { PrivateRoute };