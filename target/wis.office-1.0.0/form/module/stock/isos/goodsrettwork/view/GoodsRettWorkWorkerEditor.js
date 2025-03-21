Ext.define('module.stock.isos.goodsrettwork.view.GoodsRettWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-goodsrettwork-worker-editor',
	height	: 82,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.stock.isos.goodsrettwork.store.GoodsRettWorkInvoice' );
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
						{	fieldLabel	: Language.get('rett_numb', '반품번호' ),
							xtype		: 'textfield',
							name		: 'invc_numb',
							allowBlank	: true,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							margin		: '5 5 5 0',
							width		: 270,
							labelWidth	: 50,
							readOnly	: false,
							hidden		: true
						}
//						,{	fieldLabel	: Language.get('cstm_name','거래처'),
//							xtype		: 'popupfield',
//							editable	: true,
//							enableKeyEvents : true,
//							name		: 'cstm_name',
//							width		: 270,
//							labelWidth	: 50,
//							fieldCls	: 'requiredindex',
//							emptyText	: Const.invalid.emptyValue,
//							clearable	: false ,
//							pair		: 'cstm_idcd',
//							popup: {
//								select : 'SINGLE',
//								widget : 'lookup-cstm-popup',
//								params : { stor_grp : _global.stor_grp , line_stat : '0'},
//								result : function(records, nameField, pairField) {
//									nameField.setValue(records[0].get('cstm_name'));
//									pairField.setValue(records[0].get('cstm_idcd'));
//								}
//							},
//							listeners: {
//								change : function(self, value) {
//									Ext.ComponentQuery.query('module-goodsrettwork-worker-lister')[0].getStore().clearData();
//									Ext.ComponentQuery.query('module-goodsrettwork-worker-lister')[0].getStore().loadData([],false);
//								}
//							}
//						}
						,{	fieldLabel	: Language.get('cstm_idcd', '' ),
							xtype		: 'textfield',
							name		: 'cstm_idcd',
							allowBlank	: true,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							margin		: '5 5 5 0',
							width		: 270,
							labelWidth	: 50,
							readOnly	: false,
							hidden		: true
						},{	name : 'cstm_name', xtype : 'textfield' , hidden : true
						}
						,{	fieldLabel	: Language.get('', '반품입고창고' ),
							name		: 'rett_wrhs_name',
							pair		: 'rett_wrhs_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							clearable	: false ,
							width		: 250,
							labelWidth	: 75,
							popup		: {
								widget	: 'lookup-wrhs-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('wrhs_name'));
									pairField.setValue(records[0].get('wrhs_idcd'));
								}
							}
						},{	name	: 'rett_wrhs_idcd', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('drtr_name', '담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							width		: 190,
							labelWidth	: 75,
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
						},{	fieldLabel	: Language.get('rett_date', '반품일자' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							labelWidth	: 80,
							width		: 175,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						}
					]
				}
			]
		};
		return item;
	}
});
