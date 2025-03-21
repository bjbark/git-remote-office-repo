Ext.define('module.custom.kitec.prod.castchecklist.view.CastCheckListDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-castchecklist-detail',
	store		: 'module.custom.kitec.prod.castchecklist.store.CastCheckListDetail',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					'->','-' ,
//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width :  50 , align : 'center'
					},{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'cond_dvcd'		, text : Language.get('cond_dvcd'		,'조건구분'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('cond_dvcd')
					},{ dataIndex: 'cond_name'		, text : Language.get('cond_name'		,'조건명'		) , width : 400 , align : 'left'
					},{ dataIndex: 'stup_veri'		, text : Language.get('stup_veri'		,'셋업검증'		) , width : 100 , align : 'center', hidden : true
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위명'		) , width :  80 , align : 'center'
					},{ dataIndex: 'frst_msmt'		, text : Language.get('frst_msmt'		,'1차측정'		) , width : 100 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'send_msmt'		, text : Language.get('send_msmt'		,'2차측정'		) , width : 100 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'thrd_msmt'		, text : Language.get('thrd_msmt'		,'3차측정'		) , width : 100 , align : 'right', xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});