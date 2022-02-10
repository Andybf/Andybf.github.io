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

async function initialize() {
    getDatabase().then( response => {

        database = JSON.parse(response);
        let projectList = document.querySelector("ul");
    
        database.forEach( (item) => {
            projectList.appendChild(createProjectItem(item));
        });
    });
}

initialize();
