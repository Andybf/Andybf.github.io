/*
 * andybf.github.io
 * Created by: Anderson Bucchianico
*/

async function initialize() {
    getDatabase().then( response => {
        database = JSON.parse(response);
        let articleHeader = document.querySelector("nav");
        
        Object.keys(database['content']).forEach( page => {
            let newButton = document.importNode(document.querySelector("template#page-button").content,true);
            newButton.firstElementChild.innerText = database['content'][page].title;
            newButton.firstElementChild.dataset['bkg'] = database['content'][page].background;
            newButton.firstElementChild.itemType = database['content'][page].itemType;
            newButton.firstElementChild.article = database['content'][page].items;
            articleHeader.appendChild(newButton.firstElementChild);
        });
        document.querySelector("nav").firstElementChild.dispatchEvent(new CustomEvent("click", {}));
    });
}

async function getDatabase() {
    let language = navigator.language;
    if (language != 'en-US' && language != 'pt-BR') {
        language = 'en-US';
    }
    let database = `./database-${language}.json`;
    response = await fetch(database);
    if (response.status == 200 || response.statusText == 'OK') {
        return await response.text();
    } else {
        return `[ERROR] Database not found. code ${response.status}: ${response.statusText}`;
    }
}

function translateInterface(strings) {
    Object.keys(strings).forEach( string => {
        document.querySelectorAll(`.${string}`).forEach(element => {
            element.innerText = strings[string];
        });
    });
}

function createProjectItem(databaseItem) {

    let newCard = document.importNode(document.querySelector("template#card").content,true);

    newCard.querySelector(".card-image").style.backgroundImage = `url(${databaseItem.imgSrc})`;
    newCard.querySelector(".card-title").innerText = databaseItem.name;
    newCard.querySelector(".card-category").innerText = databaseItem.category;
    newCard.querySelector(".card-description").innerText = databaseItem.description;
    let cardTags = newCard.querySelector(".card-tags");
    databaseItem.languages.forEach( language => {
        cardTags.innerHTML += `<span value="${language}">${language}</span>`;
    });
    if (databaseItem.isLiveDemoEnabled) {
        newCard.querySelector("#live-demo").href = databaseItem.linkLiveDemo;
        newCard.querySelector("#live-demo").setAttribute('disabled',false);
    }
    if (databaseItem.isViewSourceEnabled) {
        newCard.querySelector("#view-source").href = databaseItem.link;
        newCard.querySelector("#view-source").setAttribute('disabled',false);
    }
    return newCard;
}

function createBlogItem(databaseItem) {
    let newPost = document.importNode(document.querySelector("template#blog-post").content,true);

    newPost.querySelector(".blog-post-title").innerText = databaseItem.name;
    return newPost;
}

function createNewItem(item, itemType) {
    if (itemType === "project") {
        return createProjectItem(item);
    } else {
        return createBlogItem(item);
    }
}

function changePage(event) {
    document.querySelector(".article-header").style.backgroundImage = `url(${event.target.dataset.bkg})`;
    Array.from(event.target.parentElement.children).forEach( button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');

    let newArticle = document.querySelector("article");
    newArticle.firstElementChild.innerHTML = "";
    event.target.article.forEach( (item) => {
        newArticle.querySelector("ul").appendChild(createNewItem(item, event.target.itemType));
    });
    translateInterface(database.interface);
}

function toggleDonateScreen() {
    let donate = document.querySelector(".donate-subcontainer").style;
    donate.display = (donate.display == 'flex') ? 'none' : 'flex';
}

initialize();
