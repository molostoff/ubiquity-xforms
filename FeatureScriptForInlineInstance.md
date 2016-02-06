# Introduction #

Script elements act as a shield against markup mangling.  We can use this to our advantage by allowing authors  to conceal inline instance data within them, thus:

This is a proposed feature along with some implementation notes.  This will not work in ubiquity-xforms, as it stands.

# Details #

There are two ways in which this could be used
  1. Using the instance element with @src="#...", to reference instance data in a script external to the model.
  1. Binding xf:model/script to instance behaviour.

Here is a sample form that illustrates the two methods.  It also contains markup that would be mangled in firefox (empty elements and the address element), and some XPath expressions that rely on case-sensitivity.
```

<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:xf="http://www.w3.org/2002/xforms"
>
  <head>
    <script type="text/javascript" src="../ubiquity-loader.js" >/**/</script>
  </head>
  <body>
    <script type="text/xml" id="externalPerson">
    	<Person>
    		<name>
    			<FirstName>The</FirstName>
    			<Initials />
    			<LastName>Queen</LastName>
    		</name>
    		<address Type="HomeAddress">
    			<HouseName>Buckingham Palace</HouseName>
    			<PostCode>SW1A 1AA</PostCode>
    		</address>
    	</Person>
    </script>

  <xf:model> 
  	<xf:instance id="i0" src="#externalPerson"></xf:instance>
  	<script id="i1">
  		<Person>
  			<name>
  				<FirstName>The</FirstName>
  				<Initials />
  				<LastName>Queen</LastName>
  			</name>
  			<address Type="HomeAddress">
  				<HouseName>Buckingham Palace</HouseName>
  				<PostCode>SW1A 1AA</PostCode>
  			</address>
  		</Person>
  	</script>
   </xf:model>

    <xf:input ref="instance('i0')/name/FirstName"></xf:input>
    <xf:input ref="instance('i0')/address/@Type"></xf:input>
    
    <xf:input ref="instance('i1')/name/FirstName"></xf:input>
    <xf:input ref="instance('i1')/address/@Type"></xf:input>
    
  </body>
</html>
      
```

# Implementation notes #

  1. The script element returns its content through the "text" property, rather than the "innerHTML" property
  1. A Script element with an src attribute returns nothing for "text" in the browsers I investigated, so xf:instance[@src] should be used for out-of-line instance data.
  1. The following changes must be made to the instance objects, so that binding xf:model/@script to the same objects as xf:model/@instance can work.
    * Instance currently looks for element.innerHTML in _parseInstance_, this needs to be made conditional (as has already been done for XHTML mode).
    * Model looks for child instances by tag name (in the methods _getInstanceDocument_, and _instances_)  This will need to be changed to accommodate child scripts.
  1. instance[@src] binds to an XLink behaviour which uses XMLHTTP to fetch the target document (The object is defined here: http://ubiquity-xforms.googlecode.com/svn/trunk/src/lib/_backplane/xlink.js).  In this situation, the XLink behaviour should fetch the content using _getElementById_, instead of refetching the whole document.
  1. In both cases, The loading of the instance data string into a DOM object should be handled by instance as it is right now.

Also note that the instance: `<xf:instance id="i0" src="#externalPerson"></xf:instance>` has both a start and end tag.  This technique can only protect the instance data from markup mangling, and not the form.