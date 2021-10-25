import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import { ProductStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductStackParams, 'ProductsScreen'>{};

export const ProductsScreen = ({ navigation }: Props) => {

    const [ isRefreshing, setIsRefreshing ] = useState(false)

    const { products, loadProducts } = useContext( ProductsContext );

    useEffect(() => {
        
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    activeOpacity={ 0.8 }
                    style={{ marginRight: 15 }}
                    onPress={ () => navigation.navigate('ProductScreen', {})}
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
            )
        })

    }, [])

    const loadProductsFromBracked = async () => {
        setIsRefreshing(true);
        await loadProducts()
        setIsRefreshing(false)
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10, marginTop: 25 }}>
            
            <FlatList 
                data={ products }
                keyExtractor={ (p) => p._id }
                 
                renderItem={ ({item}) => (
                    <TouchableOpacity
                        activeOpacity={ 0.6 }
                        onPress={
                            () => navigation.navigate('ProductScreen', {
                                id: item._id,
                                name: item.nombre
                            })
                        }
                    >
                        <Text style={ styles.productName }>{ item.nombre }</Text>
                    </TouchableOpacity>
                )}

                ItemSeparatorComponent={ () => (
                    <View style={ styles.itemSeparator }></View>
                )}

                refreshControl={
                    <RefreshControl 
                        refreshing={ isRefreshing }
                        onRefresh={ loadProductsFromBracked }
                    />
                }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    productName: {
        fontSize: 18,
        color: 'black'
    },
    itemSeparator: {
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    }
});