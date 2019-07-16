import React, {Fragment} from 'react'
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import Table from 'react-bootstrap/Table'

class ProductList extends React.Component{

    render() {
        const {data, fetching} = this.props
        return (
            <Fragment>
                <Table bordered hover striped>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, key) =>(
                        <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}

ProductList.propTypes = {
    fetching: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
};

export default withRouter(ProductList)
