import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { serverurl } from "../services/fetchNodeServices";
import { primaryColor } from "../constants";
import AddToCartButton from "./AddToCartButton";
import MyButton from "./ui/MyButton";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

const SearchProductCard = ({ product }) => {
    const navigation = useNavigation();
     const [qty, setQty] = useState(0)
     const {products} = useSelector((state => state.products))
    // console.log("bhai card ke andar hu ", product)

    useEffect(() => {
        if (product && products)
            setQty(products[product?.productid]?.qty)
    }, [products, product])
    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("productdetails", { productData: product })}
        >
            {/* Product Image */}
            <Image 
                source={{ uri: `${serverurl}/images/${product?.picture?.split(',')[0]}` }} 
                style={styles.image} 
                resizeMode="contain" 
            />

            {/* Product Details */}
            <View style={styles.details}>
            <Text style={styles.brandname} numberOfLines={2}>
                    {product?.brandname}
                </Text>
                 <Text style={styles.name} numberOfLines={2}>{product.productname} {product?.modelno} {product?.color}</Text>
                 <Text style={styles.offerprice} numberOfLines={1}>&#8377;{product?.offerprice} <Text style={styles?.price}>&#8377;{product?.price}</Text> </Text>

            <View style={{}}>
              <View style={{width:width*.4}}>  <AddToCartButton item={product}  qty={qty || 0} setQty={setQty}  /> </View>
                <MyButton bg={primaryColor} text="Buy Now" w={.4} myStyle={{fontSize:3}} />
            </View>

            </View>

            
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 10,
        overflow: "hidden",
        width:width*.99,
        height: height * 0.255,
    },
    image: {
        width: width * 0.45,
        height: height * 0.255,
        backgroundColor: "#f8f8f8",
    },
    details: {
        flex: 1,
        padding: 10,
        // justifyContent: "space-between",
    },
    name: {
        fontSize: 12,
        // fontWeight: "bold",
        color: "#333",
        marginTop:5
    },
    brandname: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    offerprice:{
        fontSize: 14,
        fontWeight: "bold",
        width:'100%',
        alignItems:'start',
        marginTop:5,
    },
    price:{
         textDecorationLine: 'line-through',
         fontSize:9,
         fontWeight:'400'
    },
    button: {
        backgroundColor: "#0652DD",
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default SearchProductCard;