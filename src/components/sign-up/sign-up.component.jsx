import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Passwords don\'t match');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
    catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    
    this.setState({[name]: value});
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span className='subtitle'>Sign up with your email and password</span>

        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput 
            type='text'
            name='displayName'
            label='Display Name'
            value={displayName}
            onChange={this.handleChange}
            required
          />

          <FormInput 
            type='email'
            name='email'
            label='Email'
            value={email}
            onChange={this.handleChange}
            required
          />

          <FormInput 
            type='password'
            name='password'
            label='Password'
            value={password}
            onChange={this.handleChange}
            required
          />

          <FormInput 
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            value={confirmPassword}
            onChange={this.handleChange}
            required
          />

          <CustomButton type='submit'>
            SIGN UP
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;