import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginData, LoginResponse, Usuario, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

import cafeApi from '../api/cafeApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'no-authenticated';
    signUp: ( registerData: RegisterData) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer( authReducer, authInitialState)

    useEffect(() => {
        
        checkToken();

    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')

        // No tken, no autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated'})

        // Hay token
        const resp = await cafeApi.get('/auth');

        const res = resp as any; // siendo cupido de la relación tóxica entre axios y typescript

        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated'})
        }

        await AsyncStorage.setItem('token', res.data.token )

        dispatch({ 
            type: 'signUp',
            payload: {
                token: res.data.token,
                user: res.data.usuario
            }
        })
    }


    const signIn = async ({ correo, password }: LoginData ) => {
        
        try {
            
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password })
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })

            await AsyncStorage.setItem('token', data.token )

        } catch (error) {
                const err = error as any;
                console.log(err.response.data.msg)
                dispatch({
                    type: 'addError',
                    payload: err.response.data.msg || 'Información incorrecta'
                })
            }

    };


    const signUp = async ( { nombre, correo, password }: RegisterData ) => {

        try {
            
            const { data } = await cafeApi.post<LoginResponse>('/usuarios', { correo, password, nombre })
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })

            await AsyncStorage.setItem('token', data.token )

        } catch (error) {
                const err = error as any;
                console.log(err.response.data)
                dispatch({
                    type: 'addError',
                    payload: err.response.data.errors[0].msg || '¡Ya estás registrado!'
                })
            }


    };

    const logOut = async () => {

       await AsyncStorage.removeItem('token')
       dispatch({ type: 'logout' })

    };

    const removeError = () => {
        dispatch({ type: 'removeError' })
    };

    return (
        <AuthContext.Provider value={{
            ...state, //props authInitialState 
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )

}