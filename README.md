# mobile
BitDust APP for Android built with Cordova framework

To add android platform to cordova:
```
$ cordova platform add android
```

Generate a private key:
```
keytool -genkey -v -keystore bitdust.keystore -alias BitDust -keyalg RSA -keysize 2048 -validity 20000
```

To generate the APK, use your private key and chosen password:
```
 cordova build android --release -- --keystore=bitdust.keystore --storePassword=YOUR_PASSWORD --alias=BitDust --password=YOUR_PASSWORD
```
