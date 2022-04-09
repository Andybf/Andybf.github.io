async function getDatabase() {
    
    response = await fetch("./database.json");
    if (response.status == 200 || response.statusText == 'OK') {
        return await response.text();
    } else {
        return `[ERROR] Database not found. code ${response.status}: ${response.statusText}`;
    }
}

function createProjectItem(databaseItem) {

    let newCard = document.importNode(document.querySelector("template#card").content,true);

    newCard.querySelector(".card-image").style.backgroundImage = `url(${databaseItem.imgSrc})`;
    newCard.querySelector(".card-title").innerText = databaseItem.name;
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
}

async function initialize() {
    getDatabase().then( response => {
        database = JSON.parse(response);
        let articleHeader = document.querySelector("nav");
        
        Object.keys(database).forEach( page => {
            let newButton = document.importNode(document.querySelector("template#page-button").content,true);
            newButton.firstElementChild.innerText = database[page].title;
            newButton.firstElementChild.dataset['bkg'] = database[page].background;
            newButton.firstElementChild.itemType = database[page].itemType;
            newButton.firstElementChild.article = database[page].items;
            articleHeader.appendChild(newButton.firstElementChild);
        });

        document.querySelector("nav").firstElementChild.dispatchEvent(new CustomEvent("click", {}));
    });
}

initialize();
