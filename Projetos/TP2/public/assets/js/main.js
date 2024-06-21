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
function ShowGitUserData (data)
{  
    if (data != undefined)
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
function ShowGitReposData (data)
{
    if (data != undefined)
    {
        for (let i = 0; i < ReposNum; i++)
        {
            ReposCards.innerHTML += `<div class="cards">
                                        <p class="titulo">${data[i].name}</p>
                                        <p class="desctricao">${data[i].description}</p>
                                        <button><a href="${data[i].html_url}">Visitar</a></button>
                                     </div>`
        }
    }
}

// Variaveis para dados da API do Git
var UserData = {};
var ReposData = {};
var LastUpdate = 0;

// Ler dados do local storage
if (localStorage.getItem('LocalGit'))
{
    let GitData = JSON.parse(localStorage.getItem('LocalGit'));
    if (GitData.UserData != undefined)
    {
        UserData  = GitData.UserData;
        ReposData = GitData.ReposData;
    
        ShowGitUserData (UserData);
        ShowGitReposData(ReposData);
    }
    if (GitData.UpdatedAt != undefined)
    {
        // Requisitar novos dados se a ultima atualizacao foi a mais de 5 minutos
        LastUpdate = GitData.UpdatedAt;
        if ((LastUpdate + 300) <= parseInt((Date.now()/1000)))
        {
            RequestUserGitApi();
            RequestRepoGitApi();
            SaveLocalGit();
        }
    }
}

// Requisicao de informacoes do usuario da API do GitHub
function RequestUserGitApi()
{
    let UserXHR = new XMLHttpRequest();
    UserXHR.onload = function(event) {
        UserData = JSON.parse(event.target.response);
        SaveLocalGit ()
    };
    UserXHR.open('GET', 'https://api.github.com/users/davipuddo?per_page=20');
    UserXHR.send();
}

// Requisicao de informacoes dos repositorios do usuario da API do GitHub
function RequestRepoGitApi ()
{
    let ReposXHR = new XMLHttpRequest();
    ReposXHR.onload = function (event) {
        ReposData = JSON.parse(event.target.response);
        SaveLocalGit ()
    }
    ReposXHR.open('GET', 'https://api.github.com/users/davipuddo/repos?per_page=20');
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