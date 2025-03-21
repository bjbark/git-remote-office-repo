Ext.define('module.design.project.dsigplan2.view.DsigPlan2ListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dsigplan2-lister-detail3',
	store		: 'module.design.project.dsigplan2.store.DsigPlan2Detail3',
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId:'detail3' }
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
					{	dataIndex: 'seqn'	, text : Language.get('seqn'	,'순번')			, width :  50 ,align : 'center'
					},{ dataIndex: 'name'		, text : Language.get('name'		,'작업내용')		, width : 300 , align : 'center'
					},{ dataIndex: 'duration'	, text : Language.get('duration'	,'소요일수')		, width :  80,xtype : 'numericcolumn'
					},{ dataIndex: 'rsps_name'	, text : Language.get('rsps_name'	,'책임자')		, width :  80
					},{ dataIndex: 'ivst_pcnt'	, text : Language.get('ivst_pcnt'	,'투입인원')		, width :  80,xtype : 'numericcolumn'
					},{ dataIndex: 'need_mnhr'	, text : Language.get('need_mnhr'	,'소요공수')		, width :  80,xtype : 'numericcolumn'
					},{ dataIndex: 'start'		, text : Language.get('start'		,'착수예정일')	, width : 120, align : 'center',
					},{ dataIndex: 'end'		, text : Language.get('end'			,'종료예정일')	, width : 120, align : 'center',
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고')			, flex  : 100
					}
				]
			}
		;
		return item;
	}
});