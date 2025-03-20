/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Wheely from 'react-native-wheely';
import {queryClient} from '../../../../App';
import {submitAnswers} from '../../../Api/functions/submission';
import {storage} from '../../../Api/Storage';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {fontScale} from '../../../styles/globalStyles';
import {useAuthContext} from '../../Config';
import ErrorBoundary from '../../../components/ErrorBoundary';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function QuestionScreen({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>();
  const [selectedAnswers, setSelectedAnswers] = useState<
    {question: string; answer: string}[]
  >([]); // Stores user answers
  const [selectedMinutes, setSelectedMinutes] = useState<number>(1);
  const [selectedSeconds, setSelectedSeconds] = useState<number>(1);
  const [selectedNumber, setSelectedNumber] = useState<string>('1');
  const {signOut} = useAuthContext();

  const questions = [
    {
      question: (
        <Text style={styles.questionText}>
          How experienced are you at Blackjack?
        </Text>
      ),
      label: 'How experienced are you at Blackjack?',
      options: ['Beginner', 'Casual', 'Pro'],
    },
    {
      question: (
        <Text style={styles.questionText}>
          How do you usually decide your moves?
        </Text>
      ),
      label: 'How do you usually decide your moves?',
      options: ['I use strategy', 'I go with my gut', 'I just play for fun'],
    },
    {
      question: (
        <Text style={styles.questionText}>
          AI-driven insights improve long-term gains.
        </Text>
      ),
      label: 'AI-driven insights improve long-term gains.',
      options: [ '10 minutes', '30 minutes', '60 minutes' ],
      image: require('../../../assets/Images/profitability_3x.png'),
    },
    {
      question: (
        <Text style={styles.questionText}>
          How much risk are you comfortable with?
        </Text>
      ),
      label: 'How much risk are you comfortable with?',
      options: [ 'Low', 'Medium', 'High' ],
    },
    {
      question: (
        <Text style={styles.questionText}>
          How confident do you feel in your moves?
        </Text>
      ),
      label: 'How confident do you feel in your moves?',
      options: [ 'Low', 'Medium', 'High' ],
    },
    {
      question: (
        <Text style={styles.questionText}>
          Better decisions mean a bigger bankroll, faster.
        </Text>
      ),
      label: 'Better decisions mean a bigger bankroll, faster.',
      options: [],
      image: require('../../../assets/Images/bankroll_3x.png'),
    },
    {
      question: (
        <Text style={styles.questionText}>
          Winning consistently isn’t luck, it’s strategy.
        </Text>
      ),
      label: 'Winning consistently isn’t luck, it’s strategy.',
      options: [],
      image: require('../../../assets/Images/consistency.png'),
    }
  ];

  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'QuestionScreen');
    }, []),
  );

  const {mutate, isPending} = useMutation({
    mutationFn: submitAnswers,
    onSuccess: async () => {
      navigation.reset({index: 0, routes: [{name: 'PEScoreScreen'}]});
      await queryClient.invalidateQueries({queryKey: ['user']});
    },
    onError: err => {
      console.log('err', err);
    },
  });

  const handleNextQuestion = () => {
    const _question = questions[currentQuestion];
    if (
      selectedOption !== undefined ||
      [2,5,6].includes(currentQuestion)
    ) {
      const updatedAnswers = [...selectedAnswers];

      if (currentQuestion === 0) {
        updatedAnswers[currentQuestion] = {
          question: _question.label,
          answer: `${selectedMinutes} minutes & ${moment(
            selectedSeconds,
            's',
          ).format('ss')} seconds`,
        };
      } else if ([3, 6, 10].includes(currentQuestion)) {
        updatedAnswers[currentQuestion] = {
          question: _question.label,
          answer: selectedNumber,
        };
      } else {
        updatedAnswers[currentQuestion] = {
          question: _question.label,
          answer: _question.options[selectedOption!],
        }; // Store selected answer
      }

      if (currentQuestion < questions.length - 1) {
        if (
          currentQuestion === 10 ||
          currentQuestion === 6 ||
          currentQuestion === 3
        ) {
          setSelectedNumber('1');
        } // Reset selected number
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(undefined); // Reset for next question
        setSelectedAnswers(updatedAnswers);
      } else {
        mutate(updatedAnswers);
      }
    }
  };

  const handlePreviousQuestion = async () => {
    if (currentQuestion === 0) {
      signOut();
    } else {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(undefined); // Reset selected option for previous question
      setSelectedNumber('1'); // Reset selected number
    }
  };

  return (
    <ErrorBoundary>
      <ScreenWrapper
        bgImage={require('../../../assets/Images/background.png')}
        style={styles.container}>
        {/* Static Progress Bar */}
        <View style={styles.progressBackContainer}>
          <TouchableOpacity
            style={{marginTop: 2}}
            onPress={handlePreviousQuestion}>
            <AntDesign name="arrowleft" color={'#fff'} size={22} />
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {width: `${((currentQuestion + 1) / questions.length) * 100}%`},
              ]}
            />
          </View>
        </View>

        {/* Question */}
        <Text style={styles.questionNumber}>
          {/* Question #{currentQuestion + 1} */}
        </Text>
        {questions[currentQuestion].question}
        <Text style={styles.questionSubText}>{[2,5,6].includes(currentQuestion) ? '' : 'This will be used to customize your bet analysis'}</Text>

        {/* Options */}
        {
          [2,5,6].includes(currentQuestion)
          ?
          <View style={styles.imageContainer}>
            <Image source={questions[currentQuestion].image} resizeMode='contain' style={{width: '100%', height: '100%'}} />
          </View>
          :
        // currentQuestion == 0 
        // ? 
        // (
        //   <View style={styles.picker_container}>
        //     <View
        //       style={[
        //         styles.picker_row,
        //         {paddingVertical: 10, paddingBottom: 0},
        //       ]}>
        //       <Text style={styles.picker_title}>Minutes</Text>
        //       <Text style={styles.picker_title}>Seconds</Text>
        //     </View>

        //     <View style={styles.picker_row}>
        //       <Wheely
        //         options={[
        //           '0',
        //           '1',
        //           '2',
        //           '3',
        //           '4',
        //           '5',
        //           '6',
        //           '7',
        //           '8',
        //           '9',
        //           '10',
        //           '11',
        //           '12',
        //           '13',
        //           '14',
        //           '15',
        //           '16',
        //           '17',
        //           '18',
        //           '19',
        //           '20',
        //         ]} // Items to display
        //         selectedIndex={selectedMinutes}
        //         onChange={index => {
        //           setSelectedMinutes(index);
        //         }}
        //         visibleRest={1}
        //         itemHeight={46}
        //         containerStyle={styles.wheel}
        //         decelerationRate={0.9}
        //         itemStyle={{
        //           backgroundColor: 'transparent',
        //         }}
        //         itemTextStyle={styles.itemText}
        //         selectedIndicatorStyle={styles.selectedStyle}
        //         // flatListProps={{shouldRasterizeIOS: true, initialNumToRender: 21}}
        //       />
        //       <Wheely
        //         options={[
        //           '0',
        //           '1',
        //           '2',
        //           '3',
        //           '4',
        //           '5',
        //           '6',
        //           '7',
        //           '8',
        //           '9',
        //           '10',
        //           '11',
        //           '12',
        //           '13',
        //           '14',
        //           '15',
        //           '16',
        //           '17',
        //           '18',
        //           '19',
        //           '20',
        //           '21',
        //           '22',
        //           '23',
        //           '24',
        //           '25',
        //           '26',
        //           '27',
        //           '28',
        //           '29',
        //           '30',
        //           '31',
        //           '32',
        //           '33',
        //           '34',
        //           '35',
        //           '36',
        //           '37',
        //           '38',
        //           '39',
        //           '40',
        //           '41',
        //           '42',
        //           '43',
        //           '44',
        //           '45',
        //           '46',
        //           '47',
        //           '48',
        //           '49',
        //           '50',
        //           '51',
        //           '52',
        //           '53',
        //           '54',
        //           '55',
        //           '56',
        //           '57',
        //           '58',
        //           '59',
        //           '60',
        //         ]} // Items to display
        //         selectedIndex={selectedSeconds}
        //         onChange={index => {
        //           setSelectedSeconds(index);
        //         }}
        //         visibleRest={1}
        //         itemHeight={46}
        //         containerStyle={styles.wheel}
        //         decelerationRate={0.9}
        //         itemStyle={{backgroundColor: 'transparent'}}
        //         itemTextStyle={styles.itemText}
        //         selectedIndicatorStyle={styles.selectedStyle}
        //         // flatListProps={{shouldRasterizeIOS: true, initialNumToRender: 61}}
        //       />
        //     </View>
        //   </View>
        // ) 
        // : 
        // [3, 6, 10].includes(currentQuestion) 
        // ? 
        // (
        //   <View style={styles.eleContainer}>
        //     <Text style={styles.fiveText}>{selectedNumber}</Text>
        //     <View style={styles.numberContainer}>
        //       {questions[currentQuestion].options.map(_option => {
        //         return (
        //           <TouchableOpacity
        //             style={[
        //               styles.numberButton,
        //               selectedNumber === _option && styles.selectedNumber,
        //             ]}
        //             onPress={() => setSelectedNumber(_option)}
        //             key={_option}>
        //             <Text
        //               style={[
        //                 styles.numberText,
        //                 selectedNumber === _option && styles.selectedText,
        //               ]}>
        //               {_option}
        //             </Text>
        //           </TouchableOpacity>
        //         );
        //       })}
        //     </View>
        //   </View>
        // ) : 
        (
          <FlatList
            contentContainerStyle={styles.optionContainer}
            data={questions[currentQuestion]?.options || []}
            keyExtractor={(item, index) => `${item}-${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === index && styles.selectedOption,
                ]}
                onPress={() => setSelectedOption(index)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<></>}
          />
        )}

        <View style={styles.bottomContainer}>
          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor:
                  (selectedOption === undefined &&
                    ![2,5,6].includes(currentQuestion)) ||
                  isPending
                    ? '#ccc'
                    : '#fff',
              },
            ]}
            onPress={handleNextQuestion}
            disabled={
              (selectedOption === undefined &&
                ![2,5,6].includes(currentQuestion)) ||
              isPending
            }>
            {isPending ? (
              <ActivityIndicator color="#000" size={22 / fontScale} />
            ) : (
              <Text style={styles.continueText}>Continue</Text>
            )}
          </TouchableOpacity>
          {/* <View style={styles.backContainer}>
          <AppText style={{...styles.backText, color: COLORS.lightGray}}>
            or
          </AppText>
          <AppText style={styles.backText}>skip quiz</AppText>
          <TouchableOpacity onPress={() => handlePreviousQuestion()}>
            <AntDesign name="arrowright" size={14 / fontScale} color={'#fff'} />
          </TouchableOpacity>
        </View> */}
        </View>
      </ScreenWrapper>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
  },
  progressBackContainer: {
    flexDirection: 'row',
    gap: 18,
    paddingTop: 16,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#3A3838',
    borderRadius: 2 / fontScale,
    marginTop: 10,
    marginBottom: 34,
    flex: 1,
    // width: '90%',
  },
  picker_container: {marginTop: 101, width: '82%', alignSelf: 'center'},
  picker_row: {
    flexDirection: 'row',
    gap: 13 / fontScale,
    marginTop: '0.5%',
  },
  picker_title: {
    paddingHorizontal: 28,
    fontFamily: 'Monrope-Bold',
    fontSize: 18 / fontScale,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#BF00FF',
    borderRadius: 2 / fontScale,
  },
  questionNumber: {
    color: '#fff',
    fontSize: 26 / fontScale,
    fontFamily: 'NeueHaasDisplay-Black',
    letterSpacing: 0.3,
    lineHeight: 30 / fontScale,
    marginTop: 2,
    // marginBottom: 32,
    textAlign: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 30 / fontScale,
    fontFamily: 'NeueHaasDisplay-Bold',
    marginBottom: 20,
    // letterSpacing: 1,
    lineHeight: 34 / fontScale,
    textAlign: 'center',
    // width: '100%',
  },
  questionSubText: {
    color: '#ffffff80',
    fontSize: 16 / fontScale,
    fontFamily: 'Manrope-Regular',
    marginBottom: 40,
    textAlign: 'center',
    width: '70%',
    alignSelf: 'center'
  },
  optionButton: {
    padding: 23,
    borderRadius: 10 / fontScale,
    backgroundColor: '#161616',
    marginBottom: 16,
    alignItems: 'center',
    borderColor: '#4C4A4A',
    borderWidth: 0.2
  },
  selectedOption: {
    backgroundColor: '#9F01D2',
  },
  selectedStyle: {
    backgroundColor: '#007AD1',
    borderRadius: 10 / fontScale,
  },
  optionText: {
    color: '#fff',
    fontSize: 16 / fontScale,
    fontFamily: 'Manrope-SemiBold',
  },
  optionContainer: {
    paddingBottom: 120,
  },
  bottomContainer: {
    bottom: 60,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  continueButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 100 / fontScale,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  continueText: {
    color: '#000',
    fontSize: 16 / fontScale,
    fontFamily: 'Manrope-ExtraBold',
  },
  backContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 12 / fontScale,
    fontFamily: 'Manrope-Regular',
  },
  wheel: {
    // width: '80%',
    flex: 1,
    alignSelf: 'center',
  },
  itemText: {
    fontFamily: 'NeueHaasDisplay-Black',
    fontSize: 27 / fontScale,
    color: '#fff',
  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    
    // marginVertical: SCREEN_HEIGHT * 0.04,
},
  fiveText: {
    fontSize: 160 / fontScale,
    fontFamily: 'NeueHaasDisplay-Black',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 22,
  },
  numberContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#0E1539',
    padding: 8,
    paddingHorizontal: 9,
    borderRadius: 18 / fontScale,
    height: 80,
    // borderColor: '#007AD1',
    borderWidth: 0.5 / fontScale,
  },
  numberButton: {
    paddingVertical: 20,
    paddingTop: 18,
    paddingHorizontal: 21,
    borderRadius: 16 / fontScale,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'transparent',
    flex: 1,
    // marginHorizontal: 5,
  },
  selectedNumber: {
    backgroundColor: '#007AD1',
  },
  numberText: {
    color: '#FFF',
    fontSize: 20 / fontScale,
    fontFamily: 'WorkSans-Bold',
    // lineHeight: 22 / fontScale,
    // paddingHorizontal: 4,
  },
  selectedText: {
    fontWeight: 'bold',
  },
});
