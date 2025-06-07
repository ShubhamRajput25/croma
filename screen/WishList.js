import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getData } from "../services/fetchNodeServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCart from "../components/ProductCart";

export default function WishList(){
  const [WishListData, setWishListData] = useState([])

  const fetchWishListData = async () => {
    let tempUser = await AsyncStorage?.getItem('user')
    let user = JSON.parse(tempUser)
    let result = await getData(`wishlist/fetch_wishlist/${user?.emailid}`)
    setWishListData(result?.data || [])
  }

  const formatData = (data) => {
    if(!(data?.length % 2 == 0)) {
        data.push({ empty: true });
    }
    return data;
}

  useEffect(() => {
    fetchWishListData()
  }, [])
  return (
    <View>
      {/* Topic name */}
    <View style={{ padding: 10, alignItems: "flex-start" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>My Wishlist</Text>
    </View>

      {/* whishlist items */}
      <View>
      <FlatList 
          data={formatData([...WishListData], 2)}
          numColumns={2}
          renderItem={({ item }) =>
            item.empty ? (
              <View style={{ flex: 1, margin: 5, backgroundColor: "transparent" }} />
            ) : (
              <ProductCart item={item} multiple={true} wishlist={WishListData} />
            )
          }
          keyExtractor={(item, index) => item.productid || `empty-${index}`}
      />
      </View>
    </View>
  )
}