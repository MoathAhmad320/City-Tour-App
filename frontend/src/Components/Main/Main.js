import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import MyTrips from '../MyTrips/MyTrips'
import Header from '../Header/Header'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())}
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){
        return(
            <div>
                
                {this.props.token.token !== undefined ?
                        <div>
                            <Header handleClick={this.handleLogout}/> 
                            <Redirect to='/home'/>
                        </div>  
                    : 
                    <Header handleClick={this.handleLogout}/> 
                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/home' component={() => <Home/>}/>
                    <Route path='/mytrips' component={() => <MyTrips/>}/>
                    <Redirect to='/login'/>
                </Switch>
            </div>
        )
    }
} 
// this.props.token.token !== undefined ? () => <Home/> : null
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));