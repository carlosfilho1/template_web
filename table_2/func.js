var Agenda = (function() {

    var contacts = [], contactTemp = [], countErrors = 0;
    
    var $ = function( el ) {
      return document.querySelector( el );
    };
  
    var textNode = function( value ) {
      return document.createTextNode( value );
    };
  
    var create = function( el ) {
      return document.createElement( el );
    };
  
    var attr = function( el, name , value ) {
      el.setAttribute( name, value );
    };
  
    var addEven = function( elem, e, handler ) {
      if( elem.addEventListener ) elem.addEventListener( e, handler, false );
      else elem.attachEvent( 'on' + e , handler );
    };
  
    var clearInput = function( el ) {
      el.value = '';
    };
  
    var removeMe = function( el ) {
      el.remove();
    };
  
    var removeContacts = function( arr, idx ) {
      arr.splice( idx, 1 );
    };  
  
    var validateNull = function( el, len ,con ) {
      var cond = ( con === '>' ) ? ( el.value.length >= len ) : ( el.value.length === len ) ;
      el.focus();
      return  (cond) ? true : false;
    };
  
    var msg = function( idx , typ ){
  
      var err     = ['Prencha Todos os Campos Corretamente', 'Preencha os Campos Vazios','Usuário Já Cadastrado'];
      var success = ['Cadastrado Com Sucesso','Removido com Sucesso', 'Atualizado com Sucesso'];
      
      $( '#msg' ).className          = typ;
      $( '#msg' ).style.marginBottom = '30px';
      $( '#msg' ).style.display      = 'block';
  
      if( typ === 'errors') $('#msg').innerHTML = err[idx] +'!';
      else $('#msg').innerHTML = success[idx] +'!';
      
      setTimeout('document.getElementById("msg").style.display = "none"', 2000);
  
    };
  
    var initMask = function ( el, funcao ) {
      setTimeout( funcao.name , 001 );
      el.value = funcao( el.value );
    };
  
    var validateName = function( v ) {
      v = v.toUpperCase(); 
      v = v.replace( /^[0-9]/ig, "" );
      v = v.replace( /[\s]/g   , "" );  
      v = v.replace( /[^a-z]/ig, "" );                
      return v;
    };
  
    var maskPhone = function( v ){
      v = v.replace( /[^0-9]/g             , ""        );               
      v = v.replace( /^([0-9]{2})(\d)/g    , "($1)$2"  ); 
      v = v.replace( /(\d)(\d)([0-9]{4})$/ , "$1$2-$3" );  
      return v;
    };
  
    var replaceName = function( value ) { 
      if( !value.indexOf( 'edit_' ) ) return value.replace( /edit_/g, "" );
      if( !value.indexOf( 'del_'  ) ) return value.replace( /del_/g , "" );
    };
  
    var insertValue = function(){ 
      contactTemp.push( $( '#nome' ).value );
      contactTemp.push( $( '#fone' ).value );
      contacts.push( contactTemp );
    };
  
    var newContact = function() {
      insertValue();
      listContact( contactTemp );
      contactTemp = [];
      clearInput( $('#nome') );
      clearInput( $('#fone') );
      msg( 0, 'sucess' );
    };
  
    var listContact  = function( v ) {
  
      var nome      = create( 'li' ),
          fone      = create( 'li' ),
          actionDel = create( 'li' ),
          fragment  = document.createDocumentFragment(),
          del       = create( 'input' ),
          container = create( 'ul' ),
          edit      = create( 'input' )
          buttons   = create( 'li' );
   
      attr( del , 'name'  , 'deletar'    );   
      attr( del , 'type'  , 'button'     );
      attr( del , 'id'    , 'del_' +v[0] ); 
      attr( del , 'class' , 'del'        );
  
      attr( edit , 'name'  , 'editar'       );    
      attr( edit , 'type'  , 'button'       );
      attr( edit , 'id'    , 'edit_' + v[0] ); 
      attr( edit , 'class' , 'edit'         );
  
      attr( actionDel , 'class' , 'btnAction' );
      attr( nome      , 'class' , 'dados'     );
      attr( fone      , 'class' , 'dados'     );
  
      attr( container, 'id'    ,  v[0]        );
      attr( container, 'class' ,  'allData'   );
  
      nome.appendChild( textNode( v[0] ) );
      fone.appendChild( textNode( v[1] ) );
  
      actionDel.appendChild( del );
      actionDel.appendChild( edit );
  
      fragment.appendChild( nome );
      fragment.appendChild( fone );
      fragment.appendChild( actionDel );
  
      container.appendChild( fragment );
  
      $( '#list' ).appendChild( container ); 
  
      addEven( $( '#del_' + v[0] ), 'click' ,function() {
        execute( this.id , 'del' );
        removeMe(this.parentNode.parentNode);
        msg( 1, 'sucess' );
      });
      
      addEven( $( '#edit_'+ v[0] ), 'click' ,function() {
        execute( this.id, 'edit' );
      });
  
    };
  
    var editContato = function( arr ) {
       var editar    = create( 'input' ), 
           nameTemp  = arr[0],
           cadastrar = create( 'input' );
  
      attr( editar, 'type'  , 'button'    );
      attr( editar, 'class' , 'cadastrar' );
      attr( editar, 'id'    , 'salvar'    );
      attr( editar, 'value' , 'Salvar'    );
  
      attr( cadastrar, 'value' , 'Cadastrar' );
      attr( cadastrar, 'type'  , 'button'    );
      attr( cadastrar, 'class' , 'cadastrar' );
      attr( cadastrar, 'id'    , 'cadastrar' );
       
      $( '#nome'  ).value = arr[0];
      $( '#fone'  ).value = arr[1];
  
      $( '#cadastrar' ).remove();
      $( '#newContact' ).appendChild( editar );
      
      addEven( $( '#salvar' ), 'click', function() {
        
        if( !!validateNull( $('#nome'), 3, '>' )  &&  !!validateNull( $('#fone'), 13, '===' ) ) {
  
          $('#' + nameTemp).childNodes[0].innerHTML = $( '#nome'  ).value;
          $('#' + nameTemp).childNodes[1].innerHTML = $( '#fone'  ).value;
  
          var novo = $( '#nome'  ).value ;
          $( '#' +nameTemp ).id     = novo;
          $( '#edit_'+nameTemp ).id = 'edit_'+novo;
          $( '#del_' +nameTemp ).id = 'del_'+novo;
  
          removeMe(this);
  
          $( '#newContact' ).appendChild( cadastrar );
  
          arr[0] = $( '#nome'  ).value;  
          arr[1] = $( '#fone'  ).value;
  
          clearInput( $( '#fone'  ));
          clearInput( $( '#nome'  ));
          
          addEven( $( '#cadastrar' ), 'click', function() {  
            ( !!validateNull( $( '#nome' ), 3, '>' )  &&  !!validateNull( $( '#fone' ), 14, '===' ) ) ? newContact() : msg( 1,'errors' );
          });
  
          msg( 2, 'sucess' );
  
          nameTemp = '';
        }
  
      });  
  
    };
  
    var execute = function( nome , action ) {
      nome = replaceName( nome );
      for( var idx = 0 ; idx < contacts.length; idx++ ) {
        if( contacts[idx][0] === nome ) {
          if ( action === 'del' ) removeContacts( contacts, idx );
          if ( action === 'edit') editContato( contacts[idx] );
        } 
      }
    };
  
    var init = function() {  
  
      $('#msg').style.display = 'none';
  
      addEven( $('#nome'), 'keyup', function() {
        initMask( this , validateName );
      });
  
      addEven( $('#fone'), 'keyup', function() {
       initMask( this , maskPhone );
      });
  
      addEven( $( '#cadastrar' ), 'click', function() {  
        ( !!validateNull( $('#nome'), 3, '>' )  &&  !!validateNull( $('#fone'), 13, '===' ) ) ? newContact() : (!$('#nome').value && !$('#fone').value) ? msg( 1,'errors' ) : msg(0 ,'errors' ) ;
      });
  
    };  
  
    return {
      init:init()
    }
  
  }());