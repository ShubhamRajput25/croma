import { FlatList, Image, Text, View } from "react-native";
import { serverurl } from "../services/fetchNodeServices";

const BrandSlider = ({data}) => {

    const brandView = (item) => {
        return <View style={{marginRight:10, justifyContent:'center'}}>
            <Image source={{uri:`${serverurl}/images/${item?.logo}`}} style={{width:70, height:70}} />
            <Text style={{textAlign:'center', fontSize:8}}>{item?.brandname}</Text>
        </View>
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