Ext.define('module.custom.dehansol.item.salepricework.view.SalePriceWorkEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-salepricework-editor',

	height : 360,
	layout : {
		type: 'border'
	},

	title			: Language.get('sale_pric','판매단가 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'sale_pric',

	initComponent: function(){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom',
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
				width			: 420,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 358, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','품목코드'),
								name		: 'item_idcd',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 160
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 -2 0 5'
							},{	fieldLabel	: Language.get('','등록일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								labelWidth	: 45,
								width		: 140
							}
						]
					},{	fieldLabel	: Language.get('cstm_name','거래처명'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						allowBlank	: false,
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
					},{	fieldLabel	: Language.get('item_make_dvcd', '제판종류' ),
						xtype		: 'lookupfield',
						name		: 'item_make_dvcd',
						lookupValue	: resource.lookup('item_make_dvcd'),
					},{	fieldLabel	: Language.get('item_type_dvcd', '필름유제' ),
						xtype		: 'lookupfield',
						name		: 'item_type_dvcd',
						lookupValue	: resource.lookup('item_type_dvcd'),
					},{	fieldLabel	: Language.get( 'mesh_name','망사명'),
						xtype		: 'textfield',
						name		: 'mesh_name',
						width		: 358,
					},{	fieldLabel	: Language.get( 'diag_sqre','대각/평각'),
						xtype		: 'textfield',
						name		: 'diag_sqre',
						width		: 358,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('plmk_size_horz', '사이즈' ),
								xtype		: 'numericfield',
								name		: 'plmk_size_horz',
								labelWidth	: 95,
								width		: 215,
								margin		: '0 0 0 5',
							},{	fieldLabel	: Language.get('', 'X' ),
								xtype		: 'numericfield',
								name		: 'plmk_size_vrtl',
								labelWidth	: 5,
								width		: 133,
								margin		: '0 0 0 5',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('dict_yorn', '다이렉트여부' ),
								xtype		: 'lookupfield',
								name		: 'dict_yorn',
								labelWidth	: 100,
								width		: 216,
								lookupValue	: resource.lookup('yorn'),
							},{	fieldLabel	: Language.get( 'unit_name','단위'),
								xtype		: 'popupfield',
								name		: 'unit_name',
								labelWidth	: 50,
								width		: 129,
								xtype		: 'popupfield',
								name		: 'unit_name',
								pair		: 'unit_idcd',
								margin		: '0 0 0 12',
								clearable	: false ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-unit-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_idcd'));
									}
								}
							},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get( 'mesh_ndqt','메쉬소요량'),
								xtype		: 'numericfield',
								name		: 'mesh_ndqt',
								width		: 215,
							}
						]
				},{	fieldLabel	: Language.get( 'sale_pric','판매단가'),
						xtype		: 'numericfield',
						name		: 'sale_pric',
						width		: 215,
						allowBlank	: false,
						minValue	: 0,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			hidden = !(_global.hqof_idcd=='N1000iypkg'),
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1()]
			}
		;
		console.log(hidden);
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 250,
						flex		: 1
					},{	fieldLabel	: '',
						name		: 'lookup_val',
						xtype		: 'textarea	',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	},

});