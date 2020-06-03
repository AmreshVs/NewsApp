import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Text, Button, Divider, Input, useStyleSheet } from '@ui-kitten/components';

import themedStyle from './style';
import { useAxios } from '@hooks';
import { ADD_COMMENT } from '@api';
import snackBar from '@common/snackBar';
import Lang from '@lang';

const Comment = ({ data, user_id, post_id, type }) => {

  let comment_type = type === 'video' ? 'video' : 'news';
  const styles = useStyleSheet(themedStyle);
  const [comment, setComment] = React.useState('');
  const [innerComment, setInnerComment] = React.useState('');
  const [reply, setReply] = React.useState('');

  const Avatar = ({ name }) => {
    return (
      <Text style={styles.avatarContainer} category='p1'>{name}</Text>
    )
  }

  const handleReply = (index) => {
    setReply(index);
  }

  const handlePostReply = async () => {
    if(comment.length === 0){
      snackBar('Comment cannot be empty!');
      return false;
    }
    let response = await useAxios(ADD_COMMENT, { user_id: user_id, comment: comment, comment_type: 'post', reply_to: comment_type, reply_id: post_id, is_verified: 0 });
    snackBar(response.message);
    setComment('');
  }

  const handlePostInnerReply = async (index) => {
    if(innerComment.length === 0){
      snackBar('Comment cannot be empty!');
      return false;
    }
    let response = await useAxios(ADD_COMMENT, { user_id: user_id, comment: innerComment, comment_type: 'post', reply_to: 'comment', reply_id: index, is_verified: 0 });
    snackBar(response.message);
    setInnerComment('');
    setReply('');
  }

  return (
    <View style={styles.commentBox}>
      <Text category="h6" style={styles.commentHeading}>{Lang('comment.comments')}</Text>
      <Divider />
      <View style={styles.commentsContainer}>
        <View>
          <Avatar name={'U'} />
        </View>
        <View style={styles.outerCommentBtn}>
          <Input style={styles.commentBoxContainer} placeholder={Lang('comment.post_comment')} value={comment} onChangeText={nextValue => setComment(nextValue)} />
          <Button style={styles.innerAddBtn} appearance='outline' size='small' onPress={handlePostReply}>{Lang('comment.add')}</Button>
        </View>
      </View>
      {data.map((item, index) => {
        let avatar_name = item.posted_by.charAt(0).toUpperCase();
        let posted_by = item.posted_by.charAt(0).toUpperCase() + item.posted_by.slice(1);
        return (
          <View style={styles.commentsContainer}>
            <View>
              <Avatar name={avatar_name} />
            </View>
            <View style={[styles.commentContent, styles.xs10]}>
              <View style={styles.nameContainer}>
                <Text category="h6">{posted_by}</Text>
                <Text style={styles.posted_on}>{` ${Lang('comment.on')} ${item.posted_at}`}</Text>
              </View>
              <Text category="p1">{item.comment}</Text>
              {item.reply_comments.map((comment) => {
                let avatar_name = comment.posted_by.charAt(0).toUpperCase();
                let posted_by = comment.posted_by.charAt(0).toUpperCase() + comment.posted_by.slice(1);
                return (
                  <View style={styles.innerCommentsContainer}>
                    <View style={styles.xs3}>
                      <Avatar name={avatar_name} />
                    </View>
                    <View style={[styles.commentContent, styles.xs11]}>
                      <View style={styles.nameContainer}>
                        <Text category="h6">{posted_by}</Text>
                        <Text style={styles.posted_on}>{` ${Lang('comment.on')} ${comment.posted_at}`}</Text>
                      </View>
                      <Text category="p1">{comment.comment}</Text>
                    </View>
                  </View>
                )
              })}
              {reply === index ?
                <View style={styles.innerCommentsContainer}>
                  <View style={styles.xs3}>
                    <Avatar name={avatar_name} />
                  </View>
                  <View style={styles.commentBtn}>
                    <Input style={styles.xs9} placeholder={Lang('comment.post_comment')} value={innerComment} onChangeText={nextValue => setInnerComment(nextValue)} />
                    <Button style={styles.innerAddBtn} size='small' appearance='outline' onPress={() => handlePostInnerReply(item.id)}>
                      {Lang('comment.add')}
                    </Button>
                  </View>
                </View>
                : null}
              <Button style={styles.replyBtn} status='primary' appearance='ghost' onPress={() => handleReply(reply !== index ? index : '')}>{reply !== index ? Lang('comment.reply') : Lang('comment.cancel')}</Button>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const mapStateToProps = state => state.common.userData;

export default connect(mapStateToProps)(Comment);