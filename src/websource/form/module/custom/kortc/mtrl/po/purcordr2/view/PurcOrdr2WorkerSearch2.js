Ext.define('module.custom.kortc.mtrl.po.purcordr2.view.PurcOrdr2WorkerSearch2', { extend: 'Axt.form.Search',
//	store	: 'module.mtrl.po.purcordr2.store.PurcOrdr2Invoice2',
	alias	: 'widget.module-purcordr2-worker-search2',
	style	: 'padding-top : 1px;' ,
	height	:  50,
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.addonSearch() ];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	addonSearch : function(){
		var me = this,
		line = {
				xtype		: 'fieldset' ,
				dock		: 'left',
				border		: 0,
				flex		: 100 ,
				fieldDefaults: { width : 280, labelWidth : 40 , margin : '5 5 0 0'},
				items		: [
						{	xtype : 'fieldset',
							layout: 'hbox',
							border: 0,
							margin: '5 0 0 -18',
							items : [
							{	xtype : 'fieldset',
								layout: 'vbox',
								border: 0,
								margin: '0 0 0 0',
								items : [
									{	xtype : 'fieldset',
										layout: 'hbox',
										border: 0,
										margin: '0 0 0 0',
										items : [
											{	fieldLabel	: Language.get('','발주담당'),
												xtype		: 'popupfield',
												name		: 'drtr_name',
												pair		: 'drtr_idcd',
												fieldCls	: 'requiredindex',
												emptyText	: Const.invalid.emptyValue,
												value		: _global.login_nm,
												clearable	: true,
												labelWidth	: 100,
												width		: 200,
												margin		: '0 0 0 0',
												popup: {
													select : 'SINGLE',
													widget : 'lookup-user-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0' },
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('user_name'));
														pairField.setValue(records[0].get('user_idcd'));
													}
												}
											},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true, value : _global.login_id
											},{	fieldLabel	: Language.get('','발주일자'),
												xtype		: 'datefield',
												name		: 'invc_date',
												labelWidth	: 99,
												width		: 198,
												margin		: '0 0 0 62',
												value		: new Date(),
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
											},{	fieldLabel	: Language.get('','납기일자'),
												xtype		: 'datefield',
												name		: 'deli_date',
												labelWidth	: 94,
												width		: 191,
												margin		: '0 0 0 4', 
												value		: new Date(),
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
											}
										]
									}
								]
							}
						]
					}
				]
			};
	return line;
	}
});
