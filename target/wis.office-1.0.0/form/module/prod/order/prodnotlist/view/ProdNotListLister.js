Ext.define('module.prod.order.prodnotlist.view.ProdNotList', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodnotlist-lister',
	store		: 'module.prod.order.prodnotlist.store.ProdNotList',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 100 , align : 'center'
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 40  , align : 'center'
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 200 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 120 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'	) , width : 100 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'	) , width : 100 , align : 'center'
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	,'시작일시'	) , width : 125 , align : 'center'
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	,'종료일시'	) , width : 125 , align : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'poor_caus_bacd'	, text : Language.get('poor_caus_bacd'	,'불량유형'	) , width : 80  , align : 'center'
					}
				]
			}
		;
		return item;
	}
});