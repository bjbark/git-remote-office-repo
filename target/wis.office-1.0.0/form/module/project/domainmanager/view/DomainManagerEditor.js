Ext.define('module.project.domainmanager.view.DomainManagerEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-domainmanager-editor',
	height : 300,
	layout : {
		type: 'border'
	},
	title        : 'Domain Editer'  ,
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
		 	 		 			fieldLabel     : 'ID Key' ,
		 	 		 			name           : 'line_no'   ,
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		}
		 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
	 	 				 		fieldLabel	: 'Field id',
	 	 				 		xtype		: 'textfield',
	 	 				 		name		: 'field_id',
	 	 				 		allowBlank	: false,
	 	 				 		width		: 300
	 	 				 	},{
		 	 		 			fieldLabel	: 'Field 명',
		 	 		 			name		: 'fied_name',
		 	 		 			xtype		: 'textfield',
		 	 		 			allowBlank	: false,
		 	 		 			fieldCls	: 'requiredindex',
		 	 		 			width		: 300
		 	 		 		},{
		 	 		 			fieldLabel	: 'Type',
		 	 		 			xtype		: 'lookupfield',
		 	 		 			name		: 'data_type',
		 	 		 			lookupValue	: [['varchar','varchar'],['numeric','numeric'],['char','char'],['integer','integer'], ['string','Date'],['datetime','Date Time']],
		 	 		 			width		: 150,
		 	 		 		},{
		 	 		 			fieldLabel	: '길이',
		 	 		 			name		: 'data_len',
		 	 		 			xtype		: 'textfield',
		 	 		 			allowBlank	: true,
		 	 		 			fieldCls	: 'requiredindex',
		 	 		 			width		: 150,
		 	 		 		}
		 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
	 	 				 		fieldLabel	: '영어명',
	 	 				 		xtype		: 'textfield',
	 	 				 		name		: 'field_nm_englh',
	 	 				 		allowBlank	: true,
	 	 				 		width		: 300
	 	 				 	},{
		 	 		 			fieldLabel	: '중국어명',
		 	 		 			name		: 'field_nm_chi',
		 	 		 			xtype		: 'textfield',
		 	 		 			allowBlank	: true,
		 	 		 			width		: 300,
	 	 				 	},{
		 	 		 			fieldLabel	: '일본어명',
		 	 		 			name		: 'field_nm_jpns',
		 	 		 			xtype		: 'textfield',
		 	 		 			allowBlank	: true,
		 	 		 			width		: 300
	 	 				 	}
		 	 		 	]
			 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
	 	 				 	{
	 	 				 		xtype		: 'popupfield',
	 							editable	: true,
	 							enableKeyEvents : true,
	 	 				 		fieldLabel	: '단어코드',
	 	 				 		name		: 'w_nm_1',
	 	 				 		pair		: 'w_id_1',
	 	 				 		allowBlank	: true,
						 		editable	: true,
	 	 				 		popup		: {
	 	 				 			select	: 'SINGLE',
	 	 				 			widget	: 'lookup-rndword-popup',
	 	 				 			params	: { },
	 	 				 			result	:  function(records, nameField, pairField ){
	 	 				 				nameField.setValue(records[0].get('w_nm'));
	 	 				 				pairField.setValue(records[0].get('w_id'));
	 	 				 			}
	 	 				 		},
						 		enableKeyEvents : true,
								listeners:{
						 			change : function( self , value ) {
						 			},
						 			keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											me.calc();
										}
			 			 			},
			 					}

	 	 				 	},{
	 	 				 		xtype      	: 'popupfield',
	 							editable	: true,
	 							enableKeyEvents : true,
	 	 				 		name       	: 'w_nm_2',
	 	 				 		pair       	: 'w_id_2',
	 	 				 		width		: 140,
	 	 				 		allowBlank	: true,
	 	 				 		popup		: {
	 	 				 			select	: 'SINGLE',
	 	 				 			widget	: 'lookup-rndword-popup',
	 	 				 			params	: { },
	 	 				 			result	:  function(records, nameField, pairField ){
	 	 				 				nameField.setValue(records[0].get('w_nm'));
	 	 				 				pairField.setValue(records[0].get('w_id'));
	 	 				 			}
	 	 				 		},
						 		enableKeyEvents : true,
								listeners:{
						 			change : function( self , value ) {
						 			},
						 			keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											me.calc();
										}
			 			 			},
			 					}

	 	 				 	},{
	 	 				 		xtype      	: 'popupfield',
	 							editable	: true,
	 							enableKeyEvents : true,
	 	 				 		name       	: 'w_nm_3',
	 	 				 		pair       	: 'w_id_3',
	 	 				 		width		: 140,
	 	 				 		allowBlank	: true,
	 	 				 		popup		: {
	 	 				 			select	: 'SINGLE',
	 	 				 			widget	: 'lookup-rndword-popup',
	 	 				 			params	: { },
	 	 				 			result	:  function(records, nameField, pairField ){
	 	 				 				nameField.setValue(records[0].get('w_nm'));
	 	 				 				pairField.setValue(records[0].get('w_id'));
	 	 				 			}
	 	 				 		},
						 		enableKeyEvents : true,
								listeners:{
						 			change : function( self , value ) {
						 			},
						 			keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											me.calc();
										}
			 			 			},
			 					}
	 	 				 	},{
	 	 				 		xtype		: 'popupfield',
	 							editable	: true,
	 							enableKeyEvents : true,
	 	 				 		name		: 'w_nm_4',
	 	 				 		pair		: 'w_id_4',
	 	 				 		width		: 140,
	 	 				 		allowBlank	: true,
	 	 				 		popup		: {
	 	 				 			select	: 'SINGLE',
	 	 				 			widget	: 'lookup-rndword-popup',
	 	 				 			params	: { },
	 	 				 			result	:  function(records, nameField, pairField ){
	 	 				 				nameField.setValue(records[0].get('w_nm'));
	 	 				 				pairField.setValue(records[0].get('w_id'));
	 	 				 			}
	 	 				 		},
						 		enableKeyEvents : true,
								listeners:{
						 			change : function( self , value ) {
						 			},
						 			keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											me.calc();
										}
			 			 			},
			 					}
	 	 				 	},{
	 	 				 		xtype		: 'popupfield',
	 							editable	: true,
	 							enableKeyEvents : true,
	 	 				 		name		: 'w_nm_5',
	 	 				 		pair		: 'w_id_5',
	 	 				 		width		: 140,
	 	 				 		allowBlank	: true,
	 	 				 		popup		: {
	 	 				 			select	: 'SINGLE',
	 	 				 			widget	: 'lookup-rndword-popup',
	 	 				 			params	: { },
	 	 				 			result	:  function(records, nameField, pairField ){
	 	 				 				nameField.setValue(records[0].get('w_nm'));
	 	 				 				pairField.setValue(records[0].get('w_id'));
	 	 				 			}
	 	 				 		},
						 		enableKeyEvents : true,
								listeners:{
						 			change : function( self , value ) {
						 			},
						 			keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											me.calc();
										}
			 			 			},
			 					}
	 	 				 	},{
	 	 				 		xtype      : 'popupfield',
	 							editable	: true,
	 							enableKeyEvents : true,
	 	 				 		name       : 'w_nm_6',
	 	 				 		pair       : 'w_id_6',
	 	 				 		width		: 140,
	 	 				 		allowBlank : true,
	 	 				 		popup: {
	 	 				 			select : 'SINGLE',
	 	 				 			widget : 'lookup-rndword-popup',
	 	 				 			params : { },
	 	 				 			result :  function(records, nameField, pairField ){
	 	 				 				nameField.setValue(records[0].get('w_nm'));
	 	 				 				pairField.setValue(records[0].get('w_id'));
	 	 				 			}
	 	 				 		},
						 		enableKeyEvents : true,
								listeners:{
						 			change : function( self , value ) {
						 			},
						 			keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											me.calc();
										}
			 			 			},
			 					}
	 	 				 	}
		 	 			]
			 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
	 	 				 	{
	 	 				 		xtype	: 'textfield',
	 	 				 		name	: 'w_id_1'  ,
	 	 				 		width	: 136,
	 	 				 		hidden	: false,
	 	 				 		margin	: '0 0 0 65'
	 	 				 	},{
	 	 				 		xtype  : 'textfield',
	 	 				 		name   : 'w_id_2'  ,
	 	 				 		width	: 140,
	 	 				 		hidden	: false
	 	 				 	},{
	 	 				 		xtype  : 'textfield',
	 	 				 		name   : 'w_id_3'  ,
	 	 				 		width	: 140,
	 	 				 		hidden	: false
	 	 				 	},{
	 	 				 		xtype  : 'textfield',
	 	 				 		name   : 'w_id_4'  ,
	 	 				 		width	: 140,
	 	 				 		hidden	: false
	 	 				 	},{
	 	 				 		xtype  : 'textfield',
	 	 				 		name   : 'w_id_5'  ,
	 	 				 		width	: 140,
	 	 				 		hidden	: false
	 	 				 	},{
	 	 				 		xtype  : 'textfield',
	 	 				 		name   : 'w_id_6'  ,
	 	 				 		width	: 140,
	 	 				 		hidden	: false
	 	 				 	}
		 	 			]
			 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel	: '설명' ,
		 	 		 			name		: 'dscrt'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
		 	 		 			width		: 600
		 	 		 		},{
		 	 		 			fieldLabel	: '관련 테이블' ,
		 	 		 			name		: 'ref_table'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
		 	 		 			width		: 300           ,
		 	 		 			emptyText	: 'code_mst, dept_mst 등  Table명',
		 	 		 		}
		 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel	: 'Code구분' ,
		 	 		 			name		: 'prnt_gbcd'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
		 	 		 			width		: 300           ,
		 	 		 			emptyText	: 'h09, 6100.. 등 공통코드 종류',
		 	 		 		},{
		 	 		 			fieldLabel	: 'Code Value' ,
		 	 		 			name		: 'inter_val'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
		 	 		 			width		: 600,
		 	 		 			emptyText	: '코드 항목별 값... 개발자 참조용',
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
				items : [
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
	},
	calc:  function (config) {
		var	id_1   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_id_1]')[0],
			id_2   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_id_2]')[0],
			id_3   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_id_3]')[0],
			id_4   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_id_4]')[0],
			id_5   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_id_5]')[0],
			id_6   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_id_6]')[0],
			nm_1   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_nm_1]')[0],
			nm_2   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_nm_2]')[0],
			nm_3   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_nm_3]')[0],
			nm_4   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_nm_4]')[0],
			nm_5   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_nm_5]')[0],
			nm_6   = Ext.ComponentQuery.query('module-domainmanager-editor [name=w_nm_6]')[0],
			id_f   = Ext.ComponentQuery.query('module-domainmanager-editor [name=field_id]')[0],
			nm_f   = Ext.ComponentQuery.query('module-domainmanager-editor [name=fied_name]')[0],
			key_f   = Ext.ComponentQuery.query('module-domainmanager-editor [name=line_no]')[0]
 		;

		var wk_id = id_1.getValue(),
			wk_nm = nm_1.getValue();
		if  (id_2.getValue() != '' ) {
			wk_id = wk_id + '_'+ id_2.getValue();
		}
		if  (id_3.getValue() != '' ) {
			wk_id = wk_id + '_'+ id_3.getValue();
		}
		if  (id_4.getValue() != '' ) {
			wk_id = wk_id + '_'+ id_4.getValue();
		}
		if  (id_5.getValue() != '' ) {
			wk_id = wk_id + '_'+ id_5.getValue();
		}
		if  (id_6.getValue() != '' ) {
			wk_id = wk_id + '_'+ id_6.getValue();
		}
		if  (nm_2.getValue() != '' ) {
			wk_nm = wk_nm + nm_2.getValue();
		}
		if  (nm_3.getValue() != '' ) {
			wk_nm = wk_nm + nm_3.getValue();
		}
		if  (nm_4.getValue() != '' ) {
			wk_nm = wk_nm + nm_4.getValue();
		}
		if  (nm_5.getValue() != '' ) {
			wk_nm = wk_nm + nm_5.getValue();
		}
		if  (nm_6.getValue() != '' ) {
			wk_nm = wk_nm + nm_6.getValue();
		}
		id_f.setValue(wk_id);
		key_f.setValue(wk_id);
		nm_f.setValue(wk_nm);
//	 	console.debug(wk_id);
		}

});


