Ext.define('module.sale.project.prjtprocess.view.PrjtProcessListerDetail5', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtprocess-lister-detail5',
	store		: 'module.sale.project.prjtprocess.store.PrjtProcessDetail5',
	plugins       : [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
					{	dataIndex: 'rank'		, text : Language.get('rank'		,'순번'		) , width :  50 , align : 'center'
					},{	dataIndex: 'amnd_resn'	, text : Language.get('amnd_resn'	,'사유'		) , width : 300 , align : 'left'
					},{	dataIndex: 'prjt_name'	, text : Language.get('prjt_name'	,'프로젝트명'	) , width : 170 , align : 'left',hidden : true
					},{	dataIndex: 'item_code'	, text : Language.get('acpt_numb'	,'금형코드'		) , width : 100 , align : 'center'
					},{	dataIndex: 'item_name'	, text : Language.get('acpt_case_name','금형명'	) , width : 170 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'품목규격'		) , width : 170 , align : 'left',hidden : true
					},{	dataIndex: 'modl_name'	, text : Language.get('modl_name'	,'차종명'		) , width : 120 , align : 'left'
					},{	dataIndex: 'esti_amnt'	, text : Language.get('esti_amnt'	,'견적금액'		) , width :  80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'regi_date'	, text : Language.get('regi_date'	,'등록일자'		) , width :  80 , align : 'center'
					},{	dataIndex: 'deli_date'	, text : Language.get('deli_date'	,'납기일자'		) , width :  80 , align : 'center'
					},{	dataIndex: 'strt_date'	, text : Language.get('strt_date'	,'착수일자'		) , width :  80 , align : 'center'
					},{	dataIndex: 'endd_date'	, text : Language.get('endd_date'	,'완료일자'		) , width :  80 , align : 'center'
					},{	dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
