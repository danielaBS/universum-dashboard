import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export const RegisterRoute = ({ children }) => {
  const router = useRouter();
  typeof window !== 'undefined' && router.push('/register');
  return children;
};

RegisterRoute.propTypes = {
  children: PropTypes.any.isRequired,
};

RegisterRoute.defaultProps = {
  children: <></>,
};
