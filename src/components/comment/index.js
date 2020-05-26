import React from 'react';
import { View } from 'react-native';
import { Text, Button, Divider, Input, useStyleSheet } from '@ui-kitten/components';

import themedStyle from './style';

const Avatar = ({ name }) => {
  return (
    <View >
      <Text>A</Text>
    </View>
  )
}

const Comment = () => {

  const styles = useStyleSheet(themedStyle);
  const [value, setValue] = React.useState('');

  return (
    <>
      <Text category="h6" style={styles.commentHeading}>Comments</Text>
      <Divider />
      <View style={styles.commentsContainer}>
        <View xs={1}>
          <Avatar name='A' />
        </View>
        <View xs={11}>
          <Text category="h6">Ram Prakash</Text>
          <Text category="p1">Useful News</Text>
          <View style={styles.commentsContainer}>
            <View xs={1}>
              <Avatar name='A' />
            </View>
            <View xs={11}>
              <Text category="h6">Amresh Vs</Text>
              <Text category="body2">very Nice</Text>
            </View>
          </View>
          <View style={styles.commentsContainer}>
            <View xs={1}>
              <Avatar name='A' />
            </View>
            <View xs={9} style={styles.commentBoxContainer}>
              <Input placeholder='Place your Text' value={value} onChangeText={nextValue => setValue(nextValue)} />
            </View>
            <View xs={1}>
              <Button category="contained" color="primary" onClick={() => console.log('innerComment')}>
                Add
              </Button>
            </View>
          </View>
          <Button style={styles.replyButton} color="primary" onClick={() => console.log('handleReply')}>Reply</Button>
        </View>
      </View>

      <View style={styles.commentsContainer} container spacing={3}>
        <View xs={1}>
          <Avatar name='A' />
        </View>
        <View xs={9} style={styles.commentBoxContainer}>
          <Input placeholder='Place your Text' value={value} onChangeText={nextValue => setValue(nextValue)} />
        </View>
        <View xs={1}>
          <Button>
            Add
          </Button>
        </View>
      </View>
    </>
  )
}

export default Comment;