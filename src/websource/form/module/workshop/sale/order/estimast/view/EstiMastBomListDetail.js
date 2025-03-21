Ext.define('module.workshop.sale.order.estimast.view.EstiMastBomListDetail', { extend: 'Ext.tree.Panel',
	alias	: 'widget.module-estimast-bomlistdetail',
	store	: 'module.workshop.sale.order.estimast.store.EstiMastBomListDetail',
	border	: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,

	viewConfig	: {
		plugins: { ptype: 'treeviewdragdrop' }
	},

	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
				items		: [
					{	text	: '품목 트리'	, dataIndex: 'text'	, width : 200	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{ text : '투입품명'	, dataIndex: 'item_name'		, width : 200	, hidden : true
					},{ text : '품목코드'	, dataIndex: 'item_code'		, width : 100
					},{ text : '계정구분'	, dataIndex: 'acct_name'		, width :  80
					},{ dataIndex: 'drwg_numb'		, text : '도면번호'		, width : 150
					},{ dataIndex: 'revs_numb'		, text : 'Rev'			, width :  50
					},{ text : '소요량'		, dataIndex: 'need_qntt'		, width :  85	, xtype : 'numericcolumn'
					},{ text : '메모'		, dataIndex: 'user_memo'		, flex  : 1
					}
				]
		};
		return item;
	}
});