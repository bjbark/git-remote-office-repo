Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-saleorder-worker-editor',
	height	: 115,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.hjsys.sale.order.saleorder.store.SaleOrderInvoice' );
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
			fieldDefaults: { width : 280, labelWidth : 70, margin : '8 0 0 0'},
			items		: [
				{	xtype		: 'textfield', name : 'amnd_degr', hidden : true
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '8 5 0 0',
					items	: [
						{ xtype : 'textfield', name : 'acpt_stat_dvcd', hidden : true
						},{	fieldLabel	: Language.get('cstm_name', '고객명' ),
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							xtype		: 'popupfield',
							readOnly	: true,
							width		: 310,
							fieldCls	: 'readonlyfield',
							popup		: {
								widget	: 'lookup-cstm-popup3',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('modl_name', '모델명' ),
							xtype		: 'textfield',
							name		: 'modl_name',
							readOnly	: true,
							width		: 310,
							fieldCls	: 'readonlyfield',
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin :0,
					items	: [
						,{	fieldLabel	: Language.get('dlvy_cstm_name', '납품처' ),
							name		: 'dlvy_cstm_name',
							xtype		: 'textfield',
							readOnly	: true,
							width		: 310,
							fieldCls	: 'readonlyfield',
						},{	fieldLabel	: Language.get('invc_date', '수주일자' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							readOnly	: true,
							width		: 155,
							fieldCls	: 'readonlyfield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							listeners	: {
								change	: function(field,value,beforeValue){
									if(value != ''){
										me.down('[name=deli_date]').setMinValue(value);
									}
								}
							}
						},{	fieldLabel	: Language.get('deli_date', '납기일자' ),
							name		: 'deli_date',
							xtype		: 'datefield',
							minValue	: '',
							width		: 155,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin :0,
					items	: [
						{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
							xtype		: 'textfield',
							name		: 'invc_numb',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							width		: 310,
						},{	fieldLabel	: Language.get('unit_name', '단위' ),
							name		: 'unit_name',
							xtype		: 'popupfield',
							pair		: 'unit_idcd',
							readOnly	: true,
							width		: 155,
							fieldCls	: 'readonlyfield',
							popup		: {
								widget	: 'lookup-unit-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('unit_name'));
									pairField.setValue(records[0].get('unit_idcd'));
								}
							}
						},{	name : 'unit_idcd', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('acpt_qntt', '수주수량' ),
							name		: 'acpt_qntt',
							xtype		: 'numericfield',
							minValue	: '',
							width		: 155,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
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
							height		: 77,
							width		: '100%',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
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
