import { Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"
import TextBox from "./ui/TextBox";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { serverurl } from "../services/fetchNodeServices";
import { useState } from "react";


const {width, height} = Dimensions.get('window')

export default function MyHeader({screen='home'}){
  const navigation = useNavigation()
  const [searchString, setSearchString] = useState('')

    return (<View style={{marginTop: height*.06,alignItems:'center'}}>
      <View style={{ 
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom:5,
        width:width*.9
      }}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{backgroundColor:'#fff', borderRadius:'50%', padding:5}}> <Icon name="bars" size={20} color="#000" /> </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Mainscreen')}>
      <Image source={{uri:`${serverurl}/images/applogo.png`}}  style={{width:width*.3, height:height*.05}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('cart')} style={{backgroundColor:'#fff', borderRadius:'50%', padding:5}}>
        <Icon name="shoppingcart" size={20} color="#000" />
      </TouchableOpacity >
      </View>
   {screen=='home' &&   <View style={{ 
        alignItems:'center',
        paddingBottom:5
      }}>   
        <TextBox W={.95} h={.04} msg=" Search..." icon="search1" myStyle={{borderRadius:20}} value={searchString} setValue={setSearchString} onSubmit={() => {
          navigation?.navigate('searchedproducts', {searchString: searchString})
        }} /> 
      </View> }
      </View>
    )
}