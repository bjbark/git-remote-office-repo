Ext.define('module.eis.project.arlist.view.ARListListerDetail12', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-arlist-lister-detail12',
	store		: 'module.eis.project.arlist.store.ARListDetail1',
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')		, width :  50 ,align : 'center'
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'수주번호')	, width : 120
					},{ dataIndex: 'item_code'		, text : Language.get('acpt_numb'		,'금형코드')	, width : 100
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')		, width : 180
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명')		, width : 120
					},{ dataIndex: 'colt_dvcd'		, text : Language.get('colt_dvcd'		,'수금항목')	, width :  80 , xtype : 'lookupcolumn', lookupValue : resource.lookup('colt_dvcd'), align : 'center'
					},{ dataIndex: 'schd_date'		, text : Language.get('schd_date'		,'예정일자')	, width :  80
					},{ dataIndex: 'plan_amnt'		, text : Language.get('plan_amnt'		,'계획금액')	, width :  80 , xtype : 'numericcolumn' , align : 'right'
					},{ dataIndex: ''				, text : Language.get(''				,'경과일수')	, width :  80 , xtype : 'numericcolumn' , align : 'right'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')		, flex  : 100
					}
				]
			}
		;
		return item;
	}
});