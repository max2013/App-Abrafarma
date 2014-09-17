var $ = jQuery.noConflict();

var dbSqlLite = new AntsDB();

jQuery(document).ready(function($) {	
    // submit form data starts	   
    /*function submitData(currentForm, formType){     
		
                formSubmitted = 'true';		
		var formInput = $('#' + currentForm).serialize();
                
                arrAgendaHost = [];
                arrSalaHost = [];
                arrSessoesHost = [];

		$.post(ExternalURL+$('#' + currentForm).attr('action'),formInput, function(data){			
			                        
                        if(data.mensagem === 'fail')
                        {
                            formSubmitted = 'false';
                            $('#authError').fadeIn(500);
                        }
                        else 
                        {
                            
                            //SESSION DATA
                            sessionStorage.userlogado = 'true';
                            sessionStorage.userId = data.mensagem['inscricoesId'];
                            sessionStorage.userNome = data.mensagem['inscricoesNome'];
                            sessionStorage.userEmail = data.mensagem['inscricoesEmail'];
                            sessionStorage.userNomeCracha = data.mensagem['inscricoesNomeCracha'];
                            sessionStorage.userStatus = data.mensagem['inscricoesStatus'];
                            sessionStorage.userTipoInscricoesId = data.mensagem['inscricoesTipoInscricoesId'];
                            sessionStorage.userTipoParticipantesId = data.mensagem['inscricoesTipoParticipanteId'];                            
                            
                            arrDadosCampos = [];
                            arrDadosValues = [];
                            campos = '';
                            values = '';
                            arrDadosCampos.push('inscricoesId, inscricoesNome, inscricoesEmail, inscricoesNomeCracha, inscricoesTipoInscricoesId, inscricoesTipoParticipanteId, inscricoesStatus');
                            arrDadosValues.push('"'+
                                    html_entity_decode(data.mensagem['inscricoesId'])+'", "'+
                                    html_entity_decode(data.mensagem['inscricoesNome'])+'", "'+
                                    html_entity_decode(data.mensagem['inscricoesEmail'])+'", "'+
                                    html_entity_decode(data.mensagem['inscricoesNomeCracha'])+'", "'+
                                    html_entity_decode(data.mensagem['inscricoesTipoInscricoesId'])+'", "'+
                                    html_entity_decode(data.mensagem['inscricoesTipoParticipanteId'])+'", "'+
                                    html_entity_decode(data.mensagem['inscricoesStatus'])+
                                    '"');
                            campos = implode(", ", arrDadosCampos);
                            values = implode(", ", arrDadosValues);

                            //Verificando se há usuarios cadastrados.
                            dbSqlLite.handleGetDataSqlLite({tabela:'inscricoes', function:returnGetData});
                                            
                                            
                                            
                                            
                            $('#home-form').hide('slow');
                            $('#formSuccessMessageWrap').fadeIn(500);
                           
                            
                            function returnGetData(boo, res)
                                {
                                    if(!boo)
                                    {
                                        db.transaction(function(tx) {

                                            tx.executeSql("INSERT INTO tb_inscricoes ("+campos+") VALUES ("+values+")");

                                            window.location = 'homepage.html';
                                         });
                                    }
                                    else
                                    {
                                         setTimeout(function() {
                                
                                            $('#uppercaseSuccess').html('Carregando informações, aguarde...');

                                             $.when(

                                                  $.getJSON(ExternalURL+'agenda/handleSelect/isApp/true'), 

                                                  $.getJSON(ExternalURL+'salas/handleSelect/isApp/true'), 

                                                  $.getJSON(ExternalURL+'sessoes/handleSelect/isApp/true')

                                              ).done(function(a, b, c) {  // or ".done"

                                                      db.transaction(handleGetMysqlToSqlliteSuccess, handleGetMysqlToSqlliteError);

                                                      var arrAgendaHost = a[0].mensagem;
                                                      var arrSalaHost = b[0].mensagem;
                                                      var arrSessoesHost = c[0].mensagem;

                                                      //SUCCESS
                                                      function handleGetMysqlToSqlliteSuccess(tx, result)
                                                      {
                                                          var txs= tx;
                                                          //AGENDA

                                                          for(var i=0; i< arrValuesDb.length; i++)
                                                          {
                                                              //AGENDA
                                                              if(arrValuesDb[i].tabela === 'agenda' && arrValuesDb[i].value === false) {

                                                                  $.each(arrAgendaHost, function(i, index) {

                                                                      arrDadosCampos = [];
                                                                      arrDadosValues = [];
                                                                      campos = '';
                                                                      values = '';

                                                                      $.each(index, function(key, value)
                                                                      {
                                                                          arrDadosCampos.push(key);
                                                                          arrDadosValues.push('"'+html_entity_decode(value)+'"');

                                                                      });

                                                                      campos = implode(", ", arrDadosCampos);
                                                                      values = implode(", ", arrDadosValues);

                                                                      dbSqlLite.handleInsert({txDb:tx, tabela:'tb_agenda', field:campos, value:values});
                                                                  });
                                                              }

                                                              //SALAS
                                                              if(arrValuesDb[i].tabela === 'salas' && arrValuesDb[i].value === false) {

                                                                  $.each(arrSalaHost, function(i, index) {

                                                                      arrDadosCampos = [];
                                                                      arrDadosValues = [];
                                                                      campos = '';
                                                                      values = '';

                                                                      $.each(index, function(key, value)
                                                                      {

                                                                          arrDadosCampos.push(key);
                                                                          arrDadosValues.push('"'+html_entity_decode(value)+'"');

                                                                      });

                                                                      campos = implode(", ", arrDadosCampos);
                                                                      values = implode(", ", arrDadosValues);

                                                                      dbSqlLite.handleInsert({txDb:tx, tabela:'tb_salas', field:campos, value:values});
                                                                  });
                                                              }

                                                              //SESSOES
                                                              if(arrValuesDb[i].tabela === 'sessoes' && arrValuesDb[i].value === false) {

                                                                  //SESSOES
                                                                  $.each(arrSessoesHost, function(i, index) {

                                                                      arrDadosCampos = [];
                                                                      arrDadosValues = [];
                                                                      campos = '';
                                                                      values = '';

                                                                      $.each(index, function(key, value)
                                                                      {

                                                                          arrDadosCampos.push(key);
                                                                          arrDadosValues.push('"'+html_entity_decode(value)+'"');

                                                                      });

                                                                      campos = implode(", ", arrDadosCampos);
                                                                      values = implode(", ", arrDadosValues);

                                                                      dbSqlLite.handleInsert({txDb:tx, tabela:'tb_sessoes', field:campos, value:values});
                                                                  });
                                                              }


                                                          }

                                                          //    

                                                      }

                                                      

                                                       //ERROR
                                                      function handleGetMysqlToSqlliteError(tx, result){
                                                          console.log('REMOVER TODOS OS DADOS')
                                                      }
                                                      
                                                      window.location = 'homepage.html';
                                              });

                                              //
                                          }, 2000);
                                    }

                                    //
                                }
                        }
                        //window.location = 'homepage.html';
		},'json');

	};
        */
});

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
            $('#divBaseSessoes').empty();
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
        if(sessionStorage.idSessao === '5'){
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
                                           
                                            if(employee.agendaDia === '1')
                                            {
                                                 indiceBt++;
                                                $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>');
                                                $('#gridAgenda'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+img+'</div>');
                                            }
                                            else
                                            {
                                                indiceBt++;
                                                $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                $('#gridAgenda_'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+img+'</div>');
                                            }
                                        }
                                        else
                                        if(sessionStorage.idSessao === '2'){
                                                
                                            if(employee.agendaDia === '1')
                                                {

                                                    //if(employee.horariosId === idHorario)
                                                    
                                                    if(!in_array(idHorario,arrDataHorario))
                                                    {
                                                        
                                                        indiceBt++;
                                                        arrDataHorario.push(idHorario);
                                                        $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda_'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')

                                                    } 
                                                        $('#gridAgenda_'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+img+'</div>');


                                                }
                                                else
                                                {
                                                    if(!in_array(idHorario,arrDataHorario2))
                                                    { 

                                                        arrDataHorario2.push(idHorario)
                                                        $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+idHorario+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                    }
                                                    $('#gridAgenda_'+idHorario+'').append('<div class="gridDadosAgenda" align="left">'+img+'</div>');

                                                }
                                        }
                                        else
                                        if(sessionStorage.idSessao === '3'){
                                            
                                             if(employee.agendaDia === '1')
                                                {

                                                    if(!in_array(idHorario,arrDataHorario))
                                                    {
                                                        
                                                        indiceBt++;
                                                        arrDataHorario.push(idHorario);
                                                        $('#tab-content1').append('<div class="gridAgenda" id="gridAgenda'+indiceBt+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')

                                                    } 
                                                        $('#gridAgenda'+indiceBt+'').append('<div class="gridDadosAgenda" align="left">'+img+'</div>');

                                                        
                                                }
                                                else
                                                {
                                                    
                                                    if(!in_array(idHorario,arrDataHorario2))
                                                    { 

                                                        arrDataHorario2.push(idHorario)
                                                        $('#tab-content2').append('<div class="gridAgenda" id="gridAgenda_'+idHorario+'"><div class="green-notification" style="padding: 5px; border-radius: 0px 5px 0px 5px" id="gridHora">'+indexHr.hora+'</div></div>')
                                                    }
                                                    $('#gridAgenda_'+idHorario+'').append('<div class="gridDadosAgenda" align="left">'+img+'</div>');
                                                    
                                                }
                                        
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