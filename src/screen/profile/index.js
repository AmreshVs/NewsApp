import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, useStyleSheet, Layout, Icon, Button } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';

import themedStyle from './style';
import Lang from '@lang';
import DrawerNav from '@comp/drawerNav';
import { CityStateData } from '@const/cityState';
import { useAxios } from '@hooks';
import { VIEW_PROFILE, EDIT_PROFILE } from '@api';
import Loader from '@comp/loader';
import { setUserData } from '@redux/actions/commonActions';

const Profile = (props) => {

  const styles = useStyleSheet(themedStyle);

  const [edit, setEdit] = React.useState(false);
  const [cityState, setCityState] = React.useState('');
  const [cityStateData, setCityStateData] = React.useState(CityStateData);
  const [state, setState] = React.useState({
    data: [],
    loading: true
  });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await useAxios(VIEW_PROFILE);
    setState({ ...state, data: response.data, loading: false });
  }
  

  // Filter to get the typed City and State
  const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

  // Set the filtered and Selected Item
  const onSelect = (index) => {
    setCityState(cityStateData[index].title);
  };

  // Search on the data for City and State on Every type
  const onChangeText = (query) => {
    setCityState(query);
    setCityStateData(cityStateData.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  const EditIcon = (props) => {
    return(
      <Ripple onPress={handleEdit}>
        <Icon {...props} name={edit === false ? 'edit-outline' : 'save-outline'} />
      </Ripple>
    )
  }

  const handleEdit = async () => {
    if(edit === true){
      setState({...state, loading: true});
      const response = await useAxios(EDIT_PROFILE, { cityState: cityState });
      await props.setUserData(response.data);
      await AsyncStorage.setItem('@ValarTamil:userData', JSON.stringify(response.data));
      loadData();
    }
    setEdit(!edit);
  }

  const handleLogout = async () => {
    await props.setUserData({});
    await AsyncStorage.removeItem('@ValarTamil:userData');
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' },
        ],
      })
    );
  }

  return (
    state.loading === true 
    ?
      <Loader/>
    :
      <Layout style={styles.root}>
        <DrawerNav rightAction={EditIcon} />
        <View style={styles.profileContainer}>
          <View style={styles.iconContainer}>
            <Icon name='person-outline' fill={styles.icon.color} style={styles.icon} />
          </View>
          <Text category='h5'>{state.data.fullname}</Text>
          <Text style={styles.caption}>{Lang('profile.account_created')} {state.data.created_on}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <Icon name='phone-outline' fill={styles.userIcon.color} style={styles.userIcon} />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.content}>{state.data.mobile}</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <Icon name='pin-outline' fill={styles.userIcon.color} style={styles.userIcon} />
            </View>
            <View style={styles.rightContainer}>
              {edit === false 
              ?
              <Text style={styles.content}>{state.data.cityState}</Text>  
              :
                <Autocomplete style={styles.cityState} size="large" placeholder='City & State' placement="top" value={cityState} onSelect={onSelect} onChangeText={onChangeText}>
                  {cityStateData.map(renderOption)}
                </Autocomplete>
              }
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <Icon name='bell-outline' fill={styles.userIcon.color} style={styles.userIcon} />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.content}>{state.data.unread_notification} {Lang('profile.unread_notifications')}</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <Icon name='bookmark-outline' fill={styles.userIcon.color} style={styles.userIcon} />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.content}>{state.data.total_favourites} {Lang('profile.saved_news')}</Text>
            </View>
          </View>
        </View>
        <Button appearance='outline' style={styles.btnContainer} onPress={handleLogout}>{Lang('profile.logout')}</Button>
      </Layout>
  )
}

const mapStateToProps = state => state.common.userData;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUserData: setUserData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);