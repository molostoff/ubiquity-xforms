/*
 * Copyright � 2009 Backplane Ltd.
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

function Container(element) {
	this.element = element;
}

Container.prototype.onContentReady = function () {
	var self = this;
	this.addEventListener("xforms-focus", { handleEvent : function(evt) { self.giveFocus(); } }, false);
}

Container.prototype.giveFocus = function () {
	// Give focus to the first eleigible child if the container is unbound,
	// bound to a ProxyExpression or bound to a relevant node.
	if (!this.m_proxy || !this.m_proxy.enabled || this.m_proxy.enabled.getValue()) {
		return FormsProcessor.focusFirstEligibleChild(this.childNodes);
	}

	return false;
};
