Ext.define('module.custom.iypkg.prod.prodordr.view.ProdOrdrMaster', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-prodordr-master',
	store	: 'module.custom.iypkg.prod.prodordr.store.ProdOrdrMaster',
	selModel: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	dataIndex:	'pror_numb'		, width: 100, align : 'center'	, text: Language.get(''	, '지시번호'	)
					},{	dataIndex:	'invc_numb'		, width: 100, align : 'center'	, text: Language.get(''	, '수주번호'	)
					},{	dataIndex:	'pdod_date'		, width:  80, align : 'center'	, text: Language.get(''	, '지시일자'	)
					},{	dataIndex:	'cstm_name'		, width: 160, align : 'left'	, text: Language.get(''	, '거래처'		)
					},{	dataIndex:	'prod_name'		, width: 250, align : 'left'	, text: Language.get(''	, '제품명'		)
					},{	dataIndex:	'cvic_name'		, width: 130, align : 'left'	, text: Language.get(''	, '설비명'		)
					},{	dataIndex:	'bxty_name'		, width: 100, align : 'left'	, text: Language.get(''	, '상자형식'	)
					},{	dataIndex:	'item_leng'		, width:  60, align : 'right'	, text: Language.get(''	, '장'		), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_widh'		, width:  60, align : 'right'	, text: Language.get(''	, '폭'		), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_hght'		, width:  60, align : 'right'	, text: Language.get(''	, '고'		), xtype : 'numericcolumn' , format: '#,##0'
//					},{	dataIndex:	'indn_qntt'		, width:  70, align : 'right'	, text: Language.get(''	, '지시량'		), xtype : 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'ostt_date'		, width:  80, align : 'center'	, text: Language.get(''	, '납품일자'	)
					},{	dataIndex:	'pcod_numb'		, width: 150, align : 'left'	, text: Language.get(''	, 'P/O No'	)
					}
				]
			}
		;
		return item;
	}

});
