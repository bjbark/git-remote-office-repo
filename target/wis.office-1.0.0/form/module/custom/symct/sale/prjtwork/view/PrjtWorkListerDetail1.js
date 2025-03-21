Ext.define('module.custom.symct.sale.prjtwork.view.PrjtWorkListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtwork-lister-detail1',
	store		: 'module.custom.symct.sale.prjtwork.store.PrjtWorkDetail1',
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
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
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
					{	dataIndex: 'rank'		, text : Language.get('rank'		,'순번'		) , width :  50 , align : 'center'
					},{	dataIndex: 'amnd_resn'	, text : Language.get('amnd_resn'	,'사유'		) , width : 300 , align : 'left'
					},{	dataIndex: 'prjt_name'	, text : Language.get('prjt_name'	,'프로젝트명'	) , width : 170 , align : 'left' , hidden:true
					},{	dataIndex: 'item_idcd'	, text : Language.get('item_idcd'	,'수주번호'	) , width : 100 , align : 'center'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 170 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'금형규격'	) , width : 170 , align : 'left' , hidden:true
					},{	dataIndex: 'esti_amnt'	, text : Language.get('esti_amnt'	,'견적금액'	) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', hidden:true
					},{	dataIndex: 'regi_date'	, text : Language.get('regi_date'	,'등록일자'	) , width :  80 , align : 'center'
					},{	dataIndex: 'deli_date'	, text : Language.get('deli_date'	,'납기일자'	) , width :  80 , align : 'center'
					},{	dataIndex: 'strt_date'	, text : Language.get('strt_date'	,'착수일자'	) , width :  80 , align : 'center'
					},{	dataIndex: 'endd_date'	, text : Language.get('endd_date'	,'완료일자'	) , width :  80 , align : 'center'
					},{	dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 100 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});