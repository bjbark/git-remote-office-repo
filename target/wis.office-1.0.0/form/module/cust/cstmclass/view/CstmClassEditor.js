Ext.define('module.cust.cstmclass.view.CstmClassEditor', {extend  : 'Axt.form.Editor',
	alias   : 'widget.module-cstmclass-editor',
	height       : 250,
	collapsible  : true,
	collapsed    : true ,
	defaultFocus : 'clss_nm',
	initComponent: function(config){
		var me         = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.callParent(arguments);
	},
	createDock : function () {
		var item = {
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls : 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls : 'button-style'}, '-'
				]
			};
		return item;
	},

	createWest : function () {
		var me = this,
			item = {
				xtype		: 'form-panel',
				dock		: 'left',
				width		: 330,
				bodyStyle	: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	xtype		: 'textfield',
								name		: 'clss_code',
								fieldLabel	: Language.get('clss_code','분류코드'),
								width		: 255 ,
								allowBlank	: false,
								fieldCls	: 'requiredindex'
							},{	name		: 'line_stat',
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5'
							}
						]
					},{	xtype: 'textfield'	, name : 'clss_name'	, fieldLabel : Language.get('clss_name','분류명'),
					},{	xtype: 'textarea'	, name : 'user_memo'	, fieldLabel : Language.get('user_memo', '메모사항')  , height : 130
					}
				]
			}
		;
		return item;
	}
});






