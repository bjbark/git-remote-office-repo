Ext.define('module.sale.project.prjtprocess.view.PrjtProcessListerDetail7', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtprocess-lister-detail7',
	store		: 'module.sale.project.prjtprocess.store.PrjtProcessDetail7',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines	: true,
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
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
					},{	dataIndex: 'poor_name'		, text : Language.get('poor_name'		,'불량유형'		) , width : 120 , align : 'center'
					},{	dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'		) , width :  80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'		) , width :  80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'poor_cont'		, text : Language.get('poor_cont'		,'불량내용'		) , width : 350 , align : 'left'
					},{	dataIndex: 'trtm_cont'		, text : Language.get('trtm_cont'		,'조치내용'		) , width : 350 , align : 'left'
					},{	dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'담당자명'		) , width :  80 , align : 'left'
					},{	dataIndex: 'trtm_date'		, text : Language.get('trtm_date'		,'조치일자'		) , width :  80 , align : 'center'
					},{	dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'			) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});