import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export const useLoginPage = () => {
  const [ formLogin, setFormLogin ] = useState({email: '', password: '', rememberMe: false});
  const [ errorsLogin, setErrorsLogin ] = useState({email: '', password: ''});
  const { login, isLoading, error, userSession } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userSession.isLoggedIn) {
      navigate('/');
    }
  }, [userSession.isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    if(e.target.value.trim().length === 0){
      setErrorsLogin({...errorsLogin, [e.target.name]: 'Este campo es requerido'});
    }else{
      setErrorsLogin({...errorsLogin, [e.target.name]: ''});
    }
    setFormLogin({...formLogin, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await login(formLogin)
        if(error){
          throw new Error(error);
        }
        navigate('/');      
    }catch(error){
      alert(error.message);
      console.log(error);
    }
  };

  const handleRememberMeClick = () => {
    setFormLogin({...formLogin, rememberMe: !formLogin.rememberMe});
  }
  

  return {
      formLogin,
      errorsLogin,
      isLoading,
      error,
      userSession,
      handleInputChange,
      handleSubmit,
      handleRememberMeClick
  }
}