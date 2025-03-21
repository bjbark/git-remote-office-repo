Ext.define('module.custom.sjflv.sale.export.nego.view.NegoWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sjflv-nego-worker-editor',
	store		: 'module.custom.sjflv.sale.export.nego.store.NegoWorkerEditor',

	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.sjflv.sale.export.nego.store.NegoInvoice' );
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
				height		: 95,
				fieldDefaults	: { width : 210, labelWidth : 70, labelSeparator : '' , },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox', border		: 0,
						items : [
							{	xtype : 'fieldset', layout: 'vbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('dept', '사업부' ),
										xtype		: 'popupfield',
										name		: 'dept_name',
										pair		: 'dept_idcd',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										popup		: {
											widget	: 'lookup-dept-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('dept_name'));
												pairField.setValue(records[0].get('dept_idcd'));
											}
										}
									},{ xtype:'textfield', name:'dept_idcd',hidden:true
									},{	fieldLabel	: Language.get('buyr_name', 'Buyer' ),
										xtype		: 'textfield',
										name		: 'buyr_name',
									},{	fieldLabel	: Language.get('expt_dvcd','수출구분'),
										xtype		: 'lookupfield',
										name		: 'expt_dvcd',
										lookupValue	: resource.lookup('expt_dvcd'),
									}
								]
							},{	xtype : 'fieldset', layout: 'vbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('ordr_numb', 'Order No' ),
										xtype		: 'popupfield',
										name		: 'invc_numb',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										popup		: {
											widget	: 'lookup-ordr-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('invc_numb'));
											}
										}
									},{	fieldLabel	: Language.get('mdtn_prsn', '중개인' ),
										xtype		: 'textfield',
										name		: 'mdtn_prsn',
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
							},{	xtype : 'fieldset', layout: 'vbox', border		: 0,
								items : [
									{	xtype : 'fieldset', layout: 'hbox', border	: 0,margin:'0 0 5 0',
										items : [
											{	fieldLabel	: Language.get('invc_date','통관기간'),
												xtype		: 'betweenfield',
												name		: 'invc_date1',
												pair		: 'invc_date2',
												root		: true,
												labelWidth	: 60,
												width		: 160,
												value		:''
											},{	fieldLabel	: Language.get('','~'),
												xtype		: 'betweenfield',
												name		: 'invc_date2',
												pair		: 'invc_date1',
												width		: 115,
												labelWidth	: 15,
												value		:''
											}
										]
									}
								]
							},{	xtype : 'fieldset', layout: 'vbox', border		: 0,
								items : [
									{	text		: '<span class="btnTemp" style="font-size:1.3em">대기 B/L조회</span>',
										xtype		: 'button',
										width		: 160,
										height		: 80,
										cls			: 'button-style',
										action		: 'selectAction2'
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
