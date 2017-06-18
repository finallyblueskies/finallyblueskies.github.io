import './style.scss';
import React from 'react';
import Form from 'contact/form';
import Page from 'page';
import axios from 'axios';
import { isEmpty } from 'ramda';

class Contact extends React.Component {
  constructor() {
    this.state = {
      email: '',
      message: '',
      submitting: false,
      errors: [],
      sent: false
    };
    this.updateValue = this.updateValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateValue(e) {
    const name = e.target.getAttribute('name');
    this.setState({
      [name]: e.target.value
    });
  }

  validate() {
    const { email, message } = this.state;
    const emailMatch = email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const errors = {};
    if (!emailMatch) {
      errors.email = 'Not a valid email.';
    }
    if (isEmpty(message)) {
      errors.message = 'No message body.';
    }
    this.setState({
      errors
    });
    return isEmpty(errors);
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, message } = this.state;
    if (this.validate()) {
      this.setState({
        submitting: true
      });

      //Setupp formspree payload
      const payload = new FormData();
      payload.set('email', email);
      payload.set('message', message);

      axios
        .post(`http://formspree.io/bogdanvp@gmail.com`, payload)
        .then(response => {
          this.setState(
            {
              sent: true,
              submitting: false
            },
            () =>
              setTimeout(() => {
                this.setState({
                  sent: false
                });
              }, 3000)
          );
        })
        .catch(function(error) {
          alert(
            'There was a problem sending the message. Please try again later.'
          );
          this.setState({
            submitting: false
          });
        });
    }
  }

  render() {
    const { updateValue, onSubmit } = this;
    const { email, message, submitting, errors, sent } = this.state;
    return (
      <Page>
        <Form
          {...{
            updateValue,
            onSubmit,
            email,
            message,
            submitting,
            errors,
            sent
          }}
        />
      </Page>
    );
  }
}

export default Contact;
