Ext.define('module.stock.lot.lotlstocklist.view.LotlStockListListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lotlstocklist-lister-detail',
	store		: 'module.stock.lot.lotlstocklist.store.LotlStockListDetail',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
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
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('isos_date'	,'수불일자')	, width : 110, align : 'center'
					},{ dataIndex: 'isos_dvcd'		, text : Language.get('isos_dvcd'	,'수불구분')	, width : 90 , xtype : 'lookupcolumn', lookupValue : resource.lookup('isos_dvcd'),  align : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'	,'수불근거')	, width : 170
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'	,'입고수량')	, width : 120, align : 'right',  xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.####':'#,##0.##9',
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'	,'출고수량')	, width : 120, align : 'right',  xtype: 'numericcolumn' , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.####':'#,##0.##9',
					},{	dataIndex: 'make_date'		, text : Language.get(''			,'제조일자'	)	, width : 100, align : 'center', hidden: _global.options.mes_system_type =='SJFLV' ? false : true
					},{	dataIndex: 'rtil_ddln_date'	, text : Language.get(''			,'유통기한'	)	, width : 100, align : 'center', hidden: _global.options.mes_system_type =='SJFLV' ? false : true
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'	,'메모사항'	)	, flex  :   1, align : 'left',   hidden: _global.options.mes_system_type =='SJFLV' ? false : true

					}
				]
			}
		;
		return item;
	}
});