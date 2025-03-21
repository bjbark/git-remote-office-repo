Ext.define('module.custom.iypkg.etc.trsfwork.view.TrsfWork2WorkerSearch', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-trsfwork-worker-search',
	height	: 65,
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
				border		: 0,
				bodyStyle	: { padding: '5px' },
				flex		: 100 ,
				margin		: '0 0 -5 0',
				fieldDefaults: { width : 300, labelWidth : 50 , margin : '5 5 0 0'},
				items		: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0,
						items : [
							{	fieldLabel	: Language.get('inqy_term','출고일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 155,
								labelWidth	: 60,
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
									{	fieldLabel	: Language.get('cstm_name','거래처'),
										xtype		: 'popupfield',
										editable	: false,
										enableKeyEvents : true,
										clearable	: true,
										width		: 245,
										margin		: '5 5 0 0',
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
//												Ext.ComponentQuery.query('module-goodsosttwork-worker-lister')[0].getStore().clearData();
//												Ext.ComponentQuery.query('module-goodsosttwork-worker-lister')[0].getStore().loadData([],false);
											}
										}
									},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
									}
								]
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">출고 자료 가져오기</span>',
								xtype		: 'button',
								width		: 170,
								height		: 25,
								margin		: '5 0 0 77',
								cls			: 'button-style',
								action		: 'selectAction2'
							}
						]
					},
				]
			};
			return item;
	}
});
