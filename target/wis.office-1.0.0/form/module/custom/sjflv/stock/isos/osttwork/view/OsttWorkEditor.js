Ext.define('module.custom.sjflv.stock.isos.osttwork.view.OsttWorkEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-osttwork-editor',

	height : 300,
	layout : {
		type: 'border'
	},

	title			: Language.get('ostt_work','제품출고작업 등록'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: '',
//
	initComponent: function(config) {
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style',itemId : 'update'  },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style',itemId : 'cancel' }, '-'
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
				width			: 700,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name 	: 'wrhs_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','거래처코드'),
								xtype		: 'popupfield',
								name		: 'cstm_code',
								pair		: 'cstm_idcd',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								clearable	: true,
								labelWidth	: 100,
								width		: 200,
								margin		: '0 0 0 0',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										var panel1 = nameField.up('form');
										var layout = ('[name=ostt_work]');
										panel1.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
										nameField.setValue(records[0].get('cstm_code'));
										pairField.setValue(records[0].get('cstm_idcd'));
									},
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	fieldLabel	: Language.get('cstm_name','거래처명'),
						xtype		: 'textfield',
						name		: 'cstm_name'
					},{	fieldLabel	: Language.get('','품목코드'),
						xtype		: 'popupfield',
						name		: 'item_code',
						pair		: 'item_idcd',
						labelWidth	: 100,
						width		: 200,
						editable	: true,
						enableKeyEvents : true,
						clearable	: true ,
						popup		: {
							widget	: 'lookup-item-popup',
							select	: 'SINGLE',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField ) {
								var panel1 = nameField.up('form');
								var layout = ('[name=ostt_work]');
								panel1.down('[name=item_name]').setValue(records[0].get('item_name'));
								panel1.down('[name=item_spec]').setValue(records[0].get('item_spec'));
								nameField.setValue(records[0].get('item_code'));
								pairField.setValue(records[0].get('item_idcd'));
							}
						}
					},{	name : 'item_idcd', xtype	: 'textfield', hidden : true
					},{ fieldLabel	: Language.get('','품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						width		: 450,
					},{ fieldLabel	: Language.get('','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						width		: 450,
					},{	fieldLabel	: Language.get('','담당자'),
						xtype		: 'popupfield',
						name		: 'drtr_name',
						pair		: 'drtr_idcd',
						clearable	: true,
						width		: 190,
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
					},{	fieldLabel	:  Language.get( '' , '출고작업내용'),
						name		: 'ostt_work_cont',
						xtype		: 'textarea',
						width		: 605,
						height		: 55,
					}
				]
			}
		;
		return item;
	},

});