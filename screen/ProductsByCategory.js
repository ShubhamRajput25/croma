import { useEffect, useState } from "react"
import { getData } from "../services/fetchNodeServices"
import ShowSearchedProducts from "../components/ShowSearchedProducts"

const { View, Text, ScrollView } = require("react-native")

const ProductsByCategory = ({navigation, route}) => {
    const { categoryid } = route?.params || ''
    const [searchedProducts, setSearchedProducts] = useState([])
    const [loading, setLoading] = useState(false)
    console.log("aaaaaaaaaaaaaaa: ", categoryid)
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const response = await getData(`products/fetch_products_by_category/${categoryid}`)
            if (response?.status === true) {
                // console.log(response?.data)
                setSearchedProducts(response?.data)
            } else {
                setSearchedProducts([])
            }
        } catch (error) { 
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [categoryid])

    return (
       <ScrollView>
        <View>
            <ShowSearchedProducts data={searchedProducts} />
        </View>
       </ScrollView>
    )
}

export default ProductsByCategory