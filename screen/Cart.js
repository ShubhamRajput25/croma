import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CartProducts from "../components/CartProducts";

export default function Cart(){
  const [cartProductsData, setCartProductsData] = useState(Object.values(useSelector(state => state?.products?.products)) || [])

    return (
      <ScrollView>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <CartProducts data={cartProductsData} />
        </View>

      </ScrollView>
    )
}