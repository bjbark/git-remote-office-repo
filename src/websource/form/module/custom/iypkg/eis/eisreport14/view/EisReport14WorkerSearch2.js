Ext.define('module.custom.iypkg.eis.eisreport14.view.EisReport14WorkerSearch2', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport14-worker-search2',
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
			margin		: '2 2 0 2',
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0,
					items : [
						{	fieldLabel	: Language.get('plan_year','계획년도'),
							xtype		: 'monthfield',
							name		: 'plan_year',
							fieldCls	: 'requiredindex',
							format		: 'Y'+'년',
							submitFormat: 'Y',
							width		: 150,
							margin		: '0 0 0 40',
							labelWidth	: 50,
							value		: new Date(),
						}
					]
				}
			]
		};
	return item;
	}
});
