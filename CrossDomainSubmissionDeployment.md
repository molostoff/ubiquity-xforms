# Introduction #

On some Browsers, cross domain submissions are not a problem (i.e. Internet Explorer so far).  But on other browsers like Firefox, this may be a bigger issue because the architects/developers have removed some of the past capability to issue cross domain requests.  This page will document some techniques to help test the cross domain submissions using XMLHttpRequests in Ubiquity XForms.

# Details #

## Internet Explorer 7 (IE 7) ##

### How to Turn on the IE 7 Default Debugger ###
IE 7 comes standard with a (primitive) default debugger which is useful in finding exception points and JavaScript problems.  To turn it on, select **Tools**, select **Internet Options**, select the **Advanced Tab**, and unselect the **Disable Script Debugging** option.  When you next start up your IE 7 browser, you should see on your **View** menu the **Script Debugger** options.

Another useful tool for development is the [IE Developer Toolbar](http://www.microsoft.com/downloads/details.aspx?familyid=E59C3964-672D-4511-BB3E-2D5E1DB91038&displaylang=en).

### Submission Setting for Cross Domain Access ###
The following setting will allow IE 7 to reference the echo service site "http://xformstest.org/cgi-bin/echo.sh" from an xforms:submission when the xforms document is served from the ubiquity-xforms google code site.

  1. Navigate to Tools > Internet Options > Security tab, select the Internet Zone,
  1. Open the custom level panel via the Custom level button,
  1. Scroll down to "Miscellaneous", and
  1. Enable the "Access data sources across domains" option.

You'll have to exit out of IE and restart it for these setting to work.

### Local XMLHttpRequest with Get Protocol ###
Surprisingly, IE 7 gives an "Access is Denied" error when trying to get a local instance with either @src or @resource.  For example, if you have 

&lt;xf:instance src="local.xml"...&gt;

, you're likely to get this error and not really know it (there are a number of debugger statements in the code which cause a halt and no error messages).

To solve this,

  1. Navigate to Tools > Internet Options > Advanced tab,
  1. Search for "Enable native XMLHTTP support"
  1. Counter-intuitively, unselect this option
  1. Restart IE, and you should be able to access instances with @src and @resource.

### How to Get IE 7 to Recognize XHTML Extensions ###
For Windows, paste the following into a file (e.g. xhtml\_mime.reg), navigate to Start > Run and run the xhtml\_mime.reg to update the Windows registry. (or you could manually update the registry with this information.)
```
[HKEY_CLASSES_ROOT\MIME\Database\Content Type\application/xhtml+xml]
"CLSID"="{25336920-03F9-11cf-8FD0-00AA00686F13}"
"Encoding"=hex:08,00,00,00
"Extension"=".xhtml"
```

## Mozilla Firefox 2 ##

For Mozilla Firefox 2, a user can modify security permissions to allow XMLHttpRequests from his browser.  To do this, follow these steps:

  1. Completely close your Mozilla Firefox 2 browser
  1. Determine the location and Edit your Firefox 2 profile
    * On Windows:
      * The location is usually found in the vicinity of C:\Documents and Settings\Administrator\Application Data\Mozilla\Firefox\Profiles\xxxxxxxx.default (where xxxxxxxx is a series of letters and numbers established by Mozilla Firefox, and default is the default name for a profile)
      * The Application Data folder is a hidden folder, so you may have to modify some "Windows Explorer" settings to allow easier access to the profile.
      * Edit the prefs.js file in the profile folder.
      * Add in lexical order (the "capability" needs to be in lexical order) the following permission: **`user_pref("capability.policy.default.XMLHttpRequest.open", "allAccess");`**
      * This permission will allow your Mozilla Firefox 2 browser to open XMLHttpRequests to all cross domain URLS. ( Be Careful and Be Aware of this setting )
  1. When you restart your Mozilla Firefox 2 browser, you shoud now be able to submit to a cross domain location.

## Mozilla Firefox 3 ##

With Mozilla Firefox 3, other security capabilities have been added and previous capabilities have been removed for Cross-domain XMLHttpRequests.  According to this [Firefox 3](http://developer.mozilla.org/en/Cross-Site_XMLHttpRequest) website, only extensions and privileged code can use the [W3C Access Control](http://www.w3.org/TR/access-control/) currently implemented in Mozilla Firefox 3.

How do you test cross domain URLs with Ubiquity XForms on Mozilla Firefox 3?
The ONLY way found to work so far is to separately add the following Security Privilege,

```
//experimental for Firefox Cross Domain problem
    try {
      netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
     } catch (e) {
      alert("Permission UniversalBrowserRead denied.");
     }
   //end experimental
```

in xforms-submission-yui.js before this statement,

```
return YAHOO.util.Connect.asyncRequest(
		sMethod,
		sAction,
		oCallback,
		sBody
	);
```

You may find that this alone is not enough. If so, you now need to get your hands dirty with the FF browser itself.

In the URL type "about:config", get to "signed.applets.codebase\_principal\_support" and change its value to true.

**Please be extra careful in your testing with this security instruction!**

### Local Configuration Setting in Firefox 3 for accessing local files (especially with .xhtml extensions) ###
Some developers may need to alter their Firefox 3 configuration to allow them to test from their local environment, perhaps when testing with .xhtml extensions.  If you are seeing something not quite right in your Firefox 3 browser, you may want to check your error console: Tools > Error Console.  If you have a security error like the following information message, you should change a local configuration property: **Security Error: Content at [file:///C:/Documents](file:///C:/Documents) and Settings/workspace/xforms-trunk2/trunk/samples/xforms-message.xhtml may not load data from [file:///C:/Documents](file:///C:/Documents) and Settings/workspace/xforms-trunk2/trunk/behaviours/decorator.xml#decorator.**.

Here's how you can change the "security.fileuri.strict\_origin\_policy" property to allow you to access local web content files.  To do this,
  * In the location bar, type "about:config".  This lists the configuration properties for your Firefox 3 browser.  **BE CAREFUL**
  * Search for the "security.fileuri.strict\_origin\_policy" property
  * Set to false
  * Re-start your Firefox browser, and determine if you can now access local files.