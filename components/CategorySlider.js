import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { serverurl } from "../services/fetchNodeServices";
import { useNavigation } from "@react-navigation/native";

const CategorySlider = ({data}) => {
 const navigation = useNavigation()
    const categoryView = (item) => {
        return <TouchableOpacity style={{marginRight:10, justifyContent:'center'}} onPress={() => navigation.navigate('productsbycategory', {categoryid: parseInt(item?.categoryid)})}>
            <Image source={{uri:`${serverurl}/images/${item?.image}`}} style={{width:91, height:91}} />
            <Text style={{textAlign:'center', fontSize:10}}>{item?.categoryname}</Text>
        </TouchableOpacity>
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