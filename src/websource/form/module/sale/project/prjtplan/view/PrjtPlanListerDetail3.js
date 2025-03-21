Ext.define('module.sale.project.prjtplan.view.PrjtPlanListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtplan-lister-detail3',
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
					{	dataIndex: 'line_seqn'		, text : Language.get(''	,'순번')		, width :  50 ,align : 'center'
					},{ dataIndex: 'wkct_code'		, text : Language.get(''	,'공정코드')	, width :  80 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get(''	,'공정명')		, width : 150 , align : 'center'
					},{ dataIndex: 'cvic_code'		, text : Language.get(''	,'설비코드')	, width :  80 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get(''	,'설비명')		, width : 150 , align : 'center'
					},{ dataIndex: 'work_cont'		, text : Language.get(''	,'작업내용')	, width : 200 , align : 'center'
					},{ dataIndex: 'need_dcnt'		, text : Language.get(''	,'소요일수')	, width :  80
					},{ dataIndex: 'rsps_name'		, text : Language.get(''	,'책임자')		, width :  80 , align : 'center'
					},{ dataIndex: 'ivst_pcnt'		, text : Language.get(''	,'투입인원')	, width :  80
					},{ dataIndex: 'need_mnhr'		, text : Language.get(''	,'소요공수')	, width :  80, align : 'center'
					},{ dataIndex: 'strt_schd_date'	, text : Language.get(''	,'착수예정일')	, width : 120
					},{ dataIndex: 'endd_schd_date'	, text : Language.get(''	,'종료예정일')	, width : 120
					},{ dataIndex: 'remk_date'		, text : Language.get(''	,'비고')		, flex  : 100
					}
				]
			}
		;
		return item;
	}
});