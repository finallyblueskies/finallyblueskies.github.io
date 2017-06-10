import './style.scss';
import React from 'react';
import Form from 'contact/form';
import Page from 'page';

class Contact extends React.Component {
  constructor() {}

  render() {
    return (
      <Page>
        <Form />
      </Page>
    );
  }
}

export default Contact;
