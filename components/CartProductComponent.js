import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity } from "../storage/slice/product";
import { serverurl } from "../services/fetchNodeServices";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/MaterialIcons";

const CartProductComponent = ({ data }) => {
    const dispatch = useDispatch();
    const images = data?.item?.picture ? data?.item?.picture?.split(",") : [];

    return (
        <View style={styles.container}>
            {/* Product Image */}
            <Image source={{ uri: `${serverurl}/images/${images[0] || ""}` }} style={styles.image} />

            <View style={styles.details}>
                {/* Product Name */}
                <Text numberOfLines={2} style={styles.productName}>{data?.item?.productname} {data?.item?.modelno} {data?.item?.color}</Text>
                <Text>{data?.item?.brandname}</Text>
                {/* Price */}
                <Text style={styles.price}>
                    ₹{data?.item?.offerprice} <Text style={styles.oldPrice}>₹{data?.item?.price}</Text>
                </Text>

                {/* Stock Status */}
                <Text style={[styles.stock, data?.item?.stock > 0 ? styles.inStock : styles.outOfStock]}>
                    {data?.item?.stock > 0 ? "In Stock" : "Out of Stock"}
                </Text>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                        style={{...styles.button, borderColor:'grey'}} 
                        onPress={() => dispatch(decreaseQuantity(data?.item?.productid))}
                        disabled={data?.item?.qty <= 1}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{data?.item?.qty || 1}</Text>

                   
                    <TouchableOpacity 
                        style={{...styles.button, borderColor:'#0984e3'}} 
                        onPress={() => dispatch(addToCart(data?.item))}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    </View>

                      {/* Remove Button */}
                <TouchableOpacity 
                    style={styles.removeButton} 
                    onPress={() => dispatch(removeFromCart(data?.item?.productid))}
                >
                    <Icon size={20} name="delete" />
                </TouchableOpacity>

                </View>

               
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginVertical: 10,
        padding: 10,
        width:width*.97,
        borderRadius:5
        // borderRadius: 10,
        // elevation: 3,
    },
    image: {
        width: width*.28,
        height: width*.28,
        alignSelf:'center'
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 13,
        fontWeight: "bold",
    },
    price: {
        fontSize: 13,
        color: "#FF5733",
        fontWeight:'bold'
    },
    oldPrice: {
        fontSize: 10,
        color: "#888",
        textDecorationLine: "line-through",
        fontWeight:400
    },
    stock: {
        fontSize: 12,
        marginVertical: 5,
    },
    inStock: {
        color: "green",
    },
    outOfStock: {
        color: "red",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    button: {
        // backgroundColor: "#ddd",
        // borderColor:'#2e86de',
        width:30,
        height:30,
        borderRadius: '50%',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    removeButton: {
        marginTop: 5,
    },
    removeText: {
        color: "red",
        fontSize: 14,
    },
});

export default CartProductComponent;
