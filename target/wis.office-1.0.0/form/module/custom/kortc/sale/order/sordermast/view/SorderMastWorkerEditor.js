Ext.define('module.custom.kortc.sale.order.sordermast.view.SorderMastWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sordermast-worker-editor',
	height	: 180,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.kortc.sale.order.sordermast.store.SorderMastInvoice' );
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
			fieldDefaults: { width : 280, labelWidth : 60 },
			items		: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
						items : [
							{	fieldLabel	: Language.get('acpt_numb', '주문번호' ),
								xtype		: 'textfield',
								name		: 'invc_numb',
								width		: 270,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								readOnly	: true
							},{	xtype		: 'textfield',
								name		: 'amnd_degr',
								width		: 30,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								margin		: '1 0 0 5',
								emptyText	: Const.invalid.emptyValue,
								readOnly    : true,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
						items : [
							{	fieldLabel	: Language.get('acpt_case_name', '주문명' ),
								xtype		: 'textfield',
								name		: 'acpt_case_name',
								width		: 310,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('cstm_code', '거래처코드' ),
								name		: 'cstm_idcd',
								pair		: 'cstm_name',
								xtype		: 'popupfield',
								width		: 310,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cstm_idcd'));
										pairField.setValue(records[0].get('cstm_name'));
										var search = Ext.ComponentQuery.query('module-sordermast-worker-search')[0];
										var item_popup = search.down('[name=item_code]');
									}
								}
							},{	name : 'cstm_code', xtype	: 'textfield', hidden : true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
						{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
							name		: 'cstm_name',
							xtype		: 'textfield',
							fieldCls	: 'requiredindex',
							width		: 310,
							allowBlank	: false,
							emptyText	: Const.invalid.emptyValue,
							clearable	: false ,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
						{	fieldLabel	: Language.get('sale_drtr_name', '영업담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							width		: 310,
							editable	: true,
							enableKeyEvents : true,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							clearable	: true ,
							allowBlank	: false,
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
						},
					]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
						{	fieldLabel	: Language.get('esti_date', '주문일자' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							width		: 155,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
						},{	fieldLabel	: Language.get('deli_date', '납기일자' ),
							name		: 'deli_date',
							xtype		: 'datefield',
							width		: 155,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							enableKeyEvents : true,
							listeners	: {
								change	: function(self, value) {
									var searchDeli = Ext.ComponentQuery.query('module-sordermast-worker-search')[0];
									searchDeli.down('[name=deli_date2]').setValue(this.value);
									searchDeli.down('[name=deli_hidn]').setValue(this.value);
								}
							}
						}
					]
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
							height		: 140,
							width		: 690,
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
