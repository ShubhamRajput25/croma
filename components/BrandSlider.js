import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { serverurl } from "../services/fetchNodeServices";
import { useNavigation } from "@react-navigation/native";

const BrandSlider = ({data}) => {
    const navigation = useNavigation()
    const brandView = (item) => {
        return <TouchableOpacity style={{marginRight:10, justifyContent:'center'}} onPress={() => navigation.navigate('productsbybrand', {brandid: parseInt(item?.brandid)})}>
            <Image source={{uri:`${serverurl}/images/${item?.logo}`}} style={{width:70, height:70}} />
            <Text style={{textAlign:'center', fontSize:8}}>{item?.brandname}</Text>
        </TouchableOpacity>
    }

    return <View>
            <FlatList 
                data={data}
                horizontal
                renderItem={({item}) => brandView(item)}
                keyExtractor={(item) => item.brandid}
            />
    </View>
}

export default BrandSlider;