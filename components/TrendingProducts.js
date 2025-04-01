import { FlatList, View } from "react-native";
import ProductCart from "./ProductCart";

const TrendingProducts = ({data}) => {
    return <View>
                <FlatList 
                    data={data}
                    horizontal
                    renderItem={({item}) => <ProductCart item={item} multiple={true} />}
                    keyExtractor={(item) => item.productid}
                />
        </View>
}

export default TrendingProducts;