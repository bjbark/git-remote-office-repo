Ext.define('module.custom.iypkg.prod.prodordr.view.ProdOrdrMaster2', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-prodordr-master2',
	store	: 'module.custom.iypkg.prod.prodordr.store.ProdOrdrMaster2',
	selModel: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					{	text : '<span class="write-button">일괄등록</span>'	, action : 'allAction'	, cls: 'button1-style'	, width: 70} , '-',
					{	text : '<span class="write-button">지시등록</span>'	, action : 'writeAction'	, cls: 'button1-style'	, width: 70} , '-',
//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
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
					{	dataIndex:	'plan_numb'		, width:  80, text: Language.get('plan_numb'	, '생산계획번호'		), align : 'center'
					},{	dataIndex:	'invc_numb'		, width: 100, text: Language.get('invc_numb'	, '수주번호	'		), align : 'center'
					},{	dataIndex:	'cstm_name'		, width: 150, text: Language.get('cstm_name'	, '거래처'			), align : 'left'
					},{	dataIndex:	'prod_name'		, width: 250, text: Language.get('prod_name'	, '제품명'			), align : 'left'
					},{	dataIndex:	'cvic_name'		, width: 130, text: Language.get('cvic_name'	, '설비명'			), align : 'left'
					},{	dataIndex:	'bxty_name'		, width: 100, text: Language.get('bxty_name'	, '상자형식'		), align : 'left'
					},{	dataIndex:	'item_leng'		, width:  60, text: Language.get('item_leng'	, '장'			), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_widh'		, width:  60, text: Language.get('item_widh'	, '폭'			), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_hght'		, width:  60, text: Language.get('item_hght'	, '고'			), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'ostt_date'		, width:  80, text: Language.get('ostt_date'	, '납품일자'		), align : 'center'
					},{	dataIndex:	'pcod_numb'		, width: 170, text: Language.get('pcod_numb'	, 'P/O No'		), align : 'left'
					}
				]
			}
		;
		return item;
	}

});
