import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { getData, postData, serverurl } from "../services/fetchNodeServices";
import Icon from "react-native-vector-icons/MaterialIcons";
import {  useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
const ProductCart = ({ item, multiple=false, screen , setRefresh, wishlist=[]}) => {
    const [liked, setLiked] = useState();
    const [productDeatils, setProductDetails] = useState([]);
    const [user, setUser] = useState(null)

    const navigation = useNavigation()

    const fetchUserDeatils = async () => {
        let tempUser = await AsyncStorage?.getItem('user')
        setUser(JSON.parse(tempUser))
    }

    const checkIsLiked = () => {
        const isLiked = wishlist.some((itm) => itm?.productid === item?.productid);
        setLiked(isLiked);
    }

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
        fetchUserDeatils()
    }, [item?.productid])

    useEffect(() => {
        checkIsLiked()
    }, [wishlist, item])

    const toggleLike = async() => {
        try {
            if (liked) {
                // Unlike the product
                await getData(`wishlist/remove_from_wishlist/${item?.productid}`);
            } else {
                // Like the product
                await postData(`wishlist/add_to_wishlist`, { productid: item?.productid, userid: user?.emailid });
            }
            setLiked(!liked); // Toggle the liked state
            setRefresh && setRefresh((prev) => !prev); // Refresh parent if needed
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return ( 
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate('productdetails', {productData: productDeatils})
           screen == 'productDetailPage' && setRefresh(prev => !prev)
        }}>
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
            <Text style={styles.offerprice} numberOfLines={1}>
                &#8377;{productDeatils?.offerprice || "N/A"} <Text style={styles?.price}>&#8377;{productDeatils?.price || "N/A"}</Text>
            </Text>
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
