rd /s /q "node_modules"
del package-lock.json
del -f yarn.lock

npm i --legacy-peer-deps

npm run build

pause
