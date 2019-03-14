document.addEventListener('DOMContentLoaded', function () {
	// 1. Select the portion of the document to be processed
	let body = document.body;
	// 2. Make a copy of the portion and perform operation from here in order not to affect the "current"  webpage
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
	// 6. Perform suitable "formatting" to convert "cleansed" data into JSON
	let stringified_body = JSON.stringify(cloned_body);
	// let parsed_body = JSON.parse(stringified_body);
	// 7. Send the data a specific website
	/**
	 * Operations after receiving response from website
	 * Perform if else condition from here on
	 */
	// let url = `https://dog.ceo/api/breeds/list/all`;
	// fetchData(url)
	// 	.then(data => populate(data.message))

	bank_list = [
		{
			"bank_name": "Maybank",
			"package_name": "super home loan",
			"package_tag": "home",
			"interest_rate": "3%",
			"repayment": 30000,
			"link": "https://www.maybank2u.com.my/home/m2u/common/login.do"
		},
		{
			"bank_name": "Alliance",
			"package_name": "Not Worth It",
			"package_tag": "business",
			"interest_rate": "30%",
			"repayment": 3000000000,
			"link": "https://www.maybank2u.com.my/home/m2u/common/login.do"
		},
		{
			"bank_name": "Affin",
			"package_name": "OMG Best Loan",
			"package_tag": "car",
			"interest_rate": "0.5%",
			"repayment": 0,
			"link": "https://www.maybank2u.com.my/home/m2u/common/login.do"
		}
	];
	populate(bank_list);

	function fetchData(url) {
		return fetch(url)
			.then(checkStatus)
			.then(response => response.json())
			.catch(error => console.log("Looks like there was a problem", error))
	}

	function checkStatus(response) {
		if (response.ok) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(new Error(response.statusText));
		}
	}

	function populate(bank_list) {
		const wrapper = document.getElementById("wrapper");
		for (bank of bank_list) {
			let bank_image = `/img/img_${bank.bank_name.toLowerCase()}.png`;
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
				`<div class="col-6">
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
		}
	}
	
	const injected_css = `
	<style type="text/css" media="screen">

	#popout,
	#toggle {
		position: fixed;
		z-index: 1000;
		transition: all 0.5s;
	}
	
	#toggle {
		bottom: 3em;
		right: 1em;
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-template-areas: "detail logo"
	}
	
	.detail {
		grid-area: detail;
		background-color: blueviolet;
	}
	
	.logo {
		grid-area: logo;
		background-color: aquamarine;
	}
	
	#info {
		position: fixed;
		border: 0.1em solid black;
		padding: 0.3em;
		bottom: 1em;
		right: 1em;background-color: #4ebbb5;
		color: white;
		font-size: 1.2rem;
		border-radius: 5px;
	}
	
	#info:hover {
		cursor: pointer;
		background-color: #105372;
		border: 1px solid #2E3A46;
		box-shadow: 0 0 10px #719ECE;
	}
	
	input[type=checkbox]#popout {
		display: none;
	}
	#popout ~ #toggle {
		margin-right: -100%;
	}
	
	#popout:checked ~ #toggle {
		margin-right: 0;
	}
	</style>
	`;

	let injected_section = `
	<input type="checkbox" name="popout" id="popout">
	<label for="popout" id="info">Toggle me</label>
	<div id="toggle">
		<div class="detail">${bank_name} offers ${bank_rate} for repayment of RM ${bank_repayment}</div>
		<div class="logo">${package_tag}</div>
	</div>
	`;

	
	document.body.insertAdjacentHTML('beforeend', injected_css);
	document.body.insertAdjacentHTML('beforeend', injected_section);

	/**
	 * Original function
	 */
	// 	let dog_list = [];
	// const container = document.getElementById("container");
	// fetch('https://dog.ceo/api/breeds/list/all')
	//     .then(response => {
	//         if (response.ok) {
	//             return response.json();
	//         } else {
	//             throw new Error(response.statusText);
	//         }
	//     })
	//     .then(data => {
	//         dog_list = data.message;
	//         for (dog in dog_list) {
	//             let li = document.createElement("li");
	//             let node = document.createTextNode(dog);
	//             li.appendChild(node);
	//             container.appendChild(li);
	//         }
	//     });
});