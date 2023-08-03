import React from "react";
import { Link, Navigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";


class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        login: '',
        password: ''
      },
      errors: {},
      formValid: false,
      authResult: {
        token: '',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  handleChange(event) {
    console.log('handleChange working');
    console.log('before handleChange=', this.state.formValid);

    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.validate();
    this.setState({
        input
    })
    console.log('after handleChange=', this.state.formValid)
  }

  // async пишем, чтобы использовать await fetch внутри handleSubmit
  // fetch - then - then не работает, в последнем then setState и json теряются,
  // this там тоже теряется
  async handleSubmit(e) {
    e.preventDefault();
    const formValidated = this.validate()
    if (formValidated) {
        console.log(this.state);
        let input = {};
        input['login'] = '';
        input['password'] = '';
        this.setState({input:input});

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        console.log("запускаем fetch в LoginForm");
          
        let response = await fetch("http://127.0.0.1:8000/auth/token/login",
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                     'Accept': 'application/json'},
            body: `{ "username": "${this.state.input.login}", "password": "${this.state.input.password}" }`
          });

          if (response.ok) {
            let json = await response.json();
            console.log("json after await fetch = ", json);
            
            // в setState помещать необязательно?
            let result = {};
            result['token'] = json.auth_token;
            console.log('result = ', result);
            this.setState({authResult:result});
          
            console.log('json.auth_token =', json.auth_token);

            localStorage.setItem('token', json.auth_token);
            localStorage.setItem('user', formJson.login);

          } else {
            alert('Ошибка HTTP: ' + response.status);
          }
          
    } else {
        console.log('form validate = ', formValidated)
    }
  }

validate() {
    console.log('validate is working');
    console.log('before validate=', this.state.formValid)

    let input = this.state.input;
    let errors = {};
    let isValid = true;
    let isValidLogin = true;
    let isValidPassword = true;

    if (!input['login']) {
        isValidLogin = false;
        errors['login'] = 'Введите логин';
    }

    if (!input['password']) {
        isValidPassword = false;
        errors['password'] = 'Введите пароль';
    }

    
    isValid = isValidLogin && isValidPassword;

    this.setState({
        errors: errors,
        formValid: isValid
    });

    console.log('after validate=', this.state.formValid)

    return isValid;

  }

  render() {
    return (
        <React.Fragment>        
            <Header />
            <div className="container">
              <section className="section-main-panel">
                <h2>Авторизация в системе</h2>
                <h3>при успешной авторизации вас переадресует на главную страницу</h3>
                <div>
                  <form method='post' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                      <label htmlFor='login'>Логин</label>
                        <input
                          type='text'
                          name='login'
                          value={this.state.input.login}
                          onChange={this.handleChange}
                          className='form-control'
                          id='login'
                          required
                        />
                      <div className='text-danger'>{this.state.errors.login}</div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='password'>Пароль</label>
                      <input
                        type='password'
                        name='password'
                        value={this.state.input.password}
                        onChange={this.handleChange}
                        className='form-control'
                        id='password'
                        required
                      />
                    <div className='text-danger'>{this.state.errors.password}</div>
                    </div>
                    <input type='submit' disabled={!this.state.formValid} value='Войти' className='login-form-btn' />
                  </form>
                </div>
                {!!this.state.authResult.token && (<Navigate to='/' replace={true} />)}
                <Link to="/">Вернуться на главную страницу</Link>
              </section>
            </div>
            <Footer />
        </React.Fragment>
    );
  }
}

export default LoginForm;
