rmdir ..\back\build /s /q
xcopy build ..\back\build /e /i
@echo off
echo *** Copied build folder to backend project folder