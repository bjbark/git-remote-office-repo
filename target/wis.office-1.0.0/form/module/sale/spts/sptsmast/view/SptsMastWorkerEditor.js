Ext.define('module.sale.spts.sptsmast.view.SptsMastWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sptsmast-worker-editor',
	height	: 82,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.sale.spts.sptsmast.store.SptsMastWorkInvoice' );
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
						},{	fieldLabel	: Language.get('cstm','거래처'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'cstm_name',
							width		: 270,
							labelWidth	: 50,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							clearable	: true ,
							pair		: 'cstm_idcd',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0'},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
							listeners: {
								change : function(self, value) {
									Ext.ComponentQuery.query('module-sptsmast-worker-lister')[0].getStore().clearData();
									Ext.ComponentQuery.query('module-sptsmast-worker-lister')[0].getStore().loadData([],false);
								}
							}
						},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('wrhs_name', '출고창고' ),
							name		: 'wrhs_name',
							pair		: 'wrhs_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							width		: 320,
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
						},{	name	: 'wrhs_idcd', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('drtr_name', '출고담당' ),
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
						},{	fieldLabel	: Language.get('ostt_schd_date','출고예정일'),
							name		: 'ostt_date',
							xtype		: 'datefield',
							labelWidth	: 80,
							width		: 175,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						}
						,{	fieldLabel	: Language.get('','납품처'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'cstm_name',
							width		: 270,
							labelWidth	: 50,
							clearable	: true ,
							hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
							pair		: 'dlvy_cstm_idcd',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0'},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
							listeners: {
								change : function(self, value) {
								}
							}
						},{	name : 'dlvy_cstm_idcd', xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
		return item;
	}
});
