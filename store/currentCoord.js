import axios from 'axios'

const SET_CURRENT_LAT='SET_CURRENT_LAT'
const SET_CURRENT_LONG='SET_CURRENT_LONG'

const setCurrentLat=(lat)=>({
    type:SET_CURRENT_LAT,
    lat
})

const setCurrentLong=(long)=>({
    type:SET_CURRENT_LONG,
    long
})

export const setCurrentLatThunk=(lat)=>async dispatch=>{
    try{
        const {data}=await axios.put(`${process.env.BACKEND_HOST}/api/users/lat`,lat)
        dispatch(setCurrentLat(data))
    }catch(err){
        console.log('Error:', err);
    }
}

export const setCurrentLongThunk=(long)=>async dispatch=>{
    try{
        const {data}=await axios.put(`${process.env.BACKEND_HOST}/api/users/long`,long)
        dispatch(setCurrentLong(data))
    }catch(err){
        console.log('Error:', err);
    }
}

let initialState=[null,null]

export default currentCoords=(state=initialState,action)=>{
    switch(action.type){
        case SET_CURRENT_LAT:
            return state[0]=action.lat
        case SET_CURRENT_LONG:
            return state[1]=action.long
        default:
            return state
    }
}