Ext.define('module.prod.order.prodinput.view.ProdInputListerMaster2', { extend: 'Axt.form.Editor',

	alias: 'widget.module-prodinput-lister-master2',

	layout : {
	height : 100,
	width	: 100,
		type: 'border'
	},

	collapsible 	: false	,
	collapsed		: false	,
	defaultFocus	: 'prjt_code',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock()];
		me.items = [me.createwest()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				height			: 350,
				region			: 'north',
				border			: 2,
				bodyStyle		: { padding: '15px' },
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	fieldLabel	: Language.get('cstm_name','거래처명'),
						xtype		: 'textfield',
						name		: 'cstm_name',
						clearable	: false ,
						readOnly	: true,
						margin		: '5 5 15 0'
					},{	fieldLabel	: Language.get('ttsm_amnt','당월매출액'),
						xtype		: 'numericfield',
						name		: 'ttsm_amnt',
						clearable	: false ,
						readOnly	: true,
						margin		: '5 5 15 0'
					},{	fieldLabel	: Language.get('trst_qntt','현 출고대기'),
						xtype		: 'numericfield',
						name		: 'trst_qntt',
						clearable	: false ,
						readOnly	: true,
						margin		: '5 5 15 0'
					},{	fieldLabel	: Language.get('summ_qntt','현 대기수량'),
						xtype		: 'numericfield',
						name		: 'summ_qntt',
						clearable	: false,
						readOnly	: true,
						margin		: '5 5 15 0'
					}
				]
			}
		;
		return item;
	},

});