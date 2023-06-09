import axios from "axios";


const getDogs = () =>{
    return async function (dispatch){
        const response = await axios.get("https://back-lxoj.onrender.com/dogs");
        const apiData = response.data;
        dispatch({
            type: "GET_DOGS",
            payload: apiData
    })
};
};

const getTemperaments = () =>{
return async function (dispatch){
    const response = await axios.get("https://back-lxoj.onrender.com/temperaments/");
    const apiTemperaments = response.data;
    dispatch({
        type: "GET_TEMPERAMENTS",
        payload: apiTemperaments
})
};
};

const filterCharactersByStatus = (payload)=>{
return{
    type: "FILTER_BY_STATUS",
    payload: payload
}
}
const orderBy = (payload) => {
    return{
        type: "ORDER_BY",
        payload: payload
    }
}
const temperaments = (payload) => {
    return{
        type: "FILTER_TEMPERAMENT",
        payload: payload
    }
}
const searchDog = (payload) => {
    return{
        type: "SEARCH_DOG",
        payload: payload
    }
}
const getDetail = (id) =>{
    return async function (dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch ({
                type: "GET_DETAIL",
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
    }
}
const postDog = (payload) => {
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/dogs/", payload)
        return response;
    }
}
const clearDetail = () => {
    return {
        type: "CLEAR_DETAIL"
    };
};

export {getDogs, getTemperaments, filterCharactersByStatus, orderBy, temperaments, searchDog, getDetail, postDog, clearDetail};
