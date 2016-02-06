# Introduction #

XForms relies heavily on XPath for providing different processing functionality. Adding new functions to the library is achieved by 'registering' the function with the UXF processor.

# Details #

The registration function to use is `extend()`, and the parameter to pass is an object:
```
FormsProcessor.extend({
  ...
});
```
The object itself will contain your extensions. Eventually this function will support a number of different types of extensions, such as custom widgets, but as of [r3092](https://code.google.com/p/ubiquity-xforms/source/detail?r=3092), only XPath functions are supported.

To add an extension function that just adds two numbers together, we only need to provide a property with its name being the name of the function, and its value being the function itself:
```
FormsProcessor.extend({
  "add": function(a, b) {
    return a + b;
  };
});
```
Once registered, the function can be used within any XPath expression. For example:
```
<xf:bind nodeset="sum" calculate="add(../a, ../b)" />
```
or:
```
<xf:setvalue ref="x" calculate="add(., 5)" />
```