Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanMaster3', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-prodplan-master3',
	store	: 'module.custom.iypkg.prod.prodplan.store.ProdPlanMaster3',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">일괄등록</span>'	, action : 'allAction'	, cls: 'button1-style'	, width: 80 } , '-',
					{	text : '<span class="write-button">생산계획작성</span>'	, action : 'workAction1'	, cls: 'button1-style'	, width: 80 } , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'invc_numb'		, width: 100 , align : 'center'	, text: Language.get(''	, '수주번호') , hidden : false
					},{	dataIndex:	'deli_date'		, width: 80 , align : 'center'	, text: Language.get(''	, '납기일자')
					},{	dataIndex:	'cstm_name'		, width: 140, align : 'left'	, text: Language.get(''	, '거래처'	)
					},{	dataIndex:	'prod_name'		, width: 262, align : 'left'	, text: Language.get(''	, '품명'	)
					},{	dataIndex:	'cvic_name'		, width: 130, align : 'left'	, text: Language.get(''	, '설비명'	)
					},{	dataIndex:	'item_leng'		, width: 55 , align : 'right'	, text: Language.get(''	, '장'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_widh'		, width: 55 , align : 'right'	, text: Language.get(''	, '폭'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_hght'		, width: 55 , align : 'right'	, text: Language.get(''	, '고'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'acpt_qntt'		, width: 75 , align : 'right'	, text: Language.get(''	, '수주량'), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					}
				]
			}
		;
		return item;
	}

});
