import { useEffect, useState } from "react";
import { Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { getData, serverurl } from "../services/fetchNodeServices";
import ProductImages from "../components/ProductImages";
const {width, height} = Dimensions.get('window')
import EI from 'react-native-vector-icons/Entypo';
import MyButton from '../components/ui/MyButton.js'
import RenderHTML from "react-native-render-html";
import RecommendedProducts from "../components/RecommendedProducts.js";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddToCartButton from "../components/AddToCartButton.js";
import { useSelector } from "react-redux";
import { primaryColor } from "../constants.js";

export default function ProductDetails({route, navigation}){
  const product = route?.params?.productData
  const [productDetails, setProductDetails] = useState(product || null);
  const [selectedColor, setSelectedColor] = useState(product?.color?.split(',')[0]|| null)
  const [RecommendedProductsData, setRecommendedProductsData] = useState([])
  const [liked, setLiked] = useState(false);
  const [qty, setQty] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const {products} = useSelector((state => state.products))

    const toggleLike = () => {
        setLiked(!liked);
    };
 
  const fetchRecommendedProducts = async () => {
    try {
        const response = await getData(`productdetails/fetch_products_by_category/${productDetails?.categoryid}`)
        if(response?.status === true){
            setRecommendedProductsData(response?.data)
        }
    } catch (error) {
        console.error(error);
    }
}

  const showColors = () => {
    return productDetails?.color && productDetails?.color?.split(',')?.map((item) => {
      return <TouchableOpacity 
      style={{
        padding:5,
        borderColor:selectedColor == item ?'#1dd1a1':'#7f8c8d',
        borderWidth:1,
        alignSelf:'flex-start',
        marginRight:5,
        textAlign:'center',
        fontSize:13
      }}
      onPress={()=>setSelectedColor(item)}
      ><Text >{item}</Text> </TouchableOpacity> 
    })
  }

  const ProductDescription = () => {
    return (
        <View style={{marginLeft:3}}>
            <Text style={{ fontWeight: 500, fontSize: 20, marginTop: 20 }}>
                {productDetails?.brandname} {productDetails?.productname} {productDetails?.modelno}
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 10, flexWrap:'wrap' }}>
                <Text style={{ borderRadius: 20, color: '#636e72', backgroundColor: '#dfe6e9', paddingVertical: 6, paddingHorizontal: 16, fontWeight: 800, fontSize: 14, margin:3 }}>
                    2000 off on payment otp page
                </Text>
                <Text style={{ borderRadius: 20, color: '#636e72', backgroundColor: '#dfe6e9', paddingVertical: 6, paddingHorizontal: 16, fontWeight: 800, marginLeft: 10, fontSize: 14, margin:3 }}>
                    9 month cost EMI
                </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '2%', fontWeight: 350, fontSize: 14 }}>
                <Text style={{ color: '#636e72' }}> 4.5 </Text>
                <EI
                    style={{ color: '#636e72' }}
                    name="star"
                    size={18}
                />
                <Text style={{ marginLeft: 2, textDecorationLine: 'underline', color: '#636e72' }}>59 Rating & Reviews</Text>
            </View>

            <View style={{ margin: 2, paddingTop: 10 }}>
                {productDetails.offerprice > 0 ?
                    <Text style={{fontSize: 20, fontWeight: 'bold' }}>
                      <Text>&#8377;{productDetails.offerprice} </Text>
                        <Text style={{ textDecorationLine: 'line-through', fontSize: 14, color:'red', fontWeight: 400 }}>&#8377;{productDetails.price}</Text>
                        
                    </Text>
                    :
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        &#8377;{productDetails.price}
                    </Text>
                }
                <Text style={{ fontSize: 12,  }}>(Incl. all Taxes)</Text>
            </View>

            <View style={{ marginVertical: '3%' }}>
                <Text style={{ fontSize: 16, fontWeight: 600,  }}>Color's</Text>
               <View style={{marginTop:5}}> {showColors()} </View>
            </View>

            <View style={{ marginTop: 10 }}>
                <Text style={{  fontSize: 16, fontWeight: 500 }}>Super Saving (2 OFFERS)</Text>

                <View style={{ marginTop: 4, borderBottomWidth: 1.5,  }} />

                <View style={{ marginTop: 10,backgroundColor:'#bdc3c7', width:width*1, height:80, alignItems:'center' }}>
                    <Image
                        source={{ uri: `${serverurl}/images/offer.webp` }}
                        style={{  resizeMode: "contain", width:width*.95, height:80 }}
                    />
                </View>

                <View style={{ marginTop: '3%', paddingVertical: 5, paddingHorizontal: 5, width:width*.95 }}>
                    <RenderHTML tagsStyles={{ body: {  fontSize: 12, fontWeight: 500 } }}
                        contentWidth={width}
                        source={{ html: productDetails.description }}
                    />
                </View>
            </View>

            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 5 }}>
               <View style={{width:width*.4}}>  <AddToCartButton item={productDetails}  qty={qty || 0} setQty={setQty} /> </View>
                <MyButton bg={primaryColor} text="Buy Now" w={.4} />
            </View>

        </View>
    )
}

useEffect(() => {
  setProductDetails(product); // ✅ Update only when product changes

  if (product) 
      fetchRecommendedProducts(); // ✅ Call only if product exists

  if (products && product)
      setQty(products[product?.productid]?.qty); // ✅ Update qty only when needed

}, [product, products]);

    return (
      <ScrollView  >
        <TouchableOpacity onPress={toggleLike} style={{alignSelf:'flex-end', marginRight:10, padding:5}}>
          <Icon name={liked ? "favorite" : "favorite-border"} size={20} color={liked ? "red" : "gray"} />
      </TouchableOpacity>
     { productDetails?.picture &&  <View > <ProductImages images={product?.picture ? product.picture.split(',') : []} /> </View>  }

     <ProductDescription />

      <View style={{width:width*.98, justifyContent:'center', marginTop:10, marginBottom:20 }}>
      <Text style={{fontSize:16, fontWeight:'bold', marginLeft:10, marginBottom:10}}>Recommended For You</Text>
        <RecommendedProducts data={RecommendedProductsData} setRefresh={setRefresh} />
      </View>
     
      </ScrollView>
  
    )
}
