import { FlatList, View } from "react-native"
import CartProductComponent from "./CartProductComponent"

const CartProducts = ({data}) => {
    return <View>
        <FlatList
        data={data}
        renderItem={(item) => <CartProductComponent data={item} />}
        keyExtractor={(item) => item.productid}
        />
    </View>
}

export default CartProducts