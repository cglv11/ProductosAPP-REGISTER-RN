import React from 'react'
import { View } from 'react-native'

export const Background = () => {
    return (
        <View 
          style={{
              position: 'absolute',
              backgroundColor: '#F94E5D',
              top: -250,
              width: 1000,
              height: 1200,
              transform: [
                  { rotate: '-70deg'}
              ]
          }}  
        />
    )
}
