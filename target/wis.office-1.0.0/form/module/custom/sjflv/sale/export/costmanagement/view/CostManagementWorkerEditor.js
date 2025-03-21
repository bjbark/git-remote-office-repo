Ext.define('module.custom.sjflv.sale.export.costmanagement.view.CostManagementWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sjflv-costmanagement-worker-editor',
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.sjflv.sale.export.costmanagement.store.CostManagementInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
				xtype		: 'form-panel' ,
				bodyStyle	: { padding: '5px' },
				flex		: 1 ,
				height		: 180,
				fieldDefaults	: { width : 180, labelWidth : 70, labelSeparator : '' , },
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', border		: 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('', '관리번호' ),
										xtype		: 'textfield',
										name		: '',
										width		: 200,
										allowBlank	: false ,
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',
									},{	xtype		: 'lookupfield',
										name		: 'line_stat',
										lookupValue	: resource.lookup('line_stat'),
										width		: 50,
										margin		: '1 0 0 2'
									},{	fieldLabel	: Language.get('invc_date','발생일자'),
										xtype		: 'datefield',
										name		: '',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
									},{	fieldLabel	: Language.get('','발생단계'),
										xtype		: 'lookupfield',
										name		: '',
										lookupValue	: resource.lookup(''),
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('', '근거번호' ),
										xtype		: 'textfield',
										name		: '',
										width		: 252,
										allowBlank	: false ,
									},{	fieldLabel	: Language.get('bzpl', '사업장' ),
										xtype		: 'popupfield',
										name		: 'bzpl_name',
										pair		: 'bzpl_idcd',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										popup		: {
											widget	: 'lookup-bzpl-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('bzpl_name'));
												pairField.setValue(records[0].get('bzpl_idcd'));
											}
										}
									},{ xtype:'textfield', name:'bzpl_idcd',hidden:true
									},{	fieldLabel	: Language.get('drtr_name','담당자'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'drtr_name',
										pair		: 'drtr_idcd',
										clearable	: true,
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
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('', '지급처명' ),
										xtype		: 'textfield',
										name		: '',
										width		: 252,
										allowBlank	: false ,
									},{	fieldLabel	: Language.get('', '비용구분' ),
										xtype		: 'popupfield',
										name		: '',
										pair		: '',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										popup		: {
											widget	: 'lookup-bzpl-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get(''));
												pairField.setValue(records[0].get(''));
											}
										}
									},{ xtype:'textfield', name:'',hidden:true
									},{	fieldLabel	: Language.get('', '지급방법' ),
										xtype		: 'lookupfield',
										name		: '',
										lookupValue	: resource.lookup(''),
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('', '지급액' ),
										xtype		: 'numericfield',
										name		: '',
										width		: 252,
										allowBlank	: false ,
									},{	fieldLabel	: Language.get('', '세액' ),
										xtype		: 'numericfield',
										name		: '',
										allowBlank	: false ,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('', '지급계좌' ),
										xtype		: 'textfield',
										name		: '',
										width		: 252,
										allowBlank	: false ,
									},
								]
							}
						]
					}
				]
			};
		return item;
	}
});
