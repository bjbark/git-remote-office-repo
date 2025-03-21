Ext.define('module.qc.project.testprod.view.TestProdListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-testprod-lister-detail',
	store		: 'module.qc.project.testprod.store.TestProdDetail',
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
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'순번'	) , width :  50 , align : 'center'
					},{ dataIndex: 'cvic_name'	, text : Language.get('cvic_name'	,'설비명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'prod_qntt'	, text : Language.get('prod_qntt'	,'생산수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'poor_qntt'	, text : Language.get('poor_qntt'	,'불량수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{ dataIndex: 'pass_qntt'	, text : Language.get('pass_qntt'	,'합격수량'	) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{ dataIndex: 'loss_rate'	, text : Language.get('loss_rate'	,'loss율') , width :  80 , align : 'right', hidden : true
					},{ dataIndex: 'drtr_name'	, text : Language.get('drtr_name'	,'담당자명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'regi_date'	, text : Language.get('regi_date'	,'생산일자'	) , width :  80 , align : 'center'
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