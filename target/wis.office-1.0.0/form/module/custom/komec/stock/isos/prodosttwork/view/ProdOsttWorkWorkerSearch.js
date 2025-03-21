Ext.define('module.custom.komec.stock.isos.prodosttwork.view.ProdOsttWorkWorkerSearch', { extend: 'Axt.form.Search',

	alias   : 'widget.module-prodosttwork-worker-search',
	style   : 'padding-top : 1px;' ,
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
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	name		: 'barcode_pono',
								fieldCls	: 'textTemp field-c-25',
								xtype		: 'searchfield'	,
								width		: 500,
								emptyText	: '바코드를 스캔하세요...',
								enableKeyEvents : true			,
								margin		: '10 0 0 95',
								height		: 40,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction2]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							},{	text		: '<span class="btnTemp" style="font-size:2.0em">조회</span>',
								xtype		: 'button',
								width		: 170,
								height		: 40,
								margin		: '10 0 5 20',
								cls			: 'button-style',
								action		: 'selectAction2'
							}
						]
					}
				]
			};
		return line;
	}
});