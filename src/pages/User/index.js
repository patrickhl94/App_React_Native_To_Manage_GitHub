import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Avatar,
  Bio,
  Name,
  Stars,
  Starred,
  OwnerAvatar,
  Title,
  Info,
  Author,
} from './styles';
import api from '../../services/api';

export default class User extends Component {
  state = {
    stars: [],
  };

  static propTypes = {
    navigation: PropTypes.shape({
      setOptions: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.object,
      }).isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    const {user} = this.props.route.params;
    const {navigation} = this.props;
    navigation.setOptions({title: user.name});

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({stars: response.data});
  }

  render() {
    const {stars} = this.state;
    const {user} = this.props.route.params;
    console.tron.log(user);
    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name> {user.name} </Name>
          <Bio> {user.bio} </Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={(star) => String(star.id)}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
