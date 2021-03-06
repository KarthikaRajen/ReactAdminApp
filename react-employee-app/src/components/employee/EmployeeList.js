import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



const getCaret = direction => {

    if (direction === 'asc') {
        return (
            <span> <i className="fa fa-sort-asc" aria-hidden="true"/></span>
        );
    }

    if (direction === 'desc') {
        return (
            <span> <i className="fa fa-sort-desc" aria-hidden="true"/></span>
        );
    }

    return (
        <span> <i className="fa fa-sort" aria-hidden="true" /></span>
    );
};



const titleFormatter = (cell, row) => {
  return `<a href=${row.watchHref} target="_blank">${cell}</a>`;
};



class EmployeeList extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };

        this.selectRowProp = {
            mode: 'radio',
            bgColor: '#c1f291',
            onSelect: props.handleRowSelect,
            clickToSelect: true, 
            hideSelectColumn: true            
        };
    }



    render() {


        return (
            <BootstrapTable data={this.props.employees}  selectRow={this.selectRowProp}  options={this.options} bordered={false} striped hover condensed>
                <TableHeaderColumn dataField="id" isKey hidden>Id</TableHeaderColumn>
                
                <TableHeaderColumn 
                    dataField="id"
                    dataFormat={titleFormatter} 
                    dataSort={true}
                    caretRender={getCaret}
                    columnTitle
                >
                    Employee ID
                </TableHeaderColumn>

                <TableHeaderColumn 
                    dataField="name"
                    dataSort={true}
                    caretRender={getCaret}
                    columnTitle
                >
                    Employee Name
                </TableHeaderColumn>

                <TableHeaderColumn 
                    dataField="address"
                    dataSort={true}
                    caretRender={getCaret}
                    columnTitle
                >
                    Address
                </TableHeaderColumn>  

                <TableHeaderColumn 
                    dataField="email"
                    dataSort={true}
                    caretRender={getCaret}
                    columnTitle
                >
                    Email
                </TableHeaderColumn>
                <TableHeaderColumn 
                    dataField="phone"
                    dataSort={true}
                    caretRender={getCaret}
                    columnTitle
                >
                    Phone
                </TableHeaderColumn>                                
            </BootstrapTable>
        );
    }

}



EmployeeList.propTypes = {
    employees: PropTypes.array.isRequired,
    handleRowSelect: PropTypes.func.isRequired
};



export default EmployeeList;
