Ext.define('module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Lister5', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isttlist1-lister5',
	store		: 'module.custom.iypkg.stock.isos.isttlist1.store.IsttList1Lister5',
	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//	features	: [{ ftype : 'grid-summary'} ],
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
				pagingButton : false
			}
		;
		return item;
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
						if(record.data.invc_date == '합계'|| record.data.invc_date.length < 8) {
							Ext.fly(cells[j]).setStyle('color', 'red');
						}else if(record.data.prod_name == '일계') {
							Ext.fly(cells[j]).setStyle('color', 'blue');
						}
					}
				}
			}
		}
	},

	columnItem : function () {
		var me = this,
			item = {
			defaults: {style: 'text-align:center'},
			items : [
				{	dataIndex: 'invc_date'		, width:  80, text: Language.get(''		, '입고일자'	), align : 'center'
				},{	dataIndex: 'invc_numb'		, width: 120, text: Language.get(''		, '발주번호'	)
				},{	dataIndex: 'invc_date2'		, width:  80, text: Language.get(''		, '발주일자'	)
				},{	dataIndex: 'cstm_name'		, width: 150, text: Language.get(''		, '거래처명'	)
				},{	dataIndex: 'prod_code'		, width: 120, text: Language.get(''		, '품목코드'	)
				},{	dataIndex: 'prod_name'		, width: 230, text: Language.get(''		, '품목명'		)
				},{	dataIndex: 'prod_leng'		, width:  50, text: Language.get(''		, '장'		), align : 'right'
				},{	dataIndex: 'prod_widh'		, width:  50, text: Language.get(''		, '폭'		), align : 'right'
				},{	dataIndex: 'prod_hght'		, width:  50, text: Language.get(''		, '고'		), align : 'right'
				},{	dataIndex: 'pcod_numb'		, width: 100, text: Language.get(''		, 'PO No'	)
				},{	dataIndex: 'prod_qntt'		, width:  80, text: Language.get(''		, '수주생산'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'offr_qntt'		, width:  80, text: Language.get(''		, '발주수량'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'offr_pric'		, width:  80, text: Language.get(''		, '단가'		) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
				},{	dataIndex: 'deli_date'		, width:  80, text: Language.get(''		, '납기일자'	)
				},{	dataIndex: 'acpt_numb'		, width: 100, text: Language.get(''		, '수주번호'	)
				},{	dataIndex: 'acpt_cstm_name'	, width: 150, text: Language.get(''		, '수주처명'	)
				}
			]
		};
		return item;
	}
});
