Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderWorkerEditor3', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-saleorder-worker-editor3',
	height	: 180,
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
						{	xtype : 'textfield', name : 'line_seqn', hidden : true
						},{	xtype : 'textfield', name : 'amnd_degr', hidden : true
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '8 5 0 0',
							items	: [
								{	fieldLabel	: Language.get('cstm_name', '고객명' ),
									name		: 'cstm_name',
									xtype		: 'textfield',
									readOnly	: true,
									width		: 310,
									fieldCls	: 'readonlyfield',
								},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('modl_name', '모델명' ),
									xtype		: 'textfield',
									name		: 'modl_name',
									readOnly	: true,
									width		: 390,
									fieldCls	: 'readonlyfield',
								},{	fieldLabel	: Language.get('mtrl_bacd', '재질' ),
									xtype		: 'textfield',
									name		: 'mtrl_bacd_name',
									width		: 200,
									readOnly	: true,
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
									width		: 180,
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
									labelWidth	: 100,
									width		: 210,
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('item_tick', '두께' ),
									xtype		: 'textfield',
									name		: 'item_tick',
									width		: 200,
									readOnly	: true,
									fieldCls	: 'readonlyfield',
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
									xtype		: 'textfield',
									readOnly	: true,
									width		: 180,
									fieldCls	: 'readonlyfield',
								},{	name : 'unit_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('acpt_qntt', '수주수량' ),
									name		: 'acpt_qntt',
									xtype		: 'numericfield',
									minValue	: '',
									labelWidth	: 100,
									width		: 210,
									readOnly	: true,
									fieldCls	: 'readonlyfield',
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin :0,
							items	: [
								,{	fieldLabel	: Language.get('drwg_numb', '도번' ),
									xtype		: 'textfield',
									name		: 'drwg_numb',
									readOnly	: true,
									width		: 250,
									fieldCls	: 'readonlyfield',
								},{	fieldLabel	: Language.get('revs_numb', 'Rev' ),
									xtype		: 'textfield',
									name		: 'revs_numb',
									readOnly	: true,
									labelWidth	: 20,
									width		: 60,
									fieldCls	: 'readonlyfield',
								},,{	fieldLabel	: Language.get('', '제품 SIZE' ),
									xtype		: 'numericfield',
									name		: 'item_leng',
									width		: 117,
									readOnly	: true,
									fieldCls	: 'readonlyfield',
								},{	fieldLabel	: Language.get('', 'X' ),
									xtype		: 'numericfield',
									name		: 'item_widh',
									width		: 63,
									labelWidth	: 14,
									readOnly	: true,
									fieldCls	: 'readonlyfield',
								},{	fieldLabel	: Language.get('acpt_qntt', '제품수량/장당' ),
									name		: 'mprq_qntt',
									xtype		: 'numericfield',
									readOnly	: true,
									labelWidth	: 100,
									width		: 210,
									fieldCls	: 'readonlyfield',
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin :0,
							items	: [
								{	fieldLabel	: Language.get('item_name', '품명' ),
									name		: 'item_name',
									xtype		: 'textfield',
									readOnly	: true,
									fieldCls	: 'readonlyfield',
									width		: 310,
								},{	fieldLabel	: Language.get('pqty_ndqt', '개당소요량' ),
									name		: 'pqty_ndqt',
									xtype		: 'numericfield',
									minValue	: '0',
									width		: 180,
									readOnly	: true,
									fieldCls	: 'readonlyfield',
								},{	fieldLabel	: Language.get('need_qntt', '소요량' ),
									name		: 'need_qntt',
									xtype		: 'numericfield',
									minValue	: '0',
									labelWidth	: 100,
									width		: 210,
									readOnly	: true,
									fieldCls	: 'readonlyfield',
								}
							]
						},{	xtype		: 'hiddenfield', name : 'dlvy_cstm_idcd'
						},{	xtype		: 'hiddenfield', name : 'item_idcd'
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
							height		: 145,
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
