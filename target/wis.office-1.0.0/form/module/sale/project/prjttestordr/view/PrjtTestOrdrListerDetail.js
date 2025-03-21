Ext.define('module.sale.project.prjttestordr.view.PrjtTestOrdrDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjttestordr-lister-detail',
	store		: 'module.sale.project.prjttestordr.store.PrjtTestOrdrDetail',
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

					'->',
					{text : '<span class="write-button">작업지시</span>'	, action : 'workAction'			, cls: 'button1-style'	},
					'-' ,
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
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'순번'	) , width :  50 , align : 'center'
					},{ dataIndex: 'cvic_name'	, text : Language.get('cvic_name'	,'설비명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'indn_qntt'	, text : Language.get('indn_qntt'	,'지시수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'poor_qntt'	, text : Language.get('poor_qntt'	,'불량수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{ dataIndex: 'pass_qntt'	, text : Language.get('pass_qntt'	,'합격수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{ dataIndex: 'regi_date'	, text : Language.get('regi_date'	,'지시일자'	) , width :  80 , align : 'center'
					},{ dataIndex: 'sttm'		, text : Language.get('sttm'		,'시작시간'	) , width : 130 , align : 'center'
					},{ dataIndex: 'edtm'		, text : Language.get('edtm'		,'종료시간'	) , width : 130 , align : 'center'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'	) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});