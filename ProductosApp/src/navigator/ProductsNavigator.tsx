import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { ProductScreen } from '../screens/ProductScreen'
import { ProductsScreen } from '../screens/ProductsScreen'

export type ProductStackParams = {
    ProductsScreen: undefined; // no recibe ningun argumento
    ProductScreen: { id?: string, name?: string }
}

const Stack = createStackNavigator()

export const ProductsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                // headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                },
                headerStyle: { 
                    elevation: 0,
                    shadowColor: 'transparent',
                    
                },
                headerTintColor: '#F94E5D',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen 
                name="ProductsScreen"
                component={ ProductsScreen }
                options={{ title: 'Products '}}
            />

            <Stack.Screen 
                name="ProductScreen"
                component={ ProductScreen }
            />
        </Stack.Navigator>
    )
}
