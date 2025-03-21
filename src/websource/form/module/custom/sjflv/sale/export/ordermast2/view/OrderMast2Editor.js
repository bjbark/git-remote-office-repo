 Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2Editor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-sjflv-export-ordermast2-editor',
	height		: 455,
	layout		: { type: 'border' },
	title		: 'Invoice 정보',
	collapsible	: true,
	collapsed	: false ,
	defaultFocus : 'cust_nm',
	//64 +
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.items       = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this;
		var item =
			{	xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' },
				]
			};
		return item;
	},

	/**
	 *
	 */
	createWest : function () {
		var me = this,
			item ={
				xtype		: 'form-panel',
				dock		: 'left',
				bodyStyle	: { padding: '5px' },
				width		: 610,
				fieldDefaults: { width : 370, labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '4 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'invc_numb', 'Invoice No' ),
								name		: 'ordr_numb',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 200,
								hidden		: true
							},{	fieldLabel	: Language.get( '', 'Invoice No' ),
								name		: 'cust_invc_numb',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 200
							},{	fieldLabel	: Language.get('invc_date','Invoice Date'),
								xtype		: 'datefield',
								name		: 'invc_date',
								labelWidth	: 80,
								width		: 180,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							},{	fieldLabel	: Language.get( 'cstm_pcod_numb', 'Customer Order No' ),
								name		: 'cstm_pcod_numb',
								xtype		: 'textfield',
								labelWidth	: 105,
								width		: 205
							}
						]
					},{	fieldLabel	:  Language.get( 'ship_name' , 'Shipper'),
						name		: 'ship_name',
						xtype		: 'textarea',
						width		: 585,
					},{	fieldLabel	:  Language.get( 'csge_name' , 'Consignee'),
						name		: 'csge_name',
						xtype		: 'textarea',
						width		: 585,
						height		: 70
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '4 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'ogin_name', 'Country of Origin' ),
								name		: 'ogin_name',
								xtype		: 'textfield',
								width		: 260,
								value		: 'Korea'
							},{	fieldLabel	: Language.get( 'pric_cond_dvcd', 'Term Of Delivery' ),
								name		: 'pric_cond_dvcd',
								xtype		: 'lookupfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								lookupValue	: resource.lookup('pric_cond_dvcd'),
								labelWidth	: 165,
								width		: 325
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						margin	: '4 0 5 0' ,
						items	: [
							{	fieldLabel	: Language.get( 'ship_port', 'Port of loading' ),
								name		: 'ship_port',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 260,
							},{	fieldLabel	: Language.get( 'arvl_port', 'Destination' ),
								name		: 'arvl_port',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 165,
								width		: 325
							}
						]
					},{	fieldLabel	:  Language.get( 'paym_cond_name' , 'Term Of payment'),
						name		: 'paym_cond_name',
						xtype		: 'textarea',
						width		: 585,
					},{	fieldLabel	:  Language.get( 'ntfc_text' , 'Notify'),
						name		: 'ntfc_text',
						xtype		: 'textarea',
						width		: 585,
						height		: 40
					},{	fieldLabel	:  Language.get( 'remk_text' , 'Remarks'),
						name		: 'remk_text',
						xtype		: 'textarea',
						width		: 585,
						height		: 40
					},{	xtype		: 'textfield',
						hidden		: true,
						name		: 'modify'
					}
				]
			}
		;
		return item;
	},
	/**
	 *
	 */


	createTabs : function () {
		var me = this,
			tabs = {
				xtype  : 'tabpanel',
				region : 'center',
				itemId : 'editortab',
				plain  : true,
				margin : 0 ,
				items  : [
					{ title : 'Payment 등록', xtype : 'module-sjflv-export-ordermast2-lister-payment'
					},{ title : '비용정보', xtype : 'module-sjflv-export-ordermast2-lister-cost'
					},{ title : '첨부파일', xtype : 'module-sjflv-export-ordermast2-filelister'
					}
				]
			}
		;
		return tabs;
	},

});

