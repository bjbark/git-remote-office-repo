Ext.define('module.prod.basic.wkctcvicmast.view.WkctCvicMastListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wkctcvicmast-lister-detail',
	store		: 'module.prod.basic.wkctcvicmast.store.WkctCvicDetail'	,
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
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드'		) , width : 110 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'		) , width : 170
					},{ dataIndex: 'abty_calc_yorn'	, text : Language.get('abty_calc_yorn'	,'능력산정'		) , width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'cvic_spec'		, text : Language.get('cvic_spec'		,'설비규격'		) , width : 150 , align : 'center'
					},{ dataIndex: 'cvic_stat_dvcd'	, text : Language.get('cvic_stat_dvcd'	,'설비상태'		) , width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_stat_dvcd'), align : 'center'
					},{ dataIndex: 'puch_date'		, text : Language.get('puch_date'		,'구매일자'		) , width : 80
					},{ dataIndex: 'puch_cstm_name'	, text : Language.get('puch_cstm_name'	,'구매처명'		) , width : 170
					},{ dataIndex: 'vend_tele_numb'	, text : Language.get('vend_tele_numb'	,'구매처전화번호'	) , width : 150 , align : 'center'
					},{ dataIndex: 'afsv_tele_numb'	, text : Language.get('afsv_tele_numb'	,'AS전화번호'	) , width : 150 , align : 'center'
					},{ dataIndex: 'mchn_numb'		, text : Language.get('mchn_numb'		,'기기번호'		) , width : 110 , align : 'center'
					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조사명'		) , width : 175
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , width  : 100 , hidden : true
					}
				]
			}
		;
		return item;
	}
});