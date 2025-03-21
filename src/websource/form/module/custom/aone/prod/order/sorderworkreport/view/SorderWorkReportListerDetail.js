Ext.define('module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportListerDetail', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sorderworkreport-lister-detail',
	store		: 'module.custom.aone.prod.order.sorderworkreport.store.SorderWorkReportDetail',

	initComponent: function () {
		var me = this;
		me.columns	= me.columnItem();
		me.callParent();
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	xtype: 'rownumberer'	    , text : '항번', width : 40    , align : 'center'
					},{	dataIndex:	'item_code'	, width: 120, align : 'center'	, text: Language.get(''	, '부품코드'	)
					},{	dataIndex:	'item_name'	, width: 130, align : 'center'	, text: Language.get(''	, '부품명'		)
					},{	dataIndex:	'item_spec'	, width: 130, align : 'center'	, text: Language.get(''	, '규격'		)
					},{	dataIndex:	'need_qntt'	, width: 80 , align : 'right'	, text: Language.get(''	, '소요량'		),xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'pric'		, width: 80 , align : 'right'	, text: Language.get(''	, '단가'		),xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'amnt'		, width: 80 , align : 'right'	, text: Language.get(''	, '금액'		),xtype: 'numericcolumn', format: '#,##0'
					}
				]
			};
		return item;
		}
	});