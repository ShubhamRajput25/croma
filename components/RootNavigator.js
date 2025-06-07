import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import WishList from "../screen/WishList";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()


const RootNavigator =  (props) => {
  const [user, setUser] = useState(null)
  // const navigation = useNavigation()
  const fetchUserDeatils = async () => {
    let tempUser = await AsyncStorage?.getItem('user')
    // console.log("calling user details",tempUser )
    setUser(JSON.parse(tempUser))
  }



  useEffect(() => {
    fetchUserDeatils()
  }, [])
   
    const CustomDrawerContent = (props) => {
     const {navigation} = props
        return (
            <DrawerContentScrollView {...props}>
    
            <View style={{padding:20,alignItems:'center',flexDirection:'column'}}>
            <Image  style={{marginBottom:5,borderRadius:50,resizeMode:'contain',width:100,height:100}}
            source={require('../assets/icon.png')}/>
             <Text style={{fontWeight:'bold'}}>{user?.username || 'Username'}</Text> 
             <Text>{'+91 ' + (user?.mobileno || '1234567890')}</Text>
            <Text style={{fontSize:12}}>{user?.emailid || "abc@gmail.com"}</Text>
            </View>

            <DrawerItemList {...props}/>
              <DrawerItem
                label="Wishlist"
                onPress={()=>
                 navigation.navigate('wishlist')
                }
                icon={()=><MCI name={"account-box"} size={24}  />}
              />

              <DrawerItem
                label="Cart"
                onPress={()=>
                 navigation.navigate('cart')
                }
                icon={()=><MCI name={"account-box"} size={24}  />}
              />
              {/* <DrawerItem
                label="Settings"
                icon={()=><MCI name={"account-settings"} size={24} />}
              /> */}
             
              <DrawerItem label={user?'Logout':"Login"}
              onPress={async() => {
                 await AsyncStorage.removeItem('user')
                  navigation.navigate('login')
                }}
                icon={()=><MCI name={user?'logout':"login"} size={24}  />} />
            
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
            <Stack.Screen component={WishList} name="wishlist" options={{header:() => <MyHeader screen="wishlist" />}} />
            {/* <Stack.Screen component={CustomDrawerContent}  name={"custom"}  options={{headerShown:false}} />  */}
        </Stack.Navigator>
    </NavigationContainer>
}

export default RootNavigator;