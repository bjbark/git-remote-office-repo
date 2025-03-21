Ext.define('module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2WorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-isttwork2-worker-editor',
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
		item = {
				xtype		: 'form-panel' ,
				height		: 135,
				bodyStyle	: { padding: '3px' },
				flex		: 100 ,
				fieldDefaults: { width : 300, labelWidth : 40 , margin : '5 5 0 0'},
				items		: [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0,
								items : [
									{	name		: 'barcode_pono',
										fieldCls	: 'textTemp field-c-25',
										xtype		: 'searchfield'	,
										width		: 520,
										emptyText	: '발주번호 바코드를 스캔하세요...',
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
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
								items : [
									{	fieldLabel	: Language.get('inqy_term','발주일자'),
										xtype		: 'betweenfield',
										name		: 'invc_date1',
										pair		: 'invc_date2',
										width		: 150,
										labelWidth	: 50,
										root		: true,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: Ext.Date.getFirstDateOfMonth(new Date()),
										clearable	: true
									},{	fieldLabel	: Language.get('','~'),
										xtype		: 'betweenfield',
										name		: 'invc_date2',
										pair		: 'invc_date1',
										width		: 116,
										labelWidth	: 19,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: new Date(),
										clearable	: true
									},{	xtype : 'fieldset', layout: 'vbox', border : 0,
										items : [
											{	fieldLabel	: Language.get('prod_name','제품'),
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												clearable	: true,
												name		: 'prod_name',
												pair		: 'prod_idcd',
												popup: {
													select : 'SINGLE',
													widget : 'lookup-prod-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0'},
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('prod_name'));
														pairField.setValue(records[0].get('prod_idcd'));
													}
												}
											},{	name : 'prod_idcd', xtype : 'textfield' , hidden : true
											},{	fieldLabel	: Language.get('cstm_name','거래처'),
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												clearable	: true,
												name		: 'cstm_name',
												pair		: 'cstm_idcd',
												popup: {
													select : 'SINGLE',
													widget : 'lookup-cstm-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0'},
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('cstm_name'));
														pairField.setValue(records[0].get('cstm_idcd'));
													}
												},
												listeners: {
													change : function(self, value) {
			//											Ext.ComponentQuery.query('module-goodsosttwork-worker-lister')[0].getStore().clearData();
			//											Ext.ComponentQuery.query('module-goodsosttwork-worker-lister')[0].getStore().loadData([],false);
													}
												}
											},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
											}
										]
									},{	text		: '<span class="btnTemp" style="font-size:1.3em">입고대기 자료 가져오기</span>',
										xtype		: 'button',
										width		: 170,
										height		: 50,
										margin		: '5 0 5 20',
										cls			: 'button-style',
										action		: 'selectAction2'
									}
								]
							},
						]
					}
				]
			};
		return item;
	}
});
