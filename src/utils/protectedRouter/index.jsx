import Alert from '@mui/material/Alert';
import { useRouter } from 'src/routes/hooks';
import LoadingButton from '@mui/lab/LoadingButton';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const router = useRouter();
  if (!isAuthenticated) {
    setTimeout(() => {
      router.push('/login');
    }, 1); // You can adjust the delay if needed
  } else {
    return <div>{children}</div>;
    // <Alert variant="outlined" severity="error">
    //   This is an outlined error Alert.
    // </Alert>;
  }
};

export default ProtectedRoute;
