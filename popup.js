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
			"interest_rate": "3%",
			"repayment": 30000,
			"link": "https://www.maybank2u.com.my/home/m2u/common/login.do"
		},
		{
			"bank_name": "Alliance",
			"package_name": "Not Worth It",
			"interest_rate": "30%",
			"repayment": 3000000000,
			"link": "https://www.maybank2u.com.my/home/m2u/common/login.do"
		},
		{
			"bank_name": "Affin",
			"package_name": "OMG Best Loan",
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
			let bank_package = bank.package_name;
			let bank_rate = bank.interest_rate;
			let bank_repayment = bank.repayment;
			let bank_link = bank.link;
			let card_bank =
				`<div class="col-6">
					<div class="card mb-4">
						<img class="card-img-top" src="${bank_image}" alt="${bank_name}">
						<div class="card-body">
							<h3 class="card-title">${bank_name}</h5>
							<div class="card-text">
								<p>Package: <span>${bank_package}</span></p>
								<p>Interest: <span>${bank_rate}</span></p>
								<p>Repayment: <span>${bank_repayment}</span></p>
							</div>
							<a href="${bank_link}" class="btn btn-primary">More Info</a>
						</div>
					</div>
				</div>`;
			wrapper.insertAdjacentHTML('afterbegin', card_bank);
		}
	}

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