Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Search3', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport11-search3',
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
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 11 5 0',
							items	: [
								{	fieldLabel	: Language.get('','기초이월잔액'),
									xtype		: 'numericfield',
									name		: 'unpd_amnt',
									itemId		: '',
									labelWidth	: 80,
									width		: 200,
									margin		: '0 0 0 50',
									value		: 0,
								},{	xtype		: 'label',
									text		: '일반',
									margin		: '3 0 0 73',
								},{	xtype		: 'label',
									text		: '　',
									width		: 50,
									margin		: '3 0 0 10',
									style		: 'background-color : black',
								},{	xtype		: 'label',
									text		: '2개월',
									margin		: '3 0 0 50',
								},{	xtype		: 'label',
									text		: '　',
									width		: 50,
									margin		: '3 0 0 10',
									style		: 'background-color : #d7ffb9; color : #d7ffb9',
								},{	xtype		: 'label',
									text		: '3개월',
									margin		: '3 0 0 50',
								},{	xtype		: 'label',
									text		: '　',
									width		: 50,
									margin		: '3 0 0 10',
									style		: 'background-color : #f4c8e4; color : #f4c8e4',
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
