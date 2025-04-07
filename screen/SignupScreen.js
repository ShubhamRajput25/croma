import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import TextBox from '../components/ui/TextBox';
import MyButton from '../components/ui/MyButton';
import { primaryColor } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../services/fetchNodeServices';
const { width, height } = Dimensions.get('window');

const SignupScreen = ({route}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleSignup = async() => {
    if (!username || !email || !address || pincode.length !== 6) {
      setError('Please fill all fields correctly');
    } else {
      setError('');
      // Here you can add your API call or navigation
    //   alert(`Signup Successful!\n\nUsername: ${username}\nEmail: ${email}\nAddress: ${address}\nPincode: ${pincode}`);
    let result = await postData('useraccount/submit_useraccount', {username, emailid:email, address, pincode, mobileno:route.params.mobile})
    if(result?.status) {
        alert(result?.message)
        navigation.navigate('login')
    }else{
        alert(result?.message)
    }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <Text style={styles.subtitle}>Create a new account</Text>

      <TextBox
        myStyle={styles.input}
        msg="Enter Username"
        value={username}
        setValue={setUsername}
        icon="user"
        W={0.9}
        h={0.05}
        setError={setError}
        error={error}
        helperText=""
      />

      <TextBox
        myStyle={styles.input}
        msg="Enter Email"
        value={email}
        setValue={setEmail}
        icon="mail"
        W={0.9}
        h={0.05}
        setError={setError}
        error={error}
        helperText=""
      />

      <TextBox
        myStyle={styles.input}
        msg="Enter Address"
        value={address}
        setValue={setAddress}
        icon="home"
        W={0.9}
        h={0.05}
        setError={setError}
        error={error}
        helperText=""
      />

      <TextBox
        myStyle={styles.input}
        msg="Enter Pincode"
        type="numeric"
        value={pincode}
        setValue={setPincode}
        icon="lock"
        W={0.9}
        h={0.05}
        setError={setError}
        error={pincode.length !== 6 && pincode.length > 0 ? "Invalid pincode" : ""}
        helperText={pincode.length !== 6 && pincode.length > 0 ? "Pincode must be 6 digits" : ""}
      />

      <MyButton
        text="Signup"
        bg={primaryColor}
        color="white"
        w={0.9}
        h={44}
        myStyle={styles.button}
        onPress={handleSignup}
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
  button: {
    backgroundColor: primaryColor,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default SignupScreen;
