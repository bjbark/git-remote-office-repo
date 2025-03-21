Ext.define('module.custom.sjflv.sale.sale.salecolt.view.SaleColtWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sjflv-salecolt-worker-editor',
	height	: 50,
	header	: false,
	border : 0,
	layout	: 'fit',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 110,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
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
										{	fieldLabel	: Language.get('cstm_name','거래처'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true,
											margin		: '6 0 0 6',
											width		: 270,
											labelWidth	: 85,
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											},
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true,
										},{	fieldLabel	: Language.get('invc_date','매출기간'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											margin		: '6 0 0 0',
											width		: 185,
											labelWidth	: 85,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											value		: Ext.Date.getFirstDateOfMonth(new Date()),
											root		: true
										},{	fieldLabel	: Language.get('','~'),
											xtype		: 'betweenfield',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											margin		: '6 0 0 0',
											width		: 117,
											labelWidth	: 17,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											value		: new Date()
										},
									]
								}
							]
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">수금 등록 내역 조회</span>',
							xtype		: 'button',
							width		: 160,
							height		: 24,
							margin		: '6 0 0 0',
							cls			: 'button-style',
							action		: 'selectAction2'
						}
					]
				}
			]
		};
		return item;
	}
});
