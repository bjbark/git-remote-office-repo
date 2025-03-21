Ext.define('module.sale.order.saleorder2.view.SaleOrder2WorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-saleorder2-worker-editor',
	height	: 175,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.sale.order.saleorder2.store.SaleOrder2Invoice' );
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
				{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
					xtype		: 'textfield',
					name		: 'invc_numb',
					itemId		: 'acpt_numb',
					allowBlank	: false,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					margin		: '5 5 5 0',
					readOnly	: false //두인요청으로 false
				},{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
					name		: 'cstm_name',
					pair		: 'cstm_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					fieldCls	: 'requiredindex',
					allowBlank	: false,
					margin		: '10 5 5 0',
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
				},{	fieldLabel	: Language.get('cstm_drtr_name', '담당자' ),
					name		: 'cstm_drtr_name',
					xtype		: 'textfield',
					fieldCls	: 'requiredindex',
					allowBlank	: false,
					margin		: '10 5 5 0'
				},{	fieldLabel	: Language.get('pcod_numb', '고객주문번호' ),
					xtype		: 'textfield',
					allowBlank	: true,
					name		: 'pcod_numb',
					margin		: '10 5 5 0'
				},{	fieldLabel	: Language.get('remk_text', '후공정부서 및 거래처' ),
					xtype		: 'textfield',
					allowBlank	: true,
					name		: 'remk_text',
					margin		: '0 5 5 0'
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
			title 			: '발주품목비고',
			xtype 			: 'form-panel',
			region			: 'west',
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 65, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset',
					layout	: 'vbox' ,
					padding	: '0',
					border	: 0,
					margin	: '0 0 5 0',
					items	: [
						{
							xtype		: 'textarea',
							name		: 'user_memo',
							height		: 135,
							width		: 1092,
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
