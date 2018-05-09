import * as ActionType from './ActionType';
import EmployeeApi from '../api/EmployeeApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';



export const getEmployeesResponse = courses => ({
    type: ActionType.GET_EMPLOYEES_RESPONSE,
    courses
});



export function getCoursesAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return EmployeeApi.getAllEmployees()
            .then(courses => {
                dispatch(getEmployeesResponse(courses));
            }).catch(error => {
                throw error;
            });
    };
}



export const addNewCourseResponse = () => ({
    type: ActionType.ADD_NEW_COURSE_RESPONSE
});



export const updateExistingCourseResponse = () => ({
    type: ActionType.UPDATE_EXISTING_COURSE_RESPONSE
});



export function saveEmployeeAction(employee) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());
        return EmployeeApi.saveEmployee(employee)
            .then(() => {
                if (employee.id) {
                    dispatch(updateExistingCourseResponse());
                } else {
                    dispatch(addNewCourseResponse());
                }
            }).then(() => {
                dispatch(getCoursesAction());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}



export const getCourseResponse = courseFound => ({
    type: ActionType.GET_COURSE_RESPONSE,
    course: courseFound
});



export function getCourseAction(empId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return EmployeeApi.getEmployee(empId)
            .then(course => {
                dispatch(getCourseResponse(course));
            }).catch(error => {
                throw error;
            });
    };
}



export const deleteCourseResponse = () => ({
    type: ActionType.DELETE_COURSE_RESPONSE
});



export function deleteCourseAction(courseId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return EmployeeApi.deleteCourse(courseId)
            .then(() => {
                dispatch(deleteCourseResponse());
            }).then(() => {
                dispatch(getCoursesAction());
            }).catch(error => {
                throw error;
            });
    };
}