# Introduction #

This page describes the configuration settings required to run tests in the various browsers, on your machine.

# Selenium #

Selenium tests involve an XForms, some driver files and the Selenium library itself. The various files can be in various locations, but usually they will all be running on your local machine.

## Firefox 3 ##

To run Selenium tests against Firefox 3, ensure that you have the latest stable version, which is always available from the [Firefox home-page](http://firefox.com). If you also plan to test with Internet Explorer on the same machine, then when installing Firefox, ensure that the 'make this my default browser' option is _not_ checked.

Although a test profile is required when running Firefox under a Buildbot slave, it's not completely necessary when testing manually. However, since it is quite a simple step, we would recommend it -- that way any changes you need to make to the browser to allow the test-suite to run don't need to be applied to your normal profile.

### Creating a test profile ###

Firefox supports multiple profiles. To create one for Buildbot, type:
```
"c:\Program Files\Mozilla Firefox\firefox.exe" -CreateProfile "buildbot C:\Documents and Settings\buildbot\ff-profile"
```

All of the configurations in the next section need to be applied to this test profile, so load Firefox with the Buildbot profile:

```
"c:\Program Files\Mozilla Firefox\firefox.exe" -P buildbot"
```

Acknowledge the dialog that asks if you want Firefox to be your default browser, since this will cause problems when the tests are run with Buildbot.

### Running tests locally ###

If you want to run the tests from local files -- and you will need to if you are setting up a Buildbot slave -- Firefox needs to be told to allow local files to be regarded as coming from the 'same origin'. To do this, navigate to:

```
about:config
```

and acknowledge the warning. When the list of options is shown, filter on:

```
strict_origin_policy
```

You should be left with one option:

```
security.fileuri.strict_origin_policy
```

If it is already set to `false` then there is nothing to do, but if it is `true`, double-click on the option to toggle its value.

### Automatically closing Firefox when the tests are complete ###

When the Selenium tests are run on a Buildbot slave they will close Firefox when they are finished. However, FF3 does not allow this behaviour by default, so once again, if you are setting up a Buildbot slave you'll need to change another setting; the property:

```
dom.allow_scripts_to_close_windows
```

needs to be set to `true`.

### Saving the test results ###

If you ask Selenium to save the test results, then the first time the tests are run there will be a security message that needs to be acknowledged. This gives Firefox permission to save the test output to a local file. Provided the check-box for 'remembering' the value is set, then this will not need to be done again.

If you are setting up a Buildbot slave then you'll need to run some tests that cause this prompt to be shown, so that you can acknowledge it; that way the Buildbot tests won't be blocked whilst the browser is waiting for acknowledgement. This can be done using the following configuration test.

### Verifying your configuration ###

The easiest way to check whether everything is working correctly is to run an Ant task. This tests both the browser configuration and the Buildbot slave set-up if you are installing a slave.

`ant -f testsuite/build.xml run-selenium-test -Dsection=02 -Dbrowser=ff`

This will open the Firefox browser using the profile created above, and automatically start running all of the tests for the specified chapter (the `section` parameter). If the tests don't start to run immediately then check that the 'origin policy' setting described above, has been set correctly.

Once complete, the browser will attempt to write the results to a file, but will require your permission to do so. This only needs to be given once. For this example, the results file would be available at `testsuite/xforms11-Chapter02-ff-results.html`.

After saving the test results the browser should close. If that doesn't happen then double-check the 'close window' permission described above.

If you want to load the tests ready to be run manually, then add `auto=false`:
```
ant -f testsuite/build.xml run-selenium-test -Dsection=02 -Dbrowser=ff -Dauto=false
```

## Internet Explorer 7 ##

To run Selenium tests against Internet Explorer 7, ensure that you have the latest stable version, which is always available from the [IE7 home-page](http://www.microsoft.com/windows/downloads/ie/getitnow.mspx).

The W3C XForms 1.1 test-suite uses XHTML files to hold the XForms. If you plan to run these tests in IE, then a registry setting needs to be changed to allow IE to treat a file with the `.xhtml` extension as an ordinary HTML file.

To do this, open the registry editor:
```
regedit
```
Expand the `HKEY_CLASSES_ROOT` tree and then type `MIME`; this will take you to the MIME type tree. Inside you'll find another tree called `Database` which contains all of the MIME mappings. Expand that, then open the `Content Type` tree.

There is unlikely to be an entry for `application/xhtml+xml`, but it's worth double-checking. Assuming that there isn't, click on the right-hand mouse on `Content Type`, and choose `New > Key`, and then provide a name of `application/xhtml+xml`.

On the new key, click on the right-hand mouse and choose `New > String Value`, and then provide a name of `CLSID`. Double-click the resulting entry and add the value `{25336920-03F9-11cf-8FD0-00AA00686F13}`.

Again, on the new key (`application/xhtml+xml`), click on the right-hand mouse and choose `New > String Value`, and provide a name of `Extension`. Double-click the resulting entry and add the value `.xhtml`.

Finally, on the new key click on the right-hand mouse and choose `New > Binary Value`, and provide a name of `Encoding`. Double-click the resulting entry and type the values `08`, `00`, `00` and `00`.