Ext.define('module.custom.iypkg.stock.close.mtrlstocklist.view.MtrlStockListLister2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-mtrlstocklist-lister2',
	store		: 'module.custom.iypkg.stock.close.mtrlstocklist.store.MtrlStockListLister2',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,

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
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'	, width: 100, align: 'center', text: Language.get('invc_date'		, '일자'			)
					},{	dataIndex: 'fabc_name'	, width: 230, align: 'left'  , text: Language.get('fabc_name'		, '원단명'			)
					},{ dataIndex: 'ppln_dvcd'	, width:  80, align: 'center', text: Language.get('ppln_dvcd'		, '골'			), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{ dataIndex: 'fabc_spec'	, width: 150, align: 'center', text: Language.get('fabc_spec'		, '규격'			)
					},{ dataIndex: 'istt_qntt'	, width:  80, align: 'right', text: Language.get('istt_qntt'		, '입고'			), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'ostt_2100'	, width:  80, align: 'right' , text: Language.get('ostt_2100'		, '생산투입'		), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'ostt_2300'	, width:  80, align: 'right' , text: Language.get('ostt_2300'		, '기타출고'		), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: ''	, width:  80, align: 'right' , text: Language.get(''		, '재고'			), xtype : 'numericcolumn' , format: '#,##0', hidden : true
					},{ dataIndex: 'pric'		, width:  80, align: 'right' , text: Language.get('pric'			, '단가'			), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'amnt'		, width: 100, align: 'right' , text: Language.get('amnt'			, '금액'			), xtype : 'numericcolumn' , format: '#,##0'
					}
				]
			}
		;
		return item;
	}
 });
