import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronDown} from '../../assets/Svg';
import Header from '../../components/global/Header';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {fontScale} from '../../styles/globalStyles';
import ForumScreen from './ForumScreen';

const IndexScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [activeTab, setActiveTab] = useState('forum'); // Default to Chat

  return (
    <TabScreenWrapper style={styles.container}>
      {/* Header */}
      <Header title="Community 👥 " setting />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={
            () => {
              // navigation.goBack();
            }
            // navigation.navigate('tabs', {
            //   screen: 'CommunityScreen',
            // })
          }
          style={[styles.tab, activeTab === 'forum' && styles.activeTab]}>
          <Text style={styles.tabText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen')}
          style={[styles.tab, activeTab === 'discussion' && styles.activeTab]}>
          <Text style={styles.tabText}>Cornelius</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddForumScreen')}
          style={styles.addForm}>
          <Text style={styles.tabText}>New</Text>
          <ChevronDown />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ForumScreen />
      </View>
    </TabScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0e0e0e'},
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 26,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#0e0e0e',
  },
  activeTab: {
    backgroundColor: 'rgba(102, 0, 162, 0.5)',
    borderWidth: 1,
    borderColor: '#AA00FF',
  },
  tabText: {
    color: '#fff',
    fontSize: 16 / fontScale,
    fontFamily: 'Calimate-SemiBold',
    lineHeight: 22 / fontScale,
  },
  addForm: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 'auto',
  },
  addFormText: {
    fontFamily: 'Calimate-SemiBold',
    fontSize: 14 / fontScale,
    lineHeight: 22 / fontScale,
    color: '#dadada',
  },
  content: {flex: 1, paddingHorizontal: 5},
});

export default IndexScreen;
