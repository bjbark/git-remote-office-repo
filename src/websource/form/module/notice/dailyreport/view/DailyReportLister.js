Ext.define('module.notice.dailyreport.view.DailyReportLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-dailyreport-lister',
	store		: 'module.notice.dailyreport.store.DailyReport',
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
					{	text : '승인/취소',
						hidden   : !_global.auth.auth_admn_1001,
						menu : [
							{	text : '승인'	, action : 'okAction' ,       itemId : 'ok'
							},{	text : '반려'	, action : 'rejectAction' ,   itemId : 'reject'
							},{	text : '취소'	, action : 'okCancelAction' , itemId : 'cancel'
							}
						]
					},
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style', action : 'inspAction' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style', action : 'inspAction2' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'user_name'		, text : Language.get('user_name'		,'사원'			)	, width : 100	, align : 'center'
					},{ dataIndex: 'dwup_date'		, text : Language.get('dwup_date'		,'근무일자'		)	, width : 80	, align : 'center'
					},{ dataIndex: 'plan_rslt_name'	, text : Language.get('plan_rslt_name'	,'계획/실적'		)	, width : 60	, align : 'center'
					},{ dataIndex: 'oprt_smry'		, text : Language.get('oprt_smry'		,'요약'			)	, width : 300	, align : 'left'
					},{ dataIndex: 'prjt_name'		, text : Language.get('prjt_name'		,'프로젝트'		)	, width : 200	, align : 'left'
					},{ dataIndex: 'prog_rate'		, text : Language.get('prog_rate'		,'진척율'		)	, width : 55	, align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'oprt_cont'		, text : Language.get('oprt_cont'		,'업무내용'		)	, flex  : 1		, align : 'left'
					},{ dataIndex: 'admn_opin'		, text : Language.get('admn_opin'		,'관리자의견'		)	, flex  : 1		, align : 'left'
					},{	dataIndex: 'apvl_dvcd'		, text : Language.get('apvl_dvcd'		,'승인여부'		)	, width : 70	, align : 'center', xtype: 'lookupcolumn', lookupValue: resource.lookup('apvl_dvcd')
					},{ dataIndex: 'apvl_date'		, text : Language.get('apvl_date'		,'승인일자'		)	, width : 80	, align : 'center'
					},{	dataIndex: 'user_idcd'		, text : Language.get('user_idcd'		,'사용자ID'		)	, width : 100	, align : 'left' , hidden:true
					},{ dataIndex: 'dwup_date'		, text : Language.get('dwup_date'		,'작성일자'		)	, width : 100	, align : 'left' , hidden:true
					},{ dataIndex: 'prjt_idcd'		, text : Language.get('prjt_idcd'		,'프로젝트ID'	)	, width : 100	, align : 'left' , hidden:true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'			)	, width : 100	, align : 'left' , hidden:true
					}
				]
			}
		;
		return item;
	}
});
