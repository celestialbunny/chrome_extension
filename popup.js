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