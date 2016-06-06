import { connect } from 'react-redux';
import { signIn } from '../actions';
import SignInForm from '../components/SignInForm';

const mapStateToProps = props => (props);
const mapDispatchToProps = (dispatch) => ({
  onSignIn: user => {
    dispatch(signIn(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
