//853355 Davi Puddo


// Constantes para API do GitHub
const ProfileImage = document.querySelector("#imagem-de-perfil");
const ProfileName = document.querySelector('p#nome');
const ProfileBio = document.querySelector('p#bio');
const ProfileLocation = document.querySelector('p#location');
const ProfileLink = document.querySelector('a#gitlink');
const PublicReposH1 = document.querySelector('h1#repos');
const ReposCards = document.querySelector('#repositorios');
const Followers = document.querySelector('#seguidores');

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
        Followers.innerHTML = data.followers;
    }
}

// Ler e mostrar dados dos repositorios do usuario da API do GitHub
function ShowGitReposData (data)
{
    if (data != undefined)
    {
        ReposCards.innerHTML = null;
        for (let i = 0; i < ReposNum; i++)
        {
            let link = window.location.origin + "/public/repos.html";
            let url = new URL(link);
            url.searchParams.append('id', i);
            let NURL = url.toString();

            ReposCards.innerHTML += `<div class="cards">
                                        <p class="titulo">${data[i].name}</p>
                                        <p class="descricao">${data[i].description}</p>
                                        <button><a href="${NURL}">Visitar</a></button>
                                     </div>`
        }
    }
}

// Variaveis para dados da API do Git
var UserData = {};
var ReposData = {};
var LastUpdate = 0;

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
    ReadLocalGit();
}
else
{ 
    // Requisitar dados da API do GitHub
    RequestUserGitApi();
    RequestRepoGitApi();
    SaveLocalGit();     // Salva-los localmente
    setTimeout(ReadLocalGit, 300);
}

// Ler dados do local storage
function ReadLocalGit ()
{
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
            LastUpdate = GitData.UpdatedAt;
        }
    }
}

// Atualizar dados a cada 5 minutos
setInterval(function(){
    if ((LastUpdate+300) <= parseInt((Date.now()/1000)))
    {
        RequestUserGitApi();
        RequestRepoGitApi();
        SaveLocalGit();
        ReadLocalGit()
    }
}, 20000);

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

// Json server
const colegas = document.querySelector('#colegas');
JServerData = {};

var JServer = new XMLHttpRequest();
JServer.onload = function(event){
    JServerData = JSON.parse(event.target.response);
    ShowColegas();
    SugestedImg.src = JServerData.carousel[0].imagem;
    SugestedImg.setAttribute('title', JServerData.carousel[0].nome);
}
JServer.onerror =  function () {
    console.log('Json server nao respondeu!');
    document.querySelector('div#content-page').innerHTML = null;
};
JServer.open("GET", "http://localhost:3000/Data");
JServer.send();

// Colegas de trabalho
function ShowColegas ()
{
    let data = JServerData.colegas;
    for (let i = 0; i < 3; i++)
        {
            colegas.innerHTML += `<span id="colega-${data[i].id}">
                                    <img src="${data[i].imagem}" class="colega" title="${data[i].nome}"></img>
                                    <a href="${data[i].git}"><p class="titulo">${data[i].nome}</p></a>
                                  </span>`
        } 
}

// Carousel
const next = document.querySelector('button#proximo');
const back = document.querySelector('button#anterior');
const SugestedImg = document.querySelector('#imagem-sugerida');

var CIndex = 0;

// Ir para a proxima imagem
next.addEventListener('click', function(){
    if (JSON.stringify(JServerData) != "{}")
    {
        data = JServerData.carousel;
        CIndex++;
        if (CIndex >= data.length)
            {
                CIndex = 0;
                SugestedImg.src = data[CIndex].imagem;
                SugestedImg.setAttribute('title', data[CIndex].nome);
            }
            SugestedImg.src = data[CIndex].imagem;
            SugestedImg.setAttribute('title', data[CIndex].nome);
    }
})


// Voltar para a imagem anterior
back.addEventListener('click', function(){
    if (JSON.stringify(JServerData) != "{}")
    {
        data = JServerData.carousel;
        CIndex--;
        if (CIndex < 0)
        {
            CIndex = data.length-1;
        }
        SugestedImg.src = data[CIndex].imagem;
        SugestedImg.setAttribute('title', data[CIndex].nome);
    }
})