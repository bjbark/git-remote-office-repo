Ext.define('module.sale.saleplan.view.SalePlanEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-saleplan-editor',

	height : 390,
	layout : {
		type: 'border'
	},

	title			: Language.get('',''),
	collapsible 	: false,
	collapsed		: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createwest : function () {
		var me = this,
			cvic = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 300,
				bodyStyle		: { padding: '5px' },
				items			: [
					{ xtype: 'module-saleplan-editor-lister' , height : 380}
				]
			}
		;
		return cvic;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tab-panel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1()]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {title:'비고', xtype: 'textarea', name:'user_memo'};
		return item;
	},



});