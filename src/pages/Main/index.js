import React, {Component} from 'react';
import {Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import {Container, Input, Form, SubmitButton} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddSubmit = async () => {
    const {newUser, users} = this.state;

    const response = await api.get(`users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
    });
    console.tron.log(data);
  };

  render() {
    const {users, newUser} = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adcionar usuário"
            value={newUser}
            onChangeText={(text) => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddSubmit}
          />
          <SubmitButton onPress={this.handleAddSubmit}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
