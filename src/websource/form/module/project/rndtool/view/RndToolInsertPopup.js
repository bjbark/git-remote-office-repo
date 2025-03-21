Ext.define('module.project.rndtools.view.RndToolInsertPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-rndtool-insert-popup',

    title    : 'Module별 View 추가' ,
    closable : true,
    autoShow : true,
    width	: 210 ,
    height	: 230,
    layout	: {
        type: 'border'
    },

	defaultFocus : 'initfocused',

    initComponent: function(config){
        var me = this;
        me.items = [ me.createForm()];
        me.callParent(arguments);
//        me.down('form').loadRecord( me.popup.values );
    },

    /**
     * 화면폼
     */
    createForm: function(){
    	var me = this,
    		form = {
	    		xtype      : 'form-panel',
	    		region     : 'center',
	    		border     : false,
	    		dockedItems: [
	    		 	{	xtype : 'toolbar',
	    		 		dock  : 'bottom',
	    		 		items : [
	    		 		 	'->' ,
	    		 		 	{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
	    		 		 	{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
	    		 		]
	    		 	}
	    		],
	    		items : [me.editorForm() ]
	    	};
	    return form;
    },

    editorForm : function () {
		var me	= this,
			form = {
			xtype  : 'form-panel',
			border :  false,
			margin : '15 7 0 -10',
			layout : { type: 'vbox', align: 'stretch' } ,
			items  : [
			 	{
			 		xtype	: 'panel',
			 		layout	: 'hbox',
			 		border	: 0,
			 		items	: [
			 		 	{	xtype       : 'form-panel',
			 		 		border      : 0,
			 		 		width       : 370,
			 		 		fieldDefaults: { width : 200, labelWidth : 80, labelSeparator : '' },
			 		 		items		: [
						 		{
						 			fieldLabel  : 'DB',
						 			xtype       : 'lookupfield',
						 			name        : 'prjt_dvsn',
						 			editable    : false,
						 			lookupValue : [['','전체'],['MAIN','MAIN'],['CONTROL','관제'], ['SKY','SKY ERP'], ['CHAM1ST','참플러스']],
						 			value       : 'MAIN'
						 		},{	fieldLabel	: 'Module ID',
			 		 		 		name		: 'modl_id',
			 		 		 		xtype		: 'textfield',
			 		 		 		allowBlank	: false
			 		 		 	},{ fieldLabel	: 'Module 명',
			 		 		 		name		: 'modl_nm',
			 		 		 		xtype		: 'textfield',
			 		 		 		allowBlank	: true
			 		 		 	},{ fieldLabel	: 'View ID',
			 		 		 		name		: 'view_id',
			 		 		 		xtype		: 'textfield',
			 		 		 		allowBlank	: false
			 		 		 	},{ fieldLabel	: 'View 명',
			 		 		 		name		: 'view_nm',
			 		 		 		xtype		: 'textfield',
			 		 		 		allowBlank	: true
			 	 		 		},{
			 	 		 			fieldLabel	: '기준 Table' ,
		 	 				 		xtype		: 'popupfield',
		 							editable	: true,
		 							enableKeyEvents : true,
			 	 		 			name		: 'tabl_idcd'   ,
							 		pair        : 'tabl_name',
		 	 				 		allowBlank	: false,
		 	 				 		popup		: {
		 	 				 			select	: 'SINGLE',
		 	 				 			widget	: 'lookup-table-popup',
		 	 				 			params	: { },
		 	 				 			result	:  function(records, nameField, pairField ){
											var panel = nameField.up('form') ;
		 	 				 				nameField.setValue(records[0].get('tabl_name'));
							 				pairField.setValue(records[0].get('tabl_idcd'));
		 	 				 			}
		 	 				 		}
			 	 		 		},{ name : 'tabl_name' , xtype : 'textfield' , hidden : true
			 		 		 	}
							]
						}
					]
		        },{
	 		 		name		: 'inv_no',		xtype		: 'textfield', hidden : true
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
     		baseform   = me.down('form'),
     		record = baseform.getRecord(),
     		values = baseform.getValues()
     	;
     	if (!baseform.getForm().isValid() ){ // 뭔가 이슈가 있는경우
     		Ext.Msg.alert('알림',  '형식에 맞게 입력해주세요' );
     		return;
     	}

     	var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url     :  _global.location.http() + '/project/rndtool/set/make.do',

			params  : {
				token : _global.token_id,
				param : JSON.stringify({
				 	tabl_name	: values.tabl_name,
				 	modl_id	: values.modl_id,
				 	modl_nm	: values.modl_nm,
				 	view_id	: values.view_id,
				 	view_nm	: values.view_nm,
				 	prjt_dvsn	: values.prjt_dvsn,
				})
			},
			async   : false,
			method  : 'POST',
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});


     }
});
