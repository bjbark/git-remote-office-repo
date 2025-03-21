Ext.define('module.sale.project.prjtprocess.view.PrjtProcessListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtprocess-lister-detail3',
	store		: 'module.sale.project.prjtprocess.store.PrjtProcessDetail3',
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
				items :[
					{	dataIndex: 'seqn'			, text : Language.get('seqn'			,'순번'		) , width :  50,align : 'center'
					},{ dataIndex: 'name'			, text : Language.get('name'			,'작업내용') , width : 300, align : 'left'
					},{ dataIndex: 'duration'		, text : Language.get('duration'		,'소요일수'	) , width :  80, align : 'right',xtype : 'numericcolumn'
					},{ dataIndex: 'rsps_name'		, text : Language.get('rsps_name'		,'책임자'	) , width :  80
					},{ dataIndex: 'ivst_pcnt'		, text : Language.get('ivst_pcnt'		,'투입인원'	) , width :  80, align : 'right',xtype : 'numericcolumn'
					},{ dataIndex: 'need_mnhr'		, text : Language.get('need_mnhr'		,'소요공수'	) , width :  80, align : 'right',xtype : 'numericcolumn'
					},{ dataIndex: 'start'			, text : Language.get('start'			,'착수예정일') , width : 120, align : 'center',
						renderer:function(val){
							var time = new Date(Number(val));		// 한 번 넘버포맷 및 date로 바꿔준다.
							var date = time.getTime();				// milli time을 일반 date로 컨버터
							var test = new Date(date);				// 다시 한 번 date로 변환 (포맷처리 하지 않으면 필요없음)
							return Ext.Date.format(test,'Y-m-d');	// 포맷을 씌워준다.
						}
					},{ dataIndex: 'end'			, text : Language.get('end'				,'종료예정일')	, width : 120, align : 'center',
						renderer:function(val){
							var time = new Date(Number(val));		// 한 번 넘버포맷 및 date로 바꿔준다.
							var date = time.getTime();				// milli time을 일반 date로 컨버터
							var test = new Date(date);				// 다시 한 번 date로 변환 (포맷처리 하지 않으면 필요없음)
							return Ext.Date.format(test,'Y-m-d');	// 포맷을 씌워준다.
						}
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')	, flex  : 100, align : 'left',
					}
				]
			}
		;
		return item;
	}
});