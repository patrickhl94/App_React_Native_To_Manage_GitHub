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
    page: 1,
    refreshing: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      setOptions: PropTypes.func,
      navigate: PropTypes.func,
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
    const {page} = this.state;
    navigation.setOptions({title: user.name});

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({stars: response.data, loading: false, page: page + 1});
  }

  handleLoadMore = async () => {
    const {page, stars} = this.state;
    const {user} = this.props.route.params;

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    if (response.data[0]) {
      this.setState({
        stars: [...stars, ...response.data],
        page: page + 1,
      });
    }
  };

  refreshList = async () => {
    const {user} = this.props.route.params;

    this.setState({refreshing: true});

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({stars: response.data, refreshing: false});
  };

  handleWebView = ({html_url, name}) => {
    const {navigation} = this.props;

    navigation.navigate('Repository', {html_url, name});
  };

  render() {
    const {stars} = this.state;
    const {user} = this.props.route.params;
    const {loading, refreshing} = this.state;

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
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.5}
            onEndReached={this.handleLoadMore}
            data={stars}
            keyExtractor={(star) => String(star.id)}
            renderItem={({item}) => (
              <Starred onPress={() => this.handleWebView(item)}>
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
