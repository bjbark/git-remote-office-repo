Ext.define('module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-purcpaywork-worker-editor',
	header	: false,
	height	: 50,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
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
										{	fieldLabel	: Language.get('','거래처'),
											xtype		: 'popupfield',
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											clearable	: true,
											labelWidth	: 100,
											width		: 260,
											margin		: '6 0 0 0',
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','입고기간'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											labelWidth	: 79,
											width		: 198,
											margin		: '6 0 0 0',
											root		: true,
											value		: Ext.Date.getFirstDateOfMonth(new Date())
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											labelWidth	: 15,
											margin		: '6 0 0 0',
											width		: 115,
											value		: new Date()
										}
									]
								}
							]
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">지급 대기 내역 조회</span>',
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
