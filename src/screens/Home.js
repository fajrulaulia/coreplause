import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChattScreen from './Chatt';
import ProfileScreen from './Profile';

const Tab = createBottomTabNavigator();


const Home = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Chatt"
                options={{
                    title: 'Chatt Room',
                    tabBarLabel: 'Chatt',
                    showIcon: true,
                    tabBarIcon: () => <Icon name="commenting" size={25} color="#000" />
                }}
                component={ChattScreen} />
            <Tab.Screen
                name="Profile"
                options={{
                    title: 'My Profile',
                    tabBarLabel: 'Profile',
                    showIcon: true,
                    tabBarIcon: () => <Icon name="user" size={25} color="#000" />
                }}
                component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default Home;