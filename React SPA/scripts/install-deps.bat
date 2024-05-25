@echo off
echo Installing dependencies...

:: List of dependencies
call npm install @azure/msal-browser@latest
call npm install @azure/msal-react@latest
call npm install @fortawesome/fontawesome-svg-core@latest
call npm install @fortawesome/free-regular-svg-icons@latest
call npm install @fortawesome/free-solid-svg-icons@latest
call npm install @fortawesome/react-fontawesome@latest
call npm install @testing-library/jest-dom@latest
call npm install @testing-library/react@latest
call npm install @testing-library/user-event@latest
call npm install @types/jest@latest
call npm install @types/node@latest
call npm install @types/react@latest
call npm install @types/react-dom@latest
call npm install @types/react-router-dom@latest
call npm install @types/uuid@latest
call npm install awesome-debounce-promise@latest
call npm install bootstrap@latest
call npm install react@latest
call npm install react-aad-msal@latest
call npm install react-dom@latest
call npm install react-hook-form@latest
call npm install react-router-dom@latest
call npm install react-toastify@latest
call npm install sass@latest
call npm install uuid@latest

echo Installing devDependencies...

:: List of devDependencies
call npm install @eslint/js@latest --save-dev
call npm install @vitejs/plugin-react@latest --save-dev
call npm install depcheck@latest --save-dev
call npm install eslint@latest --save-dev
call npm install prettier@latest --save-dev
call npm install rimraf@latest --save-dev
call npm install typescript@latest --save-dev

call npm install vite@latest --save-dev 

echo Installation complete!
pause
