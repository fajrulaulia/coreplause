redis-up:
	docker-compose up -d redis
redis-down:
	docker-compose stop redis

local-run-android:
	react-native run-android

local-run-metro:
	yarn start --reset-cache

react-native-fix-runner:
	watchman watch-del-all
	rm -rf node_modules 
	yarn install
	rm -rf /tmp/metro-*