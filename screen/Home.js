import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import { useEffect, useState } from "react";
import { getData, serverurl } from "../services/fetchNodeServices";
import HomeTopCarousel from "../components/HomeTopCarousel";
import CategorySlider from "../components/CategorySlider";
// import LinearGradient from "react-native-linear-gradient";
import BrandSlider from "../components/BrandSlider";
import Products from "../components/Products";
import DealOfTheDay from "../components/DealOfTheDay";
import OffersOnBanks from "../components/OffersOnBanks";
import NewArrivalProducts from "../components/NewArrivalProducts";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

export default function Home({navigation}){
    const [bannerData, setBannerData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [dealOfTheDayData, setDealOfTheDayData] = useState([]);
    const [brandBanners, setBrandBanners] = useState([]); 
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [newArrivalProductData, setNewArrivalProductData] = useState([]);
    const [WishListData, setWishListData] = useState([])

    const fetchWishListData = async () => {
        let tempUser = await AsyncStorage?.getItem('user')
        let user = JSON.parse(tempUser)
        let result = await getData(`wishlist/fetch_wishlist/${user?.emailid}`)
        setWishListData(result?.data || [])
    }
    const fetchAllBanners = async () => {
        try {
            const response = await getData(`banner/fetch_all_banner`)
            if(response?.status === true){
                let data = response?.data[0]?.files?.split(",")
                setBannerData(data)
            }
        } catch (error) {
            console.error(error);
        }
    } 

    const fetchAllCategory = async () => {
        try {
            const response = await getData(`category/display_all_category`)
            if(response?.status === true){
                setCategoryData(response?.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchAllBrands = async () => {
        try {
            const response = await getData(`brands/fetch_brands`)
            if(response?.status === true){
                setBrandData(response?.brandsData)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchAllBrandBanners = async () => {
        try {
            const response = await getData(`brands/fetch_brand_banners`)
            if(response?.status === true){
                // console.log("banerr data : ", response?.data)
                setBrandBanners(response?.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchAllProducts = async () => {
        try {
            const response = await getData(`products/display_all_products`)
            if(response?.status === true){
                setProductData(response?.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchDealOfTheProducts = async () => {
        try {
            const response = await getData(`products/fetch_products_by_Deal_of_the_day`)
            if(response?.status === true){
                // console.log(response?.data)
                setDealOfTheDayData(response?.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchTrendingProducts = async () => {
        try {
            const response = await getData(`products/fetch_trending_products`)
            if(response?.status === true){
                // console.log(response?.data)
                setTrendingProducts(response?.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchNewArrivalProducts = async () => {
        try {
            const response = await getData(`products/fetch_new_arrival_products`)
            if(response?.status === true){
                // console.log(response?.data)
                setNewArrivalProductData(response?.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchWishListData()
        fetchAllBanners()
        fetchAllCategory()
        fetchAllBrands()
        fetchAllProducts()
        fetchDealOfTheProducts()
        fetchAllBrandBanners()
        fetchTrendingProducts()
        fetchNewArrivalProducts()
    }, [])

    return (
        <ScrollView >

            {/*brand banners section */}
        <View style={{width:width,flexDirection:'row', justifyContent:'center', marginTop:10 }}>
            <HomeTopCarousel data={brandBanners} multipleImg={true} position={1} />
        </View>

        <View style={{width:width, justifyContent:'center', marginTop:20, }}>
        <Text style={{fontSize:14, fontWeight:'bold', marginLeft:2, marginBottom:5}} >No More Worrying About Your Appliances</Text>
            <Image source={{uri:`${serverurl}/images/zipcare.webp`}} width={width*1} height={width/1.8} style={{resizeMode:'contain'}} />
        </View>

        {/* category section */}
        <View style={{width:width, justifyContent:'center', marginTop:10 }}>
            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:10, marginBottom:10}} >Categories</Text>
            <CategorySlider data={categoryData} />
        </View>

        <View style={{width:width, justifyContent:'center', marginTop:20, }}>
        <Text style={{fontSize:14, fontWeight:'bold', marginLeft:2, marginBottom:5}} >Experience Croma On Tata Neu!</Text>
            <Image source={{uri:`${serverurl}/images/tataneupostar.webp`}} width={width*1} height={width/1.9} style={{resizeMode:'contain'}} />
        </View>

        
 
         {/* Deal of the day section */}
         <View style={{width:width, justifyContent:'center', marginTop:10 }}>
         <Text style={{fontSize:16, fontWeight:'bold', marginLeft:10, marginBottom:10}}>Deal Of The Day</Text>
            <DealOfTheDay data={dealOfTheDayData} wishlist={WishListData} />
        </View>

        {/* banners section */}
        <View style={{width:width,flexDirection:'row', justifyContent:'center', marginTop:10 }}>
            <HomeTopCarousel data={bannerData} position={2} />
        </View>

        {/* offer on banks section */}
        <View style={{width:width,justifyContent:'center', marginTop:10 }}>
        <Text style={{fontSize:16, fontWeight:'bold', marginLeft:15, marginBottom:10}}>Offer's On Banks</Text>
            <OffersOnBanks />
        </View>

        {/* new arrival products section */}
        <View style={{width:width,justifyContent:'center', marginTop:10 }}>
        <Text style={{fontSize:16, fontWeight:'bold', marginLeft:15, marginBottom:10}}>New Arrival Products</Text>
            <NewArrivalProducts data={newArrivalProductData} wishlist={WishListData}  />
        </View>

        {/* Brands section */}
        <View style={{width:width, justifyContent:'center', marginTop:10 }}>
            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:10, marginBottom:10}}>Brands</Text>
            <BrandSlider data={brandData} />
        </View>

         {/* Trending Products section */}
         <View style={{width:width, justifyContent:'center', marginTop:10 }}>
         <Text style={{fontSize:16, fontWeight:'bold', marginLeft:10, marginBottom:10}}>Trending Products</Text>
            <DealOfTheDay data={trendingProducts} wishlist={WishListData} />
        </View>

        {/* Products section */}
        <View style={{width:width, justifyContent:'center', marginTop:10 }}>
            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:10, marginBottom:10}}>Products</Text>
            <Products data={productData}  wishlist={WishListData}/>
        </View>
        </ScrollView>
    )
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
    },
  });