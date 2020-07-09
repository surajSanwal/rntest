import {Navigation} from 'react-native-navigation';
import {registerRoutes} from './app/routes';
import {home} from './app/navigator';

Navigation.events().registerAppLaunchedListener(() => {
  registerRoutes();
  home();
});
