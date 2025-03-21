Ext.define('module.project.querymaker.view.QueryMakerEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-querymaker-editor',
	height : 300,
	layout : {
		type: 'border'
	},
	title        : 'Query Editer'  ,
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
		 	 		 			fieldLabel     : 'Path',
		 	 		 			name           : 'path',
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		},
		 	 		 		{
		 	 		 			fieldLabel     : 'Service' ,
		 	 		 			name           : 'srvc'   ,
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		},
		 	 		 		{
		 	 		 			fieldLabel     : 'Module' ,
		 	 		 			name           : 'modl'   ,
		 	 		 			xtype          : 'textfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		},
		 	 		 		{
		 	 		 			fieldLabel     : '순번' ,
		 	 		 			name           : 'line_no'   ,
		 	 		 			xtype          : 'numericfield'   ,
		 	 		 			allowBlank     : false,
		 	 		 			fieldCls       : 'requiredindex',
		 	 		 			emptyText      : Const.invalid.emptyValue,
		 	 		 		}
		 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel	: 'Type',
		 	 		 			xtype		: 'lookupfield',
		 	 		 			name		: 'type_cd',
		 	 		 			lookupValue	: [['Q','Query'],['W','Where'],['J','Jion'],['E','End of Query']],
		 	 		 			width		: 150,
		 	 		 		}
		 	 		 	]
			 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel	: 'query' ,
		 	 		 			name		: 'query_txt'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
		 	 		 			height		: 60,
		 	 		 			width		: 900
		 	 		 		}
		 	 		 	]
		 	 		},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
		 	 			items : [
		 	 		 		{
		 	 		 			fieldLabel	: 'Parameter' ,
		 	 		 			name		: 'deli_val'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
//		 	 		 			width		: 300           ,
		 	 		 			emptyText	: '',
		 	 		 		},{
		 	 		 			fieldLabel	: '고정값' ,
		 	 		 			name		: 'cnst_val'   ,
		 	 		 			xtype		: 'textfield'   ,
		 	 		 			allowBlank	: true,
//		 	 		 			width		: 600,
		 	 		 			emptyText	: '',
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
});


