import { Link } from 'react-router-dom';
import { SpinnerComponent } from '../../components/spinner/SpinnerComponent';
import { useRegisterPage } from './useRegisterPage';
import styles from './RegisterPage.module.css';

export const RegisterPage = () => {
    const {
        loading,
        formData,
        formErrors,
        handleChange,
        handleSubmit
    } = useRegisterPage();
    

    return (
        <>
            {loading && <div className={styles.loading}><SpinnerComponent/></div>}
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Registro</h2>
                    <div className={styles.inputGroup}>
                    <label htmlFor="username">Nombre de usuario</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                maxLength="20"
                                required
                            />
                            {formErrors.username && <label className="label-error">{formErrors.username}</label>}
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                    <label htmlFor="nombre">Nombre</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                maxLength="20"
                                required
                            />
                            {formErrors.nombre && <label htmlFor='nombre' className="label-error">{formErrors.nombre}</label>}
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                    <label htmlFor="apellido">Apellido</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                maxLength="20"
                                required
                            />
                            {formErrors.apellido && <label htmlFor="apellido" className="label-error">{formErrors.apellido}</label>}
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            maxLength="255"
                            required
                        />
                        {formErrors.email && <label htmlFor="email" className="label-error">{formErrors.email}</label>}
                    </div>
                    </div>

                    {/* este campo se agregó sólo para efectos de funcionalidad del ejemplo, 
                    en una aplicación real no se permite la selección del rol al usuario, 
                    en su lugar se le otorga un rol por defecto */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="rol">Rol <small>(Campo no disponible en una app real)</small> </label>
                        <div className={styles.fieldContainer}>
                            <select  
                                className={styles.inputField} 
                                id='rol' 
                                name='rol' 
                                required
                                value={formData.rol}
                                onChange={e => handleChange(e)}
                                >
                                <option value="" disabled>Seleccione un rol</option>
                                <option value="admin">admin</option>
                                <option value="user">administrativo</option>
                                <option value="guest">invitado</option>
                            </select>
                            {formErrors.rol && <span className='label-error'>{formErrors.rol}</span>}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-container">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                maxLength="255"
                                required
                            />
                            {formErrors.password && <label htmlFor="password" className="label-error">{formErrors.password}</label>}
                        </div>
                    </div>

                     
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirmación de Contraseña</label>
                        <div className="input-container">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                maxLength="255"
                                required
                            />
                            {formErrors.confirmPassword && <label htmlFor="password" className="label-error">{formErrors.confirmPassword}</label>}
                        </div>
                    </div>
                    <button type="submit" className={styles.button}>Registrarse</button>
                    <p className={styles.linkText}>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                    </p>
                </form>
            </div>
        </>
    );
};