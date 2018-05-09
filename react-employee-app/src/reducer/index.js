import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import employeesReducer from './employeesReducer';
import selectedCourseReducer from './selectedCourseReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    employeesReducer,
    selectedCourseReducer,
    apiReducer,
    form: formReducer    
});


