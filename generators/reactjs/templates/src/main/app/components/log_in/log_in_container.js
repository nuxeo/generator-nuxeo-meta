import { connect } from 'react-redux';
import { getCurrentUser, setCurrentUser } from '../../actions/user_actions';
import LogIn from './log_in.jsx';

const mapStateToProps = ({ currentUser }) => ({
    currentUser: currentUser
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentUser: (signIn, callback) => dispatch(getCurrentUser(signIn, callback)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const LogInContainer = connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default LogInContainer;