var $ = jQuery.noConflict(); 
var formSubmitted = 'false';

var arrAgendaHost = new Array();
var arrSalaHost = new Array();
var arrSessoesHost = new Array();

var dbSqlLite = new AntsDB();

var campos,values;
var arrDadosCampos = new Array();
var arrDadosValues = new Array();


jQuery(document).ready(function($) {	


	$('#formSuccessMessageWrap').hide(0);
	$('.formValidationError').fadeOut(0);
	
	// fields focus function starts
	$('input[type="text"], input[type="password"], textarea').focus(function(){
		if($(this).val() == $(this).attr('data-dummy')){
			$(this).val('');
		};	
	});
	// fields focus function ends
		
	// fields blur function starts
	$('input, textarea').blur(function(){
            if($(this).val() == ''){ $(this).val($(this).attr('data-dummy')); };			
	});
	// fields blur function ends
		
	// submit form data starts	   
    function submitData(currentForm, formType){     
		
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

                                            window.location = 'index_page.html';
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
                                                      
                                                      window.location = 'index_page.html';
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
        
        
	// submit form data function starts	
	// validate form function starts
	function validateForm(currentForm, formType){		
		// hide any error messages starts
	    $('.formValidationError').hide();
		$('.fieldHasError').removeClass('fieldHasError');
	    // hide any error messages ends	
		$('#' + currentForm + ' .requiredField').each(function(i){		   	 
			if($(this).val() == '' || $(this).val() == $(this).attr('data-dummy')){				
				$(this).val($(this).attr('data-dummy'));	
				$(this).focus();
				$(this).addClass('fieldHasError');
				$('#' + $(this).attr('id') + 'Error').fadeIn(300);
				return false;					   
			};			
			if($(this).hasClass('requiredEmailField')){				  
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				var tempField = '#' + $(this).attr('id');				
				if(!emailReg.test($(tempField).val())) {
					$(tempField).focus();
					$(tempField).addClass('fieldHasError');
					$(tempField + 'Error2').fadeIn(300);
					return false;
				};			
			};			
			if(formSubmitted == 'false' && i == $('#' + currentForm + ' .requiredField').length - 1){
			 	submitData(currentForm, formType);
			};			  
   		});		
	};
	// validate form function ends	
	
	// contact button function starts
	$('#contactSubmitButton').click(function() {	
		validateForm($(this).attr('data-formId'));	
	    return false;		
	});
	// contact button function ends
	
	
	
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Document Ready Function Ends                                                                       */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
