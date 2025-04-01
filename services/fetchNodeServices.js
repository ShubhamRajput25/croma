import axios from "axios"

const serverurl = "http://192.168.29.247:5000"

const getData = async(url) => {
    try{
     let result = await axios.get(`${serverurl}/${url}`)
     let data = result?.data
     if(data){
            return data
     }else{
            return null
     }
    }catch(err){
        return null
    }
}

const postData=async (url,body)=>{
    try{    
        let response=await axios.post(`${serverurl}/${url}`,body)
        let data=response.data
        if(data){
            return data
        }else{
                return null
        }
    }
    catch(e)
    {
        return null
    }
}

export {getData, postData, serverurl}