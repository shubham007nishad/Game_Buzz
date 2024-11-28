import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import LeaderBoard from '../screens/LeaderBoard';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/homescreen';
import FeedScreen from '../screens/feedscreen';
import { TabBar } from '../components/TabBar';




const Tab = createBottomTabNavigator({
  tabBar: (props) => <TabBar {...props} />,
  screens: {
    Home: HomeScreen,
    Feed: FeedScreen,
    Profile: ProfileScreen,
  },
});

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} tabBar= {(props) => <TabBar {...props}/>}>

      <Tab.Screen name="home" component={HomeScreen}/>
      <Tab.Screen name="feed" component={FeedScreen}/>
      <Tab.Screen name="profile" component={ProfileScreen}/>
      
    </Tab.Navigator>
  )
}