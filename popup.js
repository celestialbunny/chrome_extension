document.addEventListener('DOMContentLoaded', function () {
	// This will execute inside the window of the "chrome extension"
	let bank_list = [];

		// Reposition
	});
	// console.log(selections[0].value)
	const container = document.getElementById("container");
	fetch('http://127.0.0.1:5000/_words')
		.then(response => {
			if (response.ok) {
				return response.json();
				
			} else {
				throw new Error(response.statusText);
			}
		})
		.then(data => {
			/**
			 * Capture list of banks and sort them out manually (in other lists)
			 */
			// Original full collection
			bank_list = data;
			// Sorting using bank_name
			order_by_bank_name = _.sortBy(bank_list, 'bank_name')
			// Sorting using package_tag
			order_by_package_tag = _.sortBy(bank_list, 'package_tag');
			// Sorting using interest rate
			order_by_interest_rate = _.sortBy(bank_list, 'interest_rate');
			// Sorting using repayment
			order_by_repayment = _.sortBy(bank_list, 'repayment');
			/**
			 * Reveal the data fetched from API
			 */
			const selections = document.querySelectorAll('.sort-selection');
			let selection;
			const wrapper = document.getElementById("wrapper");
			for (bank of bank_list) {
				populate(bank, wrapper);
			}
			document.addEventListener('click', function() {
				// console.log(selections)
				for (select of selections) {
					if (select.checked === true) {
						selection = select.id;
						// console.log(selection);
					}
				}
				if (selection === "none") {
					erase_display(wrapper);
					for (bank of bank_list) {
						populate(bank, wrapper);
					}
				} else if (selection === "bank") {
					erase_display(wrapper);
					for (bank of order_by_bank_name) {
						populate(bank, wrapper);
					}
				} else if (selection === "type") {
					erase_display(wrapper);
					for (bank of order_by_package_tag) {
						populate(bank, wrapper)
					}
				} else if (selection === "interest") {
					erase_display(wrapper);
					for (bank of order_by_interest_rate) {
						populate(bank, wrapper)
					}
				} else if (selection === "repayment") {
					erase_display(wrapper);
					for (bank of order_by_repayment) {
						populate(bank, wrapper)
					}
				}
			});

	function erase_display(placeholder) {
		while (placeholder.lastChild) {
			placeholder.removeChild(placeholder.lastChild);
		}
	}

	function populate(bank, placeholder) {
		// for (bank in bank_link) {
			let bank_image = `./img/img_${bank.bank_name.toLowerCase()}.png`;
			let bank_name = bank.bank_name;
			let package_tag;
			if (bank.package_tag === "personal") {
				package_tag = "profile";
			} else if (bank.package_tag === "islamic") {
				package_tag = "bell";
			} else if (bank.package_tag === "home") {
				package_tag = "home3";
			} else if (bank.package_tag === "car") {
				package_tag = "truck";
			} else if (bank.package_tag === "business") {
				package_tag = "office";
			}
			let bank_package = bank.package_name;
			let bank_rate = bank.interest_rate;
			let bank_repayment = bank.repayment;
			let bank_link = bank.link;
			let card_bank =
				`<div class="col-4 cardholder">
					<a href="${bank_link}" target="_blank">
						<div class="card mb-4">
							<span title="${bank_name}">
								<img class="card-img-top" src="${bank_image}" alt="${bank_name}">
							</span>
							<div class="card-body">
								<div class="card-text">
									<div><span class="icon icon-${package_tag}"></span>: <span class="package">${bank_package}</span></div>
									<div>Interest Rate: <span>${bank_rate} %</span></div>
									<div> Monthly Repayment: <span>${bank_repayment}</span></div>
								</div>
							</div>
						</div>
					</a>
				</div>`;
			placeholder.insertAdjacentHTML('afterbegin', card_bank);
		// }
	}
	// This will execute in the current browser DOM
	chrome.tabs.executeScript(null, function () {
	    returned_matches = [];
	    web_content = filter_text();
	    send_and_fetch_details(web_content);
	    highlight_matches(returned_matches);
	})
});

var InstantSearch = {

	"highlight": function (container, highlightText) {
		var internalHighlighter = function (options) {

			var id = {
					container: "container",
					tokens: "tokens",
					all: "all",
					token: "token",
					className: "className",
					sensitiveSearch: "sensitiveSearch"
				},
				tokens = options[id.tokens],
				allClassName = options[id.all][id.className],
				allSensitiveSearch = options[id.all][id.sensitiveSearch];


			function checkAndReplace(node, tokenArr, classNameAll, sensitiveSearchAll) {
				var nodeVal = node.nodeValue,
					parentNode = node.parentNode,
					i, j, curToken, myToken, myClassName, mySensitiveSearch,
					finalClassName, finalSensitiveSearch,
					foundIndex, begin, matched, end,
					textNode, span, isFirst;

				for (i = 0, j = tokenArr.length; i < j; i++) {
					curToken = tokenArr[i];
					myToken = curToken[id.token];
					myClassName = curToken[id.className];
					mySensitiveSearch = curToken[id.sensitiveSearch];

					finalClassName = (classNameAll ? myClassName + " " + classNameAll : myClassName);

					finalSensitiveSearch = (typeof sensitiveSearchAll !== "undefined" ? sensitiveSearchAll : mySensitiveSearch);

					isFirst = true;
					while (true) {
						if (finalSensitiveSearch)
							foundIndex = nodeVal.indexOf(myToken);
						else
							foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());

						if (foundIndex < 0) {
							if (isFirst)
								break;

							if (nodeVal) {
								textNode = document.createTextNode(nodeVal);
								parentNode.insertBefore(textNode, node);
							} // End if (nodeVal)

							parentNode.removeChild(node);
							break;
						} // End if (foundIndex < 0)

						isFirst = false;


						begin = nodeVal.substring(0, foundIndex);
						matched = nodeVal.substr(foundIndex, myToken.length);

						if (begin) {
							textNode = document.createTextNode(begin);
							parentNode.insertBefore(textNode, node);
						} // End if (begin)

						span = document.createElement("span");
						span.className += finalClassName;
						span.appendChild(document.createTextNode(matched));
						parentNode.insertBefore(span, node);

						nodeVal = nodeVal.substring(foundIndex + myToken.length);
					} // Whend

				} // Next i 
			}; // End Function checkAndReplace 

			function iterator(p) {
				if (p === null) return;

				var children = Array.prototype.slice.call(p.childNodes),
					i, cur;

				if (children.length) {
					for (i = 0; i < children.length; i++) {
						cur = children[i];
						if (cur.nodeType === 3) {
							checkAndReplace(cur, tokens, allClassName, allSensitiveSearch);
						} else if (cur.nodeType === 1) {
							iterator(cur);
						}
					}
				}
			}; // End Function iterator

			iterator(options[id.container]);
		} // End Function highlighter
		;
		internalHighlighter({
			container: container,
			all: {
				className: "highlighter"
			},
			tokens: [{
				token: highlightText,
				className: "highlight",
				sensitiveSearch: false
			}]
		}); // End Call internalHighlighter 

	} // End Function highlight

};

function highlight_matches(highlightText) {
	const body = document.body;
	InstantSearch.highlight(body, highlightText);
}

function send_and_fetch_details(text_details) {
	// 7. Send the data a specific website
	fetch('http://127.0.0.1:5000/_words', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				data: text_details
			})
		})
		// Check the response of fetching "data" after submitting to the specified website
		.then(checkStatus)
		// Perform change of received "data" structure obtained from website
		.then(res => res.json())
		// Perform operation on the "altered" data format
		.then(data => returned_matches.push(data))
}

function checkStatus(response) {
	if (response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function filter_text() {
	// 1. Select the portion of the document to be processed
	let body = document.body;
	// 2. Make a copy of the portion and perform operation from here in order not to affect the "current" webpage
	let cloned_body = body.cloneNode(true);
	// 3. select the " undesired parts" to be dumped
	const deletes = [
		'nav',
		'header',
		'footer',
		'img',
		'a',
		'span',
		'link',
		'script',
		'noscript'
	];
	// 4. Perform the deletion of parts via destructuring each individual selected "portion"
	for (i in deletes) {
		const item = cloned_body.querySelectorAll(deletes[i]);
		[...item].forEach(e => e.remove());
	}
	// 5. Select the partially "cleansed" data to be "purified"
	cloned_body = cloned_body.textContent;
	cloned_body = cloned_body.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
	cloned_body = cloned_body.replace(/<\!--.*?-->/g, "");
	cloned_body = cloned_body.toLowerCase();
	// 6. Perform suitable "formatting" to convert "cleansed" data into JSON
	// let parsed_body = JSON.parse(stringified_body);
	let stringified_body = JSON.stringify(cloned_body);
	return stringified_body;
}

const injected_css = `
<style type="text/css" media="screen">
#popout,
#toggle {
	position: fixed;
	transition: all 2s;
}

#info {
	z-index: 1000;
}

#toggle {
	bottom: 1em;
	right: 1em;
	display: grid;
	grid-template-columns: minmax(min-content, 10em) minmax(min-content, 3em);
	grid-template-areas: "detail";
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(10, 177, 19);
	z-index: 500;
	border-bottom-left-radius: 0.7em;
	border-top-left-radius: 0.7em;
}

#toggle:hover {
	background-color: rgb(255, 85, 85);
}

#toggle:hover .highlight {
	font-size: 1.15em;
	color: rgb(194, 197, 199);
}

#toggle * {
	transition: all 0.3s;
	vertical-align: middle;
	padding: 0.2em;
	color: white;
}

.detail {
	grid-area: detail;
}

#info {
	position: fixed;
	border: 0.1em solid black;
	padding: 0.3em;
	width: 1em;
	height: 1em;
	bottom: 3em;
	right: 0;
	background-color: #4ebbb5;
	color: white;
	font-size: 1.2rem;
	border-radius: 50%;
	text-align: center;
	box-shadow: 0 0 10px #719ECE;
	transition-property: transform;
	transition-duration: 1s;
}

#info:hover {
	cursor: pointer;
	background-color: #105372;
	border: 1px solid #2E3A46;
	animation-name: rotate; 
	animation-duration: 2s; 
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

@keyframes rotate {
	from {transform: rotate(0deg);}
	to {transform: rotate(360deg);}
}

input[type=checkbox]#popout {
	display: none;
}
#popout ~ #toggle {
	margin-right: -100%;
}

.slider:hover #popout ~ #toggle {
	margin-right: 0;
}

.slider .clear * {
	text-decoration: initial;
	color: initial;
}

.flash {
	z-index: 1500;
	position: fixed;
	bottom: 3em;
	right: 0;
	background-color: tomato;
	box-shadow: 0 5px 10px #ddd;
	border: 2px solid violet;
	padding: 0.1em 0.5em;
	border-top-left-radius: 1.25em;
	border-bottom-left-radius: 1.25em;
	animation: disappear 3s;
	animation-fill-mode: forwards;
}

.flash * {
	transition-delay: 3s;
	
}

@keyframes disappear {
	0% { margin-right: 10%; }
	15% { margin-right: 7% }
	30% { margin-right: 4%; }
	45% { margin-right: 1%; }
	60% { margin-right: 0%; }
	100% { margin-right: -100%; }
}
</style>
`;

// const first_bank = bank_list[0];
// let injected_section = `
// <div class="slider">
// 	<a href="${first_bank.bank_link}" target="_blank" class="clear">
// 		<input type="checkbox" name="popout" id="popout">
// 		<label for="popout" id="info">&times;</label>
// 		<div id="toggle">
// 			<div class="detail">
// 				<div class="highlight"><span class="icon icon-${first_bank.package_tag}"></span>${first_bank.bank_name}</div>
// 				<div>${first_bank.bank_rate} @ RM ${first_bank.bank_repayment}</div>
// 			</div>
// 		</div>
// 	</a>
// </div>

// <div class="flash">
// 	<p>
// 		<span class="icon icon-${first_bank.package_tag}"></span>
// 		${first_bank.bank_name} offers ${first_bank.bank_rate} @ RM ${first_bank.bank_repayment}</div>
// 	</p>
// </div>
// `;