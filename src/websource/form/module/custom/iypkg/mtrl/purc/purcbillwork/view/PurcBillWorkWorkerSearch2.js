Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerSearch2', { extend: 'Axt.form.Search',

	alias	: 'widget.module-purcbillwork-worker-search2',
	height	: 46,
	header	: false,

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
				{	xtype : 'fieldset', layout: 'vbox', border : 0,
					items : [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '11 11 5 0',
							items	: [
								{	fieldLabel	: Language.get('','발행일자'),
									xtype		: 'betweenfield',
									name		: 'fr_invc_date',
									pair		: 'to_invc_date',
									labelWidth	: 60,
									width		: 160,
									margin		: '0 0 0 0',
									root		: true,
									value		: Ext.Date.getFirstDateOfMonth(new Date())
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'to_invc_date',
									pair		: 'fr_invc_date',
									labelWidth	: 15,
									width		: 115,
									value		: new Date()
								},{	fieldLabel	: Language.get('','합계구분'),
									xtype		: 'lookupfield',
									name		: 'chk',
									lookupValue	: [['1','소계'],['2','월계'],['3','합계']],
									multiSelect	: true ,
									editable	: false,
									labelWidth	: 99,
									width		: 250,
									margin		: '0 60 0 0',
									value		: ["1","2","3"],
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
