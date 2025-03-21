Ext.define('module.item.boltnumb.view.BoltNumbEditor', { extend: 'Axt.form.Editor',

	alias  : 'widget.module-boltnumb-editor',
	height : 230,
	layout : {
		type : 'border'
	},

	title		: Language.get('','볼트호칭 정보'),
	collapsible	: true,
	collapsed	: true,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(),me.createWest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom' ,
				items	: [
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createWest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 70, labelSeparator : '' },
				layout			: 'hbox',
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						width	: 330,
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('btno_code','나사호칭코드'),
										name		: 'btno_code',
										xtype		: 'textfield',
										fieldCls	: 'requiredindex',
										allowBlank	: false,
										emptyText	: Const.invalid.emptyValue
									}
								]
							},{	fieldLabel	: Language.get('btno_name','나사호칭명'),
								xtype		: 'textfield',
								name		: 'btno_name',
							},{	fieldLabel	: Language.get('otsd_dimt','외경'),
								xtype		: 'numericfield',
								name		: 'otsd_dimt',
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype		: 'tabpanel' ,
				region		: 'center',
				itemId		: 'memo',
				margin		: 0 ,
				plain		: true ,
				items		: [ me.createTab1() ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 142,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val',
						xtype		: 'textarea	',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});