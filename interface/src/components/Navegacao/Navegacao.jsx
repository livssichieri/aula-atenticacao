import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import AuthRequests from '../../fetch/AuthRequests';
import { useState, useEffect } from 'react';

function Navegacao() {

    // Recuperando o nome correto do localStorage usando a chave correta 'username'
    const nomeUsuario = localStorage.getItem('username');  // recupera o nome do usuário do localStorage


    // estado para controlar se o usuario está logado ou não
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    /**
    * Verifica a autenticação do usuário
    */
    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');  // recupera o valor de autenticação do localstorage
        const token = localStorage.getItem('token');  // recupera o token do localstorage
        if (isAuth && token && AuthRequests.checkTokenExpiry()) {  // verifica se isAuth é true, verifica se o token existe e verifica se o token é válido
            setIsAuthenticated(true);  // caso o token seja válido, seta o valor de autenticação para true
        } else {
            setIsAuthenticated(false);  // caso o token seja inválido, seta o valor de autenticação para false
        }
    }, []);


    const nome = {
        fontSize:'20px',
        marginRight:'15px',
        marginTop:'15px'
    }

    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    }

    const estiloNavOptions = {
        color: 'var(--fontColor)',
    }

    const handleLogout = () => {
        AuthRequests.removeToken();  // Remove os dados do localStorage
    };

    return (
        <>
            <Navbar style={estiloNavbar}>
                <Container>
                    {/* a opção Home é renderizada para todos os usuários, independente de estarem autenticados ou não */}
                    <Navbar.Brand href="/" style={estiloNavOptions}>Home</Navbar.Brand>
                    {isAuthenticated ? ( // verifica se o usuário está autenticado (true)
                        // renderiza as opções de navegação para usuário autenticado
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/pessoas" style={estiloNavOptions}>Pessoas</Nav.Link>
                            </Nav>
                            <p style={nome}>Seja bem-vindo, {nomeUsuario}</p>
                            <Button variant='light' onClick={handleLogout}>Sair</Button>
                        </>
                    ) : (
                        // renderiza as opções de navegação para usuário não autenticado
                        <Button href='/login' variant='light'>Login</Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
}

export default Navegacao;