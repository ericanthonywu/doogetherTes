import React from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import TodoList from './screen/TodoList';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Post from './screen/Post';
import Location from './screen/Location';

const defaultNavigator = createMaterialBottomTabNavigator({
    TodoList: {
        screen: TodoList,
        navigationOptions: {
            tabBarLabel: 'TodoList',
            tabBarIcon: ({tintColor}) => (
                <View>
                    <EntypoIcon style={[{color: tintColor}]} size={25} name={'list'}/>
                </View>
            ),

        },
    },
    Post: {
        screen: Post,
        navigationOptions: {
            tabBarLabel: 'Post',
            tabBarIcon: ({tintColor}) => (
                <View>
                    <AntDesignIcon style={[{color: tintColor}]} size={25} name={'idcard'}/>
                </View>
            ),

        },
    },
    Location: {
        screen: Location,
        navigationOptions: {
            tabBarLabel: 'Location',
            tabBarIcon: ({tintColor}) => (
                <View>
                    <EntypoIcon style={[{color: tintColor}]} size={25} name={'location'}/>
                </View>
            ),
        },
    },
});

export default createAppContainer(defaultNavigator);
