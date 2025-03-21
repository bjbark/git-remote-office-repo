Ext.define('module.design.project.dsigplan1.view.DsigPlan1ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dsigplan1-lister-master',
	store		: 'module.design.project.dsigplan1.store.DsigPlan1Master',
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
					{	text : '<span class="write-button">대일정 복사</span>', action : 'copyAction', cls: 'button1-style'	},
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
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')			, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'prjt_code'		, text : Language.get('prjt_code'		,'프로젝트번호')	, width : 110 , align : 'center'
					},{ dataIndex: 'prjt_amnd'		, text : Language.get('prjt_amnd'		,'AMD')			, width : 40 , align : 'center'
					},{ dataIndex: 'prjt_dvcd'		, text : Language.get('prjt_dvcd'		,'구분')			, width : 40 , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_stat_dvcd'), align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명')		, width : 170
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드')		, width : 80
					},{ dataIndex: 'prjt_name'		, text : Language.get('prjt_name'		,'프로젝트명')		, width : 170
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드')		, width : 100
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')		, width : 170
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'품목규격')		, width : 170
					},{ dataIndex: 'item_modl'		, text : Language.get('item_modl'		,'모델명')		, width : 120
					},{ dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'		,'견적금액')		, width :  80
					},{ dataIndex: 'regi_date'		, text : Language.get('regi_date'		,'등록일자')		, width : 80
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자')		, width : 80
					},{ dataIndex: 'strt_date'		, text : Language.get('strt_date'		,'착수일자')		, width : 80
					},{ dataIndex: 'endd_date'		, text : Language.get('endd_date'		,'완료일자')		, width : 80
					},{ dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'확정')			, width : 40 , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_stat_dvcd'), align : 'center'
					},{ dataIndex: 'cofm_date'		, text : Language.get('cofm_date'		,'확정일자')		, width : 80
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'영업담당')		, width : 80
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')			, flex  : 100
					}
				]
			}
		;
		return item;
	}
});
