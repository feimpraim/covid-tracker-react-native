import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { colors } from '@theme';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import Screen, { Header } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import Analytics, { events } from '@covid/core/Analytics';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { ICoreService } from '@covid/core/user/UserService';
import { Services } from '@covid/provider/services.types';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyIntro'>;
};

export const DietStudyConsentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { currentPatient } = route.params.dietStudyData;
  const userService = useInjection<ICoreService>(Services.User);

  const accept = async () => {
    Analytics.track(events.SIGNED_DIET_STUDY_CONSENT);
    await userService.setDietStudyResponse(true);
    dietStudyCoordinator.gotoNextScreen(route.name);
  };

  const decline = async () => {
    Analytics.track(events.DECLINE_DIET_STUDY_CONSENT);
    await userService.setDietStudyResponse(false);
    dietStudyCoordinator.gotoNextScreen(route.name);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <View style={styles.contentContainer}>
            <Header style={{ marginHorizontal: 0 }}>
              <HeaderText style={styles.header}>{i18n.t('diet-study.consent.header')}</HeaderText>
            </Header>
            <View style={styles.textContainer}>
              <RegularText style={styles.primaryLabel}>{i18n.t('diet-study.consent.paragraph-1')}</RegularText>
              <RegularText style={styles.primaryLabel}>{i18n.t('diet-study.consent.paragraph-2')}</RegularText>
            </View>
          </View>
        </View>
      </Screen>
      <View style={styles.buttonContainer}>
        <HeaderText style={styles.header}>{i18n.t('diet-study.consent.buttons-header')}</HeaderText>
        <View style={{ height: 16 }} />
        <BrandedButton style={styles.primaryButton} onPress={accept}>
          <RegularText style={styles.primaryButtonText}>{i18n.t('diet-study.consent.yes')}</RegularText>
        </BrandedButton>
        <BrandedButton style={styles.secondaryButton} onPress={decline}>
          <RegularText style={styles.secondaryButtonText}>{i18n.t('diet-study.consent.no')}</RegularText>
        </BrandedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
  },
  header: {},
  textContainer: {},
  primaryLabel: {
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 32,
    paddingVertical: 24,
    paddingBottom: 48,
    borderRadius: 16,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: colors.purple,
  },
  secondaryButton: {
    marginTop: 16,
    backgroundColor: colors.backgroundTertiary,
  },
  primaryButtonText: {
    color: colors.white,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});