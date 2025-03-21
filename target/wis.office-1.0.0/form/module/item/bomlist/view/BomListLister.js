Ext.define('module.item.bomlist.view.BomListLister', { extend: 'Ext.tree.Panel',
	alias	: 'widget.module-bomlist-lister',
	store	: 'module.item.bomlist.store.BomList',
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
					{	text	: '품목 트리'	, dataIndex: 'text'	, width : 500	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{ text : '투입품명'	, dataIndex: 'item_name'		, width : 200	, hidden : true
					},{ text : '품목규격'		, dataIndex: 'item_spec'		, width : 130
					},{ text : '투입공정'		, dataIndex: 'ivst_wkct_name'	, width : 130
					},{ text : '소요량(분자)'	, dataIndex: 'ndqt_nmrt'		, width :  85	, xtype : 'numericcolumn'
					},{ text : '소요량(분모)'	, dataIndex: 'ndqt_dnmn'		, width :  85	, xtype : 'numericcolumn'
					},{ text : '사내LOSS율'	, dataIndex: 'incm_loss_rate'	, width :  80	, xtype : 'numericcolumn'
					},{ text : '외주LOSS율'	, dataIndex: 'otcm_loss_rate'	, width :  80	, xtype : 'numericcolumn',hidden: (_global.stor_id.toUpperCase()== 'N1000WONTC1000'?true:false),
					},{	text : '등록일자'		, dataIndex: 'strt_date'		, width :  80
					},{ text : '메모'		, dataIndex: 'user_memo'		, flex  : 1
					}
				]
		};
		return item;
	}
});





