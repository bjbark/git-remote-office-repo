Ext.define('module.custom.iypkg.eis.eisreport12.view.EisReport12Search1', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport12-search1',
	height	: 45,
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
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
							items		: [
								{	xtype	: 'checkboxfield',
									labelSeparator: '',
									allowBlank: true,
									boxLabel: '부가율 정보 보기' ,
									name : 'vatx_rate',
									id : 'vatx_rate',
									margin : '10 0 -5 10',
									inputValue: 1,
									width : 100 ,
								}
							]
						}
					]
				}
			]
		};
	return item;
	}
});
