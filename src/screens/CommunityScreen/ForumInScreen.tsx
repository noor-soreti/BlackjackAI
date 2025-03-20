import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {addComment, getForum} from '../../Api/functions/forum';
import {ArrowLeft, PersonIcon, Send} from '../../assets/Svg';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {fontScale} from '../../styles/globalStyles';
import {useDataContext} from '../DataContext';

const FlatListHeader = ({
  forum,
}: {
  forum: {
    _id: string;
    user_id: string;
    user: {full_name: string};
    title: string;
    content: string;
    comments: {
      _id: string;
      comment: string;
      commented_on: string;
      user_id: string;
      full_name: string;
    }[];
    createdAt: string;
  };
}) => (
  <View style={styles.card} key={forum._id}>
    <View style={styles.header}>
      <PersonIcon />
      <Text style={styles.header_text}>
        {forum.user.full_name}
        <Text style={styles.header_subtext}>
          {' '}
          - {moment(forum.createdAt).fromNow(true)}
        </Text>
      </Text>
    </View>
    <Text style={styles.title}>{forum.title}</Text>
    <Text style={styles.comment}>{forum.content}</Text>
  </View>
);

const ForumInScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}) => {
  const [inputText, setInputText] = useState('');
  const {forumRefetch} = useDataContext();

  const {forum} = route.params;

  const {data, refetch} = useQuery({
    queryKey: ['each_forum', forum._id],
    queryFn: () => getForum(forum._id),
    initialData: forum,
  });

  const {mutate, isPending} = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      setInputText('');
      refetch();
      forumRefetch();
    },
  });

  const renderItem = ({
    item,
  }: {
    item: {
      _id: string;
      comment: string;
      commented_on: string;
      user_id: string;
      full_name: string;
    };
  }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <PersonIcon />
        <Text style={styles.header_text}>
          {item.full_name}
          <Text style={styles.header_subtext}>
            {' '}
            - {moment(item.commented_on).fromNow(true)}
          </Text>
        </Text>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <TabScreenWrapper style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        enabled
        keyboardVerticalOffset={-10}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            marginHorizontal: 30,
            alignSelf: 'flex-start',
          }}
          onPress={navigation.goBack}>
          <ArrowLeft />
        </TouchableOpacity>
        <FlatList
          data={data?.comments}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          ListHeaderComponent={<FlatListHeader forum={forum} />}
        />
        <View style={styles.border} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Join the conversation"
            placeholderTextColor="#aaa"
            value={inputText}
            multiline
            onChangeText={setInputText}
          />
          <TouchableOpacity
            onPress={() => {
              if (!!inputText.trim()) {
                mutate({comment: inputText, forum_id: forum._id});
              }
            }}
            disabled={isPending}>
            {isPending ? (
              <ActivityIndicator size={14 / fontScale} color="#fff" />
            ) : (
              <Send />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TabScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0E0E0E', paddingTop: 20},
  card: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderBottomWidth: 0.2 / fontScale,
    borderBottomColor: '#DADADA',
  },
  header: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginBottom: 14,
  },
  header_text: {
    fontFamily: 'NeueHaasDisplay-Bold',
    lineHeight: 16.3 / fontScale,
    fontSize: 16 / fontScale,
    letterSpacing: 0.91,
    color: '#fff',
  },
  header_subtext: {
    fontFamily: 'NeueHaasDisplay-Roman',
    lineHeight: 16.3 / fontScale,
    fontSize: 9 / fontScale,
    letterSpacing: 1,
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 12 / fontScale,
    fontFamily: 'NeueHaasDisplay-Roman',
    letterSpacing: 1,
    marginBottom: 12,
  },
  comment: {
    color: '#fff',
    fontSize: 11 / fontScale,
    letterSpacing: 0.91,
    lineHeight: 16.3 / fontScale,
    fontFamily: 'Manrope-ExtraLight',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 20 / fontScale,
    backgroundColor: '#535353',
    paddingHorizontal: 12,
    marginVertical: 20,
    marginHorizontal: 22,
    marginBottom: 45,
  },
  input: {
    flex: 1,
    color: '#B5B5B5',
    fontSize: 14 / fontScale,
    padding: 10,
    paddingVertical: 3,
    marginRight: 10,
    fontFamily: 'Manrope-Regular',
  },
  border: {
    borderWidth: 0.5 / fontScale,
    borderColor: '#777',
  },
});

export default ForumInScreen;
