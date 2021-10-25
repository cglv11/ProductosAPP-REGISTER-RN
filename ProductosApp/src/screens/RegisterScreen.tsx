import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';

import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation}: Props) => {

    const { signUp } = useContext( AuthContext )

    const { email, password, name, onChange} = useForm({
        name: '',
        email: '',
        password: ''
    })

    const onRegiser = () => {
        console.log({email, password, name});
        Keyboard.dismiss() 
        signUp({
            nombre: name,
            correo: email,
            password: password,
        })
    }

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#D24A7A' }}
                behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            >

                <View style={loginStyles.formContainer}>

                    {/* Keyboard avoid view */}
                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Registro</Text>

                    <Text style={ loginStyles.label }>Nombre:</Text>
                    <TextInput 
                        placeholder="Ingrese su nombre:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        // selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'name') }
                        value={ name }
                        onSubmitEditing={ onRegiser }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput 
                        placeholder="Ingrese su email:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        // selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'email') }
                        value={ email }
                        onSubmitEditing={ onRegiser }

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Contraseña:</Text>
                    <TextInput 
                        placeholder="Contraseña"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry={true}
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        // selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'password') }
                        value={ password }
                        onSubmitEditing={ onRegiser }

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />

                    {/* Boton crear cuenta */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.6 }
                            style={ loginStyles.button }
                            onPress={ onRegiser }
                        >
                            <Text style={ loginStyles.buttonText }>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Regresar */}
                        <TouchableOpacity
                            activeOpacity={ 0.6 }
                            onPress={ () => navigation.navigate('LoginScreen') }
                            style={ loginStyles.buttonReturn }
                        >
                            <Text style={ loginStyles.buttonText }>Login</Text>
                        </TouchableOpacity>          
                </View>  

            </KeyboardAvoidingView>

        </>
    )
}
