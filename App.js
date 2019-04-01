import React from 'react';
import { StackNavigator } from 'react-navigation';
import FirstScreen from "./components/FirstScreen";
import ZScreen from './components/ZScreen';
import SecondScreen from './components/SecondScreen';
import ThirdScreen from './components/ThirdScreen';

const Navigation = StackNavigator({
    First:{screen: FirstScreen},
    Second:{screen: SecondScreen,},
    Third:{screen: ThirdScreen},
    Z:{screen: ZScreen},
});

export default Navigation;