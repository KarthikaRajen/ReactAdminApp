import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as courseAction from '../../action/EmployeeAction';
import EmployeeList from './EmployeeList';



export class EmployeeListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedEmployeeId: undefined};

        this.handleAddEmployee = this.handleAddEmployee.bind(this);
        this.handleEditEmployee = this.handleEditEmployee.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }


    componentDidMount() {
        this.props.action.getCoursesAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleAddEmployee() {
        this.props.history.push('/employee');
    }



    handleEditEmployee() {
        const selectedEmployeeId = this.state.selectedEmployeeId;

        if (selectedEmployeeId) {
            this.setState({selectedEmployeeId: undefined});            
            this.props.history.push(`/employee/${selectedEmployeeId}`);
        }        
    }



    handleDelete() {
        const selectedEmployeeId = this.state.selectedEmployeeId;

        if (selectedEmployeeId) {
            this.setState({selectedEmployeeId: undefined});                        
            this.props.action.deleteCourseAction(selectedEmployeeId)
                .catch(error => {
                    toastr.error(error);
                });
        }
    }



    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedEmployeeId: row.id});
        }
    }



    render() {
        const { employees } = this.props;

        if (!employees) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Admin Employee Management</h1>                        
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleAddEmployee}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> New
                            </button>

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleEditEmployee}                                
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>                                

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleDelete}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}/> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <EmployeeList employees={employees} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    employees: state.employeesReducer.employees
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(courseAction, dispatch)

});



EmployeeListContainer.propTypes = {
    employees: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListContainer);
