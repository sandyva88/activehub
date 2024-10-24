import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import countryList from 'react-select-country-list';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';


const Register = () => {

    const tokenerUrl = "http://localhost:9000";

    const [formData, setFormData] = useState({
        password: '',
        firstname: '',
        lastname: '',
        country: '',
        email: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${tokenerUrl}/auth/register`, formData);
            if (response.status === 200) {
                setSuccess('Registro exitoso!');
                setError('');
                localStorage.setItem('jwtToken', response.data.token)
                navigate("/")
            }
        } catch (error) {
            setError('Ocurrió un error al registrar.');
        }
    };

    const [value, setValue] = useState(null);
    const options = countryList().getData();

    const changeHandler = value => {
        setValue(value);
    };

    const navigate = useNavigate();
    return (
        <>
            <div className='register'>
                <div className='register-form'>
                    <Link to='/'>Active Hub</Link>
                    <h4>Bienvenido</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} required />
                            <label for="firstname">Nombre</label>
                        </div>
                        <div className='form-group'>
                            <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange}  required />
                            <label for="lastname">Apellido</label>
                        </div>
                        <div className='form-group'>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange}  required />
                            <label for="email">Correo electrónico</label>
                        </div>
                        <div className='form-group'>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange}  required />
                            <label for="password">Contraseña</label>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="country">Nacionalidad:</label>
                            <Select
                                id="country"
                                options={options}
                                value={value}
                                onChange={changeHandler}
                            />
                        </div>
                        <button type='submit'>Registrarse</button>
                    </form>
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success>{success}}
                </div>
                <div className='register-banner'>

                </div>
            </div>
        </>
    )
}

export default Register;