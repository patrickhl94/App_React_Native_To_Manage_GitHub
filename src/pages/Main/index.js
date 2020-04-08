import React from 'react';
import {Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Input, Form, SubmitButton} from './styles';

export default function Main() {
  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adcionar usuário"
        />
        <SubmitButton>
          <Icon name="add" size={20} color="#fff" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
