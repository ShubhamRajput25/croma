import { useEffect, useState } from "react";
import { Image, Text, View, Dimensions, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { serverurl } from "../services/fetchNodeServices";
const {width, height} = Dimensions.get('window')
export default function ProductImages({images=[]}){
    const [picture, setPicture] = useState(images[0]);

    const showImageSlider = () => {
        return < FlatList
                data={images}
                horizontal
                renderItem={({item}) => <TouchableOpacity style={{
                    width: width*.3,
                    height: width*.3,
                    justifyContent:'center',
                    alignItems:'center',
                    margin:5.7,
                    backgroundColor:'#dfe6e9',
                    // borderRadius: 20,
                }} onPress={() => setPicture(item) }
                > <Image source={{uri:`${serverurl}/images/${item}`}} style={{
                    width: width*.3,
                    height: width*.3,
                    resizeMode:'contain',
                }} /> </TouchableOpacity>}
        />
    }

    useEffect(() => {
        setPicture(images[0])
    }, images)

    return (
      <View style={{ alignItems:'center', height:height*.6}}>
        
        <View style={styles.mainImg}>
            <Image source={{uri:`${serverurl}/images/${picture}`}} style={{
                width: width*.95,
                height: width*.95,
                resizeMode:'contain',
            }} /> 
        </View>
        <View style={{marginTop:10}}>
            {showImageSlider()}
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    mainImg:{
        width: width*.95,
        height: width*.95,
        resizeMode:'contain',
        backgroundColor:'#dfe6e9',
        // padding:10,
        // marginTop: height*.03,
        justifyContent:'center',
        alignItems:'center',
    },
    likeButton: {
        position: "absolute",
        top: 0,
        right: 10,
       
    },
})