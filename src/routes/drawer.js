import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, IndexPath, Icon } from '@ui-kitten/components';

const { Navigator, Screen } = createDrawerNavigator();
import Home from '@screen/home';
import Favourites from '@screen/favourites';

const HomeIcon = (props) => (
  <Icon {...props} name='home-outline'/>
);

const BookmarkIcon = (props) => (
  <Icon {...props} name='bookmark-outline'/>
);

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title='Home' accessoryLeft={HomeIcon} />
    <DrawerItem title='Saved' accessoryLeft={BookmarkIcon} />
  </Drawer>
);

export const DrawerNavigator = () => (
  <Navigator drawerContent={props => <DrawerContent {...props}/>}>
    <Screen name="Home" component={Home} />
    <Screen name='Favourites' component={Favourites}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <DrawerNavigator/>
  </NavigationContainer>
);