"C:\Program Files\Mozilla Firefox\firefox.exe" "testsuite\selenium\core\TestRunner.html?test=..\..\W3C-XForms-1.1\Edition1\driverPages\SeleniumTests\W3CTestSuite.html&auto=true&save=true&resultsUrl=..\..\xforms11-ff3-results.html&close=true"
ant -f "testsuite\build.xml"
if "%ERRORLEVEL%" == "1" exit 1