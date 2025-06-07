import 'react-native-reanimated';
import RootNavigator from './components/RootNavigator';
import { Provider } from 'react-redux';
import store from './storage/store';

export default function App() {

  return (
    <Provider store={store}>
    <RootNavigator />
    </Provider>
  );
}
