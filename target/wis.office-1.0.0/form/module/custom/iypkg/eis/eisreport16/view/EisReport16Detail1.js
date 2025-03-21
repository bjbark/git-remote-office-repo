Ext.define('module.custom.iypkg.eis.eisreport16.view.EisReport16Detail1', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport16-detail1',
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
			fieldDefaults: { width : '100%', labelWidth : 50 , margin : '5 5 0 0', padding : '2'},
			items		: [
				{	xtype : 'fieldset', layout: 'vbox', border : 0,
					items : [
						{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 55 0 55',
							items : [
								{	fieldLabel : Language.get('', '매출액' ),
									xtype : 'numericfield',
									name  : '',
									labelWidth : 60,
									width : 250,
									margin : '20 30 10 50',
								},{	fieldLabel : Language.get('', '외주가공비' ),
									xtype : 'numericfield',
									name  : '',
									labelWidth : 60,
									width : 250,
									margin : '20 60 10 50',
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 55 0 55',
							items : [
								{	fieldLabel : Language.get('', '원자재매입' ),
									xtype : 'numericfield',
									name  : '',
									labelWidth : 60,
									width : 250,
									margin : '0 30 10 50',
								},{	fieldLabel : Language.get('', '상품외주' ),
									xtype : 'numericfield',
									name  : '',
									labelWidth : 60,
									width : 250,
									margin : '0 60 10 50',
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 55 0 55',
							items : [
								{	fieldLabel : Language.get('', '부자재매입' ),
									xtype : 'numericfield',
									name  : '',
									labelWidth : 60,
									width : 250,
									margin : '0 30 10 50',
								},{	fieldLabel : Language.get('', '운송비' ),
									xtype : 'numericfield',
									name  : '',
									labelWidth : 60,
									width : 250,
									margin : '0 60 10 50',
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 55 10 55',
							items : [
								{	fieldLabel : Language.get('', '총 부가액' ),
									xtype : 'numericfield',
									name  : '',
									labelWidth : 60,
									width : 250,
									margin : '0 30 10 50',
								},{	fieldLabel : Language.get('', '총 부가율' ),
									xtype : 'numericfield',
									name  : '',
									labelWidth : 60,
									width : 250,
									margin : '0 60 10 50',
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
