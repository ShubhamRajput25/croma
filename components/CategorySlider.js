import { FlatList, Image, Text, View } from "react-native";
import { serverurl } from "../services/fetchNodeServices";

const CategorySlider = ({data}) => {

    const categoryView = (item) => {
        return <View style={{marginRight:10, justifyContent:'center'}}>
            <Image source={{uri:`${serverurl}/images/${item?.image}`}} style={{width:91, height:91}} />
            <Text style={{textAlign:'center', fontSize:10}}>{item?.categoryname}</Text>
        </View>
    }

    return <View>
            <FlatList 
                data={data}
                horizontal
                renderItem={({item}) => categoryView(item)}
                keyExtractor={(item) => item.categoryid}
            />
    </View>
}

export default CategorySlider;