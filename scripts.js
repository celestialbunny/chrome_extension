document.addEventListener('DOMContentLoaded', () => {
    console.log("Working");
    // set background color
    body = document.querySelector('body').style.background = 'rgb(237, 243, 247)';

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
    transition-delay: 3s !important;
    
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

    var first_bank = {
        "bank_name": "cimb",
        "package_name": "CIMB Cash Plus",
        "package_tag": "personal",
        "interest_rate": "6.88",
        "repayment": "474.00",
        "link": "https://ringgitplus.com/en/personal-loan/CIMB-Cash-Plus.html"
    }

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

    document.body.insertAdjacentHTML("beforeend", injected_section)
})