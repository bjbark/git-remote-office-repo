Ext.define('module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListWorkerSearch', { extend: 'Axt.form.Search',

	alias	: 'widget.module-npaysumlist-worker-search',
	height	: 50,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest()] ;
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			height		: 50,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
					items : [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '1 0 5 0',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0,
								items : [
								 	{	fieldLabel	: Language.get('','거래처명'),
										xtype		: 'textfield',
										name		: 'cstm_name',
										readOnly	: true,
										labelWidth	: 50,
										margin		: '10 0 0 10',
										width		: 200,
									},{	fieldLabel	: Language.get('','조회일자'),
										xtype		: 'betweenfield',
										name		: 'invc_date1',
										pair		: 'invc_date2',
										clearable	: true,
										margin		: '10 0 0 20',
										labelWidth	: 50,
										width		: 146,
										root		: true,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: Ext.Date.getFirstDateOfMonth(new Date())
									},{	fieldLabel	: Language.get('','~'),
										xtype		: 'betweenfield',
										name		: 'invc_date2',
										pair		: 'invc_date1',
										margin		:'10 5 0 5',
										clearable	: true,
										width		: 101,
										labelWidth	: 5,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: Ext.Date.getLastDateOfMonth(new Date()),
									},{	fieldLabel	: Language.get('item','품목'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: '10 0 0 10',
										name		: 'item_name',
										pair		: 'item_idcd',
										width		: 250,
										clearable	: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'삼정(구매발주)' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_idcd'));
											}
										}
									},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
									},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
										xtype		: 'button',
										width		: 80,
										height		: 23,
										margin		: '10 0 0 20',
										cls			: 'button-style',
										action		: 'selectAction2'
									}
								]
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
