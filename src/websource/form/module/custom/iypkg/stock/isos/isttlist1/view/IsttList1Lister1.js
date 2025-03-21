Ext.define('module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-isttlist1-lister1',
	store		: 'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister1',
	width		: 450,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//	features	: [{ ftype : 'grid-summary'}],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-' ,
					{text : Const.EXPORT.text	, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action	, cls: 'button-style' }
				],
				pagingButton: true
			};
		return item ;
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('invc_date').length < 8){
				return 'text-warn';
			}else if(record.get('fabc_name') == '일계'){
				return 'text-blue';
			}else if(record.get('fabc_name') == '소계'){
				return 'text-green';
			}
		}
	},

	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'invc_date'		, width:  80, text: Language.get(''			,	'입고일자'	) , align : 'center'
						},{	dataIndex: 'cstm_name'		, width: 150, text: Language.get(''			,	'입고처명'	) , align : 'left'
						},{	dataIndex: 'fabc_name'		, width: 230, text: Language.get(''			,	'원단명'	) , align : 'left'
						},{	dataIndex: 'ppln_dvcd'		, width:  80, text: Language.get(''			,	'골'		) , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
						},{	dataIndex: 'fabc_spec'		, width: 100, text: Language.get(''			,	'원단규격'	) , align : 'left'
						},{	dataIndex: 'item_fxqt'		, width:  50, text: Language.get(''			,	'절수'	) , align : 'right'
						},{	dataIndex: 'istt_qntt'		, width:  80, text: Language.get(''			,	'입고량'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'subt_qntt'		, width:  60, text: Language.get(''			,	'감량'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'pqty_pric'		, width:  60, text: Language.get(''			,	'단가'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'istt_amnt'		, width:  80, text: Language.get(''			,	'공급가액'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'invc_date2'		, width:  80, text: Language.get(''			,	'수주일자'	)
						},{	dataIndex: 'acpt_cstm_name'	, width: 150, text: Language.get(''			,	'수주처명'	), align : 'left'
						},{	dataIndex: 'prod_name'		, width: 230, text: Language.get(''			,	'품명'	), align : 'left'
						}
					]
				};
		return item;
	}
});