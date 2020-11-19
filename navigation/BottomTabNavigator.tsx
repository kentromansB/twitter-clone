import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import {useEffect, useState} from 'react';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getUser} from '../graphql/queries';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, HomeNavigatorParamList, TabTwoParamList } from '../types';
import ProfilePicture from '../components/ProfilePicture';
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,
       }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-notifications-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
      name="Messages"
      component={TabTwoNavigator}
      options={{
        tabBarIcon: ({ color }) => <TabBarIcon name="ios-mail" color={color} />,
      }}
    />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeNavigatorParamList>();

function HomeNavigator() {

const [user, setUser] = useState(null);

  useEffect(() => {
    //get the current user
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

        if(!userInfo){
          return;
        }

       try{
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub}))
        if(userData) {
          setUser(userData.data.getUser);
        }
       }
       catch (e) {

       }
    }
  }, [])

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          
          headerTitle: () => (<Ionicons name={"logo-twitter"}
                                        color={"#4D9FEC"}
                                        size={30}/>),
          headerTitleAlign: 'center',
          headerRight: () => (
          <MaterialCommunityIcons name={"star-four-points-outline"} size={30} color={"#4D9FEC"}/>),                  
          headerRightContainerStyle:{ marginRight:15 },
          headerLeft: () => (
          <ProfilePicture size={40} image={'https://scontent.fmnl4-1.fna.fbcdn.net/v/t1.0-9/121300027_2468643766769347_5349814497150407643_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGI1Zqt5lX7cPhk9sfWNnzwwEAUm88EM4rAQBSbzwQzim4w0AsOYvKTghWv_lV6G5d20uhEGY7PUlRDUCjwv_lf&_nc_ohc=TI483L42mQYAX_VRdWn&_nc_ht=scontent.fmnl4-1.fna&oh=c3b64820e0cc970bab9f67d61cc36779&oe=5FDBBE76'} /> ),
         headerLeftContainerStyle:{ marginLeft:15 }                           
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
