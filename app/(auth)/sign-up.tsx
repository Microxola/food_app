import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import {createUser} from "@/library/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name: '', email: "", password: ""});


    const onSubmit = async () => {
        const {name, email, password} = form;
        if (!name || !email || !password) return Alert.alert('Error', 'Please enter a valid email and password');

        setIsSubmitting(true);
        try {
            // call the appwrite sign in function
            await  createUser({
                name,
                email,
                password
            });
            // Alert.alert('Success', 'User is signed in successfully');
            router.replace('/')
        }catch (error:any) {
            Alert.alert('Error', error.message);
        }finally {
            setIsSubmitting(false);
        }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            <CustomInput
                label='Name'
                placeholder='Enter your name'
                value={form.name}
                onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
            />
            <CustomInput
                label='Email'
                placeholder='Enter your email address'
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
                keyboardType='email-address'
            />
            <CustomInput
                label='Email'
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                secureTextEntry={true}
            />
            <CustomButton
                title='Sign Up'
                isLoading={isSubmitting}
                onPress={onSubmit}
            />

            <View className='flex justify-center flex-row gap-2'>
                <Text className='base-regular text-gray-100'>
                   Already have an account?
                </Text>
                <Link href='/sign-in' className='base-bold text-primary'>
                    Sign In
                </Link>
            </View>
        </View>
    )
}
export default SignUp
