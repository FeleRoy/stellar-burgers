import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  getErrorSelector,
  getUserSelector,
  loginUser
} from '../../services/slices/userSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getErrorSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
  };

  useEffect(() => {
    if (user.name) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
