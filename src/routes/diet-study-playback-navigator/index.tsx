import React from 'react';

import {
  DietStudyPlaybackIntroScreen,
  DietStudyPlaybackGlobalScreen,
  DietStudyPlaybackDietQualityScreen,
  DietStudyPlaybackYourDietScreen,
  DietStudyPlaybackGutHealthScreen,
  DietStudyPlaybackYourGutScreen,
  DietStudyPlaybackResearchScreen,
} from '@covid/features';

interface IProps {
  Stack: any;
}

function DietStudyPlaybackNavigator({ Stack }: IProps) {
  const noHeader = {
    headerShown: false,
  };
  return (
    <>
      <Stack.Screen name="DietStudyPlaybackIntro" component={DietStudyPlaybackIntroScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackGlobal" component={DietStudyPlaybackGlobalScreen} options={noHeader} />
      <Stack.Screen
        name="DietStudyPlaybackDietQuality"
        component={DietStudyPlaybackDietQualityScreen}
        options={noHeader}
      />
      <Stack.Screen name="DietStudyPlaybackYourDiet" component={DietStudyPlaybackYourDietScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackGutHealth" component={DietStudyPlaybackGutHealthScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackYourGut" component={DietStudyPlaybackYourGutScreen} options={noHeader} />
      <Stack.Screen name="DietStudyPlaybackResearch" component={DietStudyPlaybackResearchScreen} options={noHeader} />
    </>
  );
}

export default DietStudyPlaybackNavigator;
