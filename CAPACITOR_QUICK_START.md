# 📱 Capacitor Quick Start - CV Builder

## ✅ Setup Complete!

Your React app is now ready to build native mobile apps for **Android (APK)** and **iOS (IPA)**!

---

## 🚀 Quick Commands

### Build for Mobile
```bash
npm run build:mobile    # Build web app + sync to native platforms
```

### Open Native IDEs
```bash
npm run cap:android     # Open Android Studio (build APK)
npm run cap:ios         # Open Xcode (build IPA) - Mac only
```

### Sync After Changes
```bash
npm run cap:sync        # Sync web assets to mobile without rebuilding
```

---

## 📦 Generate APK (Android)

1. **Build and open Android Studio:**
   ```bash
   npm run build:mobile
   npm run cap:android
   ```

2. **In Android Studio:**
   - Wait for Gradle sync to finish
   - Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Find APK at: `android/app/build/outputs/apk/debug/app-debug.apk`

3. **Install on device:**
   - Transfer APK to Android device
   - Enable "Install from Unknown Sources"
   - Tap APK to install

---

## 🍎 Generate IPA (iOS)

**Requirements:** Mac with Xcode installed

1. **Build and open Xcode:**
   ```bash
   npm run build:mobile
   npm run cap:ios
   ```

2. **In Xcode:**
   - Select your Apple Developer team
   - Choose a device/simulator
   - Click ▶️ Run to test
   - Product → Archive to create IPA for distribution

---

## 🔄 Development Workflow

1. Make changes to your React code in `src/`
2. Test in browser: `npm run dev`
3. Build for mobile: `npm run build:mobile`
4. Open native IDE and test on device

---

## 📱 App Details

- **App Name:** CV Builder
- **App ID:** com.cvbuilder.app
- **Platforms:** Android & iOS
- **Icons & Splash:** Auto-generated from `resources/` folder

---

## 📚 Full Documentation

See [CAPACITOR_SETUP.md](./CAPACITOR_SETUP.md) for:
- Detailed build instructions
- Publishing to app stores
- Troubleshooting guide
- Adding native features
- Customizing icons/splash screens

---

## 🆘 Need Help?

**Common Issues:**

**Android build fails?**
- Install Android Studio: https://developer.android.com/studio
- Ensure JDK 11+ is installed

**iOS build fails?**
- Mac with Xcode required
- Install Xcode from Mac App Store

**App shows blank screen?**
- Run `npm run build:mobile` to rebuild
- Check browser console for errors
- Verify `vite.config.ts` has `base: ''`

---

## ✨ What's Next?

- 📱 Test your app on real devices
- 🎨 Customize app icon/splash in `resources/` folder
- 🔌 Add native features (camera, GPS, etc.)
- 🚀 Publish to Google Play / App Store

**Happy Building! 🎉**
