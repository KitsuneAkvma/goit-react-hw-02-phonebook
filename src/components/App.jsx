import React, { Component } from 'react';
import shortid from 'shortid';

import GlobalStyle from '../themes/GlobalStyles.styled';
import { Container } from './Container/Container.styled';
import { ContactCreationForm } from './ContactCreationForm/ContactCreationForm';
import { ContactsList } from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (
      this.state.contacts.filter(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      ).length >= 1
    ) {
      return alert(`Contact "${name}" is already on the list`);
    }

    this.setState({
      contacts: [
        { id: shortid.generate(), name: name, number: number },
        ...this.state.contacts,
      ],
    });

    form.reset();
  };

  handleChange = e => {
    const input = e.currentTarget;

    this.setState({ [input.name]: input.value });
  };

  handleSearch = e => {
    const input = e.currentTarget;

    this.setState({ filter: input.value });
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(input.value.toLowerCase())
    );
  };

  removeContact = e => {
    e.preventDefault();

    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== e.currentTarget.id
      ),
    });
  };
  render() {
    return (
      <>
        <GlobalStyle />
        <Container className="App">
          <ContactCreationForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          <ContactsList
            contacts={this.state.contacts}
            filter={this.state.filter}
            handleSearch={this.handleSearch}
            handleRemove={this.removeContact}
          />
        </Container>
      </>
    );
  }
}

export default App;

//Placeholder contacts
// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// { id: 'id-5', name: 'Cat Chad', number: '227-91-26' },
// { id: 'id-6', name: 'Doogie Boomer', number: '227-91-26' },
// { id: 'id-7', name: 'Annie Drown', number: '227-91-26' },
// { id: 'id-8', name: 'Eden Simpson', number: '227-91-26' },
