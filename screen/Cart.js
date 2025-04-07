import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CartProducts from "../components/CartProducts";
import PaymentDetailsComponent from "../components/PaymentDetailsComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window')
import { serverurl } from "../services/fetchNodeServices";

export default function Cart(){
  const products = useSelector(state => state?.products?.products);
  const [cartProductsData, setCartProductsData] = useState(Object.values(products) || []);
  const [subTotalAmount, setSubTotalAmount] = useState(0)
  const [amountWithShippingTax, setAmountWithShippingTax] = useState(0)
  const [shippingTax, setShippingTax] = useState(299)
  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    let amt = 0
    cartProductsData?.map((product) => {
      amt += product?.offerprice < product?.price ? (parseInt(product?.qty) * parseInt(product?.offerprice)) : (parseInt(product?.qty) * parseInt(product?.price))
    })
    setSubTotalAmount(amt)
    setAmountWithShippingTax(amt + shippingTax)
  }, [cartProductsData, refresh])

  useEffect(() => {
    setCartProductsData(Object.values(products))
  }, [products])

    return ( 
       cartProductsData?.length > 0 ?    <ScrollView>

        <View style={{flexDirection:'row', justifyContent:'space-between', padding:8, marginBottom:20}}>
          <Text style={{fontSize:16, fontWeight:500}}>Your Cart</Text>
          <Text style={{fontSize:16, fontWeight:500}}>Item: {cartProductsData?.length}</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
          <CartProducts data={cartProductsData} setRefresh={setRefresh} />
        </View>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <PaymentDetailsComponent amountWithShippingTax={amountWithShippingTax} shippingTax={shippingTax} subTotalAmount={subTotalAmount} /> 
        </View>

      </ScrollView>
      : <View style={{alignItems:'center', justifyContent:'center', height:height*.8}}>
        <Image 
        source={{uri:`${serverurl}/images/emptycart.png`}}
        width={width*1}
        height={height*.4}
        />
      </View> 
     
    )
}
