const SHOW = 'show';
const HIDE = 'hide';

const createButton = () => {
    var button = document.createElement("button");
    button.setAttribute('id', "ad-hider-toggle-button");

    return button;
}

const storeLocally = (object) => {
    console.log(object);
    localStorage.setItem('bristolPostDeclutterSettings', JSON.stringify(object));
    // console.log('EXTRACT LOCALLY', localStorage.getItem('bristolPostDeclutterSettings'));
}

const extractLocally = () => {
    return localStorage.getItem('bristolPostDeclutterSettings');
}

const article = document.getElementsByClassName('article-body')[0];

const toggleElements = () => {
    const settings = extractLocally();
    const pref = JSON.parse(settings);

    console.log("PREFERENCES", pref);
    storeLocally({
        hideAds: !pref.hideAds,
        hideTwitter: false,
    });

    const acceptableTypes = ['P', 'BUTTON'];

    const button = document.getElementById('ad-hider-toggle-button')

    button.textContent = pref.hideAds ? 'Show ads' : 'Hide ads';

    const showType = pref.hideAds ? 'none' : 'block';

    Array.from(article.children).forEach(child => {
        if (!acceptableTypes.includes(child.nodeName)) child.style.display = showType;
    })

}

const setButtonFunctions = () => {
    const settings = extractLocally();
    const pref = JSON.parse(settings);

    const button = document.getElementById('ad-hider-toggle-button')

    button.addEventListener('click', function() {
        toggleElements();
    });

    button.textContent = pref.hideAds ? 'Show ads' : 'Hide ads';
}

const newButton = document.createElement("button");
newButton.setAttribute('id', "ad-hider-toggle-button");
article.insertAdjacentHTML('afterbegin', newButton.outerHTML);


window.onload = setButtonFunctions()