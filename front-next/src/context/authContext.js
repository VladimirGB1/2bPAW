

import { createContext, useState } from "react";
import { requisicao } from '../services/requisicao';
import { setCookie } from 'nookies';
import { useRouter } from "next/navigation";

export const AuthContext = createContext();
const hora = 60 * 60 * 1;

export default function AuthProvider( { children } ){
    const [authError, setAuthErro] = useState(null);

    const router = useRouter();

    async function login({usuario, senha}) {
        
        let {'x-access-token': token} = await requisicao('http://localhost:5000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({usuario, senha}),
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        }, true);

        
        if(!token) setAuthErro('Usuário ou Senha Inválidos');
        else{
            setCookie(null, 'auth.token', token, {
                maxAge: hora,
            });
            
            router.push('/produtos');
        }
    }
    
    return (
        <AuthContext.Provider value={{login, authError}} >
            {children}
        </AuthContext.Provider>
    );
};