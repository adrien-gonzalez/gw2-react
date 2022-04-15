import { createStore } from 'redux';
import appStore from './reducers/appReducers';

export default createStore(appStore);