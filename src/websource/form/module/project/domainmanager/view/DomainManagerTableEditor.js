Ext.define('module.project.domainmanager.view.DomainManagerTableEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-domainmanager-table-editor',
	height : 300,
	layout : {
		type: 'border'
	},
	title        : 'Table Editer'  ,
	collapsible  : true       ,
	collapsed    : true       ,
	defaultFocus : 'code_nm'  ,


	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
//		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
	   	 		xtype : 'toolbar',
	   	 		dock  : 'bottom',
	   	 		items : [
	   	 	 		'->', '-',
	   	 	 		{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
	   	 	 		{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style'}, '-'
	   	 	 	]
	   		}
		;
		return item;
	},

	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this,
			item = {
				xtype	: 'form-panel',
				dock	: 'left',
				flex	: 1,
//				width	: 330,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 200, labelWidth : 60, labelSeparator : '' },
				items : [
		 	 		{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel  : 'ID Key' ,
		 	 		 			name        : 'tabl_idcd'   ,
		 	 		 			xtype       : 'textfield'   ,
		 	 		 			allowBlank  : false,
		 	 		 			fieldCls    : 'requiredindex',
		 	 		 			emptyText   : Const.invalid.emptyValue,
		 	 		 			hidden		: true
		 	 		 		},{
		 	 		 			fieldLabel  : 'Table 명' ,
		 	 		 			name        : 'tabl_name'   ,
		 	 		 			xtype       : 'textfield'   ,
		 	 		 			allowBlank  : false,
		 	 		 			fieldCls    : 'requiredindex',
		 	 		 			emptyText   : Const.invalid.emptyValue,
		 	 		 			readOnly	: true
		 	 		 		},{
		 	 		 			fieldLabel  : 'Field SEQ.' ,
		 	 		 			name        : 'fld_seq'    ,
		 	 		 			xtype       : 'textfield'  ,
		 	 		 			allowBlank  : false,
		 	 		 			fieldCls    : 'requiredindex',
		 	 		 			emptyText   : Const.invalid.emptyValue,
		 	 		 		}
		 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
			 	 			items : [
			 	 		 		{
		 	 				 		fieldLabel	: 'Field ID',
		 	 				 		xtype		: 'popupfield',
		 							editable	: true,
		 							enableKeyEvents : true,
		 	 				 		name		: 'fied_idcd',
		 	 				 		pair		: 'fied_name',
		 	 				 		allowBlank	: false,
		 	 				 		popup		: {
		 	 				 			select : 'SINGLE',
		 	 				 			widget : 'lookup-domain-popup',
		 	 				 			params : { },
		 	 				 			result :  function(records, nameField, pairField ){
											var panel = nameField.up('form') ;
		 	 				 				nameField.setValue(records[0].get('field_id'));
		 	 				 				pairField.setValue(records[0].get('fied_name'));
											panel.down('[name=data_type]').setValue( records[0].get('data_type') );
											panel.down('[name=data_len]').setValue( records[0].get('data_len') );
											panel.down('[name=old_id]').setValue( records[0].get('old_id') );
											panel.down('[name=old_nm]').setValue( records[0].get('old_nm') );
											panel.down('[name=w_nm_1]').setValue( records[0].get('w_nm_1') );
											panel.down('[name=w_id_1]').setValue( records[0].get('w_id_1') );
											panel.down('[name=w_nm_2]').setValue( records[0].get('w_nm_2') );
											panel.down('[name=w_id_2]').setValue( records[0].get('w_id_2') );
											panel.down('[name=w_nm_3]').setValue( records[0].get('w_nm_3') );
											panel.down('[name=w_id_3]').setValue( records[0].get('w_id_3') );
											panel.down('[name=w_nm_4]').setValue( records[0].get('w_nm_4') );
											panel.down('[name=w_id_4]').setValue( records[0].get('w_id_4') );
											panel.down('[name=w_nm_5]').setValue( records[0].get('w_nm_5') );
											panel.down('[name=w_id_5]').setValue( records[0].get('w_id_5') );
											panel.down('[name=w_nm_6]').setValue( records[0].get('w_nm_6') );
											panel.down('[name=w_id_6]').setValue( records[0].get('w_id_6') );
											panel.down('[name=ref_table]').setValue( records[0].get('ref_table') );
											panel.down('[name=inter_val]').setValue( records[0].get('inter_val') );
		 	 				 			}
		 	 				 		}
		 	 				 	},{
			 	 		 			fieldLabel		: 'Field 명' ,
			 	 		 			name			: 'fied_name'   ,
			 	 		 			xtype			: 'textfield'   ,
			 	 		 			allowBlank		: false,
			 	 		 			width			: 300
			 	 		 		}
			 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel		: 'Type' ,
		 	 		 			xtype           : 'lookupfield',
		 	 		 			name        	: 'data_type'  ,
		 	 		 			lookupValue     : [['varchar','varchar'],['numeric','numeric'],['char','char'],['integer','integer']],
		 	 		 			readOnly		: true
		 	 		 		},{
		 	 		 			fieldLabel		: 'length' ,
		 	 		 			name			: 'data_len'   ,
		 	 		 			xtype			: 'textfield'   ,
		 	 		 			allowBlank		: true,
		 	 		 			width          	: 150           ,
		 	 		 			readOnly		: true
		 	 		 		},{
		 	 		 			fieldLabel		: 'Null' ,
		 	 		 			xtype           : 'lookupfield',
		 	 		 			name        	: 'null_dvcd'  ,
		 	 		 			lookupValue     : [['','Null Ok'],['N','Not Null']],
		 	 		 			width          	: 150           ,
		 	 		 		},{
		 	 		 			fieldLabel		: 'is Key' ,
		 	 		 			xtype           : 'lookupfield',
		 	 		 			name        	: 'key_dvcd'  ,
		 	 		 			lookupValue     : [['','No'],['K','Yes']],
		 	 		 			width          	: 150           ,
		 	 		 		},{
		 	 		 			fieldLabel		: 'Default' ,
		 	 		 			name			: 'dflt_valu'   ,
		 	 		 			xtype			: 'textfield'   ,
		 	 		 			allowBlank		: true,
		 	 		 			width          	: 150           ,
		 	 		 		}
		 	 		 	]
			 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
			 			items : [
		 	 		 		{
		 	 		 			fieldLabel		: 'old ID' ,
		 	 		 			name			: 'old_id'   ,
		 	 		 			xtype			: 'textfield'   ,
		 	 		 			allowBlank		: true,
		 	 		 			fieldCls		: '',
		 	 		 			readOnly		: true,
		 	 		 		},{
		 	 		 			fieldLabel		: 'old Name' ,
		 	 		 			name			: 'old_nm'   ,
		 	 		 			xtype			: 'textfield'   ,
		 	 		 			allowBlank		: true,
		 	 		 			fieldCls		: '',
		 	 		 			width			: 300,
		 	 		 			readOnly		: true,
		 	 		 		}
			 			]

			 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
	 	 				 	{
	 	 				 		xtype		: 'textfield',
	 	 				 		name		: 'w_nm_1'  ,
	 	 				 		width		: 136,
	 	 				 		hidden		: false,
	 	 				 		readOnly	: true,
	 	 				 		margin		: '0 0 0 65'
	 	 				 	},{
	 	 				 		xtype		: 'textfield',
	 	 				 		name		: 'w_nm_2'  ,
	 	 				 		width		: 140,
	 	 				 		hidden		: false,
	 	 				 		readOnly	: true
	 	 				 	},{
	 	 				 		xtype  		: 'textfield',
	 	 				 		name   		: 'w_nm_3'  ,
	 	 				 		width		: 140,
	 	 				 		hidden		: false,
	 	 				 		readOnly	: true
	 	 				 	},{
	 	 				 		xtype  		: 'textfield',
	 	 				 		name   		: 'w_nm_4'  ,
	 	 				 		width		: 140,
	 	 				 		hidden		: false,
	 	 				 		readOnly	: true
	 	 				 	},{
	 	 				 		xtype		: 'textfield',
	 	 				 		name		: 'w_nm_5'  ,
	 	 				 		width		: 140,
	 	 				 		hidden		: false,
	 	 				 		readOnly	: true
	 	 				 	},{
	 	 				 		xtype  		: 'textfield',
	 	 				 		name   		: 'w_nm_6'  ,
	 	 				 		width		: 140,
	 	 				 		hidden		: false,
	 	 				 		readOnly	: true
	 	 				 	}
		 	 			]
			 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 					{
		 						xtype		: 'textfield',
		 						name		: 'w_id_1'  ,
		 						width		: 136,
		 						hidden		: false,
		 						margin		: '0 0 0 65',
		 						readOnly	: true
		 					},{
		 						xtype		: 'textfield',
		 						name		: 'w_id_2'  ,
		 						width		: 140,
		 						hidden		: false,
		 						readOnly	: true
		 					},{
		 						xtype  		: 'textfield',
		 						name   		: 'w_id_3'  ,
		 						width		: 140,
		 						hidden		: false,
		 						readOnly	: true
		 					},{
		 						xtype  		: 'textfield',
		 						name   		: 'w_id_4'  ,
		 						width		: 140,
		 						hidden		: false,
		 						readOnly	: true
		 					},{
		 						xtype  		: 'textfield',
		 						name   		: 'w_id_5'  ,
		 						width		: 140,
		 						hidden		: false,
		 						readOnly	: true
		 					},{
		 						xtype  		: 'textfield',
		 						name   		: 'w_id_6'  ,
		 						width		: 140,
		 						hidden		: false,
		 						readOnly	: true
		 					}
		 	 			]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel	: 'Code구분' ,
		 	 		 			name		: 'ref_table'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
		 	 		 			width		: 300           ,
		 	 		 			emptyText	: 'h09, 6100.. 등 공통코드 종류',
		 	 		 			readOnly	: true
		 	 		 		},{
		 	 		 			fieldLabel	: 'Code Value' ,
		 	 		 			name		: 'inter_val'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
		 	 		 			width		: 600,
		 	 		 			emptyText	: '코드 항목별 값... 개발자 참조용',
		 	 		 			readOnly	: true
		 	 		 		}
		 	 		 	]
			 		}
				]
			}
		;
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			item = {
				xtype : 'tabpanel',
				region : 'center',
				margin : 0 ,
				plain: true ,
				items: [ me.createTab1() ]
			}
		;
		return item;
	},
	/**
	 *
	 */
	createTab1 : function() {
		var me = this,
			item = {
				title: '코드항목' ,
				xtype : 'form-panel' ,
				layout : 'hbox',
				border : 0 ,
				bodyStyle: { padding: '5px' },
				items :
				[
	 		 		{
	 		 			fieldLabel : '' ,
	 		 			name       : 'itm_val' ,
	 		 			xtype      : 'textarea',
	 		 			emptyText  : 'key : value  형식으로 작성 하시기 바랍니다.',
	 		 			height     : 167 ,
	 		 			flex       : 1
	 		 		},{
	 		 			fieldLabel : '' ,
	 		 			name       : 'lookup_val' ,
	 		 			xtype      : 'textarea',
	 		 			readOnly   : true,
	 		 			//width      :100
	 		 			hidden     : true
	 		 		}
	 		 	]
	 		}
		;
		return item;
	}
});

