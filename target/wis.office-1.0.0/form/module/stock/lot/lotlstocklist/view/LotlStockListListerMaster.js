Ext.define('module.stock.lot.lotlstocklist.view.LotlStockListListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lotlstocklist-lister-master',
	store		: 'module.stock.lot.lotlstocklist.store.LotlStockListMast',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
//	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
//	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll.
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll.
    }],



	viewConfig	: { markDirty: false , loadMask : false , enableTextSelection: true },
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

					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' , //엑셀버튼.
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
					{	dataIndex: 'item_idcd'	, text : Language.get('item_idcd'	,'품목id'	) , width : 110, align : 'center' , hidden : true
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	) , width : 150, align : 'left'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 280, align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 140, align : 'left'
					},{	dataIndex: 'unit_name'	, text : Language.get('unit_name'	,'단위'		) , width :  60, align : 'center'
					},{	dataIndex: 'lott_numb'	, text : Language.get('lott_numb'	,'LOT번호'	) , width : 170, align : 'center'
					},{ dataIndex: 'bfre_qntt'	, text : Language.get('bfre_qntt'	,'전일재고'	) , width :  120, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.####':'#,##0.##9',
					},{ dataIndex: 'istt_qntt'	, text : Language.get('istt_qntt'	,'당일입고'	) , width :  120, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.####':'#,##0.##9',
					},{ dataIndex: 'ostt_qntt'	, text : Language.get('ostt_qntt'	,'당일출고'	) , width :  120, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.####':'#,##0.##9',
					},{ dataIndex: 'tdtt_qntt'	, text : Language.get('tdtt_qntt'	,'당일재고'	) , width :  120, align : 'right', xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.####':'#,##0.##9',
					}
				]
			}
		;
		return item;
	 }

});
