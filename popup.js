document.addEventListener('DOMContentLoaded', function () {
	// This will execute inside the window of the "chrome extension"
	let bank_list = [];
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
			bank_list = data.message;
			populate(bank_list);
		});

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
	// This will execute in the current browser DOM
	chrome.tabs.executeScript(null,{
		code: "document.body.insertAdjacentHTML('beforeend', `${injected_css}`)",
		code: "document.body.insertAdjacentHTML('beforeend', `${injected_section}`)",
	})
});


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

const first_bank = bank_list[0];
let injected_section = `
<div class="slider">
	<a href="${first_bank.bank_link}" target="_blank" class="clear">
		<input type="checkbox" name="popout" id="popout">
		<label for="popout" id="info">&times;</label>
		<div id="toggle">
			<div class="detail">
				<div class="highlight"><span class="icon icon-${first_bank.package_tag}"></span>${first_bank.bank_name}</div>
				<div>${first_bank.bank_rate} @ RM ${first_bank.bank_repayment}</div>
			</div>
		</div>
	</a>
</div>

<div class="flash">
	<p>
		<span class="icon icon-${first_bank.package_tag}"></span>
		${first_bank.bank_name} offers ${first_bank.bank_rate} @ RM ${first_bank.bank_repayment}</div>
	</p>
</div>
`;