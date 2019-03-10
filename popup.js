<<<<<<< HEAD
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
	let web_address = "http://www.example.com";
	xmlhttp.open("POST", web_address);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xmlhttp.send("FirstName=Chris&LastName=Minnick");
	/**
	 * Operations after receiving response from website
	 * Perform if else condition from here on
	 */
});

const games = [
	"Metal Gear Solid",
	"God of War IV",
	"Assassin's Creed Odyssey",
	"Battlefied V",
	"Warhammer: Vermintide",
	"Shadow of the Tomb Raider",
	"Devil May Cry 5",
	"Far Cry 5"
];

for (let i = 0; i < games.length; i++) {
	let li = document.createElement("li");
	let node = document.createTextNode(games[i]);
	li.appendChild(node);
	let wrapper = document.getElementById("container");
	wrapper.appendChild(li);
}
=======
chrome.tabs.executeScript(null, function (event) {
    const deletes = [
        'nav',
        'header',
        'footer',
        'img',
        'a',
        'span',
        'link',
        'script'
        // 'form'
    ];
    for (i in deletes) {
        const item = document.querySelectorAll(deletes[i]);
        [...item].forEach(e => e.remove());
    }
});
>>>>>>> 4df177d922ab81fb9265a1de0177b6f31bf19492
