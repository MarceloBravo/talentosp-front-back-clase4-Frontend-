import { useHttp } from '../../hooks/useHttp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterSchema } from './RegisterSchema';

export const useRegisterPage = () => {
    const { loading, sendRequest } = useHttp();
    const [formData, setFormData] = useState({
        username: '',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
        rol: 'admin'
    });
    const [ formErrors, setFormErrors ] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();


    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (!password) return 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        return score;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }

        const result = RegisterSchema.safeParse(updatedFormData);

        if (!result.success) {
            validaDatos(result);
        } else {
            setFormErrors({});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const result = RegisterSchema.safeParse(formData);

        if (!result.success) {
            validaDatos(result);
            return;
        }

        try{
            const response = await sendRequest("/api/register", "POST", formData);        
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

    const validaDatos = (result) => {
        const errors = result.error.issues.reduce((acc, error) => {
            const key = Array.isArray(error.path) && error.path.length > 0 ? error.path[0] : '_form';
            acc[key] = error.message;
            return acc;
        }, {});
        setFormErrors(errors);
    }

    return {
        loading,
        formData,
        formErrors,
        passwordStrength,
        handleChange,
        handleSubmit
    }
}