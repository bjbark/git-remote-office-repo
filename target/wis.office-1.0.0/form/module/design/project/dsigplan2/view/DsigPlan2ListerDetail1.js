Ext.define('module.design.project.dsigplan2.view.DsigPlan2ListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dsigplan2-lister-detail1',
	store		: 'module.design.project.dsigplan2.store.DsigPlan2Detail1',
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
					{	text : '승인/취소',
						menu : [
							{	text : '승인'	, action : 'okAction'
							},{	text : '취소'	, action : 'okCancelAction'
							}
						]
					},
					{	text : '<span class="write-button">승인</span>'	, action : 'approveAction'		, cls: 'button-style', width: 80	} ,
					{	text : '<span class="write-button">해제</span>'	, action : 'approveCancel'		, cls: 'button-style', width: 80	} ,
					'->', '-' ,
					{	text : '<span class="write-button">일정작성</span>'	, action : 'writeAction'		, cls: 'button1-style'} , '-',
					'->', '-' ,
					{text : '<span class="write-button">일정조정</span>'		, iconCls: 'icon-chart', action : 'changeAction'	, cls: 'button1-style'	} , '-' ,
//					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
//					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId:'detail1' }
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
					{	dataIndex: 'dsig_cofm_yorn'	, text : Language.get('dsig_cofm_yorn'	,'승인여부')	, width :  60 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'seqn'		, text : Language.get('seqn'	,'순번')			, width :  50 ,align : 'center'
					},{ dataIndex: 'id'			, text : Language.get('id'		,'id')		, width : 300 , align : 'center',hidden:true
					},{ dataIndex: 'dsig_schd_dvcd'	, text : Language.get('dsig_schd_dvcd'		,'dsig_schd_dvcd')		, width : 300 , align : 'center',hidden:true
					},{ dataIndex: 'name'		, text : Language.get('name'		,'작업내용')		, width : 300
					},{ dataIndex: 'duration'	, text : Language.get('duration'	,'소요일수')		, width :  80,xtype : 'numericcolumn'
					},{ dataIndex: 'rsps_name'	, text : Language.get('rsps_name'	,'책임자')		, width :  80
					},{ dataIndex: 'ivst_pcnt'	, text : Language.get('ivst_pcnt'	,'투입인원')		, width :  80,xtype : 'numericcolumn'
					},{ dataIndex: 'need_mnhr'	, text : Language.get('need_mnhr'	,'소요공수')		, width :  80,xtype : 'numericcolumn'
					},{ dataIndex: 'start'		, text : Language.get('start'		,'착수예정일')	, width : 120, align : 'center',
//						renderer:function(val){
//							var time = new Date(Number(val));		// 한 번 넘버포맷 및 date로 바꿔준다.
//							var date = time.getTime();				// milli time을 일반 date로 컨버터
//							var test = new Date(date);				// 다시 한 번 date로 변환 (포맷처리 하지 않으면 필요없음)
//							return Ext.Date.format(test,'Y-m-d');	// 포맷을 씌워준다.
//						}
					},{ dataIndex: 'end'		, text : Language.get('end'			,'종료예정일')	, width : 120, align : 'center',
//						renderer:function(val){
//							var time = new Date(Number(val));		// 한 번 넘버포맷 및 date로 바꿔준다.
//							var date = time.getTime();				// milli time을 일반 date로 컨버터
//							var test = new Date(date);				// 다시 한 번 date로 변환 (포맷처리 하지 않으면 필요없음)
//							return Ext.Date.format(test,'Y-m-d');	// 포맷을 씌워준다.
//						}
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고')			, flex  : 100
					}
				]
			}
		;
		return item;
	}
});