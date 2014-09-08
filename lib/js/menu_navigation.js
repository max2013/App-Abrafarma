/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).load(function() { // makes sure the whole site is loaded
    
    
	var menu ='<div class="navigation-wrapper">'+
    	'<div class="nav-item">'+
        	'<a href="homepage.html" class="homepage-icon">Home<em class="selected-item"></em></a>'+
        '</div>'+
        '<div class="nav-item">'+
            '<a href="#" class="submenu-item features-icon">Agenda<em class="dropdown-item"></em></a>'+
            '<div class="submenu">'+
            	'<a href="type.html">Typography</a>'+
                '<a href="jquery.html">jQuery</a>'+
            '</div>'+
       ' </div>'+
            
        '<div class="nav-item">'+
            '<a href="#" class="submenu-item features-icon">Minha Agenda<em class="dropdown-item"></em></a>'+
            '<div class="submenu">'+
            	'<a href="type.html">Typography</a>'+
                '<a href="jquery.html">jQuery</a>'+
            '</div>'+
        '</div>'+
        
        '<div class="nav-item">'+
            '<a href="contact.html" class="contact-icon">Palestrantes<em class="unselected-item"></em></a>'+
        '</div>'+
        
        '<div class="nav-item">'+
            '<a href="contact.html" class="contact-icon">Expositores<em class="unselected-item"></em></a>'+
        '</div>'+

        '<div class="nav-item">'+
            '<a href="contact.html" class="contact-icon">Blocos de notas<em class="unselected-item"></em></a>'+
        '</div>'+
        
        '<div class="nav-item">'+
            '<a href="contact.html" class="contact-icon">Mapa de Salas<em class="unselected-item"></em></a>'+
        '</div>'+
          
        '<div class="nav-item">'+
            '<a href="contact.html" class="contact-icon">Contato<em class="unselected-item"></em></a>'+
        '</div>'+
    '</div>';
    
    //by Rafael Alves - Load Menu Navigation
    $('#navigation').append(menu);
    
})
