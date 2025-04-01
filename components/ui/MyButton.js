import { Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";

const {width, height} = Dimensions.get('window')

const MyButton = ({text, bg='#0984e3', color='white', w=.9, h=40, myStyle={}, onPress=()=>{}
}) => {
    return <TouchableOpacity onPress={onPress} >
        <View style={{
        marginTop:10,
        padding:10,
        width:width*w,
        height:h,
        backgroundColor:bg,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        ...myStyle
    }}>
            <Text style={{color:color}}>{text}</Text>
        </View>
    </TouchableOpacity>
}

export default MyButton;