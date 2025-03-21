Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanWorkerSearch1', { extend: 'Axt.form.Search',

	alias	: 'widget.module-prodplan-worker-search1',
	height	: 70,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest()] ;
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			dock		: 'left',
			border		: 0,
			margin		: '5 0 0 0',
			bodyStyle	: 'border-width: 0 1 1 1',
			fieldDefaults: { width : 500, labelWidth : 100 },
			items		: [
				{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '3 0 5 0',
					items : [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0', fieldDefaults: { width : 561, labelWidth : 70 },
							items	: [
								{	fieldLabel	: Language.get('','제품'),
									xtype		: 'textfield',
									name		: 'prod_name',
									labelWidth	: 60,
									width		: 300,
									readOnly	: true
								},{	fieldLabel	: Language.get('','거래처'),
									xtype		: 'textfield',
									name		: 'cstm_name',
									margin		: '0 0 0 12',
									labelWidth	: 60,
									width		: 300,
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
