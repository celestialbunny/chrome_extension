document.addEventListener('DOMContentLoaded', () => {
    // console.log("Working");
    // set background color
    let first_bank;
    
    const counts = [];

    function checkStatus(response) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    fetch('http://127.0.0.1:5000/_words')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            first_bank = data[0];
            // console.log(first_bank);
        })
        .then(data => {

            $('body').append(`
        <style type="text/css" media="screen">
        #popout,
        #toggle {
            position: fixed !important;
            transition: all 2s !important;
        }
        
        #info {
            z-index: 1000 !important;
        }
        
        #toggle {
            bottom: 1em !important;
            right: 1em !important;
            display: grid !important;
            grid-template-columns: minmax(min-content, 10em) minmax(min-content, 3em) !important;
            grid-template-areas: "detail" !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            background-color: rgb(10, 177, 19) !important;
            z-index: 500 !important;
            border-bottom-left-radius: 0.7em !important;
            border-top-left-radius: 0.7em !important;
        }
        
        #toggle:hover {
            background-color: rgb(255, 85, 85) !important;
        }
        
        #toggle:hover .highlight {
            font-size: 1.15em !important;
            color: rgb(194, 197, 199) !important;
        }
        
        #toggle * {
            transition: all 0.3s !important;
            vertical-align: middle !important;
            padding: 0.2em !important;
            color: white !important;
        }
        
        .detail {
            grid-area: detail !important;
        }
        
        #info {
            position: fixed !important;
            border: 0.1em solid black !important;
            padding: 0.3em !important;
            width: 1em !important;
            height: 1em !important;
            bottom: 3em !important;
            right: 0 !important;
            background-color: #4ebbb5 !important;
            color: white !important;
            font-size: 1.2rem !important;
            border-radius: 50% !important;
            text-align: center !important;
            box-shadow: 0 0 10px #719ECE !important;
            transition-property: transform !important;
            transition-duration: 1s !important;
        }
        
        #info:hover {
            cursor: pointer !important;
            background-color: #105372 !important;
            border: 1px solid #2E3A46 !important;
            animation-name: rotate !important; 
            animation-duration: 2s !important; 
            animation-iteration-count: infinite !important;
            animation-timing-function: linear !important;
        }
        
        @keyframes rotate {
            from {transform: rotate(0deg) !important;}
            to {transform: rotate(360deg) !important;}
        }
        
        input[type=checkbox]#popout {
            display: none !important;
        }
        #popout ~ #toggle {
            margin-right: -100% !important;
        }
        
        .slider:hover #popout ~ #toggle {
            margin-right: 0 !important;
        }
        
        .slider .clear * {
            text-decoration: initial !important;
            color: initial !important;
        }
        
        .flash {
            z-index: 1500 !important;
            position: fixed !important;
            bottom: 3em !important;
            right: 0 !important;
            background-color: tomato !important;
            box-shadow: 0 5px 10px #ddd !important;
            border: 2px solid violet !important;
            padding: 0.1em 0.5em !important;
            border-top-left-radius: 1.25em !important;
            border-bottom-left-radius: 1.25em !important;
            animation: disappear 3s !important;
            animation-fill-mode: forwards !important;
        }
        
        .flash * {
            transition-delay: 1s !important;
            
        }
        
        @keyframes disappear {
            0% { margin-right: 10% !important; }
            15% { margin-right: 7% }
            30% { margin-right: 4% !important; }
            45% { margin-right: 1% !important; }
            60% { margin-right: 0% !important; }
            100% { margin-right: -100% !important; }
        }
        </style >
            `);

            let injected_section = `
            <div class="slider">
                <a href="${first_bank.link}" target="_blank" class="clear">
                    <input type="checkbox" name="popout" id="popout">
                    <label for="popout" id="info">&times;</label>
                    <div id="toggle">
                        <div class="detail">
                            <div class="highlight"><span class="icon icon-${first_bank.package_tag}"></span>${first_bank.bank_name}</div>
                            <div>${first_bank.interest_rate} @ RM ${first_bank.repayment}</div>
                        </div>
                    </div>
                </a>
            </div>
            
            <div class="flash">
                <p>
                    <span class="icon icon-${first_bank.package_tag}"></span>
                    ${first_bank.bank_name} offers ${first_bank.interest_rate} @ RM ${first_bank.bank_repayment}</div>
                </p>
            </div>
            `;

            document.body.insertAdjacentHTML("beforeend", injected_section)
        })
        .then(data => {
            web_content = filter_text();
            send_and_fetch_details(web_content);
        })

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
            // .then(checkStatus)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // const distinct_matches = [...new Set(data)];

                for (let i = 0; i < data.length; i++) {
                    let num = data[i];
                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                }
                console.log(counts);
                // console.log(distinct_matches);
            })
        // Perform operation on the "altered" data format

    }

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
                                foundIndex = nodeVal.toLowerCase().indexOf(myToken);

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

})