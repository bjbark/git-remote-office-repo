Ext.define('module.prod.basic.wkctusermast.view.WkctUserMastListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wkctusermast-lister-detail',
	store		: 'module.prod.basic.wkctusermast.store.WkctUserDetail'	,
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
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'상태'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'empy_dvcd'	, text : Language.get('empy_dvcd'	,'직원구분'	) , width : 110 , align : 'center', hidden : true
					},{ dataIndex: 'user_code'	, text : Language.get('wker_code'	,'작업자코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'empy_name'	, text : Language.get('wker_name'	,'작업자명'	) , width : 150
//					},{ dataIndex: 'abty_dvcd'	, text : Language.get('abty_dvcd'	,'능력구분'	) , width : 150 , xtype  : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'dept_name'	, text : Language.get('work_dept'	,'소속부서'	) , width : 150 , align  : 'center'
					},{ dataIndex: 'wkrn_name'	, text : Language.get('wkrn_name'	,'직급'		) , width : 150 , align  : 'center'
					},{ dataIndex: 'labo_late'	, text : Language.get('labo_late'	,'임율'		) , width : 150 , hidden : true
					},{ dataIndex: 'join_date'	, text : Language.get('join_date'	,'입사일자'	) , width : 150 , align  : 'center'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});