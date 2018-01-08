import * as ActionTypes from './ActionTypes.js'

export const setbgcolor = (color) => {
  console.log(color)
  return {
    type: ActionTypes.SETBGCOLOR,
    color: color
  }
}