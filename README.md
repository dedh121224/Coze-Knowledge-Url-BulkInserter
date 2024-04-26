# Coze-Knowledge-Url-BulkInserter

由於Coze目前未提供批量新增url到Knowledge中的方法，在開發者工具使用此js，替換你的url即可幫助你批量設置。  
Since Coze currently does not provide a method to add URLs to Knowledge in batches, use this js in the developer tools and replace your URLs to help you set it up in batches.

[![Coze-Knowledge-Url-BulkInserter](https://i.imgur.com/qpisogX.png)](https://www.youtube.com/watch?v=KInD4l9_aBw "Coze-Knowledge-Url-BulkInserter")

在Chrome上按F12即可啟用開發者工具，在Console貼上js即可  
Press F12 on Chrome to enable developer tools, and paste js in Console
```javascript
let urls = [
    'https://docs.unity3d.com/Manual/ManualVersions.html',
    'https://docs.unity3d.com/ScriptReference/',
    'https://unity3d.com/unity/qa/lts-releases'
];

let divs = Array.from(document.querySelectorAll('div'));
let target = divs.find(div => div.textContent === 'Automatic');
target.parentNode.parentNode.click()

await delay(500);
await setUrlAndTriggerClick(urls.shift());
await delay(2200);

function triggerClick(selector) {
    document.querySelector(selector).click();
}

function setInputValue(selector, value) {
    let inputElement = document.querySelector(selector);
    let lastValue = inputElement.value;
    inputElement.value = value;
    let event = new Event('input', { target: inputElement, bubbles: true });
    // react 15
    event.simulated = true;
    // react 16-17
    let tracker = inputElement._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    inputElement.dispatchEvent(event);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function performActions(urls) {
    let processedCount = 1;
    const urlslength = urls.length + 1;
    for (let url of urls) {
        triggerClick('.upload-unit-add button');
        await delay(500);
        await setUrlAndTriggerClick(url);
        await delay(1300);
        processedCount++;
        console.log(`Progress: ${processedCount} / ${urlslength} (${(processedCount / urlslength * 100).toFixed(2)}%)`);
    }
}

async function setUrlAndTriggerClick(url) {
    setInputValue('div[role="dialog"] .semi-input.semi-input-default', url);
    await delay(300);
    triggerClick('div[role="dialog"] .semi-button.semi-button-primary');
}

await performActions(urls);
console.log("OK")
```
