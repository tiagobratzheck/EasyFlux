import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './views/login';
import UserRegister from './views/userRegister';
import Home from './views/home';
import Registro from './views/registro';
import "./services/dbConnect";

import { LogBox } from 'react-native'
import EmployeeRegister from './views/employeeRegister';
import Employees from './views/employess';
import AnalyticsFluxo from './views/analyticsFluxo';
import AnalyticsSaldo from './views/analyticsSaldo';

import About from './informations/about';
import Faq from './informations/faq';
import TechInfo from './informations/techInfo';

import { Provider as StoreProvider } from 'react-redux'
import store from './services/store';


LogBox.ignoreLogs(['Setting a timer',
  'Non-serializable values were found in the navigation state',
  'Failed prop type: The prop `region.latitudeDelta`'])
  
const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="userRegister" component={UserRegister} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="analyticsFluxo" component={AnalyticsFluxo} />
          <Stack.Screen name="analyticsSaldo" component={AnalyticsSaldo} />
          <Stack.Screen name="registro" component={Registro} />
          <Stack.Screen name="employeeRegister" component={EmployeeRegister} />
          <Stack.Screen name="employees" component={Employees} />
          <Stack.Screen name="about" component={About} />
          <Stack.Screen name="faq" component={Faq} />
          <Stack.Screen name="techinfo" component={TechInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

