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
    let body = document.body;
    let cloned_body = body.cloneNode(true);
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
        // 'form'
    ];
    for (i in deletes) {
        const item = cloned_body.querySelectorAll(deletes[i]);
        [...item].forEach(e => e.remove());
    }
    cloned_body = cloned_body.textContent;
    cloned_body = cloned_body.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    cloned_body = cloned_body.replace(/<\!--.*?-->/g, "");
})