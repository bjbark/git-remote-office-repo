Ext.define('module.custom.hantop.item.cstmitemmap.view.CstmItemMapListerItem', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-cstmitemmap-lister-item',
	layout	: {
		type: 'border'
	},

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createpannel()];
		me.callParent()  ;
	},

	createpannel : function () {
		var me = this
			item = {
				xtype			: 'form-panel',
				dock			: 'top',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items	: [
									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '3 0 0 0',
										items	: [
											{	fieldLabel	: Language.get('','자재코드'),
												xtype		: 'popupfield',
												editable	: true,
												allowBlank	: false,
												enableKeyEvents : true,
												name		: 'item_code',
												pair		: 'item_idcd',
												popup: {
												select : 'SINGLE',
												widget : 'lookup-wind-item-popup',
												params : {
													stor_grp : _global.stor_grp ,
													line_stat : '0',
													brnd_bacd : '00',
												},
												result : function(records, nameField, pairField) {
													var panel1 = nameField.up('form');
													var item1 = Ext.ComponentQuery.query('module-cstmitemmap-lister-item1')[0];
													nameField.setValue(records[0].get('item_code'));
													pairField.setValue(records[0].get('item_idcd'));
													panel1.down('[name=item_name]').setValue(records[0].get('item_name'));
													panel1.down('[name=item_spec]').setValue(records[0].get('item_spec'));
													panel1.down('[name=acct_bacd]').setValue(records[0].get('acct_bacd'));

													item1.getStore().clearData();
													item1.getStore().loadData([],false);
													}
												},
											},{	name	: 'item_idcd'		, xtype : 'textfield', hidden : true
											},{	fieldLabel	: Language.get('','자재명'),
												xtype		: 'textfield',
												name		: 'item_name',
												readOnly	: true,
											},{
												xtype		: 'textfield',
												name		: 'acct_bacd',
												hidden		: true,
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '3 0 0 0',
										items	: [
											{	fieldLabel	: Language.get('','규격'),
												xtype		: 'textfield',
												name		: 'item_spec',
												readOnly : true
											},{	fieldLabel	: Language.get('','제품구분'),
												xtype		: 'lookupfield',
												name		: '',
												hidden		: true
											},{	fieldLabel	: Language.get('','약칭'),
												xtype		: 'textfield',
												name		: '',
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '3 0 0 0',
										items	: [
											{	fieldLabel	: Language.get('unit_name','단위'),
												xtype		: 'popupfield',
												name		: 'unit_name',
												pair		: 'unit_idcd',
												hidden		: true,
												width		: 140,
												popup		: {
													select	: 'SINGLE',
													widget	: 'lookup-unit-popup',
													params	: { stor_grp : _global.stor_grp, line_stat : '0' },
													result	: function(records, nameField, pairField){
														nameField.setValue(records[0].get('unit_name'));
														pairField.setValue(records[0].get('unit_idcd'));
													}
												}
											},{	xtype		: 'textfield', name : 'unit_idcd', hidden : true
											},{	fieldLabel	: Language.get('','포장수량'),
												xtype		: 'textfield',
												name		: '',
												hidden		: true,
												width		: 157,
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '3 0 0 0',
										items	: [
											{	fieldLabel	: Language.get('','공급처'),
												xtype		: 'lookupfield',
												name		: '',
												hidden		: true,
												fieldCls	: 'requiredindex',
												emptyText	: Const.invalid.emptyValue
											}
										]
									}
								]
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 100,
								height		: 50,
								margin		: '3 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction2'
							},
//							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '3 0 0 250',
//								items	: [
//									{	fieldLabel	: Language.get('brnd_bacd', '브랜드' ),
//										name		: 'brnd_name',
//										region		: 'east',
//										xtype		: 'popupfield',
//										width		: 200,
//										editable	: false,
//										enableKeyEvents : true,
//										clearable	: true,
//										pair		: 'brnd_bacd',
//										margin		: '0 0 3 0',
//										clearable	: true ,
//										popup: {
//											select : 'SINGLE',
//											widget : 'lookup-base-popup',
//											params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '4000' },
//											result : function(records, nameField, pairField) {
//												nameField.setValue(records[0].get('base_name'));
//												pairField.setValue(records[0].get('base_code'));
//											}
//										},
//									},{ xtype	: 'textfield', name : 'brnd_bacd', hidden : true,
//									},{	fieldLabel	: Language.get('','품목'),
//										xtype		: 'textfield',
//										name		: 'item_name2',
//										width		: 200,
//									}
//								]
//							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
//								xtype		: 'button',
//								width		: 100,
//								height		: 50,
//								margin		: '3 0 0 20',
//								cls			: 'button-style',
//								action		: 'selectAction3'
//							}
						]
					}
				]
			}
		;
		return item;
	},
});