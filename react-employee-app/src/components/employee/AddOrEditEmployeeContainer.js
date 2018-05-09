import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as employeeAction from '../../action/EmployeeAction';
import EmployeeForm from './EmployeeForm'; // eslint-disable-line import/no-named-as-default


export class AddOrEditEmployeeContainer extends React.Component {


    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }



    componentDidMount() {
        this.props.action.getCourseAction(this.props.match.params.id)
            .catch(error => {
                toastr.error(error);
            });

        this.props.action.getAuthorsAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleSave(values) {
        const course = {
            id: values.id,
            title: values.title,
            watchHref: values.watchHref,
            authorId: values.authorId,
            length: values.length,
            category: values.category
        };

        this.props.action.saveEmployeeAction(course)
            .then(() => {
                toastr.success('Employee saved');
                this.props.history.push('/employees');
            }).catch(error => {
                toastr.error(error);
            });
    }



    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/employees');
    }



    render() {
        const { initialValues } = this.props;
        const heading = initialValues && initialValues.id ? 'Edit' : 'Add';

        return (
            <div className="container">
                <EmployeeForm
                    heading={heading}
                    authors={this.props.authors}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.props.initialValues}
                />
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const courseId = ownProps.match.params.id; //from the path '/employee/:id'

    if (courseId && state.selectedCourseReducer.course && (Number.parseInt(courseId,10) === state.selectedCourseReducer.course.id)) {
        return {
            initialValues: state.selectedCourseReducer.course,
        };
    }
};



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({...employeeAction }, dispatch)
});



AddOrEditEmployeeContainer.propTypes = {
    action: PropTypes.object.isRequired,
    history: PropTypes.object,
    authors: PropTypes.array,
    initialValues: PropTypes.object,
    match: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditEmployeeContainer);
