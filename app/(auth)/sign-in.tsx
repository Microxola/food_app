import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import CartButton from "@/components/CartButton";
import {Link, router} from "expo-router";
import {signIn} from "@/library/appwrite";
import * as Sentry from "@sentry/react";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({email: "", password: ""});


    const onSubmit = async () => {
        const {email, password} = form;
        if (!email || !password) return Alert.alert('Error', 'Please enter a valid email and password');

        setIsSubmitting(true);
        try {
            // call the appwrite sign in function
            await signIn({email, password});
            // Alert.alert('Success', 'User is signed in successfully');
            router.replace('/')
        }catch (error:any) {
            Alert.alert('Error', error.message);
            Sentry.captureEvent(error);
        }finally {
            setIsSubmitting(false);
        }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            <CustomInput
                label='Email'
                placeholder='Enter your email address'
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
                keyboardType='email-address'
            />
            <CustomInput
                label='Password'
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                secureTextEntry={true}
            />
            <CustomButton
                title='Sign in'
                isLoading={isSubmitting}
                onPress={onSubmit}
            />

            <View className='flex justify-center flex-row gap-2'>
                <Text className='base-regular text-gray-100'>
                    Don't have an account yet
                </Text>
                <Link href='/sign-up' className='base-bold text-primary'>
                    Sign Up
                </Link>
            </View>
        </View>
    )
}
export default SignIn
