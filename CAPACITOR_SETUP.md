# 📱 Capacitor Mobile App Setup Guide

## 🎉 Setup Complete!

Your CV Builder app is now configured to generate **native mobile apps** for Android (APK) and iOS (IPA)!

---

## 📋 What Was Installed

### Dependencies Added
- `@capacitor/core` - Core Capacitor runtime
- `@capacitor/cli` - Capacitor command-line tools
- `@capacitor/android` - Android platform support
- `@capacitor/ios` - iOS platform support
- `@capacitor/assets` - Icon and splash screen generator

### Files Created
- `capacitor.config.ts` - Main Capacitor configuration
- `android/` - Native Android project (auto-generated)
- `ios/` - Native iOS project (auto-generated)
- `resources/icon.png` - Source icon (512x512)
- `resources/splash.png` - Source splash screen

### Files Modified
- `package.json` - Added Capacitor scripts
- `vite.config.ts` - Set `base: ''` for Capacitor compatibility
- `.gitignore` - Added Capacitor folders

---

## 🚀 Quick Start Commands

```bash
# Build web app and sync to mobile platforms
npm run build:mobile

# Sync web assets to platforms (without rebuilding)
npm run cap:sync

# Open Android Studio to build APK
npm run cap:android

# Open Xcode to build IPA (Mac only)
npm run cap:ios
```

---

## 📦 Building APK (Android)

### Prerequisites
- Install [Android Studio](https://developer.android.com/studio)
- Install Java Development Kit (JDK 11 or higher)

### Steps to Generate APK

1. **Build and sync your app:**
   ```bash
   npm run build:mobile
   ```

2. **Open Android Studio:**
   ```bash
   npm run cap:android
   ```

3. **In Android Studio:**
   - Wait for Gradle sync to complete (first time may take 5-10 minutes)
   - Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Wait for build to complete
   - Click **locate** in the notification to find your APK

4. **APK Location:**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Building Release APK (For Distribution)

1. **Generate signing key:**
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore \
     -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing in Android Studio:**
   - Build → Generate Signed Bundle / APK
   - Select APK
   - Create new key store or use existing
   - Fill in signing information
   - Select **release** build variant
   - Click Finish

3. **Release APK Location:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

---

## 🍎 Building IPA (iOS)

### Prerequisites
- **Mac computer** (required for iOS builds)
- Install [Xcode](https://apps.apple.com/app/xcode/id497799835) (from Mac App Store)
- Apple Developer Account (for distribution)

### Steps to Generate IPA

1. **Build and sync your app:**
   ```bash
   npm run build:mobile
   ```

2. **Open Xcode:**
   ```bash
   npm run cap:ios
   ```

3. **In Xcode:**
   - Select your development team (Apple Developer Account)
   - Choose a device or simulator
   - Click ▶️ **Run** to test on simulator

### Building for App Store / TestFlight

1. **Configure signing:**
   - In Xcode, select **App** target
   - Go to **Signing & Capabilities** tab
   - Select your team
   - Choose **Automatically manage signing**

2. **Archive the app:**
   - Product → Archive
   - Wait for archive to complete
   - Click **Distribute App**
   - Choose distribution method:
     - **App Store Connect** - For TestFlight/App Store
     - **Ad Hoc** - For testing on specific devices
     - **Development** - For personal testing

3. **Export IPA:**
   - Follow the distribution wizard
   - IPA file will be saved to your chosen location

---

## 🔧 Development Workflow

### Making Changes

1. **Edit your React code** in `src/`

2. **Build and sync:**
   ```bash
   npm run build:mobile
   ```

3. **Test in browser first:**
   ```bash
   npm run dev
   ```

4. **Then test on mobile:**
   ```bash
   npm run cap:android  # For Android
   npm run cap:ios      # For iOS
   ```

### Live Reload (Development)

You can use live reload for faster development:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Update `capacitor.config.ts`:**
   ```typescript
   const config: CapacitorConfig = {
     // ... existing config
     server: {
       url: 'http://YOUR_LOCAL_IP:3000',
       cleartext: true
     }
   };
   ```

3. **Sync and run:**
   ```bash
   npm run cap:sync
   npm run cap:android  # or cap:ios
   ```

**Remember:** Remove `server.url` before building for production!

---

## 📱 App Information

- **App Name:** CV Builder
- **App ID:** `com.cvbuilder.app`
- **Version:** 1.0.0
- **Description:** Create professional resumes with beautiful templates

### Changing App Details

Edit `capacitor.config.ts`:
```typescript
const config: CapacitorConfig = {
  appId: 'com.yourcompany.appname',  // Change this
  appName: 'Your App Name',           // Change this
  // ...
};
```

---

## 🎨 Customizing Icons & Splash Screens

### Using New Icons

1. **Replace source images:**
   - `resources/icon.png` (1024x1024 recommended)
   - `resources/splash.png` (2732x2732 recommended)

2. **Regenerate assets:**
   ```bash
   npm run assets:generate
   ```

3. **Sync to platforms:**
   ```bash
   npm run cap:sync
   ```

---

## 🐛 Troubleshooting

### Android Issues

**Gradle build fails:**
- Ensure Java JDK 11+ is installed
- Check internet connection (downloads dependencies)
- Try: File → Invalidate Caches / Restart in Android Studio

**App won't run on device:**
- Enable Developer Mode on Android device
- Enable USB Debugging
- Accept USB debugging prompt on device

**APK won't install:**
- Ensure "Install from Unknown Sources" is enabled
- Check if app is already installed (uninstall first)

### iOS Issues

**Signing errors:**
- Ensure you're logged into your Apple Developer account in Xcode
- Select correct development team
- Check bundle identifier is unique

**Simulator not showing:**
- Xcode → Preferences → Components
- Download desired iOS simulator

**Build fails:**
- Clean build folder: Product → Clean Build Folder
- Delete derived data: Xcode → Preferences → Locations → Derived Data → Delete

---

## 📚 Publishing Your App

### Google Play Store (Android)

1. Create a [Google Play Console](https://play.google.com/console) account ($25 one-time fee)
2. Build a signed release APK (see above)
3. Create a new application in Play Console
4. Upload your APK
5. Fill in store listing details
6. Submit for review

### Apple App Store (iOS)

1. Enroll in [Apple Developer Program](https://developer.apple.com/programs/) ($99/year)
2. Create app in [App Store Connect](https://appstoreconnect.apple.com/)
3. Archive and upload from Xcode
4. Fill in app information
5. Submit for review

---

## 🔌 Adding Native Features

Need camera, geolocation, push notifications, etc.?

### Install Capacitor Plugins

```bash
# Example: Add camera support
npm install @capacitor/camera
npx cap sync

# Example: Add filesystem
npm install @capacitor/filesystem
npx cap sync
```

### Available Plugins
- [@capacitor/camera](https://capacitorjs.com/docs/apis/camera) - Camera and photo library
- [@capacitor/filesystem](https://capacitorjs.com/docs/apis/filesystem) - File system access
- [@capacitor/share](https://capacitorjs.com/docs/apis/share) - Share content
- [@capacitor/geolocation](https://capacitorjs.com/docs/apis/geolocation) - GPS location
- [@capacitor/push-notifications](https://capacitorjs.com/docs/apis/push-notifications) - Push notifications
- [@capacitor/status-bar](https://capacitorjs.com/docs/apis/status-bar) - Status bar styling

[Browse all official plugins →](https://capacitorjs.com/docs/apis)

---

## 📖 Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [iOS Developer Guide](https://developer.apple.com/documentation/)
- [Google Play Publishing Guide](https://support.google.com/googleplay/android-developer/answer/9859152)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

---

## ✅ Next Steps

1. ✅ **Test on Android:** `npm run build:mobile && npm run cap:android`
2. ✅ **Test on iOS:** `npm run build:mobile && npm run cap:ios` (Mac only)
3. 📝 **Update app metadata** in `capacitor.config.ts`
4. 🎨 **Customize icons/splash** in `resources/` folder
5. 📱 **Add native features** as needed
6. 🚀 **Publish to stores** when ready!

---

**Need help?** Check the [Capacitor Community Forum](https://forum.ionicframework.com/c/capacitor) or [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)
