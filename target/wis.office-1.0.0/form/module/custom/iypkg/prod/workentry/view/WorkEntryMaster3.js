Ext.define('module.custom.iypkg.prod.workentry.view.WorkEntryMaster3', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-workentry-master3',
	store	: 'module.custom.iypkg.prod.workentry.store.WorkEntryMaster3',
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
					'->',

					'-',
					{	text : '<span class="write-button">일괄등록</span>'	, action : 'allAction'	, cls: 'button1-style'	, width: 80 } , '-',

					{	text : '<span class="write-button">생산실적등록</span>'	, action : 'writeAction'	, cls: 'button1-style'	, width: 80} , '-',
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
					{	dataIndex:	'invc_numb'		, width: 100, align : 'center'	, text: Language.get(''	, '지시번호'	)
					},{	dataIndex:	'pdsd_date'		, width:  80, align : 'center'	, text: Language.get(''	, '지시일자'	)
					},{	dataIndex:	'cstm_name'		, width: 180, align : 'left'	, text: Language.get(''	, '거래처'		)
					},{	dataIndex:	'prod_name'		, width: 230, align : 'left'	, text: Language.get(''	, '품명'		)
					},{	dataIndex:	'prod_leng'		, width:  50, align : 'right'	, text: Language.get(''	, '장'		), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'prod_widh'		, width:  50, align : 'right'	, text: Language.get(''	, '폭'		), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'prod_hght'		, width:  50, align : 'right'	, text: Language.get(''	, '고'		), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'acpt_qntt'		, width:  80, align : 'right'	, text: Language.get(''	, '수주생산'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					}
				]
			}
		;
		return item;
	}

});
