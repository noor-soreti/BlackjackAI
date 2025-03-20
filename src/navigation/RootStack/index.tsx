import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {storage} from '../../Api/Storage';
import AddForumScreen from '../../screens/CommunityScreen/AddForumScreen';
import ForumInScreen from '../../screens/CommunityScreen/ForumInScreen';
import IndexCommunityScreen from '../../screens/CommunityScreen/indexCommuinity';
import PlanScreen from '../../screens/PlanScreen';
import IntroScreen from '../../screens/RootScreens/IntroScreens';
import SignupScreen from '../../screens/RootScreens/SignupScreens';
import AnalysisComplete from '../../screens/RootScreens/SignupScreens/AnalysisComplete';
import CreateAccount from '../../screens/RootScreens/SignupScreens/CreateAccount';
import GiftScreen from '../../screens/RootScreens/SignupScreens/GiftScreen';
import Goals from '../../screens/RootScreens/SignupScreens/Goals';
import PEScoreScreen from '../../screens/RootScreens/SignupScreens/PEScroreScreen';
import QuestionScreen from '../../screens/RootScreens/SignupScreens/QuestionsScreen';
import Rating from '../../screens/RootScreens/SignupScreens/Rating';
import Rewiring from '../../screens/RootScreens/SignupScreens/Rewiring';
import RewiringBenefitsTwoScreen from '../../screens/RootScreens/SignupScreens/RewiringBenefitsTwoScreen';
import RewiringBenfitsScreen from '../../screens/RootScreens/SignupScreens/RewiringBenfitsScreen';
import SliderScreen from '../../screens/RootScreens/SignupScreens/SliderScreen';
import SubscriptionScreen from '../../screens/RootScreens/SignupScreens/SubscriptionScreen';
import SymptomsScreen from '../../screens/RootScreens/SignupScreens/SymptomsScreen';
import Settings from '../../screens/Settings';
import BottomTab from '../MainStack/BottomTab';
import {useAuthContext} from '../../screens/Config';

const Stack = createStackNavigator();

// const auth_routes = [

// ];

const routes = [
  {name: 'QuestionScreen', component: QuestionScreen},
  {name: 'PEScoreScreen', component: PEScoreScreen},
  {name: 'AnalysisComplete', component: AnalysisComplete},
  {name: 'SymptomsScreen', component: SymptomsScreen},
  {name: 'SliderScreen', component: SliderScreen},
  {name: 'RewiringScreen', component: Rewiring},
  {name: 'RewiringBenefitsScreen', component: RewiringBenfitsScreen},
  {name: 'Goals', component: Goals},
  {name: 'Rating', component: Rating},
  {name: 'RewiringBenefitsTwoScreen', component: RewiringBenefitsTwoScreen},
  {name: 'SubscriptionScreen', component: SubscriptionScreen},
  {name: 'tabs', component: BottomTab},
  {name: 'Settings', component: Settings},
  {name: 'ForumInScreen', component: ForumInScreen},
  {name: 'AddForumScreen', component: AddForumScreen},
  {name: 'PlanScreen', component: PlanScreen},
  {name: 'GiftScreen', component: GiftScreen},
  {name: 'ChatScreen', component: IndexCommunityScreen},
];

function RootStack() {
  const last_screen = storage.getString('last_screen');
  const {user} = useAuthContext();

  // console.log(
  //   last_screen
  //     ? last_screen
  //     : user?.user_analysis?.pe_score
  //     ? 'tabs'
  //     : 'QuestionScreen',
  // );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        last_screen
          ? last_screen
          : user?.user_analysis?.pe_score
          ? 'tabs'
          : 'QuestionScreen'
      }
      // initialRouteName={'tabs'}
    >
      {routes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}

export default RootStack;
