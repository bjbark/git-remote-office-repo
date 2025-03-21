Ext.define('module.design.project.dsigfile.view.DsigFileTree', { extend: 'Ext.tree.Panel',
	alias		: 'widget.module-dsigfile-tree',
	store		: 'module.design.project.dsigfile.store.DsigFileTree',
	border		: 0  ,
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
		me.dockedItems  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
//					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
				items		: [
					{	text	: '품목 트리'	, dataIndex: 'text'	, width : 300	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{	text : '순서'		, dataIndex: 'line_seqn'		, width :  40	, align : 'center', xtype : 'numericcolumn', hidden : true
					},{ text : '품목코드'		, dataIndex: 'item_idcd'		, width :  70	, hidden : false
					},{ text : '투입품명'	, dataIndex: 'item_name'		, width : 200	, hidden : true
					},{ text : '품목규격'		, dataIndex: 'item_spec'		, width : 130	, hidden : true
					},{ text : '소요량'		, dataIndex: 'need_qntt'		, width :  85	, xtype  : 'numericcolumn'
					},{ text : '첨부파일'	, dataIndex: 'imge_cont'		, width :  85	, xtype  : 'numericcolumn'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls: Const.INSERT.icon,
								tooltip	: '첨부파일',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var tree = Ext.ComponentQuery.query('module-dsigfile-tree')[0],
										select = tree.getSelectionModel().getSelection()[0]
									;
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'module-dsigfile-file-popup',
										params	:{
											invc_numb : record.get('pjod_idcd'),
											line_seqn : record.get('line_seqn'),
											orgn_dvcd : 'dsigfile'
										}
									})
								},
								scope : me
							}
						]
					},{	text : '등록일자'		, dataIndex: 'strt_date'		, width :  80	, hidden : true
					},{ text : '메모'		, dataIndex: 'user_memo'		, flex  : 1		, hidden : true
					}
				]
		};
		;
		return item;
	}
});