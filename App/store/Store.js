import {createStore} from 'redux'
import reducer from './Reducer'

const initColor = {
  'color': 'red'
}

const store = createStore(reducer, initColor)

export default store