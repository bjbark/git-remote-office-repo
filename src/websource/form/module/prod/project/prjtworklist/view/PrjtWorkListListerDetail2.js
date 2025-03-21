Ext.define('module.prod.project.prjtworklist.view.PrjtWorkListListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtworklist-lister-detail2',
	store		: 'module.prod.project.prjtworklist.store.PrjtWorkListDetail2',
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
					{	dataIndex:	'item_name'		, width : 300 , align : 'left'	, text: Language.get('item_name'	, '품명'			)
					},{	dataIndex:	'item_spec'		, width : 120 , align : 'left'	, text: Language.get('item_spec'	, '품목규격'		)
					},{	dataIndex:	'offr_qntt'		, width :  80 , align : 'right'	, text: Language.get('offr_qntt'	, '발주수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'offr_pric'		, width :  80 , align : 'right'	, text: Language.get('offr_pric'	, '발주단가'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'deli_date'		, width :  95 , align : 'center', text: Language.get('deli_date'	, '납기일자'		),
					},{	dataIndex:	'offr_amnt'		, width :  80 , align : 'right'	, text: Language.get('offr_amnt'	, '발주금액'		), xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex:	'offr_vatx'		, width :  80 , align : 'right'	, text: Language.get('offr_vatx'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'		, width :  80 , align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'		), xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex:	'user_memo'		, flex  :  20 , align : 'left'	, text: Language.get('user_memo'	, '메모'			)
					}
				]
			}
		;
		return item;
	}
});