import { Image , Dimensions, View} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { serverurl } from "../services/fetchNodeServices";
import { useSharedValue } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const HomeTopCarousel = ({data, multipleImg = false, position=1}) => {
    const scrollOffsetValue = useSharedValue(0);
  
    return <View style={{flex:1, alignItems:'center'}}> <Carousel 
            data={data}
            renderItem={({item}) => <View> <Image source={{uri:`${serverurl}/images/${multipleImg? item?.files?.split(',')[0]:item}`}} style={{resizeMode:'contain'}}   width={'100%'} height={'100%'} /> </View>}
            loop={true}
            width={width*.99}
            height={width/3.6}
            snapEnabled={true}
            pagingEnabled={true}
            autoPlayInterval={position==1?4000:3000}
            defaultScrollOffsetValue={scrollOffsetValue}
            autoPlay={true}
           
        /> </View>
}

export default HomeTopCarousel;