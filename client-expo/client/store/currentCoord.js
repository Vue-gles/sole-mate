import axios from 'axios'

const SET_CURRENT_COORDS='SET_CURRENT_COORDS'

const setCurrentCoords=(coords)=>({
    type:SET_CURRENT_COORDS,
    coords
})

export const setCurrentCoordsThunk=(coords)=>async dispatch=>{
    try{
        const {data}=await axios.put(`${process.env.BACKEND_HOST}/api/users/current`,coords)
    
        dispatch(setCurrentLong(data))
    }catch(err){
        console.log('Error:', err);
    }
}

let initialState=[null,null]

export default currentCoords=(state=initialState,action)=>{
    switch(action.type){
        case SET_CURRENT_COORDS:
            state[0]=action.lat
            state[1]=action.long
            return state
        default:
            return state
    }
}