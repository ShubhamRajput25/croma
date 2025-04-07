import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import MyHeader from "./MyHeader";
import ProductDetails from "../screen/ProductDetails";
import Cart from "../screen/Cart";
import Home from "../screen/Home";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";
import LoginScreen from "../screen/LoginScreen";
import OTPPage from "../screen/OTPPage";
import SignupScreen from "../screen/SignupScreen";
import SearchedProducts from "../screen/SearchedProducts";
import ProductsByBrand from "../screen/ProductsByBrand";
import ProductsByCategory from "../screen/ProductsByCategory";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()
// const navigation = useNavigation()

const RootNavigator = (props) => {

    const CustomDrawerContent = (props) => {
        
        return (
            <DrawerContentScrollView {...props}>
    
            <View style={{padding:20,alignItems:'center',flexDirection:'column'}}>
            <Image  style={{marginBottom:5,borderRadius:50,resizeMode:'contain',width:100,height:100}}
            source={require('../assets/icon.png')}/>
             <Text style={{fontWeight:'bold'}}>{'Alice Kumari'}</Text> 
            <Text>+91 9301123085</Text> 
            <Text style={{fontSize:12}}>{'ss@gmail.com'}</Text>
            </View>
            
            <DrawerItemList {...props}/>
              <DrawerItem
                label="My Profile"
                onPress={()=>alert('hi')}
                icon={()=><MCI name={"account-box"} size={24}  />}
              />
              <DrawerItem
                label="Settings"
                icon={()=><MCI name={"account-settings"} size={24} />}
              />
              {/* <DrawerItem label="Login"  icon={()=><MCI name={"login"} size={24} onPress={() => navigation?.navigate('login')} />} /> */}
            
          </DrawerContentScrollView>

        )
    
    }

    const projectDrawer = () => {
        return (
            <Drawer.Navigator initialRouteName="home" drawerContent={(props) => <CustomDrawerContent {...props} />} >
                <Drawer.Screen name="home" component={Home} 
                  options={{headerShown: false,
                    drawerIcon:()=><MCI name={"home-city"} size={24} />,
                  }}
                />
            </Drawer.Navigator> 
        )
    }


    return <NavigationContainer >
        <Stack.Navigator initialRouteName={"Mainscreen"} >
            <Stack.Screen name="Mainscreen" component={projectDrawer} options={{header:MyHeader}} />
            <Stack.Screen component={ProductDetails}  name={"productdetails"}  options={{header:()=><MyHeader screen={'productdeatils'} />}}/> 
            <Stack.Screen component={Cart}  name={"cart"}   options={{header:()=><MyHeader screen={'cart'} />}}/> 
            <Stack.Screen component={LoginScreen}  name={"login"} options={{headerShown:false}}  /> 
            <Stack.Screen component={OTPPage}  name={"otp"} options={{headerShown:false}}  /> 
            <Stack.Screen component={SignupScreen}  name={"signup"} options={{headerShown:false}}  /> 
            <Stack.Screen component={SearchedProducts} name="searchedproducts" options={{header:() => <MyHeader screen="searchedproducts" />}} />
            <Stack.Screen component={ProductsByBrand} name="productsbybrand" options={{header:() => <MyHeader screen="productsbybrand" />}} />
            <Stack.Screen component={ProductsByCategory} name="productsbycategory" options={{header:() => <MyHeader screen="productsbycategory" />}} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default RootNavigator;