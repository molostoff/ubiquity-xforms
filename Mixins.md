This page lists the currently support mixins.



# Base mixins #

A _base mixin_ provides a set of common functionality for elements of a particular class, that is then drawn on by other mixins. A good example is the control mixin which provides functionality for all of XForms controls, which is in turn used by specific controls, such as `input`, `textarea`, and so on. To some extent it can be convenient to regard the relationship between these mixins as one of inheritance, with a base mixin like MixinControl acting like a base class, which is in turn extended through a mixin like MixinTextArea or MixinInput. However, this is only a convenience, since ultimately there is no direct connection between these mixins, and it would affect the architecture if direct connections were made between mixins.

The various base mixins are:

| Mixin name | Defined in |
|:-----------|:-----------|
| Container  | container.js |
| Context    | context.js |
| Control    | Control.js |
| EventTarget | EventTarget.js |
| Listener   | listener.js |
| MIP        | mip-handler.js and mip-eventtarget.js |
| LoadExternal | LoadExternalMixin.js |

## Container ##

The container mixin provides general support for elements that can contain other elements, and must affect the behaviour for the contained children. For example, when a container mixin receives focus it tries to pass it on to the first child control that can receive focus.

## Context ##

The context mixin provides support for connecting an element to a piece of data in the model. This is usually used with the control mixin, but does not need to be. For example, the submission mixin also needs to connect to a context node, and uses the context mixin to achieve this.

## Control ##

Once the document has completely loaded, each control mixin will register itself with the correct model, and listen for the `xforms-binding-exception` event on its host element.

The control mixin will also respond to `rewire` and `refresh` requests, which will be initiated by the model it's bound to. A `rewire` causes the control to reevaluate what data it is connected to, and a `refresh` causes the control to update how it is displaying that data.

The control mixin also handles some coding functions that are common to all controls, such as inhibiting the update of data when that data is readonly, supporting incremental update of the data as the user interacts with the control, managing any requests to give focus to the control, and more. This means that more specific mixins such as sliders and calendar widgets, only need to focus on their core functionality.

## EventTarget ##

The event target mixin is used for browsers that don't provide native support for DOM 2 Events.

## Listener ##

The listener mixin does most of its processing when the document has fully loaded, and this simply involves registering for whatever events have been requested. When the event is received the element's `handleEvent` method is called, but what exactly this does is dependent on the specific action handler mixin that has been used.

## MIP ##

The MIP mixin manages the interaction between the model item properties (MIPs) applied to a piece of data, and how that data in turn manifests itself on a control. This involves both the appearance of the control, and the triggering of events related to the change of state of the MIPs. The data that the MIP mixin operates on will usually be provided by the context mixin.

## LoadExternalMixin ##

The LoadExternalMixin provides support to to load data from an external source. This is purely a data behaviour that allows a src/resource tag to be added to a control or other label etc to load data from a file on the file system or a remote location.

# Specific Mixins #

The specific mixins relate to specific action handlers, specific controls, and so on.

## Action Handler Mixins ##

These mixins provide a `handleEvent` method which does whatever work is required. Note that the actual registering for events and so on is managed by a separate mixin.

| **Mixin name** | **Defined in** |
|:---------------|:---------------|
| Action         | XFAction.js    |
| Delete         | delete.js      |
| Dispatch       | actions.js     |
| Help           | HelpMixin.js   |
| Hint           | HintMixin.js   |
| Insert         | insert.js      |
| Load           | actions.js     |
| Message        | actions.js     |
| Rebuild        | modelactions.js |
| Recalculate    | modelactions.js |
| Refresh        | modelactions.js |
| Reset          | modelactions.js |
| Revalidate     | modelactions.js |
| Send           | actions.js     |
| SetFocus       | setfocus.js    |
| SetIndex       | setindex.js    |
| SetValue       | setvalue.js    |
| Toggle         | actions.js     |


## Control Mixins ##

These mixins provide control functionality. There are two groups; those that attach their functionality directly to the element in question, and those that attach their functionality to a special child element (called `pe-value` or the 'value pseudo-element').

The first group consists of:

| **Mixin name** | **Defined in** |
|:---------------|:---------------|
| Submit         | submit.js      |
| Trigger        | _not explicitly defined_ |

This second group don't actually attach themselves to the relevant element directly (for example, to an `input` element or a `range` element), but instead connect to a child element that has been created by the control mixin. These mixins communicate with this control element (i.e., their parent) and not directly with the model; they receive data from the model via the parent, and they pass changes resulting from user interaction to their parent:

| **Mixin name** | **Defined in** |
|:---------------|:---------------|
| Input          | input-value.js |
| Output         | output-value.js |
| Range          | range-value.js |
| Secret         | input-value.js |
| Select         | select.js      |
| Select1        | select1.js     |
| TextArea       | input-value.js |
| TriggerMinimalMixin | TriggerMinimalMixin.js |

## Container Control Mixins ##

Container control mixins provide the specific functionality for those XForms UI components that can contain other components. General container functionality is provided by the container mixin, so these mixins only provide whatever is specific for their component:

| **Mixin name** | **Defined in** |
|:---------------|:---------------|
| Case           | case.js        |
| Group          | Group.js       |
| Repeat         | Repeat.js      |
| Switch         | Switch.js      |

## Model-related Mixins ##

Model-related mixins provide the specific functionality for implementing the XForms model:

| **Mixin name** | **Defined in** |
|:---------------|:---------------|
| Instance       | instance.js    |
| Model          | modelObj.js    |
| Submission     | Submission.js  |

_Note that currently there is no bind mixin, since processing is managed directly by the model mixin._