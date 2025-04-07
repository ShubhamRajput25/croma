import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { serverurl } from '../services/fetchNodeServices';
import { primaryColor } from '../constants';
import TextBox from '../components/ui/TextBox';
import MyButton from '../components/ui/MyButton';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get('window')
const LoginScreen = () => {
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation()

    const generateOTP = () => {
        return Math.floor( 1000 + Math.random() * 9000).toString()
    }

    const handleLogin = () => {
        
        if (mobile.length !== 10 || isNaN(mobile)) {
            setError('Please enter a valid 10-digit mobile number');
        } else {
            setError('');
            let otp = generateOTP()
            alert('OTP for monile number ' + mobile + ' is ' + otp)
            navigation.navigate('otp', {mobile: mobile, otp: otp})
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signin To Croma</Text>
            <Text style={styles.subtitle}>to access your Addresses, Orders & Wishlist</Text>
            <TextBox
                myStyle={styles.input}
                msg="Enter Your Mobile Number"
                type="numeric"
                W={.9}
                value={mobile}
                setValue={setMobile}
                icon={'mobile1'}
                error={error}
                helperText={error}
                h={.05}
                setError={setError}
            />
           
            <MyButton 
            text="login"
            bg={primaryColor}
            color='white'
            w={.9}
            myStyle={styles.button} 
            onPress={handleLogin} 
            h={44}
            />
                
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: primaryColor,
    },
    subtitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'grey',
    },
    input: {
        borderColor: '#ccc',
        marginBottom: 10,
        fontSize: 11,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: primaryColor,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
