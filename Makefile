local-run-android:
	@clear
	@react-native run-android

local-run-metro:
	@clear
	@npm start --reset-cache

clean-project:
	watchman watch-del-all
	rm -rf node_modules 
	npm install
	rm -rf /tmp/metro-*

build:
	cd android && ./gradlew assembleRelease
	@echo redirect ke ./app/build/outputs/apk/release
