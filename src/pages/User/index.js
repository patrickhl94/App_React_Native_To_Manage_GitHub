import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';

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
    loading: false,
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
    this.setState({loading: true});
    const {user} = this.props.route.params;
    const {navigation} = this.props;
    navigation.setOptions({title: user.name});

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({stars: response.data, loading: false});
  }

  render() {
    const {stars} = this.state;
    const {user} = this.props.route.params;
    const {loading} = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name> {user.name} </Name>
          <Bio> {user.bio} </Bio>
        </Header>

        {loading ? (
          <ActivityIndicator
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            size={80}
            color="#7159c1"
          />
        ) : (
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
        )}
      </Container>
    );
  }
}
