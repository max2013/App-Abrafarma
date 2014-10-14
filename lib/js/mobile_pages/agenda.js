var $ = jQuery.noConflict();

var dbSqlLite = new AntsDB();

document.addEventListener('deviceready', onDeviceReadyAgenda, false);

    function onDeviceReadyAgenda()
    {
       
        dbSqlLite.handleConnect();
        if(sessionStorage.page === 'agenda') dbSqlLite.handleGetData2SqlLite({tabela:'sessoes', function:getSessoes});
        if(sessionStorage.page === 'view_agenda') handleGetDataAgenda();
    }
    
    function getSessoes(boo, data)
    {
        var arrImages = new Array('img_logo_forum.png', 'img_logo_varejista.png', 'img_logo_super_sessoes.png', 'img_logo_sessoes_tematicas.png');
        if(boo)
        {
            //$('#divBaseSessoes').empty();
            if(sessionStorage.page === 'agenda'){
                
                var len = data.rows.length;
                
                for (var i=0; i<len; i++) {

                    var employee = data.rows.item(i);

                    $('#divBaseSessoes').append(
                            '<table cellspacing="0" class="table">'+
                            '<tr>'+
                                '<th colspan="3" style="background-image: url(images/'+arrImages[i]+'); background-repeat: no-repeat; width: 100px;height: 83px; background-size: 15%; background-position: right;" >'+employee.sessoesNome+'</th>'+
                            '</tr>'+
                            '<tr>'+
                                '<td colspan="3" class="table-sub-title"><a href="#" id="'+employee.sessoesId+'" style="color:#333;">'+employee.sessoesDescritivos+'</a></td>'+
                            '</tr>'+
                        '</table>');

                    $('#'+employee.sessoesId).click(function(event)
                    {

                            sessionStorage.idSessao = event.currentTarget.id;
                            sessionStorage.page = 'view_agenda';

                            window.location = 'view_agenda.html';

                    });

                }

            }
        }
        else
        {
            dbSqlLite.handleClean('tb_sessoes');
            //window.location = 'index.html';
        }
                        
    }
    
    
    
    
    
    var arrHorarios = new Array();
    var arrImagesAgenda = new Array('','img_logo_forum.png', 'img_logo_varejista.png', 'img_logo_super_sessoes.png','', 'img_logo_sessoes_tematicas.png');
    function handleGetDataAgenda()
    {
        if(sessionStorage.idSessao === '5' || sessionStorage.idSessao === '4'){
                                            alert('No momento não há agenda disponível');
                                            window.location = 'agenda.html';
                                        }
                                        
                                        
         $('#logoSessao').empty();
         $('#logoSessao').append('<div style="background-image: url(images/'+arrImagesAgenda[sessionStorage.idSessao]+'); background-repeat: no-repeat; width: 100px;height: 83px; background-size: 100%; background-position: center;"></div>');
              
        db.transaction(function(tx) {

                    tx.executeSql(
                            'SELECT * FROM tb_agenda a, tb_salas b, tb_sessoes c '+
                            'WHERE '+
                            'a.agendaSalasId = b.salasId '+ 
                            'AND '+
                            'a.agendaSessoesId = '+sessionStorage.idSessao+' '+
                            'AND '+
                            'c.sessoesId = '+sessionStorage.idSessao+' '+
                            'AND '+
                            'a.agendaStatus = 1 '+
                            'GROUP by a.agendaDia', [], 
                    function (tx, result)
                    {
                        var len = result.rows.length;
                        
                        $('#divBaseSessoes').fadeIn('fast');
                        
                        if(len > 0){

                            for(var i=0; i<len;i++)
                            {
                                var dia;
                                
                                var employee = result.rows.item(i);
                                
                                if(employee.agendaDia === '1')
                                {
                                    dia = '14/10';
                                    $('#divDia1').html(dia);
                                }
                                if(employee.agendaDia === '2'){
                                    dia = '15/10';
                                    $('#divDia2').html(dia);
                                }
                                
                                
                                handleViewDataContent(employee.agendaDia);
                            }

                         }

                    },
                    function()
                    {
                        dbCreate = true;
                    });

            });
            
    }
    
    function handleViewDataContent(id)
    {
        
        db.transaction(function(tx) {
            
            tx.executeSql(
                            'SELECT * FROM tb_horarios', [], 
                    function (tx, result)
                    {
                        arrHorarios = [];
                        var len = result.rows.length;
                        
                        for(var i=0; i<len; i++)
                        {
                            var employee = result.rows.item(i);
                            
                            arrHorarios.push({id:employee.horariosId, hora:employee.horariosHora});
                        }
                        handleGettingAgenda(id);
                    },
                    function()
                    {
                        alert('Error Agenda')
                    });
                    
        });
    }
    
    function handleGettingAgenda(id)
    {
        var indiceBt = 0;
        var arrDataHorario = new Array();
        var arrDataHorario2 = new Array();
        var classScheadle;
        
          $.each(arrHorarios, function(i, indexHr)
          {
              var idHorario = indexHr.id;
              $('#tab-content1').empty();
              $('#tab-content2').empty();
              
              db.transaction(function(tx) {
                  
                  
                    tx.executeSql(
                                    'SELECT * FROM tb_agenda a, tb_salas b, tb_horarios c, tb_empresas d '+
                                    'WHERE '+
                                    'a.agendaSalasId = b.salasId '+
                                    'AND '+
                                    'a.agendaDia = '+id+' '+
                                    'AND '+
                                    'c.horariosId = '+idHorario+' '+
                                    'AND '+
                                    'a.agendaHorario = c.horariosId '+
                                    'AND '+
                                    'a.agendaEmpresasId = d.empresasId '+
                                    'AND '+
                                    'a.agendaSessoesId = '+sessionStorage.idSessao+' '+
                                    'AND '+
                                    'a.agendaStatus=1 '+
                                    'GROUP by a.agendaId '+
                                    'ORDER by c.horariosId ASC, a.agendaId ASC', [], 
                            function (tx, result)
                            {
                               
                                var len = result.rows.length;
                                  
                                    for(var i=0; i<len; i++)
                                    {        

                                        var employee = result.rows.item(i);
                                        
                                         if(sessionStorage.idSessao === '1' || sessionStorage.idSessao === '2' || sessionStorage.idSessao === '3'){

                                            if(sessionStorage.idSessao === '1'|| sessionStorage.idSessao === '3'){
                                                var img = employee.agendaDescricao;
                                            }
                                            else
                                            {
                                                //console.log(ExternalURL+'images/logos_redes_agenda/images/'+employee.empresasLogo)
                                                var img = '<img src="images/logos_redes_agenda/images/'+employee.empresasLogo+'" class="float-left" width="100%" alt="img">';
                                            }
                                         }
                                         
                                            
                                            if(sessionStorage.idSessao === '1'){
                                            
                                                if(employee.agendaMyAgendaStatus === 0)classScheadle = 'idCalendario';
                                                else classScheadle = 'redScheadle';

                                                  
                                                        if(employee.agendaDia === '1')
                                                        {
                                                            
                                                            if(sessionStorage.pageImportant === 'minha_agenda') 
                                                            {
                                                                if(employee.agendaMyAgendaStatus === 1)
                                                                {
                                                                    indiceBt++;
                                                                    $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>');
                                                                    $('#gridAgenda'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                                    '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="gridWhite" >'+img+'</div></div>');
                                                                }
                                                                
                                                            }
                                                            else
                                                            {
                                                                indiceBt++;
                                                                $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>');
                                                                $('#gridAgenda'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                                '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                '<div class="gridWhite" >'+img+'</div></div>');
                                                            }
                                                            
                                                            
                                                            
                                                            
                                                        }
                                                        else
                                                        {
                                                            if(sessionStorage.pageImportant === 'minha_agenda') 
                                                            {
                                                                if(employee.agendaMyAgendaStatus === 1)
                                                                {
                                                                    indiceBt++;
                                                                    $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                                    $('#gridAgenda_'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                                    '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="gridWhite">'+img+'</div></div>');
                                                                }
                                                            }
                                                            else
                                                            {
                                                                    indiceBt++;
                                                                    $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                                    $('#gridAgenda_'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                                    '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                                    '<div class="gridWhite">'+img+'</div></div>');
                                                            }
                                                            
                                                        }
                                                  
                                                  
                                                  
                                                  $('#calendario_'+employee.agendaId).click(function() {

                                                     handleUpStatuScheadle($(this).attr('data-id'));
                                                  });

                                                  $('#notas_'+employee.agendaId).click(function() {

                                                      var ref = window.open('anotacoes.html#'+$(this).attr('data-id'), '_blank', 'EnableViewPortScale=yes');
                                                  });

                                                  $('#alarme_'+employee.agendaId).click(function() {
                                                    var ref = window.open('alarme.html#'+$(this).attr('data-id')+';'+employee.agendaId, '_blank', 'EnableViewPortScale=yes');
                                                  });
                                              }
                                            else
                                            if(sessionStorage.idSessao === '2'){
                                                if(employee.agendaMyAgendaStatus === 0)classScheadle = 'idCalendario';
                                                else classScheadle = 'redScheadle';
                                                if(employee.agendaDia === '1')
                                                {

                                                    if(sessionStorage.pageImportant === 'minha_agenda') 
                                                    {
                                                        if(employee.agendaMyAgendaStatus === 1)
                                                        {
                                                            if(!in_array(idHorario,arrDataHorario))
                                                            {
                                                                indiceBt++;
                                                                arrDataHorario.push(idHorario);
                                                                $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda_'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                            } 
                                                     
                                                            $('#gridAgenda_'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+
                                                               '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="gridWhite">'+img+'</div></div>');
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if(!in_array(idHorario,arrDataHorario))
                                                        {
                                                            indiceBt++;
                                                            arrDataHorario.push(idHorario);
                                                            $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda_'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                        }
                                                            
                                                        $('#gridAgenda_'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+
                                                               '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="gridWhite">'+img+'</div></div>');
                                                    }
                                                        


                                                }
                                                else
                                                {
                                                    
                                                    
                                                    if(sessionStorage.pageImportant === 'minha_agenda') 
                                                    {
                                                        if(employee.agendaMyAgendaStatus === 1)
                                                        {
                                                            if(!in_array(idHorario,arrDataHorario2))
                                                            { 

                                                                arrDataHorario2.push(idHorario)
                                                                $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+idHorario+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                            }
                                                    
                                                            $('#gridAgenda_'+idHorario+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="gridWhite">'+img+'</div></div>');
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if(!in_array(idHorario,arrDataHorario2))
                                                        { 

                                                            arrDataHorario2.push(idHorario)
                                                            $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+idHorario+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                        }
                                                    
                                                        $('#gridAgenda_'+idHorario+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                '<div class="gridWhite">'+img+'</div></div>');
                                                    }

                                                }
                                                
                                            $('#calendario_'+employee.agendaId).click(function() {
                                               handleUpStatuScheadle($(this).attr('data-id'));
                                            });
                                            
                                            $('#notas_'+employee.agendaId).click(function() {
                                               
                                                var ref = window.open('anotacoes.html#'+$(this).attr('data-id'), '_blank', 'EnableViewPortScale=yes');
                                            });
                                            
                                            $('#alarme_'+employee.agendaId).click(function() {
                                               alert($(this).attr('data-id'))
                                            });
                                        }
                                            else
                                            if(sessionStorage.idSessao === '3'){
                                            if(employee.agendaMyAgendaStatus === 0)classScheadle = 'idCalendario';
                                                else classScheadle = 'redScheadle';
                                             if(employee.agendaDia === '1')
                                                {
                                                    
                                                    if(sessionStorage.pageImportant === 'minha_agenda') 
                                                    {
                                                        if(employee.agendaMyAgendaStatus === 1)
                                                        {
                                                            if(!in_array(idHorario,arrDataHorario)) {
                                                        
                                                                indiceBt++;
                                                                arrDataHorario.push(idHorario);
                                                                $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')

                                                            } 
                                                            $('#gridAgenda'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                    '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="gridWhite">'+img+'</div></div>');
                                                        }
                                                    }
                                                    else
                                                    {
                                                           if(!in_array(idHorario,arrDataHorario)) {
                                                        
                                                                indiceBt++;
                                                                arrDataHorario.push(idHorario);
                                                                $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')

                                                            } 
                                                            $('#gridAgenda'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                    '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="gridWhite">'+img+'</div></div>');
                                                    }
                                                    

                                                        
                                                }
                                                else
                                                {
                                                    if(sessionStorage.pageImportant === 'minha_agenda') 
                                                    {
                                                        if(employee.agendaMyAgendaStatus === 1)
                                                        {
                                                            if(!in_array(idHorario,arrDataHorario2))
                                                            { 

                                                                arrDataHorario2.push(idHorario)
                                                                $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+idHorario+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                            }
                                                            $('#gridAgenda_'+idHorario+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                        '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                        '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                        '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                        '<div class="gridWhite">'+img+'</div></div>');
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if(!in_array(idHorario,arrDataHorario2))
                                                        { 

                                                            arrDataHorario2.push(idHorario)
                                                            $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+idHorario+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                        }
                                                        $('#gridAgenda_'+idHorario+'').append('<div class="gridDadosAgenda" align="left">'+
                                                                    '<div class="'+classScheadle+'" id="calendario_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="idNotas"      id="notas_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="idAlarme"     id="alarme_'+employee.agendaId+'" data-id="'+employee.agendaId+'"></div>'+
                                                                    '<div class="gridWhite">'+img+'</div></div>');
                                                    }
                                                    
                                                    
                                                }
                                                
                                                $('#calendario_'+employee.agendaId).click(function() {
                                                    handleUpStatuScheadle($(this).attr('data-id'));
                                                 });

                                                 $('#notas_'+employee.agendaId).click(function() {

                                                     var ref = window.open('anotacoes.html#'+$(this).attr('data-id'), '_blank', 'EnableViewPortScale=yes');
                                                 });

                                                 $('#alarme_'+employee.agendaId).click(function() {
                                                    alert($(this).attr('data-id'))
                                                 });
                                            
                                        }
                                    
                                    }
                                    
                                
                            },
                            function()
                            {
                                alert('Error Agenda')
                            });

                });
              
              
              
              
          });
    }
    
    function handleUpStatuScheadle(id)
    {
        db.transaction(function(tx) {
                  
                  
            tx.executeSql(
                    'SELECT * FROM tb_agenda where agendaId = '+id+' LIMIT 1', [], 
                    function (tx, result)
                    {
                        var len = result.rows.length;
                        var dados = result.rows.item(0);
                        var status = 0;
                        var position;
                        
                        //alert('Status Atual: '+dados.agendaMyAgendaStatus);
                        if(dados.agendaMyAgendaStatus === 0)
                        {
                            status =1;
                            position = 'right';
                        }
                        else
                        {
                            status =0;
                            position = 'left';
                        }
                         //alert('Status: '+status);
                        db.transaction(function(tx) {
                           
                            tx.executeSql(
                                        'UPDATE tb_agenda SET agendaMyAgendaStatus = '+status+' WHERE agendaId='+id, [], 
                                        function (tx, result)
                                        {
                                            
                                            $('#calendario_'+id).css('background-position', position)

                                        },
                                        function ()
                                        {
                                            alert('Erro ao reservar a agenda!')
                                        });
                        });
                    },
                    function ()
                    {
                        alert('Erro ao reservar a agenda')
                    });
                            
        });
    }