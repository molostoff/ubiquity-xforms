/*
 * Copyright (C) 2008 Backplane Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
	Retrieves the model to which the node <i>oNode</i> is bound.  
	This is based on the presence of model or bind attributes, or on context information gained
	from the the node's position in the document.
	
	@param {Object} oNode, node whose model is to be resolved.
	@returns Node that corresponds to the appropriate model for oNode's binding.
*/
function getModelFor(oNode)
{
	//If the node is null, this function is likely to have recursed up to the document root and beyond,
	//	without encountering any specific directions for model resolution.  return the document's 
	//	default model.
	if(oNode == null || oNode.nodeType == 9/*DOCUMENT_TYPE*/)
	{
		//TODO: The default model may be the implicit model.  Implicit models have not been implemented yet.
		//	If the implicit model is generated by inserting a model element into the DOM, then this function 
		//	will work out-of-the-box.  Otherwise, this first branch will need to be rewritten to use whatever
		//	factory or repository exists for fetching potentially implicit models.
		//	Even if the above mechanism is used for generating the implicit model, if this function is called
		//	before the implicit model is otherwise generated then it must be generated by this branch. 
		if(!document.defaultModel) {
			var models = NamespaceManager.getElementsByTagNameNS( document, "http://www.w3.org/2002/xforms","model");
			if (models && models.length > 0) {
				document.defaultModel = models[0];
			}
		}
	
		return document.defaultModel;
	}
	if(oNode.nodeType == 11 /*FRAGMENT_TYPE*/)
	{
		return null;
	}
	else if(!oNode["ownerModel"])
	{
		//if the node has a bind attribute, 
		//	then resolve model for that bind, copy to self, and return that.
		 
		if(oNode.getAttribute("bind"))
		{
			var oBind = document.getElementById(oNode.getAttribute("bind"));
			if(!oBind)
				debugger;
			else
				oNode["ownerModel"] = getModelFor(oBind);
		}
		//If the node has a model attribute return the corresponding node.
		//	if the model attribute does not correspond to the ID of a model
		//	throw (for now, invoke the debugger.
		else if(oNode.getAttribute("model"))
		{
			var oMightBeAModel = document.getElementById(oNode.getAttribute("model"));
			if(oMightBeAModel && oMightBeAModel.tagName == "model")
				oNode["ownerModel"] = oMightBeAModel;
			else
				debugger;
		}
		//Only certain nodes within model take the model as context, others follow the 
		//	normal context resolution pattern.
		else if(oNode.tagName == "bind" && oNode.parentNode.tagName == "model")
		{
			oNode["ownerModel"] = oNode.parentNode;
		}
		//In the absence of more specific directions, get the model that is defined for the 
		//	parentNode, and return that.
		else
		{
			oNode["ownerModel"] = getModelFor(oNode.parentNode);
		}
	}
	
	return oNode["ownerModel"];
}

function XFormsProcessor()
{
	this.defaultHandlers = new Object();
}

XFormsProcessor.prototype.addDefaultEventListener = function(oTarget, sType, oListener)
{	
	if(!oTarget.uniqueID)
	{
		oTarget.uniqueID = "uuid:" + Math.random() + Math.random();
	}
	if(!this.defaultHandlers[oTarget.uniqueID])
		this.defaultHandlers[oTarget.uniqueID] = new Object();

	if(!this.defaultHandlers[oTarget.uniqueID][sType])
		this.defaultHandlers[oTarget.uniqueID][sType] = new Array();

	this.defaultHandlers[oTarget.uniqueID][sType].push(oListener)
}

XFormsProcessor.prototype.removeDefaultEventListener = function(oTarget,sType, oListener)
{
	if(this.defaultHandlers[oTarget.uniqueID])
	{
		var arrHandlers = this.defaultHandlers[oTarget.uniqueID][sType];
		if(arrHandlers)
		{
			for (var i = 0; i < arrHandlers.length; i++)
			{
				if (arrHandlers[i] == oListener)
				{
					arrHandlers[i] = null;
				}
			}
		}

	}
}

XFormsProcessor.prototype.dispatchEvent = function (oTarget, e)
{
		try
		{
			IncrementDeferredUpdate();	
			if(oTarget.dispatchEvent(e))
				this.invokeDefault(oTarget,e);
		}
		catch(e)
		{
		
		}
		finally
		{
			DecrementDeferredUpdate();	
		}
}

XFormsProcessor.prototype.invokeDefault = function (oTarget, e)
{

	if(this.defaultHandlers[oTarget.uniqueID])
	{
		var arrListeners = this.defaultHandlers[oTarget.uniqueID][e.type];
		if(arrListeners)
		{
			for(var i = 0;i < arrListeners.length ;++i)
			{
				if(arrListeners[i])
				{
					arrListeners[i].handleEvent(e);
				}
			}
		}
	}

}

	var FormsProcessor = new XFormsProcessor();


	function IncrementDeferredUpdate()
	{
		++g_DeferredUpdateDepth;
	}

	function DecrementDeferredUpdate()
	{
		if(!--g_DeferredUpdateDepth)
		{
			doUpdate();
		}
	}


	function doUpdate()
	{	

		var ns = NamespaceManager.getElementsByTagNameNS(document,"http://www.w3.org/2002/xforms","model");
		var len = ns.length;
		
		for (var i = 0; i < len; ++i)
		{
			var m = ns[i];
			//There is a chance that a model has been inserted into the document during the processing of this
			//	event, that has not had a chance to have its behaviour attached. It is not essential that 
			//	it be caught in this deferred update phase, as 
			//A) It will be updated when as part of its initialisation
			//B) It can't have been modified during the processing of this event anyway.
			try
			{	
				m.deferredUpdate();
			}
			catch(e)
			{
				debugger;
			}
		}
	}
		
function CheckElementName(oNode,sTagName,sURN)
{
	var sQualifiedTagName;
	//Hmm. lookupprefix doesn't work, fudge it.
	if(oNode.lookupPrefix &&sURN == "http://www.w3.org/2002/xforms")
	{
		var sDefaultPrefix = NamespaceManager.getOutputPrefixesFromURI( "http://www.w3.org/2002/xforms")[0] + ":";
		sQualifiedTagName = sDefaultPrefix + sTagName;
	//	sQualifiedTagName = oNode.lookupPrefix(sURN) + ":" + sTagName;
	}
	else
	{
		sQualifiedTagName = sTagName;
	}
	var tagNameOnNode = String(oNode.tagName);
	if(!g_bIsInXHTMLMode)
		tagNameOnNode = tagNameOnNode.toLowerCase();
	return tagNameOnNode == sQualifiedTagName;
	
}

var g_DeferredUpdateDepth = 0;
