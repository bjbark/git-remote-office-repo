Ext.define('module.prod.project.prjtprodplan1.view.PrjtProdPlan1ListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtprodplan1-lister-detail1',
	store		: 'module.prod.project.prjtprodplan1.store.PrjtProdPlan1Detail1',
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
					{	text : '<span class="write-button">승인</span>'	, action : 'approveAction'		, cls: 'button-style', width: 80	} ,
					{	text : '<span class="write-button">해제</span>'	, action : 'approveCancel'		, cls: 'button-style', width: 80	} ,
					'->', '-' ,
//					{	text : '<span class="write-button">세부일정작성</span>'	, action : 'copyAction'		, cls: 'button1-style'	} , '-',
					'->', '-' ,
					{text : '<span class="write-button">일정조정</span>'		, iconCls: 'icon-chart', action : 'changeAction'		, cls: 'button1-style'} , '-' ,
//					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
//					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
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
					{	dataIndex: 'seqn'		, text : Language.get('seqn'		,'순번'	)	, width :  50	, align : 'center'
					},{ dataIndex: 'name'		, text : Language.get('name'		,'작업내용')	, width : 300	, align : 'center'
					},{ dataIndex: 'duration'	, text : Language.get('duration'	,'소요일수')	, width :  80	, xtype : 'numericcolumn'
					},{ dataIndex: 'rsps_name'	, text : Language.get('rsps_name'	,'책임자'	)	, width :  80
					},{ dataIndex: 'ivst_pcnt'	, text : Language.get('ivst_pcnt'	,'투입인원')	, width :  80	, xtype : 'numericcolumn'
					},{ dataIndex: 'need_mnhr'	, text : Language.get('need_mnhr'	,'소요공수')	, width :  80	, xtype : 'numericcolumn'
					},{ dataIndex: 'start'		, text : Language.get('start'		,'착수예정일')	, width : 120	, align : 'center',
						renderer:function(val){
							var time = new Date(Number(val));		// 한 번 넘버포맷 및 date로 바꿔준다.
							var date = time.getTime();				// milli time을 일반 date로 컨버터
							var test = new Date(date);				// 다시 한 번 date로 변환 (포맷처리 하지 않으면 필요없음)
							return Ext.Date.format(test,'Y-m-d');	// 포맷을 씌워준다.
						}
					},{ dataIndex: 'end'		, text : Language.get('end'			,'종료예정일')	, width : 120, align : 'center',
						renderer:function(val){
							var time = new Date(Number(val));		// 한 번 넘버포맷 및 date로 바꿔준다.
							var date = time.getTime();				// milli time을 일반 date로 컨버터
							var test = new Date(date);				// 다시 한 번 date로 변환 (포맷처리 하지 않으면 필요없음)
							return Ext.Date.format(test,'Y-m-d');	// 포맷을 씌워준다.
						}
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고')		, flex  : 100
					}
				]
			}
		;
		return item;
	}
});