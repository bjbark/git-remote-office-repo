Ext.define('module.sale.project.prjtplan.view.PrjtPlanListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtplan-lister-detail1',
	store		: 'module.sale.project.prjtplan.store.PrjtPlanDetail1',
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
					{text : '일정조정'	, iconCls: 'icon-chart', action : 'changeAction'		, cls: 'button-style'} , '-' ,
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')		, width :  50 ,align : 'center'
					},{ dataIndex: 'chek_date'		, text : Language.get('chek_date'		,'설계요소명')	, width : 300 , align : 'center'
					},{ dataIndex: 'repa_cont'		, text : Language.get('repa_cont'		,'소요일수')	, width :  80
					},{ dataIndex: 'nxrm_chek_date'	, text : Language.get('nxrm_chek_date'	,'책임자')		, width :  80 , align : 'center'
					},{ dataIndex: 'repa_entr_name'	, text : Language.get('repa_entr_name'	,'투입인원')	, width :  80
					},{ dataIndex: 'repa_need_time'	, text : Language.get('repa_need_time'	,'소요공수')	, width :  80, align : 'center'
					},{ dataIndex: 'chek_resn'		, text : Language.get('chek_resn'		,'착수예정일')	, width : 120
					},{ dataIndex: 'repa_sbsc_name'	, text : Language.get('repa_sbsc_name'	,'종료예정일')	, width : 120
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')		, flex  : 100
					}
				]
			}
		;
		return item;
	}
});