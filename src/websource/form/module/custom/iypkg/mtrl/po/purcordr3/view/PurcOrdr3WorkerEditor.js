Ext.define('module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3WorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-purcordr3-worker-editor',
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
				bodyStyle	: { padding: '3px' },
				flex		: 100 ,
				fieldDefaults: { width : 300, labelWidth : 40 , margin : '5 0 0 0'},
				items		: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '2 0 0 0',
						items : [
							{	fieldLabel	: Language.get('invc_date','수주일자'),
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
								width		: 115,
								labelWidth	: 15,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								clearable	: true
							},{	xtype : 'fieldset', layout: 'vbox', border : 0, margin : '0 0 5 0',
								items : [
									{	fieldLabel	: Language.get('prod_name','상품'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true,
										name		: 'prod_name',
										pair		: 'prod_idcd',
										popup: {
											select : 'SINGLE',
											widget : 'lookup-prod-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd : '4000'},
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('prod_name'));
												pairField.setValue(records[0].get('prod_idcd'));
											}
										}
									},{	name : 'prod_idcd', xtype : 'textfield' , hidden : true
									},{	fieldLabel	: Language.get('cstm_name','수주처'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true,
										name		: 'cstm_name',
										pair		: 'cstm_idcd',
										margin		: '5 0 0 0',
										popup: {
											select : 'SINGLE',
											widget : 'lookup-cstm-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0'},
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
											}
										}
									},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
									}
								]
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">미발주 자료 가져오기</span>',
								xtype		: 'button',
								width		: 150,
								height		: 50,
								margin		: '5 0 0 20',
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
