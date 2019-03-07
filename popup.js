function click(e) {
    // null for current tab, number specified will be referring to the tab (number) available
    chrome.tabs.executeScript(null,{code:"document.body.style.backgroundImage='url(" + images[e.target.id] + "'"});
    // chrome.tabs.executeScript(null,{
    //     code:"document.body.style.backgroundImage='url(https://cloud.fullstackacademy.com/nimit_maru.jpg)'"
    // });
    window.close();
}

// http://motyar.info/webscrapemaster/api/?url={url}&xpath={xpath}&attr={attr}&callback={callback}

document.addEventListener('DOMContentLoaded', function() {
    let uri = window.location.href;
    let body = document.body.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    let scripts = document.querySelectorAll('script');
    let inputs = document.querySelectorAll('input');
    
    document.body.remove(querySelectorAll('nav'));
    let navs = document.querySelectorAll('nav');
    navs.parentNode.removeChild(navs)

    body.remove(inputs);
    scripts.remove();
    let json_output = JSON.stringify(body)
    console.log(body);

    $('nav').remove();
    $('img').remove();
    $('a').remove();
    $('script').remove();
    $('link').remove();
    $('li').contents().unwrap();
    $('li').remove();
    $('body').remove('.');
    $('body').removeClass("");
})

const images = {
    joe: 'https://cloud.fullstackacademy.com/joe_alves.jpg',
    kate: 'https://cloud.fullstackacademy.com/kate.png',
    david: 'https://cloud.fullstackacademy.com/david_yang.png',
    nimit: 'https://cloud.fullstackacademy.com/nimit_maru.jpg'
}

function help() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let body = JSON.parse(document.body);
        console.log(body)
    }
    };
    xmlhttp.send();
}