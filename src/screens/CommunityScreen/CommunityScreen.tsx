import {useMutation} from '@tanstack/react-query';
import Lottie from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {chatBot} from '../../Api/functions/submission';
import {Send} from '../../assets/Svg';
import {fontScale} from '../../styles/globalStyles';

const FooterElement = () => {
  return (
    <View style={[styles.messageBubble, styles.botMessage]}>
      <Lottie
        source={require('../../assets/Lottie/loader.json')}
        loop
        autoPlay
        style={{width: 45, aspectRatio: 1, marginVertical: -15}}
      />
    </View>
  );
};

const renderMessage = ({
  item,
}: {
  item: {
    id: string;
    text: string;
    sender: string;
  };
}) => {
  return (
    <View
      style={{
        maxWidth: '85%',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
        alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
        backgroundColor: item.sender === 'user' ? '#7200AB' : '#232323',
      }}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
};

const CommunityScreen = () => {
  const flatlistRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<
    {
      id: string;
      text: string;
      sender: string;
    }[]
  >([
    {
      id: Date.now().toString(),
      text: 'Hey, I am Cornelius... How may I help you?',
      sender: 'bot',
    },
  ]);

  const {mutate, isPending} = useMutation({
    mutationFn: chatBot,
    onMutate: variables => {
      setMessages(prevMessages => [
        ...prevMessages,
        {id: Date.now().toString(), text: variables.text, sender: 'user'},
      ]);
      setTimeout(() => setInputText(''), 100);
    },
    onSuccess: data => {
      setMessages(prevMessages => [
        ...prevMessages,
        {id: Date.now().toString(), text: data.message, sender: 'bot'},
      ]);
    },
    onError: err => console.log(err),
  });

  useEffect(() => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // enabled
      keyboardVerticalOffset={170}
      style={[styles.container]}>
      {/* Chat Messages */}
      <FlatList
        ref={flatlistRef}
        data={messages}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        contentContainerStyle={styles.chatContainer}
        shouldRasterizeIOS={true} // Ensures proper rendering on iOS
        renderToHardwareTextureAndroid={true}
        removeClippedSubviews={false} // Ensures off-screen items stay mounted
        extraData={messages}
        windowSize={100}
        onContentSizeChange={() =>
          flatlistRef.current?.scrollToEnd({animated: true})
        }
        onLayout={() => flatlistRef.current?.scrollToEnd({animated: true})}
        ListFooterComponent={isPending ? FooterElement : null}
      />
      <View style={styles.border} />
      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="How can I help you?"
          placeholderTextColor="#aaa"
          value={inputText}
          multiline
          onChangeText={setInputText}
        />
        <TouchableOpacity
          onPress={() => {
            if (!!inputText.trim()) {
              mutate({text: inputText});
            }
          }}
          disabled={isPending}>
          <Send />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    // paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
  forumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  forumBadge: {
    backgroundColor: '#a06',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontSize: 14,
  },
  chatContainer: {
    paddingHorizontal: 20,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#232323',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#7200AB',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#232323',
  },
  messageText: {
    color: '#fff',
    fontSize: 14 / fontScale,
    fontFamily: 'Manrope-Regular',
    lineHeight: 22 / fontScale,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#535353',
    paddingHorizontal: 12,
    marginTop: 19,
    marginHorizontal: 22,
    marginBottom: 45,
  },
  input: {
    flex: 1,
    color: '#B5B5B5',
    fontSize: 14 / fontScale,
    padding: 10,
    paddingVertical: 10,
    marginRight: 10,
    fontFamily: 'Manrope-Regular',
  },
  border: {
    borderWidth: 0.5 / fontScale,
    borderColor: '#777',
  },
});

export default CommunityScreen;
