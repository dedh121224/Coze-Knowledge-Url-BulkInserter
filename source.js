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
        console.log((new Date()).toISOString().slice(11, 19));
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
