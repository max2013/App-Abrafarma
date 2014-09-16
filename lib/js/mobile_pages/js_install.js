// JavaScript Document

//Var's
var ip = '192.168.0.124:81';//'10.0.0.6:8888';
var db;
var campos,values;
var arrDadosCampos = new Array();
var arrDadosValues = new Array();
var arrValuesDb = new Array();
var dbError = 0;

var ExternalURL = 'http://'+ip+'/googledrive/Server/Projetos/MaxExperience/Desenvolvimento/Clientes/Abrafarma/Site/';
//var ExternalURL = 'http://www.abrafarmafuturetrends.com.br/beta/';
var antsDb = new AntsDB();    


function onDeviceReady()
{
    //sessionStorage.firstname = 'Rafael';
    antsDb.handleConnect();
}

///PLUGIN DB-Data Base
function AntsDB(){
    
   
    //HandleConnect
    this.handleConnect = function() {
        db = openDatabase('App_Abrafarma', '1.0', '@ralves_sql', 50 * 1024 * 1024);        
    }
    ,
    //HandleCreateDb
    this.handleCreateDb = function (){
       var dbCreate = false;
       
       db.transaction(handleCreateSuccess, handleCreateError);
        
        function handleCreateSuccess(tx, result) {
            
             //tx.executeSql('DROP TABLE IF EXISTS tb_inscricoes');
             //tx.executeSql('DROP TABLE IF EXISTS tb_agenda');
             //tx.executeSql('DROP TABLE IF EXISTS tb_salas');
             //tx.executeSql('DROP TABLE IF EXISTS tb_sessoes');
             
            //Tb Participantes
            var sql = 
		"CREATE TABLE IF NOT EXISTS tb_inscricoes( "+
		"inscricoesId int(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"inscricoesEmpresasId int(11), " +
		"inscricoesTipoParticipanteId int(11), " +
		"inscricoesTipoInscricoesId int(11), " +
		"inscricoesNome VARCHAR(100), " +
                "inscricoesNomeCracha VARCHAR(100), " +
                "inscricoesDataNascimento VARCHAR(40), " +
                "inscricoesEmail VARCHAR(150), " +
                "inscricoesLogin  VARCHAR(100), " +
                "inscricoesSenha VARCHAR(40), " +
                "inscricoesCPF VARCHAR(40), " +
                "inscricoesRG VARCHAR(40), " +
                "inscricoesTelefone VARCHAR(40), " +
                "inscricoesCelular VARCHAR(40), " +
                "inscricoesCargo VARCHAR(40), " +
                "inscricoesDataIn VARCHAR(40), " +
                "inscricoesDataOut VARCHAR(40), " +
                "inscricoesAereoStatus int(11), " +
                "inscricoesHospedagemStatus int(11), " +
                "inscricoesData VARCHAR(20), " +
		"inscricoesStatus INT(11))";
		tx.executeSql(sql);
                
                
            //Tb Agenda
            var sql = 
		"CREATE TABLE IF NOT EXISTS tb_agenda( "+
		"agendaId int(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"agendaEmpresasId int(11), " +
		"agendaSalasId int(11), " +
		"agendaSessoesId int(11), " +
		"agendaDescricao mediumtext NOT NULL, " +
                "agendaDia VARCHAR(20), " +
                "agendaDiaSemana VARCHAR(20), " +
                "agendaHorario VARCHAR(20), " +
                "agendaDuracao VARCHAR(10), " +
		"agendaData VARCHAR(20), " +
		"agendaStatus INT(11))";
		tx.executeSql(sql);
                
            //Tb Salas
            var sql = 
		"CREATE TABLE IF NOT EXISTS tb_salas( "+
		"salasId int(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
                "salasSessoesId int(11), " +
		"salasNome VARCHAR(100), " +
		"salasVagas int(11), " +
		"salasData VARCHAR(20), " +
		"salasStatus INT(11))";
		tx.executeSql(sql);
            
            //Sessoes
            var sql = 
		"CREATE TABLE IF NOT EXISTS tb_sessoes( "+
		"sessoesId int(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
                "sessoesNome VARCHAR(200), " +
		"sessoesDescritivos TEXT, " +
		"sessoesData VARCHAR(20), " +
		"sessoesStatus INT(11))";
		tx.executeSql(sql);
                
            //HORARIOS
            var sql = 
		"CREATE TABLE IF NOT EXISTS tb_horarios( "+
		"horariosId int(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
                "horariosHora VARCHAR(20), " +
		"horariosData VARCHAR(20), " +
		"horariosStatus INT(11))";
		tx.executeSql(sql);
                
            //EMPRESAS
            var sql = 
		"CREATE TABLE IF NOT EXISTS tb_empresas( "+
		"empresasId int(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
                "empresasTipoParticipanteId int(11), " +
                "empresasNome VARCHAR(200), " +
                "empresasLogo VARCHAR(100), " +
                "empresasLogradouro VARCHAR(255), " +
                "empresasComplemento VARCHAR(200), " +
                "empresasBairro VARCHAR(200), " +
                "empresasCidade VARCHAR(200), " +
                "empresasUF VARCHAR(20), " +
		"empresasData VARCHAR(20), " +
		"empresasStatus INT(11))";
		tx.executeSql(sql);
                
                
           
            
            //AGENDA
            db.transaction(function(tx) {
              
               tx.executeSql('select * from tb_agenda', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   
                    
                   if(len === 0){
                       
                        $.getJSON(ExternalURL+'agenda/handleSelect/isApp/true',function(data){

                            if(data.mensagem == 'fail')
                            {
                                    alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                            }
                            else
                            {

                                    db.transaction(handleInsertDataAgenda, handleDbAgendaError);

                                    function handleDbAgendaError(tx, result)
                                    {
                                            alert('Houve um Erro!\nInforme o desenvolvedor.');
                                    }

                                    function handleInsertDataAgenda(tx, result)
                                    {

                                            $.each(data.mensagem, function(i, index) { 

                                                var keyData='';
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

                                                //DB Class insert
                                                var dbDataBase = new AntsDB();
                                                dbDataBase.handleInsert({tabela:'tb_agenda', txDb:tx, field:campos, value:values});


                                            });

                                    }

                            }
                        });

                    }
                
               },
               function()
               {
                   dbCreate = true;
                   //alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
                   //window.location = 'index.html';
               });
               
            });            
            
            //SALAS
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_salas', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   if(len === 0){
                       
                        $.getJSON(ExternalURL+'salas/handleSelect/isApp/true',function(data){

                            if(data.mensagem == 'fail')
                            {
                                    alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                            }
                            else
                            {

                                    db.transaction(handleInsertDataAgenda, handleDbAgendaError);

                                    function handleDbAgendaError(tx, result)
                                    {
                                            alert('Houve um Erro!\nInforme o desenvolvedor.');
                                    }

                                    function handleInsertDataAgenda(tx, result)
                                    {

                                            $.each(data.mensagem, function(i, index) { 

                                                var keyData='';
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

                                                //DB Class insert
                                                var dbDataBase = new AntsDB();
                                                dbDataBase.handleInsert({tabela:'tb_salas', txDb:tx, field:campos, value:values});


                                            });

                                    }

                            }
                        });

                    }
                   
               },
               function()
               {
                   dbCreate = true;
                   //alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
                   //window.location = 'index.html';
               });
               
            });
            
            //SESSOES
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_sessoes', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   
                   if(len === 0){
                       
                        $.getJSON(ExternalURL+'sessoes/handleSelect/isApp/true',function(data){

                            if(data.mensagem == 'fail')
                            {
                                    alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                            }
                            else
                            {

                                    db.transaction(handleInsertDataAgenda, handleDbAgendaError);

                                    function handleDbAgendaError(tx, result)
                                    {
                                            alert('Houve um Erro!\nInforme o desenvolvedor.');
                                    }

                                    function handleInsertDataAgenda(tx, result)
                                    {

                                            $.each(data.mensagem, function(i, index) { 

                                                var keyData='';
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

                                                //DB Class insert
                                                var dbDataBase = new AntsDB();
                                                dbDataBase.handleInsert({tabela:'tb_sessoes', txDb:tx, field:campos, value:values});


                                            });

                                    }

                            }
                        });

                    }
                   
               },
               function()
               {
                   dbCreate = true;
                   //alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
                  //window.location = 'index.html';
               });
               
               
            });
            
            //HORARIOS
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_horarios', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   
                   if(len === 0){
                       
                        $.getJSON(ExternalURL+'horarios/handleSelect/isApp/true',function(data){
                            
                            
                            if(data.mensagem === 'fail')
                            {
                                    alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                            }
                            else
                            {

                                    db.transaction(handleInsertDataAgenda, handleDbAgendaError);

                                    function handleDbAgendaError(tx, result)
                                    {
                                            alert('Houve um Erro!\nInforme o desenvolvedor.');
                                    }

                                    function handleInsertDataAgenda(tx, result)
                                    {

                                            $.each(data.mensagem, function(i, index) { 

                                                var keyData='';
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

                                                //DB Class insert
                                                var dbDataBase = new AntsDB();
                                                dbDataBase.handleInsert({tabela:'tb_horarios', txDb:tx, field:campos, value:values});


                                            });

                                    }

                            }
                        });

                    }
                   
               },
               function()
               {
                   dbCreate = true;
                   //alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
                  //window.location = 'index.html';
               });
               
               
            });
            
            //EMPRESAS
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_empresas', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   
                   if(len === 0){
                       
                        $.getJSON(ExternalURL+'empresas/handleSelect/isApp/true',function(data){
                            
                            
                            if(data.mensagem == 'fail')
                            {
                                    alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                            }
                            else
                            {

                                    db.transaction(handleInsertDataAgenda, handleDbAgendaError);

                                    function handleDbAgendaError(tx, result)
                                    {
                                            alert('Houve um Erro!\nInforme o desenvolvedor.');
                                    }

                                    function handleInsertDataAgenda(tx, result)
                                    {

                                            $.each(data.mensagem, function(i, index) { 

                                                var keyData='';
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

                                                //DB Class insert
                                                var dbDataBase = new AntsDB();
                                                dbDataBase.handleInsert({tabela:'tb_empresas', txDb:tx, field:campos, value:values});


                                            });

                                    }

                            }
                        });

                    }
                   
               },
               function()
               {
                   dbCreate = true;
                   //alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
                  //window.location = 'index.html';
               });
               
               
            });
            
            
            
            if(dbCreate)
            {
                alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
            }
            else
            {
                //window.location = 'homepage.html';
            }
            
            //PALESTRANTES
            /*
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_palestrantes', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   if(len > 0)
                   {
                       arrValuesDb.push({tabela: 'palestrantes', value:true});
                   }
                   else
                   {
                       arrValuesDb.push({tabela: 'palestrantes', value:false});
                   }
                   
               },
               function()
               {
                   alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
                  window.location = 'index.html';
               });
               
               
            });
            
           
           //INSCRICOES
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_inscricoes', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   
                   if(len > 0)
                   {
                       arrValuesDb.push({tabela: 'inscricoes', value:true});
                   }
                   else
                   {
                       arrValuesDb.push({tabela: 'inscricoes', value:false});
                   }
                   
               },
               function()
               {
                   alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
                  
               });
               
               
            });
            */
            
            //Status Logado
           
            if(sessionStorage.userlogado === undefined || sessionStorage.userlogado === '') {
                sessionStorage.userlogado = '';
            }
            else{
                window.location = 'homepage.html';
            }
            
        }
        
        
       
        
        function handleCreateError(tx, result) {
            alert('#Error: Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
            window.location = 'index.html';
        }
        
        
    },
    
            
    //HandleInsert
    this.handleInsert = function(arrDados) {
         
        arrDados.txDb.executeSql("INSERT INTO "+arrDados.tabela+" ("+arrDados.field+") VALUES ("+arrDados.value+")");
      
    },
    
    this.handleGetDataSqlLite = function(objParams) {
        //objParams - Contém os parametros de (tabela = nome da tabela) e (function = Função de retorno)
        
        //AGENDA
        db.transaction(function(tx) {
            
            
           tx.executeSql('select * from tb_'+objParams.tabela+ ' WHERE ' +objParams.tabela+'Id = '+sessionStorage.userId, [], 
           function (tx, result)
           {
               var len = result.rows.length;
              
               if(len < 1)
               {
                   objParams.function(true,result);
               }
               else
               {
                   objParams.function(false);
               }

           },
           function()
           {
               alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
               window.location = 'index.html';

           });

        });
    },
            
    this.handleGetData2SqlLite = function(objParams) {
        //objParams - Contém os parametros de (tabela = nome da tabela) e (function = Função de retorno)
        
       
        //AGENDA
        db.transaction(function(tx) {
           
           tx.executeSql('select * from tb_'+objParams.tabela+' WHERE '+objParams.tabela+'Status = 1 ORDER by '+objParams.tabela+'Id ASC', [], 
           function (tx, result)
           {
               var len = result.rows.length;
              
               if(len < 1)
               {
                   objParams.function(false);
               }
               else
               {
                   objParams.function(true, result);
               }

           },
           function()
           {
               alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
               window.location = 'index.html';

           });

        });
    },
            
    //HanldeClean
    this.handleClean = function(tabela) {
        
        db.transaction(handleCleanSuccess, handleCleanError);
        
        function handleCleanSuccess(tx, result)
        {
            tx.executeSql('DROP TABLE IF EXISTS '+tabela);
            
             //window.location = 'index.html';
        }
        
        function handleCleanError(tx, result)
        {
            alert('Houve um erro. Se o problema persistir envie-nos uma mensagem!');
        }
        
    }
    
}


////PLUGIN VALIDACAO
function AntsValidacao(){
    
    this.validaData = function()
    {
        var i=0;
        $('input, textarea').each(function() {
            // code
            
            if($(this).attr('required'))
            {
                
                if($(this).val() === '')
                {
                   i++;
                } 
            }
           
            
        });
        
        
        if(i > 0)return false;
        else return true;
            
        
    };
}


////PLUGIN VALIDA E-MAIL
function AntsValidacaoEmail(){
    
    this.validaEmail = function(email)
    {
        if(email != "")
        {
           var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
           if(filtro.test(email))
           {
              return true;
           } else {
             
             return false;
           }
        }
    }
     
}


////PLUGIN CARACTERES ESPECIAIS
function AntsValidacaoCaracteresEspeciais() {
    
    this.validarCaracteres = function(str)
    {
        //se não desejar números é só remover da regex abaixo
        var regex = '[\'\"]'//'[^a-zA-Z0-9]+';
        if(str.match(regex)) {
             //encontrou então não passa na validação
             return false;
        }
        else {
             //não encontrou caracteres especiais
             return true;
        }
    }
   
}


///////////Global Methods//////////////
 
function handlerEraseDbTransaction(tx, result)
{
	
	tx.executeSql('DROP TABLE IF EXISTS tb_estudos');
	tx.executeSql('DROP TABLE IF EXISTS tb_estudos_tipo');
	tx.executeSql('DROP TABLE IF EXISTS tb_aulas');
	tx.executeSql('DROP TABLE IF EXISTS tb_usuarios');
	tx.executeSql('DROP TABLE IF EXISTS tb_palestras');
	tx.executeSql('DROP TABLE IF EXISTS tb_mynote');
	tx.executeSql('DROP TABLE IF EXISTS tb_palestras_palestrantes');
	tx.executeSql('DROP TABLE IF EXISTS tb_palestrantes');
	
	
	$.getJSON(ExternalURL+'adm/lib/php/sm_usuarios.php?acao=delete&idUser='+UserId+'&format=json',function(data){
		
		if(data.mensagem == 'fail')
		{
			alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
		}
		else
		{
			window.location = "index.html";
		}
	});
	
	
}





///------------ Alerta ---------
function handleAlert(strAlerta, strMessage, strUrl)
{
	
	
	$("#id-alert").fadeIn('slow').click(
		function()
		{
			$("#id-alert").fadeOut('slow'
			  ,function() {
				// Animation complete.
				if(strUrl !=undefined) window.location = strUrl;
					
			  });
		});
	$("#alert-top-message").html(strAlerta);
	$("#alert-content-message").html(strMessage);
}


///SEND FORM
function handleInsertNewCadastro(){
    
        if(handleInputValidacao()){

        var postData = $('#form-cadastro').serializeArray();
        var formURL = ExternalURL+'participantes/handleInsert/front/true';
        
        
        $.post(formURL, { formulario:postData },
        
            function(data)
            {
                //console.log(postData);
            }
            , 'json').done(function(success)
            {
                if(success.mensagem === 'success')
                {
                    alert('Cadastro realizado com sucesso!');
                    window.location.reload();
                }
                else
                {
                    alert('Houve um erro ao efetuar o cadastro!');
                }

            }, 'json').fail(function(error)
            {
                //console.log(error);

            }, 'json');
        }
        else
        {
            alert('Preencher todos os campos!');
        }

}



function handleInputValidacao(){
    var validate = new AntsValidacao();
    return validate.validaData();
}