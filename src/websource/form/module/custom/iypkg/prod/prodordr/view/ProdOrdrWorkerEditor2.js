Ext.define('module.custom.iypkg.prod.prodordr.view.ProdOrdrWorkerEditor2', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-prodordr-worker-editor2',
	height	: 70,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest()] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			border		: 1,
			bodyStyle	: 'border-width: 0 1 1 1',
			fieldDefaults: { width : 500, labelWidth : 100 },
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border : 0, margin : '10 11 5 0',
					items	: [
						{	fieldLabel	: Language.get('','제품'),
							xtype		: 'textfield',
							name		: 'prod_name',
							labelWidth	: 60,
							width		: 300,
							readOnly	: true
						},{	fieldLabel	: Language.get('','납품일자'),
							xtype		: 'datefield',
							name		: 'ostt_date',
							labelWidth	: 70,
							width		: 175,
							margin		: '0 0 0 2',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: '',
							readOnly	: true
						},{	fieldLabel	: Language.get('','수주량'),
							xtype		: 'numericfield',
							name		: 'acpt_qntt',
							labelWidth	: 50,
							width		: 135,
							readOnly	: true
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0', fieldDefaults: { width : 561, labelWidth : 70 },
					items	: [
						{	fieldLabel	: Language.get('','규격'),
							xtype		: 'numericfield',
							name		: 'item_leng',
							labelWidth	: 60,
							width		: 140,
							readOnly	: true
						},{	xtype		: 'numericfield',
							name		: 'item_widh',
							margin		: '0 0 0 5',
							width		: 75,
							readOnly	: true
						},{	xtype		: 'numericfield',
							name		: 'item_hght',
							margin		: '0 0 0 5',
							width		: 75,
							readOnly	: true
						},{	fieldLabel	: Language.get('','P/O No'),
							xtype		: 'textfield',
							name		: 'pcod_numb',
							margin		: '0 0 0 12',
							labelWidth	: 60,
							width		: 300,
							readOnly	: true
						}
					]
				}
			]
		};
		return item;
	},

});
