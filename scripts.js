document.addEventListener('DOMContentLoaded', () => {
    console.log("Working");

    var first_bank = {
        "bank_name": "cimb",
        "package_name": "CIMB Cash Plus",
        "package_tag": "personal",
        "interest_rate": "6.88",
        "repayment": "474.00",
        "link": "https://ringgitplus.com/en/personal-loan/CIMB-Cash-Plus.html"
    }

    let injected_section = `
    <div class="flash">
    <p>
    <span class="icon icon-${first_bank.package_tag}"></span>
    <span>Hey! 👋 ${first_bank.package_name} is currently offering ${first_bank.package_tag} loan at ${first_bank.interest_rate}% ! Click me to find out more! </span>
    </p>
    </div>
    `;
    // <div class="slider">
    //     <a href="${first_bank.bank_link}" target="_blank" class="clear">
    //         <input type="checkbox" name="popout" id="popout">
    //         <label for="popout" id="info">&times;</label>
    //         <div id="toggle">
    //             <div class="detail">
    //                 <div class="highlight"><span class="icon icon-${first_bank.package_tag}"></span>${first_bank.bank_name}</div>
    //                 <span>Hey! 👋 ${first_bank.package_name} is currently offering ${first_bank.package_tag} loan at ${first_bank.interest_rate}% ! Click me to find out more! </span>
    //             </div>
    //         </div>
    //     </a>
    // </div>

    document.body.insertAdjacentHTML("beforeend", injected_section)
})