
import { FlatList, View } from "react-native";
import ProductCart from "./ProductCart";

const RecommendedProducts = ({data, refresh, setRefresh}) => {
    return <View>
                <FlatList 
                    data={data}
                    horizontal
                    renderItem={({item}) => <ProductCart item={item} multiple={true}  />}
                    keyExtractor={(item) => item.productid}
                />
        </View>
}

export default RecommendedProducts;