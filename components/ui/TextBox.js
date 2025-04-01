import { useState } from "react";
import { StyleSheet, TextInput, View, Dimensions, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import PIcon from "react-native-vector-icons/Entypo";
const { width, height } = Dimensions.get('window')

// const style = StyleSheet.create({

//     container:{

//     }
// })

const TextBox = ({W=.9, msg="", type="text", icon, error=false, helperText='', password=false, h=.04, myStyle={}}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState('eye-with-line');
    const [isPassword, setIsPassword] = useState(password)

    const handleClickEye = () => {
        if(isPassword){
            setIsPassword(false)
            setPasswordIcon('eye')
        }else{
            setIsPassword(true)
            setPasswordIcon('eye-with-line')
        }
    }
    return <View>
        <View style={{width: width*W, borderWidth:1, borderColor:isFocused?'green':error?'#ff4757':'grey', paddingLeft:2, paddingRight:2, flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderRadius:5, height:height*h, ...myStyle}}>
        <Icon name={icon} size={20} style={{marginLeft:5}} />
        <TextInput onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)} secureTextEntry={isPassword}  keyboardType={type} placeholder={msg} style={{fontSize:h<=.04?14:18, textAlign:'left', padding:0, width:'100%'}}  />
        {type=='password' && <PIcon name={passwordIcon} size={23} style={{marginLeft:'auto'}} onPress={handleClickEye} />}
        </View>
        {error && <Text style={{color:'#ff4757'}}>{helperText}</Text>}
    </View>
} 

export default TextBox;