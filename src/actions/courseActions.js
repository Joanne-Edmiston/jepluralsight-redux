import * as types from './actionTypes.js';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses){
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function updateCourseSuccess(savedCourse){
    return {type: types.UPDATE_COURSE_SUCCESS, savedCourse};
}

export function createCourseSuccess(savedCourse){
    return {type: types.CREATE_COURSE_SUCCESS, savedCourse};
}

export function loadCourses(){

    return function(dispatch){

        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            // temporary placholder
            throw(error);
        });
    };

}

export function saveCourse(course){
    return function (dispatch, getState){
        
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id 
                ? dispatch(updateCourseSuccess(savedCourse))
                : dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            throw(error);
        });
    }
}