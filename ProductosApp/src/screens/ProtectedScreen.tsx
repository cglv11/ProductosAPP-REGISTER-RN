import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

    const { user, token, logOut } = useContext( AuthContext )

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Protected Screen</Text>

            <Button 
                title="logout"
                color="#F94E5D"
                onPress={ logOut }
            />

            <Text style={ styles.subtitle }>
                { JSON.stringify( user, null, 5 )}
            </Text>

            <Text style={ styles.subtitle }>
                { token }
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: 'black'
    },
    subtitle: {
        fontSize: 15,
        marginTop: 35,
        marginBottom: 20,
        marginHorizontal: 40,
        color: 'black'
    }
});