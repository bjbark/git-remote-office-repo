Ext.define('module.custom.dhtec.sale.order.saleplanorder.view.SalePlanOrderEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-saleplanorder-editor',

	height : 260,
	layout : {
		type: 'border'
	},

	title			: Language.get('wrhs_idcd','년간 영업목표 정보'),
	collapsible 	: false,
	collapsed		: false,
	defaultFocus	: '',

	initComponent: function(config) {
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 380,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name 	: 'wrhs_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('invc_date','계획일자'),
								name		: 'invc_date',
								xtype		: 'datefield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								width		: 200,
								margin		:'0 0 0 0'
							},{	fieldLabel	: Language.get('mngt_wrhs_dvcd','판매구분'),
								xtype		: 'lookupfield',
								name		: '',
								labelWidth	: 50,
								width		: 120,
								lookupValue	: resource.lookup(''),
								margin		:'0 0 0 10'
							}
						]
					},{	fieldLabel	: Language.get( '' , '고객'),
						xtype		: 'popupfield',
						editable : true,
						enableKeyEvents : true,
						name		: '_name',
						pair		: '_idcd',
						width		: 200,
						allowBlank	: true,
						clearable	: false ,
						onwerEditing: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup--popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0'},
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('_name'));
								pairField.setValue(records[0].get('_idcd'));
							}
						}
					},{	name		: '_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('drtr_name','영업담당자'),
						xtype		: 'popupfield'	,
						name		: 'drtr_name'	,
						pair		: 'drtr_idcd'	,
						width		: 200,
						editable	: true,
						enableKeyEvents : true,
						clearable	: false ,
							popup	: {
								select : 'SINGLE',
								widget : 'lookup-user-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
					},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('drtr_name','품목'),
						xtype		: 'popupfield'	,
						name		: 'item_name'	,
						pair		: 'item_idcd'	,
						width		: 280,
						editable	: true,
						enableKeyEvents : true,
						clearable	: false ,
							popup	: {
								select : 'SINGLE',
								widget : 'lookup-item-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
								}
							}
					},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('','규격'),
						name		: 'item_spec',
						xtype		: 'textfield',
						width		: 220
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pqty_mxm2','계획수량'),
								name		: '',
								xtype		: 'numericfield',
								labelWidth	: 70,
								width		: 140,
								margin		:'0 0 0 30'
							},{	fieldLabel	: Language.get('pqty_mxm2','단가'),
								name		: '',
								xtype		: 'numericfield',
								width		: 150,
								labelWidth	: 50,
								margin		:'0 0 0 10'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pqty_mxm2','환율'),
								name		: '',
								xtype		: 'numericfield',
								width		: 180,
								labelWidth	: 70,
								width		: 140,
								margin		:'0 0 0 30'
							},{	fieldLabel	: Language.get('pqty_mxm2','계획금액'),
								name		: '',
								xtype		: 'numericfield',
								width		: 150,
								labelWidth	: 50,
								margin		:'0 0 0 10'
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1()]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','비고'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' 		,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '비고를 적어주십시오',
						height		: 167,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val',
						xtype		: 'textarea'  ,
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});