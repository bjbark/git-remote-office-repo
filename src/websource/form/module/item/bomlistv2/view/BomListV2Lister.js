Ext.define('module.item.bomlistv2.view.BomListV2Lister', { extend: 'Ext.tree.Panel',
	alias	: 'widget.module-bomlistv2-lister',
	store	: 'module.item.bomlistv2.store.BomListV2',
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
					},{ text : '품목코드'	, dataIndex: 'item_code'		, width : 100
					},{ text : '품목규격'	, dataIndex: 'item_spec'		, width : 130
					},{ text : '투입공정'	, dataIndex: 'ivst_wkct_name'	, width : 130
					},{ text : '소요량'		, dataIndex: 'ndqt_nmrt'		, width :  85	, xtype : 'numericcolumn'
					},{ text : '소요량(분모)'	, dataIndex: 'ndqt_dnmn'		, width :  85	, xtype : 'numericcolumn', hidden : true
					},{ text : '사내LOSS율'	, dataIndex: 'incm_loss_rate'	, width :  80	, xtype : 'numericcolumn', hidden : true
					},{ text : '외주LOSS율'	, dataIndex: 'otcm_loss_rate'	, width :  80	, xtype : 'numericcolumn', hidden : true
					},{	text : '등록일자'	, dataIndex: 'strt_date'		, width :  80
					},{ text : '메모'		, dataIndex: 'user_memo'		, flex  : 1
					}
				]
		};
		return item;
	}
});