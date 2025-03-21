Ext.define('module.item.view.itemunit.ItemUnitSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-itemunit-search',

	initComponent: function(){
		var me = this;
		me.items =  [ me.createLine1() ];
		me.callParent();
	},
	 createLine1 : function(){
		var line =
		{
			xtype	: 'fieldset',
			items	: [
				{	fieldLabel	: Language.get('unit_name', '찾을 명칭'),
					name		: 'unit_name',
					xtype		: 'searchfield'
				},{	fieldLabel	: '사용여부',
					xtype		: 'lookupfield',
					name		: 'row_sts',
					editable	: false,
					lookupValue	: resource.lookup('search_all').concat( resource.lookup('row_sts' ) ) ,  // [ ['0','사용'    ] , ['1','사용안 함'] ]
					value		: '0'
				}
			]
		};
		return line;
	},

	addonSearch : function(){
		var line =
		{
			xtype		: 'fieldset',
			collapsible	: true,
			collapsed	: true,
			layout		: 'vbox',
			defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 4 0', padding:'0', border: 0 },
			items		: [
				{
					xtype : 'fieldset',
					items : [
					]
				}
			]
		};
		return line;
	}
});
