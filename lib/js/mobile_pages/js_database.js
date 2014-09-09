// JavaScript Document

//Var's
var ip = 'localhost:81';//;'192.168.0.198:8888'
var db;
var campos,values;
var arrDadosCampos = new Array();
var arrDadosValues = new Array();

//Create Db
function OpenDataBase(){
    db = openDatabase('pfizer_quinto_encontro', '1.0', '@ralves_sql', 50 * 1024 * 1024);
}


function handleCreateDb(){
    db.transaction(handleDbSuccess, handleDbError);
}


//Db Error
function handleDbError(tx, error) {
    console.log("Database Error: " + error);
 }
 
function handleDbError2(tx, error) {
    console.log("Database Error2: " + error);
 }

//Db Success
function handleDbSuccess(tx, error) {
	
	
	tx.executeSql('DROP TABLE IF EXISTS tb_participantes');
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
        
        
        handleGetParticipantesMysql();
        
}

/////////// ----  Participantes ---- //////////////
function handleGetParticipantesMysql(){       
       
       $('#ulDataUser').empty();
        $.getJSON(ExternalURL+'participantes/handleSelect/front/true',function(data){

                if(data.mensagem == 'fail')
                {
                    alert('Nenhum participante disponível!');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                }
                else
                {
                     
                     $.each(data.mensagem, function(i, index)
                     {
                         $('#ulDataUser').append('<li id="'+index.participantesId+'"><a href="#" >'+index.participantesNome+'</a></li>');
                         
                         
                         $('#'+index.participantesId).click(function()
                         {
                            
                            if(confirm('Tem certeza que deseja cadastrar este participante?'))
                            {
                                $.post(ExternalURL+'participantes/handleUpdateFrontEnd/id/'+$(this).attr('id')+'/status/1/front/true', function(data)
                                {
                                    if(data.mensagem === 'success')
                                    {
                                        $.mobile.changePage( "home.html", { transition: "fade"});
                                        //window.location = "app_home.html";
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