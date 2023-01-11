/*
 * andybf.github.io
 * Created by: Anderson Bucchianico
*/

async function initialize() {
    getDatabase().then( response => {
        database = JSON.parse(response);
        
        let newButton = document.querySelector(".page-button");
        newButton.innerText = database['content'].title;
        changePage(database['content']);
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

function createProjectItem(databaseItem) {
    let newCard = document.importNode(document.querySelector("template#card").content,true);

    newCard.querySelector(".card-image").style.backgroundImage = `url(${databaseItem.imgSrc})`;
    newCard.querySelector(".card-title").innerText = databaseItem.name;
    newCard.querySelector(".card-category").innerText = databaseItem.category;
    newCard.querySelector(".card-description").innerHTML = databaseItem.description;
    let cardTags = newCard.querySelector(".tecnologies-content");
    databaseItem.languages.forEach( language => {
        cardTags.innerHTML += `<span value="${language}">${language}</span>`;
    });
    let cardDevices = newCard.querySelector(".devices-content");
    databaseItem.devices.forEach( device => {
        cardDevices.innerHTML += `<span value="${device}">${device}</span>`;
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

function changePage(page) {
    let projectsList = document.querySelector("#projects-list");

    page.description.forEach( paragraph => {
        let newParagraph = document.createElement("P"); 
        newParagraph.classList.add("paragraph-description");
        newParagraph.innerText = paragraph;
        document.querySelector(".page-description").appendChild(newParagraph);
    });
    page.items.forEach( (item) => {
        if (item.isVisible) {
            projectsList.appendChild(createProjectItem(item));
        }
    });
    translateInterface(database.interface);
}

function translateInterface(strings) {
    Object.keys(strings).forEach( string => {
        document.querySelectorAll(`.${string}`).forEach(element => {
            element.innerText = strings[string];
        });
    });
}

function toggleDonateScreen() {
    window.scrollTo(0,document.body.scrollHeight)
}

initialize();
