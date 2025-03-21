Ext.define('module.design.project.dsigwork.view.DsigWorkListerMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dsigwork-lister-master2',
	store		: 'module.design.project.dsigwork.store.DsigWorkMaster2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 50  , align : 'center', hidden : true
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'수주번호'	) , width : 150 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('work_date'		,'작업일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'작업내용'	) , flex  : 100 , align : 'left'
					},{ dataIndex: 'user_name'		, text : Language.get('wker_name'		,'작업자'		) , width : 80 ,
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'작업시작시간') , width : 80  , align : 'center', format : 'H:i'
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'작업종료시간') , width : 80  , align : 'center', format : 'H:i'
					},{ dataIndex: 'plan_rate'		, text : Language.get('plan_rate'		,'계획율'		) , width : 70  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'achi_rate'		, text : Language.get('achi_rate'		,'달성율'		) , width : 70  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'work_cond_1fst'	, text : Language.get('work_cond_1fst'	,'작업메모1'	) , width : 100 , align : 'left'
					},{ dataIndex: 'work_cond_2snd'	, text : Language.get('work_cond_2snd'	,'작업메모2'	) , width : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
