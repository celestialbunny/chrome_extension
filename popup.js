document.addEventListener('DOMContentLoaded', function () {
	// This will execute inside the window of the "chrome extension"
	// console.log("hahahah");
	let bank_list = [];
	const selections = document.querySelectorAll('.sort-selection');
	let selection;
	document.addEventListener('click', function () {
		console.log(selections)
		for (select of selections) {
			if (select.checked === true) {
				selection = select.id;
				console.log(select.id)
			}
		}
	})
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
			// bank_list.push(data);
			// console.log(bank_list.length)
			// console.log(typeof(data))
			// console.log(data[0].bank_name)
			/**
			 * Below is the working line that has been commented out
			 */
			// for (bank of data) {
			// 	populate(bank);
			// }
			for (bank of data) {
				if (selection === 'none') {
					populate(bank);
				} else if (selection === 'bank') {
					if (bank.bank_name !== 'none') {
						populate(bank);
					}
				} else if (selection === 'type') {

				}
			}
		});

	function populate(bank) {
		const wrapper = document.getElementById("wrapper");
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
									<div>Interest Rate: <span>${bank_rate}</span></div>
									<div> Monthly Repayment: <span>${bank_repayment}</span></div>
								</div>
							</div>
						</div>
					</a>
				</div>`;
		wrapper.insertAdjacentHTML('afterbegin', card_bank);
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

