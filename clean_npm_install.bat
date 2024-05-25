rd /s /q "node_modules"
del package-lock.json
del -f yarn.lock

@REM npm cache clean --force

@REM npm install

npm i --legacy-peer-deps

pause