Ext.define('module.custom.hantop.sale.saleorder.view.SaleOrderWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-saleorder-worker-editor',
	height	: 180,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.hantop.sale.order.saleorder.store.SaleOrderInvoice' );
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
			fieldDefaults: { width : 280, labelWidth : 70, margin : '10 0 0 0'},
			items		: [
				{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
					xtype		: 'textfield',
					name		: 'invc_numb',
					allowBlank	: false,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					margin		: '7 5 5 0',
					readOnly	: true
				},{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
					name		: 'cstm_name',
					pair		: 'cstm_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					fieldCls	: 'requiredindex',
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					clearable	: false ,
					popup		: {
						widget	: 'lookup-cstm-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('cstm_name'));
							pairField.setValue(records[0].get('cstm_idcd'));
						}
					}
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('sale_drtr_name', '영업담당자' ),
					name		: 'user_name',
					pair		: 'drtr_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					value		: _global.login_nm,
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
				},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id
				},{	fieldLabel	: Language.get('acpt_date', '주문일자' ),
					name		: 'invc_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
				},{	fieldLabel	: Language.get('cstm_pcod_numb', '고객주문번호' ),
					xtype		: 'textfield',
					name		: 'pcod_numb',
				},{	xtype		: 'textfield',
					name		: 'chk',
					margin		: '5 5 5 0',
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


	/**
	 *
	 */
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
							name		: 'user_memo',
							height		: 143,
							width		: '100%',
							maxLength	: 100,
							maxLengthText: '한글 100자 이내로 작성하여 주십시오.'
						}
					]
				}
			]
		}
	;
	return item;
	}
});
