Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail4', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-estientry2-lister-detail4',
	store	: 'module.custom.hantop.sale.estientry2.store.EstiEntry2WorkerLister2',

	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } , { ptype:'filterbar'}],

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-',
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action ,cls: 'button-style' },
				], pagingButton : false
			}
		;
		return item ;
	},




	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'brnd_bacd'			, width:  100, align : 'center' , text: Language.get('brnd_bacd'		, '브랜드코드'		), hidden : true, filter:true
					},{	dataIndex:	'base_name'			, width :  70, align : 'center'	, text: Language.get('base_name'		, '브랜드명'		), hidden : true, filter:true
					},{	dataIndex:	'modl_name'			, width : 100, align : 'left'	, text: Language.get('wndw_name'		, '창호모델명'		), hidden : true, filter:true
					},{	dataIndex:	'wdtp_name'			, width : 100, align : 'left'	, text: Language.get('wdtp_name'		, '창호형태명'		), hidden : true, filter:true
					},{	dataIndex:	'acct_bacd'			, width : 100, align : 'right'	, text: Language.get('acct_bacd'		, '계정구분'		), hidden : true, filter:true
					},{	dataIndex:	'bfsf_dvcd'			, width :  60, align : 'center'	, text: Language.get('bfsf_dvcd'		, '틀짝망'		), filter:true
					},{	dataIndex:	'ivst_item_name'	, width : 150, align : 'left'	, text: Language.get('ivst_item_name'	, '투입품목명'		), filter:true
					},{	dataIndex:	'ivst_item_spec'	, width : 100, align : 'left'	, text: Language.get('ivst_item_spec'	, '투입품목규격'	), filter:true
					},{	dataIndex:	'esnt_dvcd'			, width :  80, align : 'left'	, text: Language.get('esnt_dvcd'		, '필수구분'		), filter:true
					},{	dataIndex:	'item_widh'			, width :  80, align : 'right'	, text: Language.get('item_widh'		, '품목폭'		), xtype : 'numericcolumn' , format: '#,##0', filter:true, hidden:true
					},{	dataIndex:	'item_hght'			, width :  80, align : 'right'	, text: Language.get('item_hght'		, '품목높이'		), xtype : 'numericcolumn' , format: '#,##0', filter:true, hidden:true
					},{	dataIndex:	'item_tick'			, width :  80, align : 'right'	, text: Language.get('item_tick'		, '품목두께'		), xtype : 'numericcolumn' , format: '#,##0', filter:true, hidden:true
					},{	dataIndex:	'calc_frml'			, width : 200, align : 'left'	, text: Language.get('calc_frml'		, '계산공식'		), filter:true
					},{	dataIndex:	'need_qntt'			, width :  80, align : 'right'	, text: Language.get('need_qntt'		, '소요수량'		), xtype : 'numericcolumn' , format: '#,##0', filter:true
					},{	dataIndex:	'puch_cstm_name'	, width : 110, align : 'left'	, text: Language.get('puch_cstm_name'	, '구매거래처명'	), filter:true
					},{	dataIndex:	'puch_pric'			, width :  80, align : 'right'	, text: Language.get('puch_pric'		, '구매단가'		), xtype : 'numericcolumn' , format: '#,##0', filter:true
					},{	dataIndex:	'esti_pric'			, width :  80, align : 'right'	, text: Language.get('esti_pric'		, '견적단가'		), xtype : 'numericcolumn' , format: '#,##0', filter:true
					},{	dataIndex:	'loss_rate'			, width :  80, align : 'right'	, text: Language.get('loss_rate'		, 'LOSS율'		), xtype : 'numericcolumn' , format: '#,##0', filter:true
					},{	dataIndex:	'loss_qntt'			, width :  80, align : 'right'	, text: Language.get('loss_qntt'		, 'LOSS수량'		), xtype : 'numericcolumn' , format: '#,##0', filter:true
					}
				]
			}
		;
		return item;
	},

});
