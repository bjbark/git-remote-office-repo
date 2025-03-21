Ext.define('module.sale.sale.salelist.view.SaleListLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salelist-lister2',
	store		: 'module.sale.sale.salelist.store.SaleListLister2',
	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//	features	: [{ ftype : 'grid-summary'}],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'part2detail' ,cls: 'button-style'},
				],
			}
		;
		return item;
	},

	columnItem : function () {
		var me = this,
			item = {
			defaults: {style: 'text-align:center'},
			items : [
				{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 70 , align : 'center'
				},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 240 , align : 'left'
				},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 190 , align : 'left'
				},{	dataIndex: 'dvcd'		, text : Language.get(''	,'구분'		) , width : 45 , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup(''), align : 'center'
				},{	dataIndex: 'ttsm_sum'	, text : Language.get(''	,'합계'		) , width : 80 , xtype : 'numericcolumn'
				},{	dataIndex: '1_month'	, text : Language.get(''	,'1월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '2_month'	, text : Language.get(''	,'2월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '3_month'	, text : Language.get(''	,'3월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '1_sum'		, text : Language.get(''	,'분기계'		) , width : 75 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '4_month'	, text : Language.get(''	,'4월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '5_month'	, text : Language.get(''	,'5월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '6_month'	, text : Language.get(''	,'6월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '2_sum'		, text : Language.get(''	,'분기계'		) , width : 75 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '7_month'	, text : Language.get(''	,'7월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '8_month'	, text : Language.get(''	,'8월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '9_month'	, text : Language.get(''	,'9월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '3_sum'		, text : Language.get(''	,'분기계'		) , width : 75 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '10_month'	, text : Language.get(''	,'10월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '11_month'	, text : Language.get(''	,'11월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '12_month'	, text : Language.get(''	,'12월'		) , width : 65 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				},{	dataIndex: '4_sum'		, text : Language.get(''	,'분기계'		) , width : 75 , align : 'right', xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.###',
				}
			]
		};
		return item;
	}
});
