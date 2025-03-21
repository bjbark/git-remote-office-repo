Ext.define('module.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-goodsosttwork-worker-editor',
	height	: 82,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoice' );
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
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 5 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('new_invc_numb', '출고번호' ),
							xtype		: 'textfield',
							name		: 'new_invc_numb',
							allowBlank	: true,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							margin		: '5 5 5 0',
							width		: 270,
							labelWidth	: 50,
							readOnly	: false,
							hidden		: true
						}
//						,{	fieldLabel	: Language.get('wrhs_name', '출고창고' ),
//							name		: 'wrhs_name',
//							pair		: 'wrhs_idcd',
//							xtype		: 'popupfield',
//							editable	: true,
//							enableKeyEvents : true,
//							clearable	: true ,
//							width		: 245,
//							labelWidth	: 55,
//							fieldCls	: 'requiredindex',
//							emptyText	: Const.invalid.emptyValue,
//							popup		: {
//								widget	: 'lookup-wrhs-popup',
//								select	: 'SINGLE',
//								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
//								result	: function(records, nameField, pairField ) {
//									nameField.setValue(records[0].get('wrhs_name'));
//									pairField.setValue(records[0].get('wrhs_idcd'));
//								}
//							}
//						},{	name	: 'wrhs_idcd', xtype	: 'textfield', hidden : true
//						}
						,{	fieldLabel	: Language.get('drtr_name', '출고담당' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: false ,
							width		: 155,
							labelWidth	: 55,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name	: 'drtr_idcd', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('ostt_date', '출고일자' ),
							name		: 'ostt_date',
							xtype		: 'datefield',
							labelWidth	: 80,
							width		: 175,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: Language.get('dlvy_name','납품처'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'dlvy_name',
							pair		: 'dlvy_idcd',
							labelWidth	: 70,
							width		: 250,
							clearable	: true,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-cstm-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0'},
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
							hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true
						},{	name		: 'dlvy_idcd', xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
		return item;
	}
});
