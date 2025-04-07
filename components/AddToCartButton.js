import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../storage/slice/product";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AddToCartButton = ({ qty, item, setQty }) => {
    const [refresh, setRefresh] = useState(false);
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log("products is here: ", products);
    // }, [refresh]);

    const increaseQuantity = () => {
        let v = qty + 1;
        setQty(v);
        const updatedItem = { ...item, qty: v };
        dispatch(addProduct([item?.productid, updatedItem]));
        setRefresh(!refresh);
    };

    const decreaseQuantity = () => {
        if (qty > 1) {
            let v = qty - 1;
            setQty(v);
            const updatedItem = { ...item, qty: v };
            dispatch(addProduct([item?.productid, updatedItem]));
        } else {
            setQty(0);
            dispatch(removeProduct(item?.productid));
        }
        setRefresh(!refresh);
    };

    return (
        <View style={styles.container}>
            {qty <= 0 ? (
                <TouchableOpacity onPress={increaseQuantity}>
                    <Text style={styles.text}>Add to Cart</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={decreaseQuantity} disabled={qty === 0}>
                        <Text style={styles.text}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>{qty}</Text>
                    <TouchableOpacity onPress={increaseQuantity}>
                        <Text style={styles.text}>+</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e3c72",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        justifyContent:'center'
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
        paddingHorizontal: 10,
    },
});

export default AddToCartButton;
