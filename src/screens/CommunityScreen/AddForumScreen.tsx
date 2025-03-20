import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {createForum} from '../../Api/functions/forum';
import {ArrowLeft} from '../../assets/Svg';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {COLORS} from '../../styles/colors';
import {fontScale} from '../../styles/globalStyles';
import {useDataContext} from '../DataContext';

export default function AddForumScreen({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {forumRefetch} = useDataContext();

  const {mutate, isPending} = useMutation({
    mutationFn: createForum,
    onSuccess: () => {
      forumRefetch();
      navigation.goBack();
    },
  });

  const onSubmit = () => {
    if (title.trim() && content.trim()) {
      mutate({
        title,
        content,
      });
    }
  };

  return (
    <TabScreenWrapper style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          paddingHorizontal: 30,
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            alignSelf: 'flex-start',
          }}
          onPress={navigation.goBack}>
          <ArrowLeft />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            title.trim() && content.trim()
              ? {backgroundColor: COLORS.primary}
              : undefined,
          ]}
          onPress={onSubmit}
          disabled={isPending}>
          {isPending ? (
            <ActivityIndicator size={19.5 / fontScale} color="#fff" />
          ) : (
            <Text
              style={[
                styles.button_text,
                title.trim() && content.trim() ? {color: '#fff'} : undefined,
              ]}>
              Post
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, {lineHeight: 35 / fontScale}]}
        placeholder="Title"
        placeholderTextColor="rgba(255,255,255,0.7)"
        multiline
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <View style={styles.border} />
      <TextInput
        style={[
          styles.input,
          {fontFamily: 'Manrope-ExtraLight', fontSize: 13 / fontScale},
        ]}
        placeholder="body text"
        placeholderTextColor="rgba(255,255,255,0.7)"
        multiline
        value={content}
        onChangeText={text => setContent(text)}
      />
      <View style={styles.border} />
    </TabScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0E0E0E', paddingTop: 20},
  button: {
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: '#1E1E1E',
  },
  button_text: {
    fontFamily: 'NeueHaasDisplay-Bold',
    fontSize: 14 / fontScale,
    lineHeight: 22 / fontScale,
    color: '#DADADA',
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    lineHeight: 16.3 / fontScale,
    fontSize: 22 / fontScale,
    fontFamily: 'NeueHaasDisplay-Bold',
    letterSpacing: 0.91,
    color: '#fff',
  },
  border: {
    borderWidth: 0.5 / fontScale,
    borderColor: '#dadada',
  },
});
