const database = [
    {
        name : 'PaintSpace',
        imgSrc : '/media/img/paintspace.png',
        description : 'A single page application to create drawnings, paintings, edit images, play with geometrical forms, mess with the color pallete and more, unleash your creativity.',
        languages : ['HTML','CSS','JavaScript'],
        link: '/'
    },
    {
        name : 'AtomBiosEditor',
        imgSrc : '/media/img/atombios.png',
        description : "A graphics card firmware editor, making possible to performa extreme overclocks on the board, focused on editing AMD GPU's BIOS realeased between 2011 and 2015, works only on macOS system.",
        languages : ['C','C++','Objective-C'],
        link : '/'
    },
    {
        name : 'SnakeGame',
        imgSrc : '/media/img/snakegame.png',
        description : "A very simple old game, but recreated with the help of C language combined with OpenGL, no engines were used, the objective is very clear, eat as more as you can, without touching anything else.",
        languages : ['C','C++','OpenGL'],
        link : '/'
    },
    {
        name : 'Andromeda Project',
        imgSrc : '/media/img/andromeda.png',
        description : "One of the first tries to develop a working game, it turns out to be a complete mess in his final stages of development, it doesn't even have an appropriate name, but it has a codename Andromeda.",
        languages : ['Java'],
        link : '/'
    },
    {
        name : 'Mandelbrot Experiment',
        imgSrc : '/media/img/mandelbrot.png',
        description : "The famous experiment of Mandelbrot set creates an very interesting and very, very, very complex image by doing some math and drawing the result on the cartesian plane.",
        languages : ['JavaScript','HTML','CSS','Canvas API'],
        link : '/'
    },
    {
        name : 'Falling Blocks',
        imgSrc : '/media/img/fallingblocks.png',
        description : "The famous experiment of Mandelbrot set creates an very interesting and very, very, very complex image by doing some math and drawing the result on the cartesian plane.",
        languages : ['C','C++','OpenGL'],
        link : '/'
    }
];

function createProjectItem(databaseItem) {
    let card = document.createElement("article");

    let image = document.createElement("img");
    image.setAttribute("src",databaseItem.imgSrc);

    let subCard = document.createElement("div");

    let cardName = document.createElement("figcaption");
    cardName.innerText = databaseItem.name;

    let cardDesc = document.createElement("p");
    cardDesc.innerText = databaseItem.description;

    let cardLanguages = document.createElement("ul");
    databaseItem.languages.forEach( (lang) => {
        let langItem = document.createElement('li');
        langItem.innerText = lang;
        cardLanguages.appendChild(langItem);
    });

    let cardVisit = document.createElement("a");
    cardVisit.setAttribute("href",'/');
    cardVisit.innerText = "Visit project";

    card.appendChild(image);
    subCard.appendChild(cardName);
    subCard.appendChild(cardDesc);
    subCard.appendChild(cardLanguages);
    subCard.appendChild(cardVisit);
    card.appendChild(subCard);
    return card;
}

let projectList = document.querySelector("section");

database.forEach( (item) => {
    projectList.appendChild(createProjectItem(item));
});