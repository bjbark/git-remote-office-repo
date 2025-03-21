Ext.define('module.cust.cstmlist.view.CstmListWorkerSearch2',{ extend: 'Axt.form.Search',
	store	: 'module.cust.cstmlist.store.CstmListOrder',
	alias	: 'widget.module-cstmlist-worker-search2',
	style	: 'padding-left : 5px;' ,

	initComponent: function(){
		var me = this;
		me.items = [
			me.addonSearch()
		];
		me.callParent();
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','품목군'),
								xtype		: 'searchfield',
								name		: 'item_clss_bacd_name',
								clearable	: true,
								width		: 300,
								hidden		: _global.hq_id !='N1000nbolt',
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'searchfield',
								name		: 'item_name',
								clearable	: true,
								width		: 250,
								labelWidth	: 60,
							},{	fieldLabel	: Language.get( '', '규격' ),
								name		: 'item_spec',
								xtype		: 'searchfield',
								maxLength	: 50,
								width		: 240,
								clearable	: true,
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								height		: 25,
								margin		: '1 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction3'
							}
						]
					}
				]
			};
		return line;
	}
});