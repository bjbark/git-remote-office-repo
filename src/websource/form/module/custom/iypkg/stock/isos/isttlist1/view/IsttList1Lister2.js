Ext.define('module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isttlist1-lister2',
	store		: 'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister2',
	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
			item = {
			defaults: {style: 'text-align:center'},
			items : [
				{	dataIndex: 'invc_date'		, width:  80, text: Language.get(''	, '발주일자'	), align : 'center'
				},{	dataIndex: 'cstm_name'		, width: 150, text: Language.get(''	, '발주처명'	)
				},{	dataIndex: 'fabc_name'		, width: 230, text: Language.get(''	, '원단명'		)
				},{	dataIndex: 'ppln_dvcd'		, width:  60, text: Language.get(''	, '골'		) , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
				},{	dataIndex: 'fabc_spec'		, width: 100, text: Language.get(''	, '원단규격'	) , align : 'left'
				},{	dataIndex: 'item_fxqt'		, width:  80, text: Language.get(''	, '절수'		) , align : 'right'
				},{	dataIndex: 'istt_qntt'		, width:  80, text: Language.get(''	, '입고량'		) , align : 'right', xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'unistt'			, width:  80, text: Language.get(''	, '미입고'		) , align : 'right', xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'deli_date'		, width:  80, text: Language.get(''	, '납기일자'	)
				},{	dataIndex: 'acpt_cstm_name'	, width: 150, text: Language.get(''	, '수주처명'	)
				},{	dataIndex: 'acpt_invc_numb'	, width: 100, text: Language.get(''	, '수주번호'	)
				},{	dataIndex: 'prod_name'		, width: 230, text: Language.get(''	, '품명'		)
				}
			]
		};
		return item;
	}
});
