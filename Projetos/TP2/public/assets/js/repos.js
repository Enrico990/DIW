
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

// Constantes para dados especificos do repositorio
const titulo = document.querySelector('h1.titulo-da-seção');
const bio = document.querySelector('p#bio');
const CDate = document.querySelector('p#data-de-criação');
const lang = document.querySelector('p#linguagem');
const link = document.querySelector('a#link');
const topics = document.querySelector('section#topicos');
const forks = document.querySelector('p#forks');
const stars = document.querySelector('p#stars');
const license = document.querySelector('p#license');
const watching = document.querySelector('p#watching');

// Variaveis para dados da API do Git
var UserData = {};
var ReposData = {};
var LastUpdate = 0;
var id = 0;

// Requisicao de informacoes do usuario da API do GitHub
function RequestUserGitApi()
{
    let UserXHR = new XMLHttpRequest();
    UserXHR.onload = function(event) {
        UserData = JSON.parse(event.target.response);
        SaveLocalGit ();
    };
    UserXHR.open('GET', 'https://api.github.com/users/davipuddo');
    UserXHR.send();
}

// Requisicao de informacoes dos repositorios do usuario da API do GitHub
function RequestRepoGitApi ()
{
    let ReposXHR = new XMLHttpRequest();
    ReposXHR.onload = function (event) {
        ReposData = JSON.parse(event.target.response);
        SaveLocalGit ();
    }
    ReposXHR.open('GET', 'https://api.github.com/users/davipuddo/repos');
    ReposXHR.send();
}

// Salvar dados no local storage
function SaveLocalGit () {
    let obj = {
        UserData,
        ReposData,
        UpdatedAt: parseInt((Date.now()/1000))
    }
    if (JSON.stringify(UserData) !== '{}' && JSON.stringify(ReposData) !== '{}')
    {
        localStorage.setItem('LocalGit', JSON.stringify(obj));
    }
}

// Ler dados locais se existirem
if (localStorage.getItem('LocalGit'))
{
    ShowReposData();
}
else
{ 
    // Requisitar dados da API do GitHub
    RequestUserGitApi();
    RequestRepoGitApi();
    SaveLocalGit();     // Salva-los localmente
    setTimeout(ShowReposData, 300);
    ShowReposData();     // Ler dados locais
}   

// Ler dados locais guardados na pagina inicial
if (localStorage.getItem('LocalGit'))
{
    let GitData = JSON.parse(localStorage.getItem('LocalGit'));
    if (GitData.ReposData)
    {    
        id = window.location.search[4];
        ReposData = GitData.ReposData[id];
        ShowReposData();
    }
}

// Mostrar dados do repositorio do GitHub
function ShowReposData ()
{
    if (JSON.stringify(ReposData) != '{}')
    {
        titulo.innerHTML = ReposData.name;
        bio.innerHTML = ReposData.description
        CDate.innerHTML = ReposData.created_at.slice(0, 10).replaceAll('-','/');
    
        if (id === '0' || id === '2')       // Mostrar linguagens como fornecidas pelo GitHub
        {
            lang.innerHTML = ReposData.language;
        }
        else                                // Mostrar linguagems nao identificadas pelo GitHub
        {
            if (id === '1')
            {
                lang.innerHTML = "Scratch";
            }
            else if (id === '3')
            {
                lang.innerHTML = "C++";
            }
        }
        for (let i = 0; i < ReposData.topics.length; i++)            // Criar topicos
        {
            topics.innerHTML += `<span>${ReposData.topics[i]}</span>`
        }
    
        link.innerHTML = ReposData.html_url;
        link.setAttribute('href', ReposData.html_url);
        forks.innerHTML = ReposData.forks;
        stars.innerHTML = ReposData.stargazers_count;
        
        let tmpLicense = ReposData.license;          // Verificar se a licenca existe
        if (tmpLicense == null)
        {
            tmpLicense = 'Nenhuma';
        }
        license.innerHTML = tmpLicense;
        watching.innerHTML = ReposData.watchers;
    }
}

// Media queries
setInterval(function(){

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

