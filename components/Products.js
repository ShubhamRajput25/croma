import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import ProductCart from "./ProductCart";
import Icon from "react-native-vector-icons/MaterialIcons";

const Products = ({ data , wishlist=[]}) => {
    const [visibleCount, setVisibleCount] = useState(4);
    const [expanded, setExpanded] = useState(false);

    const handleViewMore = () => {
        setVisibleCount(expanded ? 4 : data?.length >= 8 ? 8 :data?.length); // Toggle full list
        setExpanded(!expanded);
    };
 
    return (
        <View>
            <FlatList 
                data={data.slice(0, visibleCount)}
                numColumns={2}
                renderItem={({ item }) => <ProductCart multiple={true} item={item} wishlist={wishlist} />}
                keyExtractor={(item) => item.brandid}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
                nestedScrollEnabled={true}
                ListFooterComponent={
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 6,
                                paddingHorizontal: 10,
                                marginVertical: 7,
                                alignSelf: "flex-end", 
                                marginRight: 10,
                            }}
                            onPress={handleViewMore}
                        >
                            <Icon name={expanded ? "arrow-drop-up" : "arrow-drop-down"} size={18} color="black" />
                            <Text style={{ color: "black", fontSize: 10, fontWeight: "bold"}}>
                                {expanded ? "View Less" : "View More"}
                            </Text>
                        </TouchableOpacity>
                 
                }
            />
        </View>
    );
};

export default Products;
