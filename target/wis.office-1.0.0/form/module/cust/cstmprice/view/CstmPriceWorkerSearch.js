Ext.define('module.cust.cstmprice.view.CstmPriceWorkerSearch',{ extend: 'Axt.form.Search',
	store	: 'module.cust.cstmprice.store.CstmPriceWorkerSearch',
	alias	: 'widget.module-cstmprice-worker-search',
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
					{	name	: 'cstm_idcd', xtype : 'textfield' , hidden : true
					},{	xtype : 'fieldset', layout: 'hbox', itemId : 'itemsearch',
						items : [
							{	fieldLabel	: Language.get('','품목군'),
								xtype		: 'searchfield',
								name		: 'item_clss_bacd_name',
								clearable	: true,
								width		: 300,
								hidden		: _global.hq_id !='N1000nbolt',
							},{	fieldLabel	: Language.get('','품명'),
								xtype		: 'searchfield',
								name		: 'item_name',
								clearable	: true,
								width		: 250,
								labelWidth	: 60,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										var me =this,
										itempanel	= Ext.ComponentQuery.query('module-cstmprice-layout')[0].down('#itempanel')
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											if(itempanel.activeTab.itemId == 'buy'){
												var searchButton = self.up('form').down('[action=selectAction2]');
											}else{
												var searchButton = self.up('form').down('[action=selectAction3]');
											}
											searchButton.fireEvent('click', searchButton); //엔터로 조회
										}
									}
								}
							},{	fieldLabel	: Language.get( '', '규격' ),
								name		: 'item_spec',
								xtype		: 'searchfield',
								maxLength	: 50,
								width		: 240,
								clearable	: true,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										var me =this,
										itempanel	= Ext.ComponentQuery.query('module-cstmprice-layout')[0].down('#itempanel')
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											if(itempanel.activeTab.itemId == 'buy'){
												var searchButton = self.up('form').down('[action=selectAction2]');
											}else{
												var searchButton = self.up('form').down('[action=selectAction3]');
											}
											searchButton.fireEvent('click', searchButton); //엔터로 조회
										}
									}
								}
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								name		: 'sa',
								itemId		: 'sale1',
								height		: 25,
								margin		: '1 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction2',
								hidden		: true,
								},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								name		: 'by',
								itemId		: 'buy1',
								height		: 25,
								margin		: '1 0 0 -80',
								cls			: 'button-style',
								action		: 'selectAction3',
								hidden		: true,
								listeners:{
									keydown : function(self, e) {
										var me =this,
										itempanel	= Ext.ComponentQuery.query('module-cstmprice-layout')[0].down('#itempanel')
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											if(itempanel.activeTab.itemId == 'buy'){
												var searchButton = self.up('form').down('[action=selectAction2]');
											}else{
												var searchButton = self.up('form').down('[action=selectAction3]');
											}
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
										}
									}
								}
							}
						]
					}
				]
			};
		return line;
	}
});