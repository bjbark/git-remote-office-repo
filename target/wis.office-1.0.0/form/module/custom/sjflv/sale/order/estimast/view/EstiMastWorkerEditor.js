Ext.define('module.custom.sjflv.sale.order.estimast.view.EstiMastWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sjflv-estimast-worker-editor',
	height	: 180,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.sjflv.sale.order.estimast.store.EstiMastInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 70 },
			items		: [
				{	fieldLabel	: Language.get('acpt_numb', '견적번호' ),
					xtype		: 'textfield',
					name		: 'invc_numb',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					emptyText	: Const.invalid.emptyValue,
					margin		: '5 5 5 0'
				}
				,{	fieldLabel	: Language.get('cstm_code', '거래처코드' ),
					name		: 'cstm_code',
					pair		: 'cstm_idcd',
					xtype		: 'popupfield',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					clearable	: true ,
					popup		: {
						widget	: 'lookup-cstm-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
						result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('cstm_code'));
								pairField.setValue(records[0].get('cstm_idcd'));
//								panel1.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
//
////								nameField.setValue(records[0].get('cstm_idcd'));
////								pairField.setValue(records[0].get('cstm_name'));
//								var search = Ext.ComponentQuery.query('module-sjflv-estimast-worker-search')[0];
//								var item_popup = search.down('[name=item_code]');
						}
					}
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
					name		: 'cstm_name',
					xtype		: 'textfield',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					clearable	: false ,
				},{	fieldLabel	: Language.get('sale_drtr_name', '영업담당자' ),
					name		: 'drtr_name',
					pair		: 'drtr_idcd',
					xtype		: 'popupfield',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					clearable	: true ,
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
				},{	fieldLabel	: Language.get('esti_date', '견적일자' ),
					name		: 'invc_date',
					xtype		: 'datefield',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD
				},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
				}
				,{	fieldLabel	: Language.get('deli_date', '납기일자' ),
					name		: 'deli_date',
					xtype		: 'datefield',
					readOnly	: true,
					fieldCls	: 'readonlyfield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					emptyText	: Const.invalid.emptyValue
				},{fieldLabel	: Language.get( 'change','change'),
					xtype		: 'textfield',
					name		: 'change',
					hidden		: true
				}
			]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var item = {
			title 			: '메모사항',
			xtype 			: 'form-panel',
			region			: 'west',
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 50, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset',
					layout	: 'vbox' ,
					padding	: '0',
					border	: 0,
					margin	: '0 0 5 0',
					items	: [
						{	xtype		: 'textarea',
							name		: 'memo',
							height		: 143,
							width		: 650,
							maxLength	: 100,
							maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						}
					]
				}
			]
		}
	;
	return item;
	}
});
