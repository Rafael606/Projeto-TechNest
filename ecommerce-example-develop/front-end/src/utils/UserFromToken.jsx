import { jwtDecode } from 'jwt-decode';

// Função para acessar as propriedades do token
const UserFromToken = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Decodifica o token para obter o payload
    const decodedToken = jwtDecode(token);
    
    // Acessa as propriedades do token (id, nome, email, etc.)
    const { id, nome, email } = decodedToken;
    
    return { id, nome, email };
  }

  return null; // Retorna null se não houver token
};

export default UserFromToken;
