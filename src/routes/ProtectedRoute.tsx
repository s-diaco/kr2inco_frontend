import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  // TODO: delete
  console.log("account:", auth)
  if (auth.account) {
    /* TODO: use only "props" or "outlet"
    if (props.path === '/auth/signin') {
      return <Navigate to={'/'} />;
    }
    return <Route {...props} />;
    */
    return <Outlet />;
  } else if (!auth.account) {
    return <Navigate to={'/auth/signin'} state={{ from: location }} replace />;
  } else {
    return <div>Not found</div>;
  }
};

export default ProtectedRoute;
