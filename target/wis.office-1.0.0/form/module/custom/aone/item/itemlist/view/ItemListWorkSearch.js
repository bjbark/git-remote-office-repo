Ext.define('module.custom.aone.item.itemlist.view.ItemListWorkSearch',{ extend: 'Axt.form.Search',

	alias	: 'widget.module-itemlist-work-search',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
//		me.items = me.createTabs();
		me.callParent(arguments);

	},

	createWest : function(){
		var me = this,
			item = {
				xtype			: 'fieldset',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox', margin : '5 0 0 0',
						items : [
							{	fieldLabel	: Language.get('item_code','품목코드'),
								xtype		: 'textfield',
								name		: 'item_code',
								width		: 300,
								labelWidth	: 90,
								readOnly	: true,
							},{	fieldLabel	: Language.get('item_name','품명'),
								xtype		: 'textfield',
								name		: 'item_name',
								width		: 300,
								labelWidth	: 90,
								readOnly	: true,
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('item_spec','규격'),
								xtype		: 'textfield',
								name		: 'item_spec',
								width		: 300,
								labelWidth	: 90,
								readOnly	: true,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								labelWidth	: 88,
								width		: 187,
								margin		: '6 0 0 2',
								root		: true,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								margin		: '6 0 0 2',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								labelWidth	: 15,
								width		: 112,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date()
							},{	fieldLabel	: Language.get('','반품일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date3',
								pair		: 'invc_date4',
								root		: true,
								labelWidth	: 88,
								width		: 187,
								margin		: '6 0 0 0',
								value		: new Date()
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc_date4',
								pair		: 'invc_date3',
								labelWidth	: 15,
								margin		: '6 0 0 0',
								width		: 115,
								value		: new Date()
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 70,
								height		: 25,
								itemId		: 'isos',
								margin		: '6 0 0 10',
								cls			: 'button-style',
								action		: 'selectAction2'
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 70,
								height		: 25,
								itemId		: 'rett',
								margin		: '6 0 0 10',
								cls			: 'button-style',
								action		: 'selectAction3'
							}
						]
					}
				]
			};
		return item;
	}
});