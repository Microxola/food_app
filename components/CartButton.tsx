import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {images} from "@/constants";

const CartButton = () => {

    const totalItems = 0;

    return (
        <TouchableOpacity className='cart-btn' onPress={() => {}}>
            <Image resizeMode='contain' className='size-5' source={images.bag} />

            {
                totalItems > 0 && (
                    <View className='cart-badge'>
                        <Text className='small-bold text-white'>{totalItems}</Text>
                    </View>
                )
            }

        </TouchableOpacity>
    )
}
export default CartButton
