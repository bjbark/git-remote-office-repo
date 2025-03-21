Ext.define('module.prod.project.prjtorder.view.PrjtOrderListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtorder-lister-detail3',
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
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'순번')		, width :  50 ,align : 'center'
					},{ dataIndex: ''			, text : Language.get(''			,'계획일자')	, width :  90
					},{ dataIndex: ''			, text : Language.get(''			,'시작시간')	, width :  70
					},{ dataIndex: ''			, text : Language.get(''			,'종료시간')	, width :  70
					},{ dataIndex: 'wkct_code'	, text : Language.get(''			,'공정코드')	, width :  80 , align : 'center'
					},{ dataIndex: 'wkct_name'	, text : Language.get(''			,'공정명')		, width : 150 , align : 'center'
					},{ dataIndex: 'cvic_code'	, text : Language.get(''			,'설비코드')	, width :  80 , align : 'center'
					},{ dataIndex: 'cvic_name'	, text : Language.get(''			,'설비명')		, width : 150 , align : 'center'
					},{	dataIndex: ''			, text : Language.get(''			,'계획번호')	, width :  70 , align : 'center'
					},{ dataIndex: ''			, text : Language.get(''			,'지시내용')	, width : 300 , align : 'left'
					},{ dataIndex: ''			, text : Language.get(''			,'작업내용')	, width : 300 , align : 'left'
					},{ dataIndex: ''			, text : Language.get(''			,'소요일수')	, width :  80
					},{ dataIndex: ''			, text : Language.get(''			,'책임자')		, width :  80 , align : 'center'
					},{ dataIndex: ''			, text : Language.get(''			,'투입인원')	, width :  80
					},{ dataIndex: ''			, text : Language.get(''			,'진척율')		, width :  70
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고')		, flex  : 100
					}
				]
			}
		;
		return item;
	}
});