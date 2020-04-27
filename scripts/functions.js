'use strict';

/*Баг нужно нажать 2 раза почему то*/
function toClipboard(element) {
    let clipboard = new ClipboardJS(element);
    
    clipboard.on('success', function(e) {
        alert('Скопирован ' + e.text);
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);    
    });  
}

function onKonamiCode(coolback) {
    let input = '';
    let key = '38384040373937396665';
    document.addEventListener('keydown', function (e) {
        input += ("" + e.keyCode);
        if (input === key)
            return coolback();
            
        if (!key.indexOf(input)) return;
            input = ("" + e.keyCode);
    });
}

let openNav = () => {
    let avatar = document.getElementById('avatar');
    let userNav = document.querySelector('.user__nav');

    avatar.addEventListener('click', () => {
        userNav.classList.toggle('user__nav--active');
    });  
}

let slide = () => {
    let user = document.querySelector('.sideBar__open');
    let close = document.querySelector('.sideBar__close');
    let sideBar = document.querySelector('.sideBar__inner');
    let slideLinks = document.querySelectorAll('.sideBar__links li');
    let user__nav = document.querySelector('.user__nav');

    user.addEventListener('click', () => {
        user__nav.classList.remove('user__nav--active');
        slideFunction(sideBar, slideLinks);
    });  

    //Повторение кода, знаю, потом подумаю как избавится, а может просто избавлюсь от крестика
    close.addEventListener('click', () => {
        slideFunction(sideBar, slideLinks);
    }); 
}

function slideFunction(sideBar, slideLinks) {
    sideBar.classList.toggle('sideBar-active');
    slideLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        }
        else {
            link.style.animation = `sideBarLinksFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

function changeStatus () 
{
    document.getElementById("statusSelect").addEventListener("change", function()
    {
        if(this.selectedIndex == 1)
        {
            document.getElementById('stat').setAttribute("class", "fas fa-fire");
            document.getElementById('stat').style.color = '#FF5340';
        }
        else if(this.selectedIndex == 2)
        {
            document.getElementById('stat').setAttribute("class", "fas fa-briefcase");
            document.getElementById('stat').style.color = '#FFEB73';
        }
        else if(this.selectedIndex == 3)
        {
            document.getElementById('stat').setAttribute("class", "fas fa-utensils");
            document.getElementById('stat').style.color = '#FF6858';
        }
        else 
        {
            document.getElementById('stat').setAttribute("class", "fas fa-wine-bottle");
            document.getElementById('stat').style.color = '#40FF9B';
        }
        var data = new FormData();  
        data.append("status", this.options[this.selectedIndex].label);
        data.append("id", JSON.parse(localStorage.user)["id"]);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "includes/dataGetter.php", true);
        xhr.send(data);
    });
}