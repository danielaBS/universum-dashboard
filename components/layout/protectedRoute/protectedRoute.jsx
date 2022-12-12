import { useAuth } from '@hooks/useAuth';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, userByToken } = useAuth();
  // if (!user) {
  //   // if (!userByToken) {
  //   typeof window !== 'undefined' && router.push('/login');
  //   // }
  //   // user is not authenticated
  //   // return <Navigate to="/login" />;
  // }
  
  if (userByToken) {
    // console.log('entra true');
    return children;
  } else {
    if (!user) {
      typeof window !== 'undefined' && router.push('/login');
    }
    return children;
  }

};

ProtectedRoute.propTypes = {
  children: PropTypes.any.isRequired,
};

ProtectedRoute.defaultProps = {
  children: <></>,
};
