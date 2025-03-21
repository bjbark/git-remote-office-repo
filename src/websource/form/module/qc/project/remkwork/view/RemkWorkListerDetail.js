Ext.define('module.qc.project.remkwork.view.RemkWorkListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-remkwork-lister-detail',
	store		: 'module.qc.project.remkwork.store.RemkWorkDetail',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'poor_seqn'		, text : Language.get('poor_seqn'		,'순번'			) , width :  50 , align : 'center'
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순서'			) , width :  80 , align : 'center', hidden : true
					},{	dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'수주ID'		) , width :  80 , align : 'center', hidden : true
					},{	dataIndex: 'poor_name'		, text : Language.get('poor_name'		,'불량유형'		) , width : 120 , align : 'center'
					},{	dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'		) , width :  80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'		) , width :  80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'poor_cont'		, text : Language.get('poor_cont'		,'문제점'		) , width : 350 , align : 'left'
					},{	dataIndex: 'trtm_cont'		, text : Language.get('trtm_cont'		,'대책'			) , width : 350 , align : 'left'
					},{	dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'담당자명'		) , width :  80 , align : 'left'
					},{	dataIndex: 'trtm_date'		, text : Language.get('trtm_date'		,'검사일자'		) , width :  80 , align : 'center'
					},{	dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'			) , flex  : 100 , align : 'left'
					},{	dataIndex: 'sysm_memo'		, text : Language.get('sysm_memo'		,''				) , flex  : 100 , align : 'left', hidden : true
					}
				]
			}
		;
		return item;
	}
});