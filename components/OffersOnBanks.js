import { FlatList, Image, StyleSheet, Text, Dimensions } from "react-native"
import { View } from "react-native"
import { serverurl } from "../services/fetchNodeServices"
const { width, height } = Dimensions.get('window')
const OffersOnBanks = () => {

    const bankList = ['indusind_bank', 'axis_bank', 'boi', 'kotak_bank']

    const bankCardView = (item) =>{
        return <View style={styles.image}>
             <Image source={{uri:`${serverurl}/images/${item}.png`}} style={{width:width*.4, height:90, resizeMode:'contain'}} />
        </View>
    }

    return <View style={styles.container}>
       <View>
       <FlatList 
            numColumns={2}
            data={bankList}
            renderItem={({item}) => bankCardView(item)}
            keyExtractor={(item) => item}
            style={{}}
        />
       </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        width: width*1,
        
    },
    image: {
        width: width*.45,
        height: 90,
        backgroundColor:'#fff',
        // paddingHorizontal: 20,
        alignItems: 'center',
        resizeMode:'contain',
        margin: 5,
    },
   
})

export default OffersOnBanks;