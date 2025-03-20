import {
  CommonActions,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {deleteAccount} from '../Api/functions/user';
import {ContactIcon, DeleteIcon, LogoutIcon} from '../assets/Svg';
import Header from '../components/global/Header';
import ScreenWrapper from '../components/global/ScreenWrapper';
import {fontScale, height, width} from '../styles/globalStyles';
import {useAuthContext} from './Config';

const settingsOptions = [
  {
    id: 4,
    title: 'Contact support',
    icon: <ContactIcon fontSize={24 / fontScale} />,
    screen: 'Support',
    onPress: () => Linking.openURL('mailto:contact@lastrapp.xyz'),
  },
  {
    id: 5,
    title: 'Delete my account',
    icon: <DeleteIcon fontSize={24 / fontScale} />,
    screen: 'DeleteAccount',
    color: '#D32F2F',
    onPress: undefined,
  },
  {
    id: 6,
    title: 'Log out',
    icon: <LogoutIcon fontSize={24 / fontScale} />,
    screen: 'Logout',
    color: '#D32F2F',
    onPress: undefined,
  },
];

const Settings = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const {signOut, fetching} = useAuthContext();

  const {mutate, isPending} = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      signOut();
      // navigation.reset({index: 0, routes: [{name: 'IntroScreen'}]});
    },
    onError: err => console.log(err),
  });

  return (
    <ScreenWrapper style={styles.container}>
      <Header title="Settings" cross />
      {(isPending || fetching) && (
        <View style={styles.loader}>
          <ActivityIndicator color="#fff" size={35 / fontScale} />
        </View>
      )}
      <View style={styles.mainContainer}>
        <FlatList
          data={settingsOptions}
          style={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.option]}
              onPress={
                item.id === 6
                  ? signOut
                  : item.id === 5
                  ? () => mutate()
                  : item.onPress
              }>
              {item?.icon}
              <Text style={[styles.optionText, {color: item.color || '#fff'}]}>
                {item.title}
              </Text>
              <Icon name="chevron-right" size={20 / fontScale} color={'#fff'} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: width / 1.3,
                borderBottomWidth: 1,
                borderBottomColor: '#535353',
                alignSelf: 'center',
                paddingVertical: 1,
              }}
            />
          )}
          ListFooterComponent={() => (
            <View style={styles.bottomContainer}>
              <View
                style={{
                  width: width / 2,
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',
                  alignSelf: 'center',

                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://lastrapp.xyz/privacy')
                  }>
                  <Text style={styles.bottomText}>Privacy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://lastrapp.xyz/terms')}>
                  <Text style={styles.bottomText}>Terms</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  loader: {
    width: '100%',
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: '#00000060',
  },
  mainContainer: {
    paddingHorizontal: 24,
  },
  flatlistContainer: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 6,
    borderRadius: 10,
    gap: 18,
    // backgroundColor: '#222',
    // marginVertical: 5,
    // borderBottomWidth: 1,
    // borderColor: '#fff',
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 18 / fontScale,
    fontFamily: 'NeueHaasDisplay-Roman',
    color: '#fff',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingTop: 28,
    borderTopWidth: 1,
    borderTopColor: '#535353',
    marginTop: '0%',
    width: width / 1.3,
    alignSelf: 'center',
  },
  bottomText: {
    fontSize: 18 / fontScale,
    color: '#fff',
    fontFamily: 'NeueHaasDisplay-Light',
    // opacity: 0.7,
  },
});
