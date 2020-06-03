import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, IndexPath, Icon, Text, StyleService, useStyleSheet, Layout } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';

const { Navigator, Screen } = createDrawerNavigator();
import Home from '@screen/home';
import Favourites from '@screen/favourites';
import NewsWithCategory from '@screen/newsWithCategory';
import Notifications from '@screen/notifications';
import Profile from '@screen/profile';
import store from '@redux/stores'
import { toggleTheme } from '@redux/actions/commonActions';
import Lang from '@lang';

const HomeIcon = (props) => (
  <Icon {...props} name='home-outline' />
);

const BookmarkIcon = (props) => (
  <Icon {...props} name='bookmark-outline' />
);

const CategoriesIcon = (props) => (
  <Icon {...props} name='list-outline' />
);

const NotificationIcon = (props) => (
  <Icon {...props} name='bell-outline' />
);

const ProfileIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const header = ({ userData, theme }) => {

  const styles = useStyleSheet(themedStyle);
  const [toggle, setToggle] = React.useState(theme === 'dark' ? true : false);
 
  const handleToggle = async () => {
    await store.dispatch(toggleTheme(!toggle));
    setToggle(!toggle);
  }

  return (
    <Layout style={styles.header}>
      <Text category='h6'>{userData.fullname}</Text>
      <Ripple onPress={handleToggle}>
        <Icon style={styles.icon} fill={styles.icon.color} name={toggle === true ? 'sun-outline' : 'moon'} />
      </Ripple>
    </Layout>
  )
}

const DrawerContent = ({ navigation, state }) => {

  const mapStateToProps = state => state.common;

  return (
    <Drawer
      header={connect(mapStateToProps)(header)}
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => navigation.navigate(state.routeNames[index.row])}>
      <DrawerItem title={Lang('nav.home')} accessoryLeft={HomeIcon} />
      <DrawerItem title={Lang('nav.categories')} accessoryLeft={CategoriesIcon} />
      <DrawerItem title={Lang('nav.notifications')} accessoryLeft={NotificationIcon} />
      <DrawerItem title={Lang('nav.saved')} accessoryLeft={BookmarkIcon} />
      <DrawerItem title={Lang('nav.profile')} accessoryLeft={ProfileIcon} />
    </Drawer>
  );
}

export const DrawerNavigator = () => (
  <Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Screen name="Home" component={Home} />
    <Screen name='Categories' component={NewsWithCategory} />
    <Screen name='Notifications' component={Notifications} />
    <Screen name='Favourites' component={Favourites} />
    <Screen name='Profile' component={Profile} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
);

const themedStyle = StyleService.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    width: 25,
    height: 25,
    color: 'color-primary-500'
  }
});