# Reproduction #3501

see https://github.com/react-native-video/react-native-video/issues/3501

- Clic on PiP button to go to PiP mode
  - `onPictureInPictureStatusChanged` is called with `isActive = true`
- Close PiP mode
  - `onPictureInPictureStatusChanged` is called with `isActive = false`
  - `onPictureInPictureStatusChanged` is immediatly called with `isActive = true`

# Reproduction #3598

see https://github.com/react-native-video/react-native-video/issues/3598

- Clic on PiP button to go to PiP mode
- Close PiP mode
  - `onRestoreUserInterfaceForPictureInPictureStop` is never called
