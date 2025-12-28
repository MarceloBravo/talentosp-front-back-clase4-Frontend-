import { useHttp } from '../../hooks/useHttp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegisterPage = () => {
    const { loading, request } = useHttp();
    const [formData, setFormData] = useState({
        username: '',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
        rol: ''
    });
    const [ formErrors, setFormErrors ] = useState([]);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const value = e.target.value;
        
        if(e.target.value.trim().length === 0){
            setFormErrors({...formErrors, [e.target.name]: 'El campo es requerido'});
        }else if(e.target.name === 'password') {
            if(e.target.value === formData.confirmPassword && formData.confirmPassword.trim().length > 0){
                setFormErrors({...formErrors, password: '', confirmPassword: ''})
            }else{
                setFormErrors({...formErrors, [e.target.name]: value !== formData.confirmPassword ?'La contraseña y la confirmación de contraseña no son iguales' : ''})       
            }
            
        }else if(e.target.name === 'confirmPassword'){
            if(e.target.value === formData.password && formData.password.trim().length > 0){
                setFormErrors({...formErrors, password: '', confirmPassword: ''})
            }else{
                setFormErrors({...formErrors, [e.target.name]: value !== formData.password ? 'La contraseña y la confirmación de contraseña no son iguales' : ''})
            }
        }else{
            setFormErrors({...formErrors, [e.target.name]: ''});
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validaDatos()){
            return;
        }
        try{
            const response = await request("/api/register", "POST", formData);        
            setFormData({
                username: '',
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                confirmPassword: '',
                rol: ''
            });
            alert(response.mensaje);
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        }catch(error){
            alert(error.message);    
        }
    };

    const validaDatos = () => {
        if(
            formData.username.trim().length === 0 || 
            formData.nombre.trim().length === 0 ||
            formData.apellido.trim().length === 0 ||
            formData.email.trim().length === 0 ||
            formData.password.trim().length === 0 ||
            formData.confirmPassword.trim().length === 0 || 
            formData.password !== formData.confirmPassword
        ){
            return false;
        }else{
            return true;
        }
    }

  return {
    loading,
    formData,
    formErrors,
    handleChange,
    handleSubmit
  }
}