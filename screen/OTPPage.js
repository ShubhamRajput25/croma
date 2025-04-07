import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Dimensions } from 'react-native';
import MyButton from '../components/ui/MyButton';
import { primaryColor } from '../constants';
import { postData } from '../services/fetchNodeServices';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get('window')
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPPage({route}) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const navigation = useNavigation()

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 3) inputs.current[index + 1].focus();
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleSubmit = async() => {
    Keyboard.dismiss();
    const enteredOtp = otp.join('');
    
    if(enteredOtp === route.params.otp){
        let result = await postData(`useraccount/check_account`, {mobileno: route.params.mobile})
        if(result?.status) {
            alert(result?.message)
            console.log(result?.data)
            await AsyncStorage.setItem('user', JSON.stringify(result?.data[0]));
            navigation.navigate('cart')
        }else{
            alert(result?.message)
            navigation.navigate('signup', {mobile: route.params.mobile})
        }
    }else{
        alert('Invalid OTP')
    }
    // console.log("Entered OTP:", enteredOtp);
    // You can handle the OTP submission here

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Phone Number</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            value={digit}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <MyButton 
        text="Verify"
        bg={primaryColor}
        color='white'
        w={.81}
        onPress={handleSubmit} 
        h={44}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 20,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 30,
      color: primaryColor
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width*.8,
      marginBottom: 30,
    },
    input: {
      width: 60,
      height: 60,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: '600',
    },
    button: {
    //   backgroundColor: '#4A90E2',
      paddingVertical: 14,
      paddingHorizontal: 50,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  