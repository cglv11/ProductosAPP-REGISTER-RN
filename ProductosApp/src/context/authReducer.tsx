import { Usuario } from "../interfaces/appInterfaces";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'no-authenticated';
    token: string | null;
    errorMessage: string;
    user: Usuario | null;
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } } //sirve como signIn tambien
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'no-authenticated',
                token: null,
                errorMessage: action.payload,
            }  
        
        case 'removeError': // Sirve para borrar el mensaje del error
            return {
                ...state,
                errorMessage: ''
            }
        
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'no-authenticated',
                token: null,
                user: null
            }
        
        default:
            return state;
    }
}