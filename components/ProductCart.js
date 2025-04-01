import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { getData, serverurl } from "../services/fetchNodeServices";
import Icon from "react-native-vector-icons/MaterialIcons";
import { use, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const ProductCart = ({ item, multiple=false }) => {
    const [liked, setLiked] = useState(false);
    const [productDeatils, setProductDetails] = useState([]);

    const navigation = useNavigation()

    const fetchProductDetails = async () => {   
        try {
            const response = await getData(`productdetails/fetch_product_details_by_id/${item?.productid}`)
            if(response?.status === true){
                // console.log(response?.data[0])
                setProductDetails(response?.data[0])
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProductDetails()
    }, [item?.productid])

    const toggleLike = () => {
        setLiked(!liked);
    };

    return ( 
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('productdetails', {productData: productDeatils})}>
            {/* Like Icon */}
            <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
                <Icon name={liked ? "favorite" : "favorite-border"} size={20} color={liked ? "red" : "gray"} />
            </TouchableOpacity>
        <View style={{
            width:'100%',
            backgroundColor:'#dfe6e9',
            marginTop:20,
            alignItems:'center',
            paddingTop:10,
            paddingBottom:10,
        }} >
            <Image 
                source={{ uri: `${serverurl}/images/${multiple?item?.picture?.split(',')[0]:item.picture}` }}  
                style={styles.image} 
                resizeMode="contain"
            />
        </View >
            <Text style={styles.brand}>{productDeatils?.brandname}</Text>
            <Text style={styles.name} numberOfLines={2}>{item.productname} {productDeatils?.modelno} {productDeatils?.color}</Text>
            <Text style={styles.offerprice} numberOfLines={1}>&#8377;{productDeatils?.offerprice} <Text style={styles?.price}>&#8377;{productDeatils?.price}</Text> </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
        // borderRadius: 10,
        alignItems: "center",
        // elevation: 3, // Shadow for Android
        // shadowColor: "#000",
        // shadowOpacity: 0.2,
        // shadowOffset: { width: 0, height: 2 },
        position: "relative",
        width: width*.45,
        height:height*.28
    },
    likeButton: {
        position: "absolute",
        top: 8,
        right: 8,
       
    },
    image: {
        width: 80,  
        height: 80,
        borderRadius: 10,
        
    },
    brand: {
        fontSize: 12,
        fontWeight: "500",
        color: "#333",
        marginTop: 5,
        textAlign: "start",
        width:'100%',
        // backgroundColor:'red'
    },
    name: {
        fontSize: 12,
        color: "#666",
        textAlign: "start",
        marginTop: 2,
        width:'100%',
        // backgroundColor:'red',
        fontWeight: "500",
        
    },
    offerprice:{
        fontSize: 14,
        fontWeight: "bold",
        width:'100%',
        alignItems:'start',
        marginTop:'auto',


    },
    price:{
         textDecorationLine: 'line-through',
         fontSize:9,
         fontWeight:'400'
    }
});

export default ProductCart;
