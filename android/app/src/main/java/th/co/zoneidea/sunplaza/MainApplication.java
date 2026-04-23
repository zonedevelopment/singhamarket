package th.co.zoneidea.sunplaza;

import android.app.Application;
import android.content.Context;

import th.co.zoneidea.sunplaza.BuildConfig;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.shell.MainReactPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import org.wonday.orientation.OrientationPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.soloader.OpenSourceMergedSoMapping;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
//import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
//    SoLoader.init(this, /* native exopackage */ false);
      try {
          SoLoader.init(this, OpenSourceMergedSoMapping.INSTANCE);
      } catch (IOException e) {
          throw new RuntimeException(e);
      }
//    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
      if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
          DefaultNewArchitectureEntryPoint.load();
      }
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.singhamarket.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
