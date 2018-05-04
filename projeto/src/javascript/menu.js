;(function name(params) {
    'use strict';

    var btn = document.querySelector('.header-nav__hamburgger');
    var html = document.querySelector('html');
   var classMenu = 'menu-opened';
    var menuOpened = false;

    html.addEventListener('click', function(e){
        if(e.target === html && menuOpened){
            closeMenu();
        }
    });

    btn.addEventListener('click', toggleMenu);

    function toggleMenu(e){
        if(menuOpened){
            closeMenu()
        }else{
            openMenu();
        }
    }

    
    function closeMenu(){
        menuOpened = false;
        html.classList.remove(classMenu);
        btn.blur();
    }
    function openMenu(){
        menuOpened = true;

        html.classList.add(classMenu);
    }

})();
