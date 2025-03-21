Ext.define('module.prod.order.otodwork.view.OtodWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-otodwork-worker-editor',
	height	: 150,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.prod.order.otodwork.store.OtodWorkInvoice' );
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
						{	fieldLabel	: Language.get('new_invc_numb', '발주번호' ),
							xtype		: 'textfield',
							name		: 'new_invc_numb',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							margin		: '5 5 5 0',
							hidden		: true
						},{	fieldLabel	: Language.get('cstm', '거래처' ),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'cstm_name',
							allowBlank	: false,
							pair		: 'cstm_idcd',
							clearable	: true ,
							popup		: {
								widget	: 'lookup-cstm-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0', otod_cstm_yorn : '1' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
						},{	name : 'cstm_name', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('drtr_name', '구매담당' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							width		: 170,
							labelWidth	: 50 ,
							clearable	: false ,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true
						},{	name : 'drtr_name', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('offr_date', '발주일자' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							width		: 170,
							labelWidth	: 50 ,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value : new Date(),
						},{	name : 'offr_dvcd', xtype	: 'textfield', hidden : true , value : '3000'
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
							xtype		: 'button',
							width		: 80,
							height		: 25,
							margin		: '4 0 0 85',
							cls			: 'button-style',
							action		: 'selectAction3'
						}
					]
				}
			]
		};
		return item;
	}
});
