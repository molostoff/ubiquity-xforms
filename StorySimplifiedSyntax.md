# Introduction #

As part of the Forms WG, a stram-lined syntax for XForms has been proposed along with a mapping onto the equivalent "canonical" XForms notation.  This syntax is summarized in http://lists.w3.org/Archives/Public/public-forms/2008Mar/0097.html.

This story is where we can explore an approach to implementing the stram-lined syntax in Ubiquity XForms in order to further refine the notation and to be able to show running example forms to other interested parties...


# Details #

The link above presents a sample form for purchase line items and their totals as follows:

```
<repeat name="row"> 
    <select1 name="Product"> ... 
    <input name="Price" type="decimal" default="0.00"> ... 
    <input name="Quantity" type="integer" default="0"> ... 
    <output name="LineTotal" calculate="Price * Quantity"/> 
</repeat> 

<output name="Subtotal" calculate="sum(row/LineTotal)"/> 
<output name="Tax" calculate="Subtotal * 0.07"/> 
<output name="Total" calculate="Subtotal + Tax"/> 

```

There are many details that result from this notation which are explored at the linked page from the W3C Forms email archive.  This wiki page serves to itemize the resulting Features for the XForms Ubiquity project and to suggest a priority order for implementing them.

The above form fragment should be equivalent to the following canonical XForms markup:

```
<model> 
  <instance id="default"> 
    <data xmlns=""> 
      <row> 
         <Product>... 
         <Price>... 
         <Quantity>... 
         <LineTotal>... 
      </row> 
      <row> 
         <Product>... 
         <Price>... 
         <Quantity>... 
         <LineTotal>... 
      </row> 
      <Subtotal>... 
      <Tax>... 
      <LineTotal>... 
    </data> 
  </instance> 

  <instance id="row_template"> 
      <row xmlns=""> 
         <Product></Product> 
         <Price>0.00</Price> 
         <Quantity>0</Quantity> 
         <LineTotal></LineTotal> 
      </row> 
  </instance> 
 
  <bind id="row" nodeset="row"> 
    <bind id="Product" nodeset="Product"/> 
    <bind id="Price" nodeset="Price" type="decimal"/> 
    <bind id="Quantity" nodeset="Quantity" type="integer"/> 
    <bind id="LineTotal" nodeset="LineTotal">
       <calculate context=".." value="Price * Quantity" or "$Price * 
$Quantity"/> 
    </bind>
  </bind> 
  <bind id="Subtotal" nodeset="Subtotal">
     <calculate context=".." value="sum(row/LineTotal)" or 
"sum($LineTotal)"/> 
  </bind>
  <bind id="Tax" nodeset="Tax">
     <calculate context=".." value="Subtotal * 0.07" or "$Subtotal * 
0.07"/> 
  </bind>
  <bind id="Total" nodeset="Total">
     <calculate context=".." value="Subtotal + Tax" or "$Subtotal + 
$Tax"/> 
  </bind>
</model>

<repeat bind="row"> 
    <select1 bind="Product"> ... 
    <input bind="Price"> ... 
    <input bind="Quantity"> ... 
    <output bind="LineTotal"/> 
</repeat>
<output bind="Subtotal"/>
<output bind="Tax"/> 
<output bind="Total"/> 

<trigger>
    <label>...</label>
    <insert ev:event="DOMActivate" context="." bind="row" 
at="index('row')" position="after" origin="instance('row_template')"/>
</trigger>
<trigger>
   <label>...</label>
   <delete bind="row" at="index('row')"/>
</trigger>

```

We can derive the following Features from this mapping:

### FeaturesStreamLinedSyntaxRendering ###

### FeatureStreamLinedGenerateInstances ###

The `name` attributes, and their nesting, imply the element names and hierarchy for an associated canonical XForms instance.  Note that the generated instance need not in general be flat in that `name`'s may be nested in groups and/or on repeats and their child elements (other repeats or controls).

Another interesting aspect of this Feature, is that row insertion in XForms 1.1 uses a separate instance to contain the template for new rows (unlike XForms 1.0 where row insertion used a row internal to the list as template).  This Feature therefore also needs to generate these insertion templates for repeats in the input simplified markup.

### FeatureStreamLinedGenerateBinds ###

Binds too are implied by the occurance of `name`s in the simplified markup and have important characteristics in terms of the evaluation context for any calculate expressions that may occur on the UI markup.  See the link above for detailed discussion in the Forms WG email archives for the generation of appropriate context attributes and nesting rules for implied binds.

### FeatureStreamLinedGenerateVariables ###

XPath variables are implied as an additional mechanism for surfacing the calculation results of binds for use in calculate expressions in the simplified syntax.  This feature is probably of lower priority for initial implementation as the element names of the implied instance data can be used directly as shown in the example form above.

### FeatureStreamLinedInsertDeleteRows ###

Some design work may still be required to nail down the IDL for row insert/delete and its use from HTML4 style event handlers...let's discuss directly on the Feature wiki page when we get here...

### FeatureStreamLinedSubmission ###

Some proposals for submission and related discussion are given in http://lists.w3.org/Archives/Public/public-forms/2008Apr/0063.html

### FeatureStreamLinedFormElement ###

Discussion of the form element in the XForms simplified syntax is at: http://lists.w3.org/Archives/Public/public-forms/2008Apr/0064.html


## StreamLined Syntax Examples ##

  * [XForms Loan Application Form](SimplifiedLoanForm.md)