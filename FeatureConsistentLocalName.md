# Introduction #

The **getLowerCaseLocalName** function returns the non-namespace-qualified name of a given node, in lowerCase.  Both Firefox and Internet Explorer ignore case and report nodeNames as uppercase, but most element names in the scope of this project are officially lowercase.  Therefore a function that returns a consistently lowercase version of the name is desirable.

# Usage #

```
name = NamespaceManager.getLowerCaseLocalName(node)
```

# Parameters #

| node | The node for which the local name is desired. |
|:-----|:----------------------------------------------|


# Return Value #

The local part of the name of "node"