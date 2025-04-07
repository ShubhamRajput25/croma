import { FlatList, View } from "react-native"
import CartProductComponent from "./CartProductComponent"

const CartProducts = ({data, setRefresh}) => {
    return <View>
        <FlatList
        data={data}
        renderItem={(item) => <CartProductComponent data={item?.item} setRefresh={setRefresh} />}
        keyExtractor={(item) => item.productid}
        />
    </View>
}

export default CartProducts