import {createStore} from 'redux'
import reducer from './Reducer'
import {AsyncStorage} from 'react-native'


AsyncStorage.getItem('bgColor', (error, result) => {
  if(error) {
    console.log('取值失败' + result)
  }else {
    console.log(result)
  }
})

const initColor = {
  'color': 'red'
}

const store = createStore(reducer, initColor)
export default store



