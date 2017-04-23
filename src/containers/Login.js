import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import {Login} from '../actions/accountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        hasError: state.hasError,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: ({username,password}) => {
            dispatch(Login(username,password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);