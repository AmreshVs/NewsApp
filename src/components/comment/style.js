import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  commentBox:{
    width: '100%',
    padding: 10
  },
  commentHeading:{
    marginVertical: 10
  },
  commentsContainer:{
    marginTop: 10,
    flexDirection: 'row',
  },
  innerCommentsContainer:{
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },
  commentBoxContainer:{
    width: '83.5%',
    marginRight: 5
  },
  replyBtn:{
    justifyContent: 'flex-start',
    paddingLeft: 0,
    paddingRight: 0,
    width: 70,
  },
  avatarContainer:{
    backgroundColor: 'background-basic-color-3',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5
  },
  commentContent:{
    width: '90%',
    paddingRight: 10
  },
  xs2:{
    width: '10%'
  },
  xs9:{
    width: '80%',
    marginRight: 5
  },
  xs10:{
    width: '90%',
  },
  xs3:{
    width: '15%'
  },
  innerReply:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  innerAddBtn:{
    marginBottom: 3
  },
  commentBtn:{
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
  },
  outerCommentBtn:{
    flexDirection: 'row',
    width: '87%',
    justifyContent: 'space-between',
  },
  nameContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  posted_on:{
    color: 'color-basic-600'
  }
});

export default themedStyle;