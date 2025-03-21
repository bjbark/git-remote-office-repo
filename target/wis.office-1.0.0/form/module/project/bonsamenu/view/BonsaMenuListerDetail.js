Ext.define('module.project.bonsamenu.view.BonsaMenuListerDetail', { extend: 'Ext.tree.Panel',

	alias		: 'widget.module-bonsamenu-lister-detail',
	store		: 'module.project.bonsamenu.store.BonsaMenuDetail',
	border		: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,

	initComponent : function () {
		var me = this;
		me.dockedItems = [ me.pagingItem() ];
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this ,
			item = {
				xtype : 'toolbar',
				dock : 'bottom',
				items : [
					{	text: '동기화', iconCls: Const.UPDATE.icon      , action : 'synchronizer'
					},	'-','->', '-',
					{	text: Const.UPDATE.text, iconCls: Const.UPDATE.icon  , action : Const.UPDATE.action , cls: 'button-style'
					},{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'
					}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				width	: 650,
				items   : [
					{	text : '메뉴트리'		, dataIndex: 'text'			, width : 250	, xtype : 'treecolumn'		, renderer : me.treeRenderer
					},{ text : '사용'		, dataIndex: 'active_yn'	, width :  60	, xtype : 'checkcolumn'		, processEvent : me.checkboxProcessEvent
					},{ text : '본사'		, dataIndex: 'hq_use_yn'	, width :  45	, xtype : 'lookupcolumn'	, lookupValue : [[ '0','' ], [ '1','사용' ]] , align : 'center'
					},{ text : '직영'		, dataIndex: 'dm_use_yn'	, width :  45	, xtype : 'lookupcolumn'	, lookupValue : [[ '0','' ], [ '1','사용' ]] , align : 'center'
					},{ text : '가맹'		, dataIndex: 'branch_use_yn', width :  45	, xtype : 'lookupcolumn'	, lookupValue : [[ '0','' ], [ '1','사용' ]] , align : 'center'
					},{	text : '관제'		, dataIndex: 'cntr'			, width :  50	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '기본'		, dataIndex: 'base'			, width :  50	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '사출'		, dataIndex: 'ejac'			, width :  50	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '프로젝트'		, dataIndex: 'prjt'			, width :  70	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '일반'		, dataIndex: 'gnrl'			, width :  50	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '초중종'		, dataIndex: 'smli'			, width :  60	, xtype : 'lookupcolumn'	, lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text : '분류'		, dataIndex: 'clss'			, width :  45	, align : 'center'
					},{	text : '고유번호'		, dataIndex: 'char_numb'	, width :  70	, align : 'center'
					},{	text : 'Source Path', dataIndex: 'source_path'	, width : 120	, align : 'left'
					},{ text : '메모사항'		, dataIndex: 'pcmt'			, flex  :   1
					},{ text : '본사코드'		, dataIndex: 'hq_id'		, width: 80
					}
				]
			}
		;
		return item;
	},
	checkboxProcessEvent : function(name, grid, view, rowIndex, colIndex){
		if (name == 'mousedown') {
			var record = grid.store.getAt(rowIndex);
			if (record.get('row_sts') == '0') {
				var column = grid.headerCt.getGridColumns()[colIndex];
				if (column.dataIndex == 'active_yn') {
					if (record.get('leaf')) { /* 화면인 경우 */
						record.set( column.dataIndex , !record.get(column.dataIndex));
						if (record.get(column.dataIndex)){
							var node = record.parentNode ;
							while (node.parentNode) {
								if (node.internalId != 'root') {
									node.set(column.dataIndex , true );
									node = node.parentNode;
								}
							}
						}
					} else { /* 폴더인 경우 */
						if (record.get(column.dataIndex)){
							record.cascadeBy(function(node) {
								node.set(column.dataIndex , false );
							});
						}
					}
				}
			} else {record.set( 'active_yn' , false );}
		} else {
			return Ext.grid.ActionColumn.superclass.processEvent.apply(this, arguments);
		}
	},
	treeRenderer: function(value, meta, record, rowIndex, colIndex, store, grid ) {
		var	column = grid.headerCt.getGridColumns()[colIndex];
		if (column.dataIndex == 'text') {
			return record.get('row_sts') == '0' ? value : '<span style="color:red;">'+ value+'</span>';// + '<div style="float:right;">'+expmark+'</div>' ;
		}
	}

});