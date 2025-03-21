Ext.define('module.sale.project.prjtwork.view.PrjtWorkListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtwork-lister-detail2',
	store		: 'module.sale.project.prjtwork.store.PrjtWorkDetail2',
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
					{	dataIndex: 'seqn'				, text : Language.get('seqn'			,'순번'		) , width :  50 ,align: 'center'
					},{ dataIndex: 'name'				, text : Language.get('name'			,'설계요소명'	) , width : 300 ,align: 'left'
					},{ dataIndex: 'duration'			, text : Language.get('duration'		,'소요일수'		) , width :  80 ,align: 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'rsps_name'			, text : Language.get('rsps_name'		,'책임자'		) , width :  80 ,align: 'left'
					},{ dataIndex: 'ivst_pcnt'			, text : Language.get('ivst_pcnt'		,'투입인원'		) , width :  80 ,align: 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'need_mnhr'			, text : Language.get('need_mnhr'		,'소요공수'		) , width :  80 ,align: 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'startismilestone'	, text : Language.get('startismilestone','착수예정일'	) , width :  80 ,align: 'center'
					},{ dataIndex: 'endismilestone'		, text : Language.get('endismilestone'	,'종료예정일'	) , width :  80 ,align: 'center'
					},{ dataIndex: 'user_memo'			, text : Language.get('user_memo'		,'비고'		) , flex  : 100 ,align: 'left'
					}
				]
			}
		;
		return item;
	}
});