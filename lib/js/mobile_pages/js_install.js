// JavaScript Document

//Var's
var ip = '192.168.0.124:81';//'10.0.0.6:8888';
var db;
var campos,values;
var arrDadosCampos = new Array();
var arrDadosValues = new Array();
var arrValuesDb = new Array();
var dbError = 0;

//var ExternalURL = 'http://'+ip+'/googledrive/Server/Projetos/MaxExperience/Desenvolvimento/Clientes/Abrafarma/Site/';
var ExternalURL = 'http://www.abrafarmafuturetrends.com.br/beta/';
var antsDb = new AntsDB();    


function onDeviceReady()
{
    //sessionStorage.firstname = 'Rafael';
    antsDb.handleConnect();
}

///PLUGIN DB-Data Base
function AntsDB(){
    
   
    //HandleConnect
    this.handleConnect = function()
    {
        db = openDatabase('App_Abrafarma', '1.0', '@ralves_sql', 50 * 1024 * 1024);
        
    }
    ,
    //HandleCreateDb
    this.handleCreateDb = function (){
       
       
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
                
                
           
            //AGENDA
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_agenda', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   if(len > 0)
                   {
                       arrValuesDb.push({tabela: 'agenda', value:true});
                   }
                   else
                   {
                       arrValuesDb.push({tabela: 'agenda', value:false});
                   }
                   
               },
               function()
               {
                   alert('Devido a uma falha o aplicativo pode apresenta algumas indisponibilidades. Por favor feche e abra-o novamente.');
                   
               });
               
            });
            
            //SALAS
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_salas', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   if(len > 0)
                   {
                       arrValuesDb.push({tabela: 'salas', value:true});
                   }
                   else
                   {
                       arrValuesDb.push({tabela: 'salas', value:false});
                   }
                   
               },
               function()
               {
                   alert('Devido a uma falha o aplicativo pode apresenta algumas indisponibilidades. Por favor feche e abra-o novamente.');
                   
               });
               
            });
            
            //SESSOES
            db.transaction(function(tx) {
               
               tx.executeSql('select * from tb_sessoes', [], 
               function (tx, result)
               {
                   var len = result.rows.length;
                   if(len > 0)
                   {
                       arrValuesDb.push({tabela: 'sessoes', value:true});
                   }
                   else
                   {
                       arrValuesDb.push({tabela: 'sessoes', value:false});
                   }
                   
               },
               function()
               {
                   alert('Devido a uma falha o aplicativo pode apresenta algumas indisponibilidades. Por favor feche e abra-o novamente.');
                  
               });
               
               
            });
            
           
           //SESSOES
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
                   alert('Devido a uma falha o aplicativo pode apresenta algumas indisponibilidades. Por favor feche e abra-o novamente.');
                  
               });
               
               
            });
        
            
            //Status Logado
           
            if(sessionStorage.userlogado === undefined || sessionStorage.userlogado === '') {
                sessionStorage.userlogado = '';
                return;
            }
            else
            {
                window.location = 'homepage.html';
            }
        }
       
        
        function handleCreateError(tx, result) {
            alert('#Error: Devido a uma falha o aplicativo pode apresenta algumas indisponibilidades. Por favor feche e abra-o novamente.');
        }
        
        
    },
    
            
    //HandleInsert
    this.handleInsert = function(arrDados) {
         
        arrDados.txDb.executeSql("INSERT INTO "+arrDados.tabela+" ("+arrDados.field+") VALUES ("+arrDados.value+")");
      
    },
    
    this.handleGetDataSqlLite = function(objParams)
    {
        //objParams - Contém os parametros de (tabela = nome da tabela) e (function = Função de retorno)
        
        //AGENDA
        db.transaction(function(tx) {
            
            
           tx.executeSql('select * from tb_'+objParams.tabela+ ' WHERE ' +objParams.tabela+'Id = '+sessionStorage.userId, [], 
           function (tx, result)
           {
               var len = result.rows.length;
              alert(len)
               if(len < 1)
               {
                   objParams.function(false,result);
               }
               else
               {
                   objParams.function(true);
               }

           },
           function()
           {
               alert('Devido a uma falha o aplicativo pode apresenta algumas indisponibilidades. Por favor feche e abra-o novamente.');

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


 
function handleDbError2(tx, error) {
    alert("Database Error2: " + error);
 }

//Db Success
function handleDbSuccess(tx, error) {
	
	
	//tx.executeSql('DROP TABLE IF EXISTS tb_participantes');
	//tx.executeSql('DROP TABLE IF EXISTS tb_agenda');
	//tx.executeSql('DROP TABLE IF EXISTS tb_agenda_dia');
	//tx.executeSql('DROP TABLE IF EXISTS tb_agenda_horario');
	//tx.executeSql('DROP TABLE IF EXISTS tb_agenda_tipo');
	//tx.executeSql('DROP TABLE IF EXISTS tb_agenda_palestrantes');
	//tx.executeSql('DROP TABLE IF EXISTS tb_palestrantes');
	
	
        //TB AGENDA
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_participantes( "+
		"participantesId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"participantesNome VARCHAR(200), " +
		"participantesEmail VARCHAR(250), " +
		"participantesCrm VARCHAR(40), " +
		"participantesData VARCHAR(20), " +
		"participantesStatus INT(11))";
		tx.executeSql(sql);
                
        //TB AGENDA
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_agenda( "+
		"agendaId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"agendaAgendaTipoId INT(11), " +
		"agendaAgendaDiaId INT(11), " +
		"agendaAgendaHorarioId INT(11), " +
		"agendaTitulo VARCHAR(200), " +
		"agendaDescricao TEXT, " +
		"agendaData VARCHAR(20), " +
		"agendaStatus INT(11))";
		tx.executeSql(sql);
                
        //TB AGENDA DIA
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_agenda_dia( "+
		"agenda_diaId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"agenda_diaNome VARCHAR(200), " +
		"agenda_diaData VARCHAR(20), " +
		"agenda_diaStatus INT(11))";
		tx.executeSql(sql);
                
        
        //TB AGENDA HORARIO
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_agenda_horario( "+
		"agenda_horarioId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"agenda_horarioHora VARCHAR(200), " +
		"agenda_horarioData VARCHAR(20), " +
		"agenda_horarioStatus INT(11))";
		tx.executeSql(sql);
         
        //TB AGENDA TIPO
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_agenda_tipo( "+
		"agenda_tipoId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"agenda_tipoNome VARCHAR(200), " +
		"agenda_tipoData VARCHAR(20), " +
		"agenda_tipoStatus INT(11))";
		tx.executeSql(sql);
                
        
        //TB AGENDA PALESTRANTES
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_agenda_palestrantes( "+
		"agenda_palestrantesId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"agenda_palestrantesAgendaId INT(11), " +
                "agenda_palestrantesPalestrantesId INT(11), " +
		"agenda_palestrantesData VARCHAR(20), " +
		"agenda_palestrantesStatus INT(11))";
		tx.executeSql(sql);
                
        
        //TB PALESTRANTES
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_palestrantes( "+
		"palestrantesId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"palestrantesNome VARCHAR(200), " +
                "palestrantesDescricao TEXT, " +
                "palestrantesFoto VARCHAR(50), " +
		"palestrantesData VARCHAR(20), " +
		"palestrantesStatus INT(11))";
		tx.executeSql(sql);
                
		
        //Verificando dados da tabela: Agenda
                var sqlAgenda = "select * from tb_agenda";
                tx.executeSql(sqlAgenda, [], getAgenda_success,handleDbError2);

        //Verificando dados da tabela: Agenda Dia
                var sqlAgendaDia = "select * from tb_agenda_dia";
                tx.executeSql(sqlAgendaDia, [], getAgendaDia_success,handleDbError2);

        //Verificando dados da tabela: Agenda Horário
                var sqlAgendaHorario = "select * from tb_agenda_horario";
                tx.executeSql(sqlAgendaHorario, [], getAgendaHorario_success,handleDbError2);

        //Verificando dados da tabela: Agenda tipo
                var sqlAgendaTipo = "select * from tb_agenda_tipo";
                tx.executeSql(sqlAgendaTipo, [], getAgendaTipo_success,handleDbError2);

         //Verificando dados da tabela: Agenda Palestrantes
                var sqlAgendaPalestrantes = "select * from tb_agenda_palestrantes";
                tx.executeSql(sqlAgendaPalestrantes, [], getAgendaPalestrantes_success,handleDbError2);

        //Verificando dados da tabela: Palestrantes
                var sqlPalestrantes = "select * from tb_palestrantes";
                tx.executeSql(sqlPalestrantes, [], getPalestrantes_success,handleDbError2);
                
                
        //Verificando dados da tabela: Palestrantes
		var sqlParticipantes= "select * from tb_participantes";
		tx.executeSql(sqlParticipantes, [], getParticipantes_success,handleDbError2);        
	
        
        
        
}


function handleGetParticipantesMysql(){       
      
       $('#ulDataUser').empty();
        $.getJSON(ExternalURL+'participantes/handleSelect/front/true',function(data){
            
            console.log(data)
               
        }).done(function(data)
        {
           
             if(data.mensagem === 'fail')
                {
                    alert('Nenhum participante disponível!');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                }
                else
                {
                     
                     $.each(data.mensagem, function(i, index)
                     {
                         $('#ulDataUser').append('<li data-id="'+index.participantesId+'" data-nome="'+index.participantesNome+'" data-email="'+index.partipantesEmail+'" id="'+index.participantesId+'"><a href="#" >'+index.participantesNome+'</a></li>');
                         
                         
                         $('#'+index.participantesId).click(function()
                         {
                            var id = $(this).attr('data-id');
                            var nome = $(this).attr('data-nome');
                            var email = $(this).attr('data-email');
                            
                            if(confirm('Tem certeza que deseja cadastrar este participante?'))
                            {
                                $.post(ExternalURL+'participantes/handleUpdateFrontEnd/id/'+$(this).attr('id')+'/status/1/front/true', function(data)
                                {
                                    if(data.mensagem === 'success')
                                    {
                                        //$.mobile.changePage( "home.html", { transition: "fade"});
                                        //window.location = "home.html";
                                        //
                                       db.transaction(handleInsertDataAgenda, handleDbAgendaError);

                                        function handleDbAgendaError(tx, result)
                                        {
                                                alert('Houve um Erro!\nInforme o desenvolvedor.');
                                        }

                                        function handleInsertDataAgenda(tx, result)
                                        {
                                            
                                            tx.executeSql("INSERT INTO tb_participantes (participantesId, participantesNome, participantesEmail) VALUES ("+id+", '"+nome+"','"+email+"')");
                                            
                                            window.location = "home.html";
                                        }
                                        
                                    }
                                    else
                                    {
                                        alert('Houve um erro ao ativar o usuário.\nTeste novamente ou informe o desenvolvedor.');
                                    } 
                                     
                                    
                                }, 'json');
                            };
                            
                         });
                     });
                     
                     $('#baseDadosUser').show('slow');
                     $( "#ulDataUser" ).listview( "refresh" );
                     
                }
        }).fail(function()
        {
            console.log('Fail');
        });
}


/////////// ----  Agenda ---- //////////////
function getAgenda_success(tx, results){       
       
        var len = results.rows.length;

         if(len ==0){
               
                $.getJSON(ExternalURL+'agenda/handleListar/front/true',function(data){

                        
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
}

/////////// ----  Agenda dia ---- //////////////
function getAgendaDia_success(tx, results){       
       
        var len = results.rows.length;
        
         if(len ==0){
               
                $.getJSON(ExternalURL+'agendadia/handleSelect/front/true',function(data){

                        
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
                                            dbDataBase.handleInsert({tabela:'tb_agenda_dia', txDb:tx, field:campos, value:values});
                                           
                                         
                                        });
                                        
                                }

                        }
                });

         }
         else
         {
             console.log('Agenda Dia: '+len);
         }
}

/////////// ----  Agenda horario ---- //////////////
function getAgendaHorario_success(tx, results){       
       
        var len = results.rows.length;


         if(len === 0){
               
                $.getJSON(ExternalURL+'agendahorario/handleSelect/front/true',function(data){

                        
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
                                            dbDataBase.handleInsert({tabela:'tb_agenda_horario', txDb:tx, field:campos, value:values});
                                           
                                         
                                        });
                                        
                                }

                        }
                });

         }
         else
         {
             console.log('Agenda Horario: '+len);
         }
}

/////////// ----  Agenda tipo ---- //////////////
function getAgendaTipo_success(tx, results){       
       
        var len = results.rows.length;


         if(len === 0){
               
                $.getJSON(ExternalURL+'agendatipo/handleSelect/front/true',function(data){

                        
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
                                            dbDataBase.handleInsert({tabela:'tb_agenda_tipo', txDb:tx, field:campos, value:values});
                                           
                                         
                                        });
                                        
                                }

                        }
                });

         }
         else
         {
             console.log('Agenda Tipo: '+len);
         }
}

/////////// ----  Agenda Palestrantes ---- //////////////
function getAgendaPalestrantes_success(tx, results){       
       
        var len = results.rows.length;


         if(len === 0){
                
                $.getJSON(ExternalURL+'agendapalestrantes/handleSelect/front/true',function(data){

                        
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
                                            dbDataBase.handleInsert({tabela:'tb_agenda_palestrantes', txDb:tx, field:campos, value:values});
                                           
                                         
                                        });
                                        
                                }

                        }
                });

         }
         else
         {
             console.log('Agenda Palestrantes: '+len);
         }
}
	
/////////// ----  Palestrantes ---- //////////////
function getPalestrantes_success(tx, results){
	
	 var len = results.rows.length;
	 if(len === 0){
               
                $.getJSON(ExternalURL+'palestrantes/handleSelect/front/true',function(data){

                        
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
                                            dbDataBase.handleInsert({tabela:'tb_palestrantes', txDb:tx, field:campos, value:values});
                                           
                                         
                                        });
                                        
                                }

                        }
                });

         }
         else
         {
             console.log('Palestrantes: '+len);
         }
}

//////



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





/////////// ----  Get USER ---- //////////////
var dadosUser = new Array();

function handleDadosUserError(tx, results){
    console.log('#Erro Ao selecionar os dados do usuario: js_database.js: linha: 225 ');
}

function handleDadosUserSuccess(tx, results){
	//Verificando dados da tabela: PalestrasDados
		var sql = "select * from tb_participantes";
		tx.executeSql(sql, [], getDataUsuarios);
		
		function getDataUsuarios(tx, results)
		{
			var len = results.rows.length;
			
			for (var i=0; i<len; i++) {
				
				var employee = results.rows.item(i);
				//console.log('Grupo: '+employee.usuariosGrupo);
				dadosUser.push(
                                            employee.participantesId,
                                            employee.participantesNome,
                                            employee.participantesEmail,
                                            employee.participantesCrm,
                                            employee.participantesStatus); 
				
				
			}
			
                       
			handleGiveDataUser(dadosUser);
		}

}

function handleGiveDataUser(array)
{
    
    for(var i =0; i<=dadosUser.lenght; i++)
    {
        $('#ulDataUser').append('<li><a href="#">'+dadosUser[i]+'</a></li>');
    };
    
    $('#baseDadosUser').show('slow');
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