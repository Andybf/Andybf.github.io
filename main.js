/*
 * andybf.github.io
 * Created by: Anderson Bucchianico
*/

"use strict"

async function initialize() {
    const response = await getDatabase();
    const database = JSON.parse(response);
    
    for(const paragraph of database['content']['description']) {
        let newParagraph = document.createElement("p"); 
        newParagraph.classList.add("paragraph-description");
        newParagraph.innerText = paragraph;
        document.querySelector(".page-description").appendChild(newParagraph);
    }

    let projectsList = document.querySelector(".projects-list");
    for(const project of database['content'].items) {
        if (project.isVisible) {
            projectsList.appendChild(createProjectItem(project));
        }
    }

    translateInterface(database['interface-text'], "innerText");
    translateInterface(database['interface-values'], "value");
    translateInterface(database['interface-placeholders'], "placeholder");
}

async function getDatabase() {
    let language = navigator.language;
    if (language != 'en-US' && language != 'pt-BR') {
        language = 'en-US';
    }
    if (language == 'pt') {
        language = 'pt-BR';
    }
    const response = await fetch(`./database-${language}.json`);
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
        cardTags.innerHTML += `<span class='tag' value="${language}">${language}</span>`;
    });
    let cardDevices = newCard.querySelector(".devices-content");
    databaseItem.devices.forEach( device => {
        cardDevices.innerHTML += `<span class='tag' value="${device}">${device}</span>`;
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

function translateInterface(strings, attribute) {
    Object.keys(strings).forEach( string => {
        document.querySelectorAll(`.${string}`).forEach(element => {
            element[attribute] = strings[string];
        });
    });
}

function sendEmail() {
    const emailSubject = document.querySelector("input[name='subject']").value;
    const emailBody = document.querySelector("textarea[name='body']").value;
    
    window.location.href = `mailto:anderson584bf@gmail.com?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;
}

initialize();
