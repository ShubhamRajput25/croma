import { FlatList, Text, View } from "react-native";
import SearchedProductCard from "./SearchedProductCard";

const ShowSearchedProducts = ({data}) => {
        return data?.length > 0 ? <View>
            <FlatList
                data={data}
                renderItem={(item) => <SearchedProductCard product={item?.item} />}
                keyExtractor={(item) => item?.index}
                numColumns={1}
                />
        </View> : 
        <View >
            <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>Products Are UnAvailable</Text>
        </View>
}

export default ShowSearchedProducts;