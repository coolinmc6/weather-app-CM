import { FETCH_WEATHER } from '../actions/index'

export default function(state = [], action) {
	switch(action.type){
		case FETCH_WEATHER:
			// the line below inserts our data to the front of the array; this avoids mutating the array
			return [action.payload.data, ...state]
			// return state.concat([action.payload.data]);
		default:
			return state;	
	}
	
}

