Ext.define('module.custom.iypkg.prod.prodordr2.view.ProdOrdr2WorkerSearch2', { extend: 'Axt.form.Search',

	alias	: 'widget.module-prodordr2-worker-search2',
	height	: 100,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			fieldDefaults: { width : 280 },
			items		: [
				{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '3 0 5 0',
					items : [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 11 5 0',
							items	: [
								{	fieldLabel	: Language.get('acpt_numb','수주번호'),
									xtype		: 'textfield',
									enableKeyEvents : true,
									name		: 'invc_numb',
									labelWidth	: 60,
									width		: 300,
									readOnly	: true,
								},{	fieldLabel	: Language.get('invc_date','수주일자'),
									xtype		: 'textfield',
									name		: 'invc_date',
									labelWidth	: 70,
									width		: 175,
									readOnly	: true,
								},{	fieldLabel	: Language.get('acpt_qntt','수주량'),
									xtype		: 'numericfield',
									name		: 'acpt_qntt',
									labelWidth	: 50,
									width		: 135,
									readOnly	: true,
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0', fieldDefaults: { width : 561, labelWidth : 70 },
							items	: [
								{	fieldLabel	: Language.get('item','제품'),
									xtype		: 'textfield',
									name		: 'prod_code',
									labelWidth	: 60,
									width		: 140,
									readOnly	: true,
								},{	xtype		: 'textfield',
									name		: 'prod_name',
									margin		: '0 0 0 5',
									width		: 155,
									readOnly	: true,
								},{	fieldLabel	: Language.get('cstm','거래처'),
									xtype		: 'textfield',
									name		: 'cstm_code',
									margin		: '0 0 0 12',
									labelWidth	: 60,
									width		: 140,
									readOnly	: true,
								},{	xtype		: 'textfield',
									name		: 'cstm_name',
									margin		: '0 0 0 5',
									width		: 155,
									readOnly	: true,
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0', fieldDefaults: { width : 561, labelWidth : 70 },
							items	: [
								{	fieldLabel	: Language.get('prod_leng','규격'),
									xtype		: 'numericfield',
									name		: 'prod_leng',
									labelWidth	: 60,
									width		: 140,
									readOnly	: true,
								},{	xtype		: 'numericfield',
									name		: 'prod_widh',
									margin		: '0 0 0 5',
									width		: 75,
									readOnly	: true,
								},{	xtype		: 'numericfield',
									name		: 'prod_hght',
									margin		: '0 0 0 5',
									width		: 75,
									readOnly	: true,
								},{	fieldLabel	: Language.get('pcod_numb','P/O No'),
									xtype		: 'textfield',
									name		: 'pcod_numb',
									margin		: '0 0 0 12',
									labelWidth	: 60,
									width		: 300,
									readOnly	: true,
								}
							]
						}
					]
				}
			]
		};
	return item;
	},

});
