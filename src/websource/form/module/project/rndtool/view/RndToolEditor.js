Ext.define('module.project.rndtool.view.RndToolEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-rndtool-editor',
	height : 200,
	layout : {
		type: 'border'
	},
	title        : '기초 정보'  ,
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
		 	 		 			fieldLabel     : 'Module ID' ,
		 	 		 			name           : 'modl_id'   ,
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		},{
		 	 		 			fieldLabel     : 'Module 명' ,
		 	 		 			name           : 'modl_nm'   ,
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		},{
		 	 		 			fieldLabel     : 'View ID' ,
		 	 		 			name           : 'view_id'   ,
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		},{
		 	 		 			fieldLabel     : 'View 명' ,
		 	 		 			name           : 'view_nm'   ,
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		}
		 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
			 	 			items : [
			 	 		 		{
			 	 		 			fieldLabel     : '순서' ,
			 	 		 			name           : 'ord'   ,
			 	 		 			xtype          : 'textfield'   ,
			 	 		 			allowBlank     : false,
			 	 		 			fieldCls       : 'requiredindex',
			 	 		 			emptyText      : Const.invalid.emptyValue,
			 	 		 		},{
			 	 		 			fieldLabel	: 'Data Index' ,
		 	 				 		xtype		: 'popupfield',
		 							editable	: true,
		 							enableKeyEvents : true,
			 	 		 			name		: 'data_index'   ,
		 	 				 		pair		: 'view_text',
		 	 				 		allowBlank	: false,
		 	 				 		popup		: {
		 	 				 			select	: 'SINGLE',
		 	 				 			widget	: 'lookup-gridfield-popup',
		 	 				 			params	: { },
		 	 				 			result	:  function(records, nameField, pairField ){
											var panel = nameField.up('form') ;
		 	 				 				nameField.setValue(records[0].get('data_index'));
		 	 				 				pairField.setValue(records[0].get('view_text'));
//                		 	 				panel.down('[name=ord]'       ).setValue( records[0].get('ord')       );
		 	 				                panel.down('[name=data_index]').setValue( records[0].get('data_index'));
		 	 				                panel.down('[name=view_text]' ).setValue( records[0].get('view_text') );
		 	 				                panel.down('[name=tabl_name]'    ).setValue( records[0].get('tabl_name')    );
		 	 				                panel.down('[name=xtype]'     ).setValue( records[0].get('xtype')     );
		 	 				                panel.down('[name=lnth]'      ).setValue( records[0].get('lnth')      );
		 	 				                panel.down('[name=align]'     ).setValue( records[0].get('align')     );
		 	 				                panel.down('[name=sum_type]'  ).setValue( records[0].get('sum_type')  );
		 	 				                panel.down('[name=format_str]').setValue( records[0].get('format_str'));
		 	 				                panel.down('[name=lookup_str]').setValue( records[0].get('lookup_str'));
		 	 				                panel.down('[name=remarks]'   ).setValue( records[0].get('remarks')   );
		 	 				 			}
		 	 				 		}
			 	 		 		},{
			 	 		 			fieldLabel     : 'Text' ,
			 	 		 			name           : 'view_text'   ,
			 	 		 			xtype          : 'textfield'   ,
			 	 		 			allowBlank     : false,
			 	 		 			fieldCls       : 'requiredindex',
			 	 		 			emptyText      : Const.invalid.emptyValue,
			 	 		 		},{
			 	 		 			fieldLabel     : 'Table' ,
			 	 		 			name           : 'tabl_name'   ,
			 	 		 			xtype          : 'textfield'   ,
			 	 		 			allowBlank     : false,
			 	 		 			fieldCls       : 'requiredindex',
			 	 		 			emptyText      : Const.invalid.emptyValue,
			 	 		 		}
			 	 		 	]
		 	 			},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
			 	 			items : [
			 	 		 		{
			 	 		 			fieldLabel		: 'xType' ,
			 	 		 			xtype           : 'lookupfield',
			 	 		 			name        	: 'xtype'  ,
			 	 		 			lookupValue     : [['string','String'],['numericcolumn','Numeric'],['lookupcolumn','LookUp']],
					 			    clearable		: true,
			 	 		 		},{
			 	 		 			fieldLabel		: 'Align' ,
			 	 		 			xtype           : 'lookupfield',
			 	 		 			name        	: 'align'  ,
			 	 		 			lookupValue     : [['left','Left'],['right','Right'],['center','Center']],
					 			    clearable		: true,
			 	 		 		},{
			 	 		 			fieldLabel		: 'Summary' ,
			 	 		 			xtype           : 'lookupfield',
			 	 		 			name        	: 'sum_type'  ,
			 	 		 			lookupValue     : [['count','Count'],['sum','Sum']],
					 			    clearable		: true,
			 	 		 		},{
			 	 		 			fieldLabel		: 'Hidden' ,
			 	 		 			xtype           : 'lookupfield',
			 	 		 			name        	: 'hidden'  ,
			 	 		 			lookupValue     : [['true','True'],['false','False']],
					 			    clearable		: true,
			 	 		 		}
//
//			 	 			         {
//		 	 				 		fieldLabel	: 'Field ID',
//		 	 				 		xtype		: 'popupfield', editable : true, enableKeyEvents : true,
//		 	 				 		name		: 'fied_idcd',
//		 	 				 		pair		: 'fied_name',
//		 	 				 		allowBlank	: false,
//		 	 				 		popup		: {
//		 	 				 			select : 'SINGLE',
//		 	 				 			widget : 'lookup-domain-popup',
//		 	 				 			params : { },
//		 	 				 			result :  function(records, nameField, pairField ){
//											var panel = nameField.up('form') ;
//		 	 				 				nameField.setValue(records[0].get('fied_idcd'));
//		 	 				 				pairField.setValue(records[0].get('fied_name'));
//											panel.down('[name=data_type]').setValue( records[0].get('data_type') );
//											panel.down('[name=lnth]').setValue( records[0].get('lnth') );
//											panel.down('[name=old_id]').setValue( records[0].get('old_id') );
//											panel.down('[name=old_nm]').setValue( records[0].get('old_nm') );
//											panel.down('[name=word_1]').setValue( records[0].get('word_1') );
//											panel.down('[name=id_1]').setValue( records[0].get('id_1') );
//											panel.down('[name=word_2]').setValue( records[0].get('word_2') );
//											panel.down('[name=id_2]').setValue( records[0].get('id_2') );
//											panel.down('[name=word_3]').setValue( records[0].get('word_3') );
//											panel.down('[name=id_3]').setValue( records[0].get('id_3') );
//											panel.down('[name=word_4]').setValue( records[0].get('word_4') );
//											panel.down('[name=id_4]').setValue( records[0].get('id_4') );
//											panel.down('[name=word_5]').setValue( records[0].get('word_5') );
//											panel.down('[name=id_5]').setValue( records[0].get('id_5') );
//											panel.down('[name=word_6]').setValue( records[0].get('word_6') );
//											panel.down('[name=id_6]').setValue( records[0].get('id_6') );
//		 	 				 			}
//		 	 				 		}
//		 	 				 	},{
//			 	 		 			fieldLabel		: 'Field 명' ,
//			 	 		 			name			: 'fied_name'   ,
//			 	 		 			xtype			: 'textfield'   ,
//			 	 		 			allowBlank		: false,
//			 	 		 			fieldCls		: 'requiredindex',
//			 	 		 			width			: 300
//			 	 		 		},{
//			 	 		 			fieldLabel		: 'Type' ,
//			 	 		 			xtype           : 'lookupfield',
//			 	 		 			name        	: 'data_type'  ,
//			 	 		 			lookupValue     : [['varchar','varchar'],['numeric','numeric'],['char','char'],['integer','integer']],
//			 	 		 			width          	: 150           ,
//			 	 		 		},{
//			 	 		 			fieldLabel		: '길이' ,
//			 	 		 			name			: 'lnth'   ,
//			 	 		 			xtype			: 'textfield'   ,
//			 	 		 			allowBlank		: true,
//			 	 		 			fieldCls		: 'requiredindex',
//			 	 		 			width          	: 150           ,
//			 	 		 		},{
//			 	 		 			fieldLabel		: 'Null' ,
//			 	 		 			xtype           : 'lookupfield',
//			 	 		 			name        	: 'null_dvcd'  ,
//			 	 		 			lookupValue     : [['','Null Ok'],['N','Not Null']],
//			 	 		 			width          	: 150           ,
//			 	 		 		}
			 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel		: 'Format' ,
		 	 		 			name			: 'format_str'   ,
		 	 		 			xtype			: 'textfield'   ,
		 	 		 			allowBlank		: true,
				 			    clearable		: true,
		 	 		 		},{
		 	 		 			fieldLabel		: 'LookUp' ,
		 	 		 			name			: 'lookup_str'   ,
		 	 		 			xtype			: 'textfield'   ,
		 	 		 			allowBlank		: true,
				 			    clearable		: true,
		 	 		 		},{
		 	 		 			fieldLabel		: 'Length' ,
		 	 		 			name			: 'lnth'   ,
		 	 		 			xtype			: 'textfield'   ,
		 	 		 			allowBlank		: true,
				 			    clearable		: true,
		 	 		 		}
		 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel		: 'Memo' ,
		 	 		 			name			: 'remarks'   ,
		 	 		 			xtype			: 'textfield'   ,
		 	 		 			allowBlank		: true,
		 	 		 			width			: 800,
				 			    clearable		: true,
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


