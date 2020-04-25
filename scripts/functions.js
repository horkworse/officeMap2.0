'use strict';

function editForm(){
    let form = document.querySelectorAll('.inputs');

    form.forEach(function(item){
        item.toggleAttribute('readonly');

        if (item.style.cursor == 'text')
        {
            var data = new FormData();
            data.append('type', item.id);
            data.append('value', item.value);
            data.append('surname', item.name.split(" ")[0]);
            data.append('name', item.name.split(" ")[1]);
            
            //alert(item.name.split(" ")[1]); 
            //alert(item.value); 
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "includes/functions.php", true);
            xhr.send(data);
        }

        item.style.cursor = (item.style.cursor == 'text') ? '' : 'text';
        item.style.borderBottom  = (item.style.borderBottom  == '') ? '1px solid #000' : '';
    });       
    
}

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
    // let cont = document.querySelector('.content');


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


function changeStatus () {
    document.getElementById("statusSelect").addEventListener("change", function(){
        let st = document.getElementById("statusSelect").value;

        if(+st == 1){
            document.getElementById('stat').setAttribute("class", "fas fa-fire");
            document.getElementById('stat').style.color = '#FF5340';
        }else if(+st == 2){
            document.getElementById('stat').setAttribute("class", "fas fa-briefcase");
            document.getElementById('stat').style.color = '#FFEB73';
        }else if(+st == 3){
            document.getElementById('stat').setAttribute("class", "fas fa-utensils");
            document.getElementById('stat').style.color = '#FF6858';
        }else if(+st == 4){
            document.getElementById('stat').setAttribute("class", "fas fa-wine-bottle");
            document.getElementById('stat').style.color = '#40FF9B';
        }
    });
}

//Не работает почему то
$(function(){
    //2. Получить элемент, к которому необходимо добавить маску
    $("#phone").mask("8(999) 999-9999");
});
