Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerEditor5', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-estimast2-worker-editor5',
	height	: 70,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice4' );
	},

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.pagingItem(), me.createWest()] ;
		me.callParent(arguments);
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style',itemId : 'update' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				],
				pagingButton : false
			};
		return item ;
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			border		: 1,
			bodyStyle	: 'border-width: 0 0 0 0',
			fieldDefaults: { width : 500, labelWidth : 100 },
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border : 0, margin : '10 50 7 30',
					items	: [
						{	fieldLabel	: Language.get('','일반관리비'),
							xtype		: 'numericfield',
							name		: 'gnrl_mngt_cost_rate',
							width		: 235,
						},{	xtype	: 'label',
							text	: '%',
							margin	: '3 0 0 0',
							style	: 'text-align:center;',
							width	: 20,
						},{	fieldLabel	: Language.get('','이익율'),
							xtype		: 'numericfield',
							name		: 'pfit_rate',
							width		: 235,
						},{	xtype	: 'label',
							text	: '%',
							margin	: '3 50 0 0',
							style	: 'text-align:center;',
							width	: 20,
						},{	name	: 'chk', xtype	: 'textfield', hidden : true,
							width	: 235
						}
					]
				}
			]
		};
		return item;
	},

});
