Ext.define('module.custom.kortc.mtrl.po.purcordr2.view.PurcOrdr2WorkerEditor2', { extend: 'Axt.form.Editor',


	alias	: 'widget.module-purcordr2-worker-editor2',
	height	:  80,
	header	: false,
	getStore: function() {
//		return Ext.getStore( 'module.mtrl.po.purcordr2.store.PurcOrdr2Invoice2' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
//		me.items = me.createTabs();
		me.callParent(arguments);

	},



	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 60 },
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
										{	fieldLabel	: Language.get('','사업장'),
											xtype		: 'popupfield',
											name		: 'bzpl_name',
											pair		: 'bzpl_idcd',
											clearable	: true,
											labelWidth	: 100,
											width		: 200,
											margin		: '6 0 0 0',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-bzpl-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('bzpl_name'));
													pairField.setValue(records[0].get('bzpl_idcd'));
												}
											}
										},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','담당자'),
											xtype		: 'popupfield',
											name		: 'drtr_name',
											pair		: 'drtr_idcd',
											clearable	: true,
											labelWidth	: 100,
											width		: 200,
											margin		: '6 0 0 60',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','청구기간'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											labelWidth	: 79,
											width		: 175,
											margin		: '6 0 0 19',
											root		: true,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											value		: Ext.Date.getFirstDateOfMonth(new Date())
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											labelWidth	: 15,
											margin		: '6 0 0 0',
											width		: 115,
											value		: new Date(),
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','품목'),
											xtype		: 'popupfield',
											name		: 'item_code',
											pair		: 'item_idcd',
											clearable	: true,
											labelWidth	: 100,
											width		: 460,
											margin		: '5 0 0 0',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-item-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd	: '자재' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('item_name'));
													pairField.setValue(records[0].get('item_idcd'));
												}
											}
										},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
										}
									]
								}
							]
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">대기 내역 조회</span>',
							xtype		: 'button',
							width		: 130,
							height		: 50,
							margin		: '6 0 0 20',
							cls			: 'button-style',
							action		: 'selectAction2'
						},{	name : 'change'   , xtype	: 'textfield', hidden : true
						},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
						}
					]
				}
			]
		};
		return item;
	},


});
