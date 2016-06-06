import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import Auth from '../services/AuthService';

export const form = 'sign';
export const fields = ['email', 'password'];

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  signIn(data) {
    console.log(data);
    // Here, we call an external AuthService. We’ll create it in the next step
    Auth.signIn(data.email, data.password)
      .then(user => {
        // TODO: refactor to use push action creator
        this.props.onSignIn(user);
        browserHistory.push('/dashboard');
      });
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    return (
      <div className="container">
        <h1 className="center">Sign In</h1>
        <div className="row">
          <form className="col s8 offset-s2" onSubmit={handleSubmit(this.signIn)}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  { ...email }
                />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  { ...password }
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row center">
              <div className="col s12">
                <button type="submit" className="btn-large blue lighten-2">
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  onSignIn: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form,
  fields,
})(SignInForm);
