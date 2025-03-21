Ext.define('module.prod.project.prjtorder.view.PrjtOrderListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtorder-lister-detail2',
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
					{	text : '<span class="write-button">작업지시</span>'			, action : 'etcPrintAction', cls: 'button1-style'	},
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
					{	dataIndex: 'line_seqn'		, text : Language.get(''			,'순번'		)	, width :  50 ,align : 'center'
					},{ dataIndex: 'chek_date'		, text : Language.get(''			,'사유'		)	, width : 300 , align : 'center'
					},{ dataIndex: 'prjt_name'		, text : Language.get('prjt_name'	,'프로젝트명'	)	, width : 170
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'	,'품목코드'	)	, width : 100
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'	,'품명'		)	, width : 170
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'	,'규격'		)	, width : 170
					},{ dataIndex: 'item_modl'		, text : Language.get('item_modl'	,'모델명'		)	, width : 120
					},{ dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'	,'견적금액'	)	, width :  80
					},{ dataIndex: 'regi_date'		, text : Language.get('regi_date'	,'등록일자'	)	, width : 80
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'	,'납기일자'	)	, width : 80
					},{ dataIndex: 'strt_date'		, text : Language.get('strt_date'	,'착수일자'	)	, width : 80
					},{ dataIndex: 'endd_date'		, text : Language.get('endd_date'	,'완료일자'	)	, width : 80
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'	,'비고'		)	, flex  : 100
					}
				]
			}
		;
		return item;
	}
});