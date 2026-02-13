# Spherag Test App

A cross-platform [Expo](https://expo.dev) app (Android, iOS, web) built with [Expo Router](https://docs.expo.dev/router/introduction/) and the new architecture enabled.

## Download the app

- **[Google Play Store](https://play.google.com/store/apps/details?id=works.end.spheragtestapp)** — Install on Android (closed beta: [join the group](https://groups.google.com/g/spherag-test-app) to get access)
- **[TestFlight](https://testflight.apple.com/join/xacXJ66z)** — Beta install on iOS

---

## Run the project locally

This project uses **development builds** (via `expo-dev-client`), so you need a native build. It does **not** run in Expo Go.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [EAS CLI](https://docs.expo.dev/build/setup/) (optional, for cloud builds): `npm install -g eas-cli`

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env.local` in the project root and set:

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key (Android & iOS) |
| `EXPO_PUBLIC_API_ENDPOINT` | API base URL |
| `EXPO_PUBLIC_API_LOGIN_ENDPOINT` | Login API endpoint |

### 3. Generate native projects (first time or after config changes)

```bash
npm run prebuild
```

Use `npm run prebuild:clean` to regenerate from scratch (e.g. after adding native modules).

### 4. Run the app

**Start the dev server:**

```bash
npm start
```

Then choose a target in the terminal, or run a platform directly:

- **Android (emulator or device):**
  ```bash
  npm run android
  ```
  Connected device only: `npm run android:device`

- **iOS (simulator or device, macOS only):**
  ```bash
  npm run ios
  ```
  Connected device only: `npm run ios:device`

- **Web:**
  ```bash
  npm run web
  ```

The app uses [file-based routing](https://docs.expo.dev/router/introduction/); edit files under the **app** directory to develop.

---

## Building for stores (EAS)

Builds are configured with [EAS Build](https://docs.expo.dev/build/introduction/). Ensure you’re logged in:

```bash
eas login
```

- **Development build** (for local dev with dev client):
  ```bash
  eas build --profile development --platform android
  eas build --profile development --platform ios
  ```

- **Preview** (internal distribution):
  ```bash
  eas build --profile preview --platform all
  ```

- **Production** (store submission):
  ```bash
  eas build --profile production --platform all
  ```

Submit to stores with [EAS Submit](https://docs.expo.dev/submit/introduction/):

```bash
eas submit --platform all --profile production
```

