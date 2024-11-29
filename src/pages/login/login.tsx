import { FC, useState, FormEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { login } from '../../services/slices/authUser/authUser';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: email, password: password }));
    navigate(from, { replace: true });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
