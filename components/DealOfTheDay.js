import { FlatList, View } from "react-native";
import ProductCart from "./ProductCart";

const DealOfTheDay = ({data, wishlist=[]}) => {
    return <View>
                <FlatList 
                    data={data}
                    horizontal
                    renderItem={({item}) => <ProductCart item={item} multiple={true} wishlist={wishlist} />}
                    keyExtractor={(item) => item.productid}
                />
        </View>
}

export default DealOfTheDay;