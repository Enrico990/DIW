//853355 Davi Puddo

const ProfileImage = document.querySelector("#imagem-de-perfil");
const ProfileName = document.querySelector('p#nome');
const ProfileBio = document.querySelector('p#bio');
const ProfileLocation = document.querySelector('p#location');
const ProfileLink = document.querySelector('a#gitlink');
const NRepos = document.querySelector('h1#repos');

let xhr = new XMLHttpRequest();

xhr.onload = GitData;
xhr.open('GET', 'https://api.github.com/users/davipuddo');
xhr.send();

function GitData (event)
{  
    let data = JSON.parse(event.target.response);
    ProfileImage.src = data.avatar_url;
    ProfileName.innerHTML = data.name;
    ProfileBio.innerHTML = data.bio;
    ProfileLocation.innerHTML = "<strong>Localização: </strong>" + data.location;
    ProfileLink.innerHTML = data.html_url;
    ProfileLink.href = data.html_url;
    NRepos.innerHTML = `Repositórios ` + `(${data.public_repos})`;
}