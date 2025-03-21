Ext.define('module.stock.lot.lotchange.view.LotChangeEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-lotchange-editor',
	height : 330,
	layout : {
		type: 'border'
	},

	collapsible 	: true	,
	collapsed		: true	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
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
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 5 5 0',
						items		: [
							{	fieldLabel	: Language.get('lott_numb','LOT번호'),
								name		: 'lott_numb',
								xtype		: 'textfield',
								itemId		: 'lott',
								width		: 380,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								fieldStyle	: 'text-align: left;'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 5 0 0',
						items	: [
							{	fieldLabel	: Language.get('item_code', '품목코드' ),
								name		: 'item_code',
								xtype		: 'textfield',
								editable	: true,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
//								enableKeyEvents : true,
//								itemId		: 'code',
								width		: 380,
								margin		: '0 0 5 0',
//								clearable	: false ,
//								popup: {
//									select : 'SINGLE',
//									widget : 'lookup-item-popup',
//									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102'},
//									result : function(records, nameField, pairField) {
//										var	item_name		= me.down('[name=item_name]'),
//											item_spec		= me.down('[name=item_spec]'),
//											modl_name		= me.down('[name=modl_name]'),
//											unit_name		= me.down('[name=unit_name]'),
//											acct_bacd		= me.down('[name=acct_bacd]'),
//											acct_bacd_name	= me.down('[name=acct_bacd_name]')
//										;
//										console.log(records[0].get('unit_name'));
//										acct_bacd_name.setValue(records[0].get('acct_bacd_name'));
//										acct_bacd.setValue(records[0].get('acct_bacd'));
//										item_name.setValue(records[0].get('item_name'));
//										item_spec.setValue(records[0].get('item_spec'));
//										modl_name.setValue(records[0].get('modl_name'));
//										unit_name.setValue(records[0].get('unit_name'));
//										nameField.setValue(records[0].get('item_code'));
//										pairField.setValue(records[0].get('item_idcd'));
//									}
//								}
//							},{	name : 'item_idcd',itemId		: 'item_idcd', xtype	: 'textfield', hidden : true
							}
						]
					},{	fieldLabel	: Language.get('item_name','품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						itemId		: 'name',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						width		: 380,
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('item_spec','규격'),
								name		: 'item_spec',
								itemId		: 'spec',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 380,
								fieldStyle	: 'text-align: left;'
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('modl_name','모델명'),
								name		: 'modl_name',
								itemId		: 'model',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								xtype		: 'textfield',
								width		: 380,
								fieldStyle	: 'text-align: left;'
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('acct_bacd_name','계정구분'),
								xtype		: 'textfield',
								name		: 'acct_bacd_name',
								width		: 200,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('','기준단위'),
								xtype		: 'textfield',
								fieldCls	: 'readonlyfield',
								name		: 'unit_name',
								readOnly	: true,
								labelWidth	: 100,
								width		: 180
							},{ xtype		: 'textfield', name	: 'acct_bacd', hidden:true
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('invc_numb','수불근거/순번'),
								xtype		: 'textfield',
								name		: 'invc_numb',
								width		: 345,
							},{	xtype		: 'textfield',
								name		: 'invc_seqn',
								xtype		: 'numericfield',
								margin		: '0 0 0 5',
								width		: 30,
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							,{	fieldLabel	: Language.get('wrhs_name','창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								width		: 200,
								pair		: 'wrhs_idcd',
								popup: {
									select  : 'SINGLE',
									widget  : 'lookup-wrhs-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
	 								}
								}
							},{ name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('','수불일자'),
								xtype		: 'datefield',
								fieldCls	: 'requiredindex',
								allowBlank	: false,
								emptyText	: Const.invalid.emptyValue,
								name		: 'invc_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 200
							},{	fieldLabel	: Language.get('','조정수량'),
								xtype		: 'numericfield',
								name		: 'qntt',
								fieldCls	: 'requiredindex',
								allowBlank	: false,
								emptyText	: Const.invalid.emptyValue,
								width		: 180,
							},{	fieldLabel	: Language.get('','순번'),
								xtype		: 'numericfield',
								name		: 'line_seqn',
								hidden		: true,
								width		: 200,
							},{	fieldLabel	: Language.get('','품목'),
								xtype		: 'textfield',
								name		: 'item_idcd',
								hidden		: true,
								width		: 200,
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
				border:0,
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
				title		:  Language.get('user_memo','메모'),
				layout		: 'hbox'		,
				border		: 0				,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '내용을 적어주십시오',
						height		: 270,
						flex		: 1
					}
				]
		}
		;
		return item;
	}
});