Ext.define('module.prod.project.prjtorder.view.PrjtOrderListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtorder-lister-detail1',
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'	)	, width :  50 ,align : 'center'
					},{ dataIndex: 'chek_resn'		, text : Language.get('chek_resn'		,'계획일자')	, width :  90
					},{ dataIndex: 'chek_resn'		, text : Language.get('chek_resn'		,'시작시간')	, width :  70
					},{ dataIndex: 'repa_sbsc_name'	, text : Language.get('repa_sbsc_name'	,'종료시간')	, width :  70
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'계획번호')	, width :  70 ,align : 'center'
					},{ dataIndex: 'chek_date'		, text : Language.get('chek_date'		,'지시내용')	, width : 300 , align : 'left'
					},{ dataIndex: 'chek_date'		, text : Language.get('chek_date'		,'작업내용')	, width : 300 , align : 'left'
					},{ dataIndex: 'repa_cont'		, text : Language.get('repa_cont'		,'소요일수')	, width :  80
					},{ dataIndex: 'nxrm_chek_date'	, text : Language.get('nxrm_chek_date'	,'책임자'	)	, width :  80 , align : 'center'
					},{ dataIndex: 'repa_entr_name'	, text : Language.get('repa_entr_name'	,'투입인원')	, width :  80
					},{ dataIndex: 'repa_sbsc_name'	, text : Language.get('repa_sbsc_name'	,'진척율'	)	, width :  70
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'	)	, flex  : 100
					}
				]
			}
		;
		return item;
	}
});