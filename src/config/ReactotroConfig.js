import Reactotro from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotro.configure().useReactNative().connect();

  console.tron = tron;

  tron.clear();
}
