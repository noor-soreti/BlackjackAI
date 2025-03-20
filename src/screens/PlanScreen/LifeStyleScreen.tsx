import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Header from '../../components/global/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {lifestyle_data} from '../../constants/question';
import {fontScale} from '../../styles/globalStyles';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';

const LifeStyleScreen = ({route}: {route: any}) => {
  const {exercise_type} = route.params;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <TabScreenWrapper style={styles.container}>
      <Header title={exercise_type} back />
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        {lifestyle_data.map((item, index) => (
          <View key={index} style={styles.section}>
            <TouchableOpacity
              style={[
                styles.header,
                activeIndex === index && {paddingBottom: 10},
              ]}
              onPress={() => toggleSection(index)}>
              <Text style={styles.title}>{item.title}</Text>
              <AntDesign
                name={activeIndex === index ? 'up' : 'down'}
                size={18}
                color="white"
              />
            </TouchableOpacity>
            <Collapsible collapsed={activeIndex !== index}>
              {item.content !== '' && (
                <View style={styles.content}>
                  <Text style={styles.contentText}>{item.content}</Text>
                </View>
              )}
            </Collapsible>
          </View>
        ))}
      </ScrollView>
    </TabScreenWrapper>
  );
};

export default LifeStyleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
  },
  mainContainer: {
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  section: {
    backgroundColor: '#1C1C1C',
    borderColor: '#323232',
    borderWidth: 1 / fontScale,
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 25,
  },
  title: {
    color: 'white',
    fontSize: 16 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
  },
  content: {
    paddingHorizontal: 26,
    paddingBottom: 22,
    // marginTop: -9,
  },
  contentText: {
    color: 'white',
    fontSize: 14 / fontScale,
    fontFamily: 'Calimate-Regular',
    lineHeight: 20 / fontScale,
    letterSpacing: -0.51,
  },
});
