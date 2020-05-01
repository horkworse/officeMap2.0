'use strict';

/*Баг нужно нажать 2 раза почему то*/
function toClipboard(element) {
    let clipboard = new ClipboardJS(element);
    console.log(1);
    
    clipboard.on('success', function(e) {
        alert('Скопирован ' + e.text);
    });  
}

//Пасхалка
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

//Работа DropDown меню
let openNav = () => {
    let avatar = document.getElementById('avatar');
    let userNav = document.querySelector('.user__nav');

    avatar.addEventListener('keydown', () => {
        if (event.keyCode === 13) {
            if($('.user__nav:visible').length)
                $(userNav).slideUp(300, "linear");
            else
                $(userNav).slideDown(300, "linear"); 
        }   
    });  

    avatar.addEventListener('click', () => {
        // userNav.classList.toggle('user__nav--active');
        // userNav.style.display = 'block';
        if($('.user__nav:visible').length)
            $(userNav).slideUp(300, "linear");
        else
            $(userNav).slideDown(300, "linear"); 
    });  
    closeOutOfElement(userNav);
}

//Работа сайдбара
let slide = () => {
    let user = document.querySelector('.sideBar__open');
    let close = document.querySelector('.sideBar__close');
    let sideBar = document.querySelector('.sideBar__inner');
    let slideLinks = document.querySelectorAll('.sideBar__links li');
    let userNav = document.querySelector('.user__nav');

    user.addEventListener('click', () => {
        // user__nav.classList.remove('user__nav--active');
        $(userNav).slideUp(300, "linear"); 
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

//Смена статуса, отправка на сервер, и смена иконки
function changeStatus () 
{
    document.getElementById("statusSelect").addEventListener("change", function()
    {
        if(this.selectedIndex == 0)
        {
            document.getElementById('stat').setAttribute("class", "fas fa-fire");
            document.getElementById('stat').style.color = '#FF0D22';
        }
        else if(this.selectedIndex == 2)
        {
            document.getElementById('stat').setAttribute("class", "fas fa-briefcase");
            document.getElementById('stat').style.color = '#FFC400';
        }
        else if(this.selectedIndex == 1)
        {
            document.getElementById('stat').setAttribute("class", "fas fa-door-open");
            document.getElementById('stat').style.color = '#0122FF';
        }
        else 
        {
            document.getElementById('stat').setAttribute("class", "fas fa-wine-bottle");
            document.getElementById('stat').style.color = '#19FF4F';
        }
        var data = new FormData();  
        data.append("status", this.options[this.selectedIndex].label);
        data.append("id", JSON.parse(localStorage.user)["id"]);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "includes/dataGetter.php", true);
        xhr.send(data);
    });
}

//Открытие при фокусе поля с вариантыми ответа поиска
function searchField (){
    let search = document.getElementById('search__input');
    let searchField = document.getElementById('search__field');

    $(search).focus(function() {
        $(searchField).slideDown(300, "linear"); 
    });

    $(search).blur(function() {
        $(searchField).slideUp(300, "linear"); 
    });
}

//Закрытие элемента при клике вне его области
function closeOutOfElement (element){
    $(document).mouseup(function (e){ // событие клика по веб-документу
        let div = $(element);
        if (!div.is(e.target) && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.slideUp(300, "linear");  // скрываем его
        }
    });
}