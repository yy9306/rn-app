import * as ActionTypes from './ActionTypes.js'

export default (state, action)=> {
  const {color} = action
  switch (action.type) {
    case ActionTypes.SETBGCOLOR:
      return {
        ...state, color: color
      }
    default:
      return state
  }
}