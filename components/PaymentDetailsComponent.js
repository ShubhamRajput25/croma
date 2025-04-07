import { StyleSheet, Text, View, Dimensions } from "react-native";
const {width} = Dimensions?.get('window')
import MyButton from './ui/MyButton'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { primaryColor } from "../constants";

export default function PaymentDetailsComponent({subTotalAmount, amountWithShippingTax, shippingTax}){
    const navigation = useNavigation()
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from AsyncStorage
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem("user");
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        };
        fetchUser();
    }, []);

    return (
      <View style={styles?.container}>
        
            <Text style={{...styles?.rows, fontWeight:'bold'}}>Price Details</Text>
       
        {/* sub total Amount */}
        <View style={styles?.rows}>
            <Text style={styles?.titleText}>Sub Total</Text>
            <Text style={styles?.resultText}>{subTotalAmount}</Text>
        </View>

        {/* shipping & Tax */}
        <View style={styles?.rows}>
            <Text style={styles?.titleText}>Shipping & Tax</Text>
            <Text style={styles?.resultText}>{shippingTax}</Text>
        </View>

        {/* total */}
        <View style={styles?.rows}>
            <Text style={{...styles?.titleText, color:'#000'}}>Total</Text>
            <Text style={styles?.resultText}>&#8377; {amountWithShippingTax}</Text>
        </View>

        {/* checkout */}
        <View style={{...styles?.rows}}>
            <MyButton text="Checkout" color="white" w={.94} bg={primaryColor} onPress={() => {
                if(user){
                    alert('Payment Gateway is not in Working')
                }else
                navigation.navigate('login')
            }} />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    rows:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:7,
       
    },
    container:{
        width:width*.97,
        backgroundColor:'#fff',
        padding:7,
        borderRadius:5,
         alignSelf:'flex-end'
    },
    titleText:{
        fontSize:12,
        fontWeight:500,
        color:'#95a5a6'
    },
    resultText:{
        fontSize:12,
        fontWeight:'bold'
    }
})