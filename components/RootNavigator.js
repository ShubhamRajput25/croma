import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import MyHeader from "./MyHeader";
import ProductDetails from "../screen/ProductDetails";
import Cart from "../screen/Cart";
import Home from "../screen/Home";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

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
              <DrawerItem label="Logout"  icon={()=><MCI name={"logout"} size={24} />} />
            
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
        </Stack.Navigator>
    </NavigationContainer>
}

export default RootNavigator;