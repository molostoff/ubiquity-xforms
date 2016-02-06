# Introduction #

XForms 1.1 introduced the cryptographic functions hmac() and digest():

_string_ **hmac** _(string, string, string, string?)_

This function accepts a string for a key or shared secret, a string of data, a string indicating a cryptographic hashing algorithm, and an optional string indicating an encoding method. The key and data strings are serialized as UTF-8, and they are subjected to the HMAC algorithm and parameterized by the the hash algorithm indicated by the third parameter. The result is encoded with the method indicated by the fourth parameter, and the result is returned by the function.

_string_ **digest** _(string, string, string?)_

This function accepts a string of data, a string indicating a cryptographic hashing algorithm, and an optional string indicating an encoding method. The data string is serialized as UTF-8, the hash value is then computed using the indicated hash algorithm, and the hash value is then encoded by the indicated method, and the result is returned by the function.

The keywords for specifying the hash algorithm to use are 'MD5', 'SHA-1', 'SHA-256', 'SHA-384', and 'SHA-512'. The keywords for the encoding method are 'hex' and 'base64'.

# Details #
Ubiquity XForms uses the MD5 and SHA-1 algorithms implemented by Paul Johnston: http://pajhome.org.uk/crypt/index.html

_Currently only MD5 and SHA-1 hashing algorithms are supported._