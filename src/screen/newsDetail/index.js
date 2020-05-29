import React from 'react';
import { connect } from 'react-redux';
import { Image, View, ScrollView } from 'react-native';
import { useStyleSheet, Layout, Text, Icon } from '@ui-kitten/components';
import HTMLView from 'react-native-htmlview';
import { useRoute } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import themedStyle from './style';
import TopNav from '@comp/topNav';
import Comment from '@comp/comment';
import { useAxios } from '@hooks';
import { GET_NEWS_DETAIL, GET_VIDEO_DETAIL, ADD_FAVOURITES } from '@api';
import VideoPlayer from '@comp/video';
import Loader from '@comp/loader';

const NewsDetail = ({userData, theme}) => {

  const styles = useStyleSheet(themedStyle);
  const route = useRoute();
  const id = route.params.id;
  const type = route.params.type;
  const [data, setData] = React.useState([]);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [favourite, setFavourite] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let api = type === 'videos' ? GET_VIDEO_DETAIL : GET_NEWS_DETAIL;
    const response = await useAxios({ ...api, url: api.url + id });
    setData(response.data);
    setFavourite(response.data.is_favourite);
  }

  const handleFullscreen = (state) => {
    setFullscreen(state);
  }

  const handleFavourite = async () => {
    setFavourite(!favourite);
    await useAxios(ADD_FAVOURITES, { user_id: userData.user_id, id: `${id}`, type: type });
  }

  const RightIcon = (props) => {
    return(
      <Ripple onPress={handleFavourite}>
        <Icon style={styles.icon} {...props} name={favourite === false ? 'bookmark-outline' : 'bookmark'} />
      </Ripple>
    )
  }

  const RenderVideo = () => {
    return (
      <VideoPlayer style={styles.video} url={data.url} featured_img={data.featured_img} handleFullscreen={handleFullscreen} fullscreen={fullscreen} />
    )
  }

  const RenderElement = () => {
    return (
      <>
        {data.length <= 0
          ?
            <Loader/>
          :
          <Layout level='1' style={styles.root}>
            <ScrollView>
              <TopNav rightAction={RightIcon} />
              <View style={styles.contentContainer}>
                {type === 'videos'
                  ?
                  <RenderVideo />
                  :
                  <Image style={styles.featured_img} source={{ uri: data.featured_img }} />
                }
                <Text category='h6' style={styles.heading}>{data.title}</Text>
                <HTMLView value={data.content} stylesheet={theme === 'dark' ? { p: { color: '#FFF' }} : null} />
              </View>
              <Comment data={data.comments} post_id={data.id} type={type} />
            </ScrollView>
          </Layout>
        }
      </>
    )
  }

  return (
    <>
      {fullscreen === false ? <RenderElement /> : <RenderVideo />}
    </>
  )

}

const mapStateToProps = state => state.common;

export default connect(mapStateToProps)(React.memo(NewsDetail));