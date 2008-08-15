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

/*
 * If there is no document.createEvent function then add one.
 */

if (!document.createEvent)
{

	/*
	* [TODO] Create some kind of object with a lookup
	* so that it's easy to add other event types.
	*/

	document.createEvent = function(eventType)
	{
		var oRet = null;

		switch (eventType)
		{
			case "Events":
				oRet = new Event();
				break;

			case "MutationEvents":
				oRet = new MutationEvent();
				break;

			case "SubmissionEvents":
				oRet = new SubmissionEvent();
				break;

			case "UIEvents":
				oRet = new UIEvent();
				break;

			default:
				throw "NOT_SUPPORTED_ERR";
		}
		return oRet;
	};


	/*
	* E V E N T
	* =========
	*/

	function Event()
	{
	}

	Event.prototype.CAPTURING_PHASE = 0;
	Event.prototype.AT_TARGET = 1;
	Event.prototype.BUBBLING_PHASE = 2;
	Event.prototype.DEFAULT_PHASE = 3;

	Event.prototype.initEvent = function(eventTypeArg, canBubbleArg, cancellableArg)
	{
		this.type = eventTypeArg;
		this.target = null;
		this.currentTarget = null;
		this.eventPhase = null;
		this.bubbles = canBubbleArg;
		this.cancelable = cancellableArg;
		this.timeStamp = new Date();

		this._cancelled = false;
		this._stopPropagation = false;
		this._stopImmediatePropagation = false;
		return;
	}

	Event.prototype.stopPropagation = function()
	{
		this._stopPropagation = true;
		return;
	};

	Event.prototype.stopImmediatePropagation = function()
	{
		this._stopImmediatePropagation = true;
		this.stopPropagation();
		return;
	};

	Event.prototype.preventDefault = function()
	{
		if (this.cancelable)
			this._cancelled = true;
		return;
	};


	/*
	* U I E V E N T
	* =============
	*/

	function UIEvent()
	{
		UIEvent.superclass.constructor.call(this);
	}

	YAHOO.extend(UIEvent, Event);

	UIEvent.prototype.initUIEvent = function(
		eventTypeArg,
		canBubbleArg,
		cancellableArg,
		viewArg,
		detailArg
	)
	{
		this.initEvent(eventTypeArg, canBubbleArg, cancellableArg);

		this.view = viewArg;
		this.detail = detailArg;
	}


	/*
	* M U T A T I O N E V E N T
	* =========================
	*/

	function MutationEvent()
	{
		MutationEvent.superclass.constructor.call(this);
	}

	YAHOO.extend(MutationEvent, Event);

	MutationEvent.prototype.MODIFICATION = 1;
	MutationEvent.prototype.ADDITION = 2;
	MutationEvent.prototype.REMOVAL = 3;
  
	MutationEvent.prototype.initMutationEvent = function(
		eventTypeArg,
		canBubbleArg,
		cancellableArg,
		relatedNodeArg,
		prevValueArg,
		newValueArg,
		attrNameArg,
		attrChangeArg
	)
	{
		MutationEvent.superclass.initEvent.call(
			this,
			eventTypeArg,
			canBubbleArg,
			cancellableArg
		);

		this.relatedNode = relatedNodeArg;
		this.prevValue = prevValueArg;
		this.newValue = newValueArg;
		this.attrName = attrNameArg;
		this.attrChange = attrChangeArg;
	}
  
  MutationEvent.prototype.initEvent = MutationEvent.prototype.initMutationEvent;

	/*
	* S U B M I S S I O N E V E N T
	* =============================
	*/

	function SubmissionEvent()
	{
		SubmissionEvent.superclass.constructor.call(this);
	}

	YAHOO.extend(SubmissionEvent, Event);

	SubmissionEvent.prototype.initSubmissionEvent = function(
		eventTypeArg,
		canBubbleArg,
		cancellableArg,
		methodArg,
		actionArg
	)
	{
		this.initEvent(eventTypeArg, canBubbleArg, cancellableArg);

		this.method = methodArg;
		this.action = actionArg;
	}
}