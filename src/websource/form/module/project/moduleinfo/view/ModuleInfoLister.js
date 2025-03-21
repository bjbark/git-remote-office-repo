Ext.define('module.project.moduleinfo.view.ModuleInfoLister', { extend: 'Ext.tree.Panel',
	alias	: 'widget.module-moduleinfo-lister',
	store	: 'module.project.moduleinfo.store.ModuleInfo',
	border	: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,

	viewConfig	: {
		plugins: { ptype: 'treeviewdragdrop' }
	},
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.dockedItems = [ me.pagingItem() ];
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->',
				{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
				{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } , '-' ,
				{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
				items		: [
					{	text : '메뉴트리'     , dataIndex: 'text'         , width : 250 , xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
								if (record.data.depth === 1) {
									expmark = 'ROOT MENU' ;
								} else {
									 expmark = record.data.tree_expn_yn ? '+' : '-' ;
								}
							}
							return record.get('row_sts') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{	text : '순서'			, dataIndex: 'row_ord'		, width :  70	, align : 'center', xtype : 'numericcolumn'
					},{ text : 'Path'			, dataIndex: 'modl_id'		, width : 100	, editor: { allowBlank: false}
					},{ text : 'Control Name'	, dataIndex: 'modl_nm'		, width : 130	, editor: { allowBlank: false}
					},{ text : '영어명'			, dataIndex: 'menu_nm_englh', width : 130	, editor: { allowBlank: false}
					},{ text : '중국어명'			, dataIndex: 'menu_nm_chi'	, width : 130	, editor: { allowBlank: false}
					},{ text : '일본어명'			, dataIndex: 'menu_nm_jpns'	, width : 130	, editor: { allowBlank: false}
					},{ text : '기타명'			, dataIndex: 'menu_nm_etc'	, width : 130	, editor: { allowBlank: false}
					},{ text : '숨김'			, dataIndex: 'row_sts'		, width : 50	, xtype: 'lookupcolumn',lookupValue : resource.lookup('line_stat')
					},{	text : '등록'			, dataIndex: 'inpt_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','등록']].concat( resource.lookup('row_using')) , align : 'center'
					},{	text : '수정'			, dataIndex: 'upt_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','수정']].concat( resource.lookup('row_using')), align : 'center'
					},{	text : '삭제'			, dataIndex: 'del_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','삭제']].concat( resource.lookup('row_using')), align : 'center'
					},{	text : '출력'			, dataIndex: 'prt_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','출력']].concat( resource.lookup('row_using')), align : 'center'
					},{	text : '엑셀'			, dataIndex: 'expt_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','엑셀']].concat( resource.lookup('row_using')), align : 'center'
					},{ text : '적용회사'			, dataIndex: 'adpt_cmpy_name', width : 80
					},{	text : '관제'			, dataIndex: 'cntr'			, width :  50	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '기본'			, dataIndex: 'base'			, width :  50	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '사출'			, dataIndex: 'ejac'			, width :  50	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '프로젝트'			, dataIndex: 'prjt'			, width :  70	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '일반'			, dataIndex: 'gnrl'			, width :  50	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '초중종'			, dataIndex: 'smli'			, width :  60	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '분류'			, dataIndex: 'clss'			, width :  45	, align : 'center'
					},{	text : '고유번호'			, dataIndex: 'char_numb'	, width :  70	, align : 'center'
					},{ text : '메모사항'			, dataIndex: 'pcmt'			, flex  :   1
					},{ text : 'menu_id'		, dataIndex: 'menu_id'		, width : 80	, editor: { allowBlank: false}
					}
				]
		};
		return item;
	}
});





