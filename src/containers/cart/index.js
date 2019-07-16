import React, {Fragment} from 'react'
import {withRouter} from "react-router";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ProductList from '../../components/cart'
import {fetchProducts as fetchProductsAsAction,
        changeProducts as changeProductsAsAction} from "../../actions/products";


class Cart extends React.Component {
    state = {count: 0}

    componentDidMount() {
        this.props.fetchProductsAsAction()
        this.timer = setInterval(this.tick, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    tick = () => {
        this.setState({count: (this.state.count + 1)})
        if(this.state.count%3===0){
            this.props.changeProductsAsAction(this.props.data)
        }
    }

    render() {
        const {data, fetching} = this.props
        return (
            <Fragment>
                <ProductList data={data} fetching={fetching}/>
                <div>Loading{"...".substr(0, this.state.count % 3 + 1)}</div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    fetching: state.application.getIn(['products', 'fetching']),
    data: state.application.getIn(['products', 'data']),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProductsAsAction,
    changeProductsAsAction

}, dispatch);


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Cart)
)