Ext.define('Axt.popup.view.PasswdPopup', { extend: 'Axt.popup.Search',
    alias: 'widget.popup-passwd',
    
    title: '압호 변경' ,
    closable: true,
    autoShow: true,
    width: 400 , 
    height: 220,
    layout: {
        type: 'border'
    },
    
	defaultFocus : 'initfocused',
	
    initComponent: function(config){
        var me = this;
        me.height = me.popup.method == 'mypasswd' ? 220 : 175;
        me.items = [ me.createForm()];
        me.callParent(arguments);
    },
    /**
     * 화면폼
     */
    
    createForm: function(){
    	var me = this, form = 
    	{
    		xtype      : 'form-panel',	
    		region     : 'center',
    		border     :  false,
    		dockedItems: 
    		[
    		 	{
    		 		xtype : 'toolbar',
    		 		dock  : 'bottom',
    		 		items : 
    		 		[
    		 		 	'->' , 
    		 		 	{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction},'-',
    		 		 	{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close } 
       		 		]
    		 	}
    	 	],    		
    	 	items : [ me.editorForm() ]
    	};
    	return form;
    },
    
    editorForm : function () {
    	var me = this, form =
    	{
    		xtype  : 'form-panel',
    		border :  false,
    		padding : 10 ,
    		layout : { type: 'vbox', align: 'stretch' } , 
    		items  :
    		[
    		 	{ 
    		 		xtype       : 'label'     , 
    		 		text        : '변경전 암호를 입력 하여 주시기 바랍니다.' , 
    		 		margin      : '0 0 3 0',
    		 		hidden      : me.popup.method == 'mypasswd' ? false : true  
    		 	},{  
    		 		name        : 'old_passwd'  ,
    		 		xtype       : 'textfield',	
    		 		inputType   : 'password', 
       		 		hidden      : me.popup.method == 'mypasswd' ? false : true  
    		 	},{   
    		 		xtype       : 'label'     , 
    		 		text        : '변경할 암호를 입력 하여 주시기 바랍니다.' , 
    		 	    margin      : '5 0 3 0'
    		 	},{ 
    		 		name        : 'new_passwd',
    		 		xtype       : 'textfield' ,	
    		 		inputType   : 'password'  , 
    		 		minLength   : 4  
    		 	},{ 
    		 		xtype       : 'label'     , 
    		 		text        : '변경할 암호를 재입력 하여 주시기 바랍니다.' , 
    		 		margin      : '5 0 3 0'
    		 	},{  
    		 		xtype       : 'textfield' , 
    		 		name        : 'chk_passwd' , 
    		 		inputType   : 'password'  ,
    		 		minLength   : 4  
    			}
    		]
    	};
    	return form;
    },
    
    
    
    
    
    /**
     * 확인 버튼 이벤트
     */
     finishAction: function(){
    	var me     = this,
    		record = me.down('form').getValues(),
    		old_passwd = Ext.String.trim(record.old_passwd).toLowerCase() ,
    		new_passwd = Ext.String.trim(record.new_passwd).toLowerCase() ,
    		chk_passwd = Ext.String.trim(record.chk_passwd).toLowerCase()
    	;
//    	console.debug('old_passwd =', old_passwd );
//    	console.debug('new_passwd =', new_passwd );
//    	console.debug('chk_passwd =', chk_passwd );
    	
    	if (new_passwd != chk_passwd){
        	resource.showError( '변경할 암호가 일치하지 않습니다.');
        	return ;
    	}
    	
    	if (me.popup.method == 'mypasswd') {
        	if (old_passwd == new_passwd ){
            	resource.showError( '변경 전 암호와 변경 후 암호가 동일합니다.');
            	return ;
        	}
    	}     	
    	
    	Ext.Ajax.request({
    		url     : me.apiurl.master , // _global.api_host_info + '/' + _global.api_path + '/user/userinfo/set/changepasswd.do',
    		params  : { 
    			token : _global.token_id, 
    			param : JSON.stringify( Ext.merge({	old_pass  : old_passwd,	new_pass  : new_passwd }, me.popup.params )) 
    		},
    		async  : false,
    		method  : 'POST',
    		success : function(response, request) {
    			var result = Ext.decode(response.responseText);
    			if ( !result.success ){
    				Ext.Msg.alert('알림',  result.message );
    				return;
    			} else {
    				Ext.Msg.alert('알림',  '암호변경이 완료되었습니다.' );
    			}
    		},
    		failure : function(result, request) {
    		}
    	} ); // , {synchro : _global.objects.synchro} 	
        me.setResponse(record);
     },
     
 
     
});
