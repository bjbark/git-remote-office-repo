Ext.define('module.user.usermast.view.UserMastLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-usermast-lister',
	store		: 'module.user.usermast.store.UserMast',
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}, { ptype:'filterbar'}],

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent : function () {
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style',itemId:'modify' } ,
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
				items : [
					{	dataIndex: 'user_code'		, text : Language.get('user_code'		,'사원번호'	) , width :  90	, align : 'center',filter:true
					},{	dataIndex: 'user_name'		, text : Language.get('prsn_name'		,'성명'		) , width :  80	, summaryType : 'count',filter:true
					},{	dataIndex: 'dept_name'		, text : Language.get('dept_name'		,'부서명'		) , width :  90	, align : 'center',filter:true
					},{	dataIndex: 'wkrn_name'		, text : Language.get('wkrn_name'		,'직급'		) , width :  90	, align : 'center',filter:true
					},{	dataIndex: 'hoof_stat_dvcd'	, text : Language.get('hoof_stat_dvcd'	,'재직상태'	) , width :  70	, align : 'center'	, xtype : 'lookupcolumn' , lookupValue:resource.lookup('hoof_stat_dvcd'),filter:true
					},{	dataIndex: 'hdph_numb'		, text : Language.get('tele_numb'		,'연락처'		) , width : 100	, align : 'center',filter:true
					},{	dataIndex: 'mail_addr'		, text : Language.get('mail_addr'		,'이메일'		) , width : 140,filter:true
					},{	dataIndex: 'duty_dvcd'		, text : Language.get('duty_dvcd'		,'업무구분'	) , width : 100	, align : 'center', xtype : 'lookupcolumn'	, lookupValue:resource.lookup('duty_dvcd'),filter:true
					},{	dataIndex: 'auth_dvcd'		, text : Language.get('auth_dvcd'		,'기본권한'	) , width : 100	, align : 'center',	xtype : 'lookupcolumn'	, lookupValue:resource.lookup('auth_dvcd'),filter:true
					},{	dataIndex: 'natn_bacd_name'	, text : Language.get('natn_bacd_name'	,'국적'		) , width :  90,filter:true
					},{	dataIndex: 'join_date'		, text : Language.get('join_date'		,'입사일자'	) , width :  80	, align : 'center',filter:true
					},{	dataIndex: 'rtmt_date'		, text : Language.get('rtmt_date'		,'퇴사일자'	) , width :  80	, align : 'center',filter:true
					},{	dataIndex: 'dept_code'		, text : Language.get('dept_idcd'		,'부서코드'	) , width :  70	, align : 'center', hidden : true,filter:true
					},{	dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100	, align : 'left',filter:true
					}
				]
			}
		;
		return item;
	}
});