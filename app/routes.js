import {Navigation} from 'react-native-navigation';
import Home from './container';
import Countries from './container/Countries';

export const registerRoutes = () => {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Countries', () => Countries);
};
