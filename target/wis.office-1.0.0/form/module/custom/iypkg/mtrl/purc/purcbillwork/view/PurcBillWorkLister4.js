Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister4', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcbillwork-lister4',
	store	: 'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister4',

	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purcbillwork-worker-search2'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		listeners: {
			refresh: function(view) {
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');

					for(var j = 0; j < cells.length; j++) {
						//글씨색
						if(record.data.publ_date == '합계') {
							Ext.fly(cells[j]).setStyle('color', 'red');
						}else if(record.data.cstm_name == '월계') {
							Ext.fly(cells[j]).setStyle('color', 'blue');
						}else if(record.data.cstm_name == '소계') {
							Ext.fly(cells[j]).setStyle('color', ' green');
						}
					}
				}
			}
		}
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
					{	dataIndex:	'txbl_path_name', width:  80, align : 'center'	, text: Language.get(''				, '구분'		), xtype: 'lookupcolumn', lookupValue	: [['1','원단'],['2','부자재'],['3','상품'],['4','원지']],
					},{	dataIndex:	'publ_date'		, width: 100, align : 'center'	, text: Language.get('publ_date'	, '발행일자'	)
					},{	dataIndex:	'cstm_name'		, width: 170, align : 'left'	, text: Language.get('cstm_name'	, '매입처명'	)
					},{	dataIndex:	'txbl_volm'		, width:  40, align : 'center'	, text: Language.get('txbl_volm'	, '권'		)
					},{	dataIndex:	'txbl_honm'		, width:  40, align : 'center'	, text: Language.get('txbl_honm'	, '호'		)
					},{	dataIndex:	'sply_amnt'		, width: 100, align : 'right'	, text: Language.get('sply_amnt'	, '공급가액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'vatx_amnt'		, width: 100, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'boss_name'		, width: 100, align : 'center'	, text: Language.get('boss_name'	, '대표자'		)
					},{	dataIndex:	'buss_numb'		, width: 170, align : 'left'	, text: Language.get('buss_numb'	, '사업자등록번호')
					},{	dataIndex:	'buss_type'		, width: 120, align : 'left'	, text: Language.get('buss_type'	, '업태'		)
					},{	dataIndex:	'buss_kind'		, width: 120, align : 'left'	, text: Language.get('buss_kind'	, '종목'		)
					},{	dataIndex:	'cnt'			, width:  50, align : 'right'	, text: Language.get(''				, '건수'		)
					}
				]
			}
		;
		return item;
	}

});
