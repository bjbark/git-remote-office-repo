Ext.define('module.prod.project.prjtorder.view.PrjtOrderListerDetail4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtorder-lister-detail4',
	store		: 'module.prod.project.prjtorder.store.PrjtOrderDetail1',
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
					{	text : '순서'		, dataIndex: 'line_seqn'		, width :  40	, align : 'center', xtype : 'numericcolumn'
					},{ dataIndex: 'chek_resn'		, text : Language.get('chek_resn'		,'보고일자')		, width :  90
					},{ text : '투입품명'		, dataIndex: 'item_name'		, width : 200	, hidden : false
					},{ text : '품목규격'		, dataIndex: 'item_spec'		, width : 130
					},{ text : '조달구분'		, dataIndex: 'item_spec'		, width :  90
					},{ text : '투입공정'		, dataIndex: 'ivst_wkct_name'	, width : 130
					},{ text : '소요량'		, dataIndex: 'ndqt_nmrt'		, width :  85	, xtype : 'numericcolumn'
					},{ text : '사용량'		, dataIndex: 'ndqt_nmrt'		, width :  85	, xtype : 'numericcolumn'
					},{	text : '등록일자'		, dataIndex: 'strt_date'		, width :  80
					},{ text : '메모'		, dataIndex: 'user_memo'		, flex  : 1
					}
				]
			}
		;
		return item;
	}
});