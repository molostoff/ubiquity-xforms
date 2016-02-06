# Introduction #

M      testsuite\selenium\core\scripts\selenium-browserbot.js

> Only added  saveTitleInfo(t);  on line 795.
> The saveTitleInfo function is defined in selenium-testrunner.js on line 32.

M      testsuite\selenium\core\scripts\user-extensions.js

> All code after line 116 is new.  Most of these functions call global functions that are in selenium-testrunner.js.  These functions are called from sendResults.xhtml.
> Selenium.prototype.getOneResult     gets one test case result.  (It's from the test case that previously ran.)
> Selenium.prototype.getTestCaseName  gets the test case name.    (It's from the test case that previously ran.)
> Selenium.prototype.getFile          gets the Results file info. (It's from the test case that previously ran.)
> Selenium.prototype.getBrowser       gets the browser being used.
> Selenium.prototype.getColor         gets the background-color of a form, used for Appendix G & H test cases.

M      testsuite\selenium\core\scripts\selenium-testrunner.js

> Most of this file has really good comments.
> Added global variables and global functions on lines 21-67.
> Added lines 99-103.
> Updated runNextTest() on line 158.
> Added setTestCaseFailed(); on line 493.
> Updated runNextTestInSuite on line 672.
> Added runLastTestInSuite on line 689.

M      testsuite\selenium\core\TestRunner.html

> This file adds the SaveResultsOn button and SaveResultsOff button starting on line 114.

A      testsuite\W3C-XForms-1.1\Edition1\driverPages\SeleniumTests\results-write.xhtml

> This file gets the instance data from the correct Results xml file, updates the instance data, and writes the updated instance data back to the correct Results xml file.
> Someone needs to update it to work on different browsers.  (I think that is all that I didn't do.)

A      testsuite\W3C-XForms-1.1\Edition1\driverPages\SeleniumTests\sendResults.html

> This is the last w3c test case, so it will be run after every w3c test case is run.
> It stores the chapter, testcase, status, and browser.
> Then, it opens the results-write.xhtml file with those variables.
> Then, it pauses for the file to be loaded.
> Then, it clicks the submit button.

M      testsuite\W3C-XForms-1.1\Edition1\driverPages\SeleniumTests\W3CTestSuite.html

> Only added a comment on line 53, and uncommented the "send the Results" test case near line 545.

# Detailed tutorial #

I saved my work only in the tests-and-examples branch under [revision 1568](https://code.google.com/p/ubiquity-xforms/source/detail?r=1568).

This is what we want to do:
1) Run all of the Testsuite while not starting at the beginning and not saving all those Results. (In this scenario, you have to (Part A) turn the save Results on and run one selected test.  Then (Part B) you will turn the save Results off and run all tests, which will start at that test case and not save all of those Results.)
2) Run all of the Testsuite while not starting at the beginning and saving all those Results. (In this scenario, you have to (Part A) turn the save Results on, run one selected test, and then (Part B) run all tests, which will start at that test case and save all of those Results.)
(Starting at the beginning or running one selected test case are simple to do and understand once you know how to do and understand these two scenarios.)

File References:
ST.js = testsuite/selenium/core/scripts/selenium-testrunner.js.
SB.js = testsuite/selenium/core/scripts/selenium-browserbot.js.
UE.js = testsuite/selenium/core/scripts/user-extensions.js.
SR.html = testsuite/W3C-XForms-1.1/Edition1/driverPages/SeleniumTests/sendResults.html.
RW.xhtml = testsuite/W3C-XForms-1.1/Edition1/driverPages/SeleniumTests/results-write.xhtml.

## SCENARIO ONE-PART A: ##
-USER INSTRUCTIONS
> -PROCESSES BEING EXECUTED

Open testsuite/index.html.
Click on the w3c Selenium Tests link.
> The updated testsuite/selenium/core/TestRunner.html is opened.
> It loads all of the normal things that you have seen before.
> It also adds the Save Results On button on line 117.
> It also adds the Save Results Off button on line 121. (More information on that to come.)
Click on the Save Results On button.
> turnSaveResultsOn() from ST.js on line 200 will turn the saveResults flag on.
Click on a test (for this tutorial a failed test is good).
Click on the Selected button to run that test.
> runSingleTest() from ST.js on line 219 will set runAllTests to false and run the selected test. (Not new code.)
> (All Selenium tests verify title.) When verifyTitle is called, getTitle() from SB.js on line 795 will call my added saveTitleInfo() with the title as a parameter.
> saveTitleInfo() from ST.js on line 32 will use that title to save the testCaseChapter and the testCaseNumber to be used later.
> Testing will continue. (Not new code.)
> If that test case fails, it will eventually go to markFailed() from ST.js on line 200, where the test case will be marked red and my added setTestCaseFailed() will be
> called.
> setTestCaseFailed() from ST.js on line 53 will set testCaseFailed to true.
> When that test case is done, it will eventually go to testComplete() from ST.js on line 1128 where runNextTest() will be called.  (Not new code.)
> runNextTest() from ST.js on line 153 will do this…
> The first if statement will be true, because runAllTests was set to false.
> We turned on saveResults, so the testSuiteFlag will switch and become false, when the TestRunner is loaded, the flag is true.
> Since the testSuiteFlag is false, runLastTestInSuite() will run next.
> runLastTestInSuite() from ST.js on line 692 will save the row number of the test case that was just run, move to the last row in the suite, and run that test(SR.html).

> When storeOneResult is called, getOneResults() from UE.js on line 117 will be called.
> getOneResult() will call getTestCaseFailed() from ST.js on line 57, which returns the testCaseFailed Boolean, and return Passed or Failed depending on that Boolean.
> When storeFile is called, getFile() from UE.js on line 132 will be called.
> getFile() will call getChapter() from ST.js on line 61, which returns the testCaseChapter, and return the correct file string using that chapter.
> When storeTestCaseName is called, getTestCaseName() from UE.js on line 127 will be called.
> getTestCaseName() will call getTestCaseNumber() from ST.js on line 65, which returns the testCaseNumber, and return that number.  (Number & name are the same
> here.)
> When storeBrowser is called, getBrowser() from UE.js on line 137 will be called.
> getBrowser() creates a BrowserVersion object from selenium-browserdetect.js and uses it to return the correct browser name.
> Then the SR.html uses those stored variables and opens RW.xhtml with the correct values.
> Then SR.html waits for RW.xhtml to do its magic.
> RW.xhtml does its magic and displays the File, testCaseName, and testCaseResult using outputs. (The outputs show up on FF.)
> Then SR.html clicks on the submit button to send the Result to the correct xml file. (Now, it does nothing.)

> Then Selenium will call testComplete() from ST.js on line 1128 where runNextTest() will be called.  (Not new code.)
> runNextTest() from ST.js on line 153 will do this…
> The first if statement will be true, because runAllTests is still false.
> saveResults is still on, so the testSuiteFlag will switch and go back to true.
> Since the testSuiteFlag is true and we only wanted to do one test, testCaseFailed is set back to false, the return statement is hit, and Selenium stops for now.




## SCENARIO ONE-PART B: ##

Click on the Save Results Off button.
> turnSaveResultsOff() from ST.js on line 204 will turn the saveResults flag off.
Click on the All button to run the rest of the testSuite from the previous test case onward.
> startTestSuite() from ST.js on line 145 will set runAllTests to true and call runNextTest(). (Not new code.)
> runNextTest() from ST.js on line 153 will do this…
> The first if statement will be false, because runAllTests was just set to true.
> The current row number will be set next to the saved row number from the Selected test case that was run.
> The next if statement will be true, because the testSuiteFlag was last set to true.
> testCaseFailed is reset to false and runNextTestInSuite().
> We turned off saveResults, so the testSuiteFlag will not be switched, so it will stay true.
> runNextTestInSuite() from ST.js on line 675 will increment the row number and save the row number of the test case that will be run.
> (If the test case that will be run is the last test case in the testSuite, that test case is not skipped.)
> Then, the test case at the current row number will be run.

> When that test case is done, it will eventually go to testComplete() from ST.js on line 1128 where runNextTest() will be called.  (Not new code.)
> runNextTest() from ST.js on line 153 will do the same things and run the next test cases in the testSuite, because runAllTests, the testSuiteFlag, and saveResults did not
> change.


## SCENARIO TWO-PART A (Same as Scenario One-Part A): ##
-USER INSTRUCTIONS
> -PROCESSES BEING EXECUTED

Open testsuite/index.html.
Click on the w3c Selenium Tests link.
> The updated testsuite/selenium/core/TestRunner.html is opened.
> It loads all of the normal things that you have seen before.
> It also adds the Save Results On button on line 117.
> It also adds the Save Results Off button on line 121.
Click on the Save Results On button.
> turnSaveResultsOn() from ST.js on line 200 will turn the saveResults flag on.
Click on a test (for this tutorial a failed test is good).
Click on the Selected button to run that test.
> runSingleTest() from ST.js on line 219 will set runAllTests to false and run the selected test. (Not new code.)
> (All Selenium tests verify title.) When verifyTitle is called, getTitle() from SB.js on line 795 will call my added saveTitleInfo() with the title as a parameter.
> saveTitleInfo() from ST.js on line 32 will use that title to save the testCaseChapter and the testCaseNumber to be used later.
> Testing will continue. (Not new code.)
> If that test case fails, it will eventually go to markFailed() from ST.js on line 200, where the test case will be marked red and my added setTestCaseFailed() will be
> called.
> setTestCaseFailed() from ST.js on line 53 will set testCaseFailed to true.
> When that test case is done, it will eventually go to testComplete() from ST.js on line 1128 where runNextTest() will be called.  (Not new code.)
> runNextTest() from ST.js on line 153 will do this…
> The first if statement will be true, because runAllTests was set to false.
> We turned on saveResults, so the testSuiteFlag will switch and become false, when the TestRunner is loaded, the flag is true.
> Since the testSuiteFlag is false, runLastTestInSuite() will run next.
> runLastTestInSuite() from ST.js on line 692 will save the row number of the test case that was just run, move to the last row in the suite, and run that test (SR.html).

> When storeOneResult is called, getOneResults() from UE.js on line 117 will be called.
> getOneResult() will call getTestCaseFailed() from ST.js on line 57, which returns the testCaseFailed Boolean, and return Passed or Failed depending on that Boolean.
> When storeFile is called, getFile() from UE.js on line 132 will be called.
> getFile() will call getChapter() from ST.js on line 61, which returns the testCaseChapter, and return the correct file string using that chapter.
> When storeTestCaseName is called, getTestCaseName() from UE.js on line 127 will be called.
> getTestCaseName() will call getTestCaseNumber() from ST.js on line 65, which returns the testCaseNumber, and return that number.  (Number & name are the same
> here.)
> When storeBrowser is called, getBrowser() from UE.js on line 137 will be called.
> getBrowser() creates a BrowserVersion object from selenium-browserdetect.js and uses it to return the correct browser name.
> Then the SR.html uses those stored variables and opens RW.xhtml with the correct values.
> Then SR.html waits for RW.xhtml to do its magic.
> RW.xhtml does its magic and displays the File, testCaseName, and testCaseResult using outputs. (The outputs show up on FF.)
> Then SR.html clicks on the submit button to send the Result to the correct xml file. (Now, it does nothing.)

> Then Selenium will call testComplete() from ST.js on line 1128 where runNextTest() will be called.  (Not new code.)
> runNextTest() from ST.js on line 153 will do this…
> The first if statement will be true, because runAllTests is still false.
> saveResults is still on, so the testSuiteFlag will switch and go back to true.
> Since the testSuiteFlag is true and we only wanted to do one test, testCaseFailed is set back to false, the return statement is hit, and Selenium stops for now.


## SCENARIO TWO-PART B: ##

Click on the All button to run the rest of the testSuite from the previous test case onward.
> startTestSuite() from ST.js on line 145 will set runAllTests to true and call runNextTest(). (Not new code.)
> runNextTest() from ST.js on line 153 will do this…
> The first if statement will be false, because runAllTests was just set to true.
> The current row number will be set next to the saved row number from the Selected test case that was run.
> The next if statement will be true, because the testSuiteFlag was last set to true.
> testCaseFailed is reset to false and runNextTestInSuite().
> saveResults is still turned **on, so the testSuiteFlag will be switched and become false.**
> runNextTestInSuite() from ST.js on line 675 will increment the row number and save the row number of the test case that will be run.
> (If the test case that will be run is the last test case in the testSuite, that test case is skipped and will not be run.)
> Then, the test case at the current row number will be run.

> When that test case is done, it will eventually go to testComplete() from ST.js on line 1128 where runNextTest() will be called.  (Not new code.)
> runNextTest() from ST.js on line 153 will do this…
> The first if statement will be false, because runAllTests is still set to true.
> The current row number will be set next to the saved row number from the previous test case that was run.
> The next if statement will be **false, because the testSuiteFlag was last set to false.**
> runLastTestInSuite() from ST.js on line 692 will save the row number of the test case that was just run, move to the last row in the suite, and run that test (SR.html).
> saveResults is still turned **on, so the testSuiteFlag will be switched and become true.**
> After SR.html finishes, then Selenium will call testComplete() from ST.js on line 1128 where runNextTest() will be called.  (Not new code.)
> runNextTest() from ST.js on line 153 will run the next test case, then run the last test, then run the next test case, then run the last test, and on, and on.