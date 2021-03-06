import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { CompactHeader, Header } from '@covid/features/dashboard/Header';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { share } from '@covid/components/Cards/BaseShareApp';
import { dietStudyPlaybackReady, shareAppV3 } from '@assets';
import i18n from '@covid/locale/i18n';
import { useAppDispatch } from '@covid/core/state/store';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import Analytics, { events } from '@covid/core/Analytics';
import { pushNotificationService } from '@covid/Services';
import { PartnerLogoUSDash } from '@covid/components/Logos/PartnerLogo';
import { RootState } from '@covid/core/state/root';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { selectApp, setDasboardVisited } from '@covid/core/state/app';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface Props {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'DashboardUS'>;
}

export const DashboardUSScreen: React.FC<Props> = (params) => {
  const app = useSelector(selectApp);
  const dispatch = useAppDispatch();
  const { route, navigation } = params;

  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);
  const [showDietStudyPlayback] = useState<boolean | undefined>(startupInfo?.show_diet_score);

  const headerConfig = {
    compact: HEADER_COLLAPSED_HEIGHT,
    expanded: HEADER_EXPANDED_HEIGHT,
  };

  const onReport = async () => {
    await appCoordinator.gotoNextScreen(route.name);
  };

  const onShare = async () => {
    const shareMessage = i18n.t('share-this-app.message');
    await share(shareMessage);
  };

  useEffect(() => {
    (async () => {
      Analytics.identify();
      await pushNotificationService.refreshPushToken();
    })();
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      dispatch(updateTodayDate());
    });
  }, [navigation]);

  useEffect(() => {
    if (!app.dashboardVisited) {
      if (showDietStudyPlayback) {
        Analytics.track(events.DIET_STUDY_PLAYBACK_DISPLAYED);
      }
      dispatch(setDasboardVisited(true));
    }
  }, []);

  return (
    <CollapsibleHeaderScrollView
      config={headerConfig}
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      expandedHeader={<Header reportOnPress={onReport} />}>
      <View style={styles.calloutContainer}>
        {showDietStudyPlayback && (
          <TouchableWithoutFeedback
            onPress={() => {
              Analytics.track(events.DIET_STUDY_PLAYBACK_CLICKED);
              appCoordinator.goToDietStudyPlayback();
            }}>
            <Image style={styles.dietStudyImage} source={dietStudyPlaybackReady} />
          </TouchableWithoutFeedback>
        )}
        <ExternalCallout
          calloutID="sharev3"
          imageSource={shareAppV3}
          aspectRatio={311 / 135}
          screenName={route.name}
          postClicked={onShare}
        />
      </View>

      <View style={styles.zoe}>
        <PartnerLogoUSDash />
        <PoweredByZoeSmall />
      </View>
    </CollapsibleHeaderScrollView>
  );
};

const styles = StyleSheet.create({
  schoolModuleContainer: {
    marginHorizontal: 32,
    marginBottom: 8,
    height: 200,
  },
  calloutContainer: {
    marginHorizontal: 24,
  },
  zoe: {
    marginBottom: 32,
  },
  dietStudyImage: {
    width: '100%',
    aspectRatio: 1200 / 1266,
    height: undefined,
    resizeMode: 'contain',
    marginVertical: 8,
  },
});
