Ext.define('module.workshop.sale.order.estimast.view.EstiMastBomListMaster', { extend: 'Ext.tree.Panel',
	alias	: 'widget.module-estimast-bomlistmaster',
	store	: 'module.workshop.sale.order.estimast.store.EstiMastBomListMaster',
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
					{	text	: '모델명'	, dataIndex: 'text'	, width : 200	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{ text : '계정구분'			, dataIndex: 'acct_name'		, width :  80
					},{ text : '수주번호'			, dataIndex: 'invc_numb'		, width : 100
					},{	text : '수주일자'			, dataIndex: 'invc_date'		, width :  80 , align:'center'
					},{ dataIndex: 'drwg_numb'		, text : '도면번호'		, width : 150
					},{ dataIndex: 'revs_numb'		, text : 'Rev'			, width :  50
					}
				]
		};
		return item;
	}
});