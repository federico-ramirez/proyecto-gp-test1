import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import logo from '../../assets/img/Programigos.png'

import { useUserContext } from '../../Contexts/UserContext';

const Login = () => {
    const { login, token } = useUserContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const onChange = (e, save) => {
        save(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();
        const logged = await login(username, password);
        setError(!logged);
        setUsername("");
        setPassword("");

    }
    
    if (token) {
        return <Navigate replace to="/redirect" />
    }

    return (
        <div className="h-screen bg-green-400 flex flex-col space-y-10 justify-center w-full items-center">
            <div className="bg-white shadow-2xl rounded w-auto h-10/12 min-h-1/2 m-4 p-5 content-around">
                <img src={logo} alt="<Programigos />" className="w-48 m-auto" />
                <form className="space-y-5 mt-5" onSubmit={onSubmit}>
                    {error && <p className="w-full rounded p-2 text-center font-semibold text-red-700 font-roboto bg-white border-solid border-2 border-red-700 select-none">
                        ¡Es necesario llenar todos los campos!
                    </p>}
                    <input className="w-full h-12 border border-green-700 rounded px-3 text-green-700"
                        type="text"  
                        placeholder="Usuario" 
                        onChange={(e) => onChange(e, setUsername)}
                        value={username}
                    />
                    <input className="w-full h-12 border border-green-700 rounded text-green-700 px-3" 
                        type="password"  
                        placeholder="Contraseña"
                        onChange={(e) => onChange(e, setPassword)}
                        value={password} 
                    />
                    <button className="text-center w-full bg-green-700 rounded px-3 text-white py-3 font-medium hover:bg-indigo-50 hover:text-green-800" type="submit">Iniciar sesión</button>
                </form>
            </div>
        </div>
    );
}

export default Login;