import delay from './delay';
import axios from 'axios';

class EmployeeApi {
    static getAllEmployees() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get("/employees").then((response) => {
                    resolve(response.data.response);
                  }).catch((error) => {
                    reject(error);
                  });
            }, delay);
        });
    }

    static saveEmployee(course) {
        course = Object.assign({}, course); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post("/employees/add",{course}).then((response) => {
                resolve(response.data.response);
              }).catch((error) => {
                reject(error);
              });
            }, delay);
        });
    }

    static deleteCourse(empId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                axios.post("/employees/delete",{empId}).then((response) => {
                resolve();
            }, delay);
            });
        });
    }


    static getEmployee(empId) {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                axios.get("/employees/edit/"+ empId).then((response) => {
                    resolve(response.data.response[0]);
                  }).catch((error) => {
                    reject(error);
                  });    
            }, delay);
        });
    }

}

export default EmployeeApi;
