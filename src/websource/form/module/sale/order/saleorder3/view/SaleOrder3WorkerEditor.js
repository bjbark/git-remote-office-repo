	Ext.define('module.sale.order.saleorder3.view.SaleOrder3WorkerEditor', { extend: 'Axt.form.Editor',

		alias	: 'widget.module-saleorder3-worker-editor',
		height	: 180,
		header	: false,
		getStore: function() {
			return Ext.getStore( 'module.sale.order.saleorder3.store.SaleOrder3Invoice' );
		},
		initComponent: function(config){
			var me = this;
			me.dockedItems = [ me.createWest() ] ;
			me.items = me.createTabs();
			me.callParent(arguments);
		},
	/**
	 *.
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
					margin		: '8 5 5 0',
					readOnly	: true
				},{	fieldLabel	: Language.get('pcod_numb', '고객주문번호' ),
					xtype		: 'textfield',
					fieldCls	: 'requiredindex',
					allowBlank	: true,
					emptyText	: Const.invalid.emptyValue,
					name		: 'pcod_numb',
				},{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
					name		: 'cstm_name',
					pair		: 'cstm_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					fieldCls	: 'requiredindex',
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					clearable	: true ,
					popup		: {
						widget	: 'lookup-cstm-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('cstm_name'));
							pairField.setValue(records[0].get('cstm_idcd'));

							var searchForm = Ext.ComponentQuery.query('module-saleorder3-worker-search')[0];

							//서치 param에 넣어주기
//							searchForm.down('[name=item_code]').popup.params.find = records[0].get('cstm_idcd');
							searchForm.down('[name=item_code]').popup.params.cstm_idcd = records[0].get('cstm_idcd');
						}
					},
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true,
					listeners	: {
						change	: function(){
							var searchForm = Ext.ComponentQuery.query('module-saleorder3-worker-search')[0];
							searchForm.down('[name=item_code]').popup.params.cstm_idcd = this.getValue();
							if(this.value == ''){
								me.down('[name=cstm_idcd]').setValue(null);
								searchForm.down('[name=item_code]').popup.params.cstm_idcd = null;
							}
						}
					}
				},{	fieldLabel	: Language.get('sale_drtr', '영업담당자' ),
					name		: 'drtr_name',
					pair		: 'drtr_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					fieldCls	: 'requiredindex',
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
				},{	fieldLabel	: Language.get('acpt_date', '주문일자' ),
					name		: 'invc_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
				},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
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
							width		: 1000,
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
