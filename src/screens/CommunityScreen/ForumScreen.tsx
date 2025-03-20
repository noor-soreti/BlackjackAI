import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PersonIcon} from '../../assets/Svg';
import {fontScale} from '../../styles/globalStyles';
import {useDataContext} from '../DataContext';

const ForumScreen = () => {
  const navigation = useNavigation();
  const {forum, forumRefetch, isForumFetching} = useDataContext();

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ForumInScreen', {forum: item})}>
      <View style={{width: '90%'}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content} numberOfLines={3}>
          {item.content}
        </Text>
        <View style={styles.footer}>
          <PersonIcon />
          <Text style={styles.author}>
            {item.user.full_name} - {moment(item.createdAt).fromNow(true)}
          </Text>
        </View>
      </View>
      <View style={styles.commentCount}>
        <Image
          source={require('../../assets/Images/message-round.png')}
          style={{width: 24, height: 24}}
        />
        <Text style={styles.commentText}>{item.comments.length}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={forum}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        refreshing={isForumFetching}
        onRefresh={forumRefetch}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0e0e0e', padding: 20},
  card: {
    backgroundColor: '#1c1c1c',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderColor: '#2C2C2C',
    borderWidth: 0.5,
  },
  title: {
    color: '#fff',
    fontSize: 16 / fontScale,
    fontFamily: 'Calimate-SemiBold',
  },
  content: {
    color: '#aaa',
    fontSize: 12 / fontScale,
    marginVertical: 5,
    letterSpacing: 0.91,
    lineHeight: 16.3 / fontScale,
    fontFamily: 'Manrope-Regular',
  },
  footer: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 2,
  },
  author: {
    color: '#777',
    fontSize: 10 / fontScale,
    lineHeight: 16.3 / fontScale,
    letterSpacing: 0.91,
    fontFamily: 'Manrope-ExtraLight',
  },
  commentCount: {alignItems: 'center'},
  commentText: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: 10 / fontScale,
    lineHeight: 20 / fontScale,
  },
});

export default ForumScreen;
