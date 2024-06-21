//853355 Davi Puddo

// Constantes para API do GitHub
const ProfileImage = document.querySelector("#imagem-de-perfil");
const ProfileName = document.querySelector('p#nome');
const ProfileBio = document.querySelector('p#bio');
const ProfileLocation = document.querySelector('p#location');
const ProfileLink = document.querySelector('a#gitlink');
const PublicReposH1 = document.querySelector('h1#repos');
const ReposCards = document.querySelector('#repositorios');

var LocalETag = '';
var ReposNum = 0;
var EmailUrl = '';

// Ler e mostrar dados do usuario da API do GitHub
function GitUserData (event)
{  
    let data = JSON.parse(event.target.response);
    if (data.name != undefined)
    {
        ProfileImage.src = data.avatar_url;
        ProfileName.innerHTML = data.name;
        ProfileBio.innerHTML = data.bio;
        ProfileLocation.innerHTML = "<strong>Localização: </strong>" + data.location;
        ProfileLink.innerHTML = data.html_url;
        ProfileLink.href = data.html_url;
        ReposNum = data.public_repos;
        PublicReposH1.innerHTML = `Repositórios ` + `( ${ReposNum} )`;
        EmailUrl = data.email;
    }
}

// Ler e mostrar dados dos repositorios do usuario da API do GitHub
function GitReposData (event)
{
    let data = JSON.parse(event.target.response);
    for (let i = 0; i < ReposNum; i++)
    {
        ReposCards.innerHTML += `<div class="cards">
                                    <p class="titulo">${data[i].name}</p>
                                    <p class="desctricao">${data[i].description}</p>
                                    <button><a href="${data[i].html_url}">Visitar</a></button>
                                 </div>`
    }
}

// Protecao contra o limite de requisicoes;
if (localStorage.getItem('LocalETag'))
{
    LocalETag = JSON.parse(localStorage.getItem('LocalETag'));
}

/* if (ETag == '' || ETag !== LocalETag)
{
    // Requecicao de informacoes do usuario da API do GitHub
    let UserXHR = new XMLHttpRequest();
    UserXHR.onload = GitUserData;
    UserXHR.open('GET', 'https://api.github.com/users/davipuddo?per_page=20');
    UserXHR.send();
    
    // Requecicao de informacoes dos repositorios do usuario da API do GitHub
    let ReposXHR = new XMLHttpRequest();
    ReposXHR.onload = GitReposData;
    ReposXHR.open('GET', 'https://api.github.com/users/davipuddo/repos?per_page=20');
    ReposXHR.send();
} */

// Media querie
var interval = setInterval(function(){

    if (window.matchMedia('(max-width:625px)').matches)
    {
        document.querySelector('#home-btn').innerHTML = 'Davi';
        
        for (let i = 0; i < 3; i++)
        {
            document.querySelectorAll('#seções button')[i].innerHTML = i+1;
        }
    }
    else
    {
        document.querySelector('#home-btn').innerHTML = 'Davi Puddo'
        for (let i = 0; i < 3; i++)
        {
                document.querySelectorAll('#seções button')[i].innerHTML = `Seção ${i+1}`;
        }
    }
}, 20)


// Botoes do Header
const HeaderHome = document.querySelector('#home-btn');
const Section1 = document.querySelector('#um');
const Section2 = document.querySelector('#dois');
const Section3 = document.querySelector('#tres');

// Pular o header
function ScrollHeader ()
{
    window.scrollBy(0, -220);
}   

HeaderHome.addEventListener('click', function(){
    window.location.href = 'index.html';
})

Section1.addEventListener('click', function(){
    window.location.href = 'index.html#perfil';
    ScrollHeader();
})

Section2.addEventListener('click', function(){
    window.location.href = 'index.html#repositorios';
    ScrollHeader();
})

Section3.addEventListener('click', function(){
    window.location.href = 'index.html#conteudo-sugerido';
    ScrollHeader();
})

// Botoes perfil
const email = document.querySelector('#email');

email.addEventListener('click', function(){
    window.location.href = EmailUrl;
})


// Json Server

const jsonServer = require('json-server')
const server = jsonServer.create();
const router = jsonServer.router('../db/db.json');
