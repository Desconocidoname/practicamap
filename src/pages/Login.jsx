import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css'

function Login() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.trim().length > 2) {
      // ESTA LÍNEA PERMITE GUARDAR EL NOMBRE DEL ENTRENADOR EN EL NAVEGADOR
      localStorage.setItem('trainer_current', user);
      navigate('/pokedex');
    } else {
      alert('El nombre del entrenador debe tener al menos 3 letras');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sistema de Gestión de Pokemones</h1>
        <p>Identifícate, Entrenador</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Tu nombre (ejemplo: Ash)"
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <button type="submit">Comenzar a capturar pokemones</button>
        </form>
      </div>
    </div>
  );
}

export default Login;