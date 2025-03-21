	Ext.define('module.mtrl.po.purctrstwork.view.PurcTrstWorkWorkerEditor', { extend: 'Axt.form.Editor',

		alias	: 'widget.module-purctrstwork-worker-editor',
		height	: 60,
		header	: false,
		getStore: function() {
			return Ext.getStore( 'module.mtrl.po.purctrstwork.store.PurcTrstWorkInvoice' );
		},
		initComponent: function(config){
			var me = this;
			me.dockedItems = [ me.createWest() ] ;
//			me.items = me.createTabs();
			me.callParent(arguments);
		},
	/**
	 *
	 */
		createWest : function () {
			var me	= this,
				item = {
				xtype		: 'form-panel' ,
				region		: 'left',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				flex		: 1,
				fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 5 0'},
				items		: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '0 0 3 0',
								items : [
									{	xtype : 'fieldset', layout: 'hbox', border : 0,margin : '5 0 0 0',
										items : [
											{	fieldLabel	: Language.get('','사업장'),
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												name		: 'bzpl_name',
												pair		: 'bzpl_idcd',
												clearable	: false ,
												allowBlank	: false,
												fieldCls	: 'requiredindex',
												emptyText	: Const.invalid.emptyValue,
												width		: 250,
												labelWidth	: 50,
												margin		: '0 0 5 10',
												popup		: {
													select	: 'SINGLE',
													widget	: 'lookup-bzpl-popup',
													params	: { stor_grp : _global.stor_grp , line_stat : '0' },
													result	: function(records, nameField, pairField) {
														nameField.setValue(records[0].get('bzpl_name'));
														pairField.setValue(records[0].get('bzpl_idcd'));
													}
												}
											},{	name		: 'bzpl_idcd', xtype : 'textfield' , hidden : true
											},{	fieldLabel	: Language.get('acpt_date','요청일자'),
												xtype		: 'datefield',
												name		: 'invc_date',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												value		: new Date(),
												labelWidth	: 70,
												width		: 170,
												allowBlank	: false,
												fieldCls	: 'requiredindex',
												emptyText	: Const.invalid.emptyValue,
												margin		: '0 0 5 50',
											},{	fieldLabel	: Language.get('drtr_name','요청자'),
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												name		: 'drtr_name',
												pair		: 'drtr_idcd',
												allowBlank	: false,
												fieldCls	: 'requiredindex',
												emptyText	: Const.invalid.emptyValue,
												clearable	: false ,
												width		: 260,
												labelWidth	: 60,
												margin		: '0 0 5 50',
												popup		: {
													select	: 'SINGLE',
													widget	: 'lookup-user-popup',
													params	: { stor_grp : _global.stor_grp , line_stat : '0' },
													result	: function(records, nameField, pairField) {
														var panel1 = nameField.up('form');
														panel1.down('[name=dept_idcd]').setValue(records[0].get('dept_idcd'));
														nameField.setValue(records[0].get('user_name'));
														pairField.setValue(records[0].get('user_idcd'));
													}
												}
											},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
											},{	fieldLabel	: Language.get('', '요청번호' ),
												name		: 'invc_numb',
												xtype		: 'textfield',
												fieldCls	: 'requiredindex',
												allowBlank	: false,
												fieldCls	: 'requiredindex',
												readOnly	: true,
												emptyText	: Const.invalid.emptyValue,
												width		: 200,
												margin		: '0 0 5 50',
											}
										]
									},{	fieldLabel	: Language.get( 'change','change'),
										xtype		: 'textfield',
										name		: 'change',
										hidden		: true
									},{	fieldLabel	: Language.get( '','부서ID'),
										xtype		: 'textfield',
										name		: 'dept_idcd',
										hidden		: true
									}
								]
							}
						]
					}
				]
			};
			return item;
		},
		createTabs : function () {
			var me = this,
				tabs = {
					xtype	: 'panel',
					region	: 'center',
					header	: false,
					plain	: true,
					margin	: 0 ,
					items	: [ me.createWest() ]
				}
			;
			return tabs;
		},
	});
