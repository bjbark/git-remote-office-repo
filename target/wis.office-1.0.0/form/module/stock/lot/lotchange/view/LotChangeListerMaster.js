Ext.define('module.stock.lot.lotchange.view.LotChangeListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lotchange-lister-master',
	store		: 'module.stock.lot.lotchange.store.LotChangeMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [

					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' ,itemId: 'master'} //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'	)	, width : 120
					},{	dataIndex: 'item_idcd'		, text : Language.get('item_idcd'		,'품목ID'		)	, width : 100, align : 'left',hidden : true
					},{	dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'		,'창고명'		)	, width : 100, align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		)	, width : 100, align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		)	, width : 300,
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		)	, width : 150,
					},{	dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명'		)	, width : 200,
					},{	dataIndex: 'acct_bacd_name'	, text : Language.get('acct_bacd'		,'계정구분'		)	, width :  80,
					},{	dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'기준단위'		)	, width :  60, align : 'center'
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'		)	, width : 100, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0':'#,##0.##9',
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'출고수량'		)	, width : 100, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0':'#,##0.##9',
					},{ dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'재고수량'		)	, width : 100, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0':'#,##0.##9',
					},{ dataIndex: 'chge_qntt'		, text : Language.get('chge_qntt'		,'조정수량'		)	, width : 100, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0':'#,##0.##9',
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		)	, flex  :   1, align : 'left'
					}
				]
			}
		;
		return item;
	 }

});
