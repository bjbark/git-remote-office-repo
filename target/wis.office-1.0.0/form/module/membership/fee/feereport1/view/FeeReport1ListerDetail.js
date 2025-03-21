Ext.define('module.membership.fee.feereport1.view.FeeReport1ListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-feereport1-lister-detail'			,
	store		: 'module.membership.fee.feereport1.store.FeeReport1Detail'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
//	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}, { ptype:'filterbar'}],
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		console.log(_global.hq_id);
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
//					{	xtype   : 'button',
//						iconCls : 'filterIcon',
//						toggleGroup:'onoff',
//						listeners:{
//							toggle:function(toggle){
//								var filter = me.filterBar;
//									filter.setVisible(toggle.pressed);
//							}
//						}
//					},
					'->', '-' ,
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
					{	dataIndex: 'mmbr_name'	, width:  90, align : 'center'	, text: Language.get('mmbr_name'	, '회원명'		)
					},{ dataIndex: 'qntt'		, width:  70, align : 'right'	, text: Language.get('qntt'			, '횟수'			), xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'pric'		, width:  70, align : 'right'	, text: Language.get('pric'			, '회당금액'		), xtype : 'numericcolumn'
					},{ dataIndex: 'amnt'		, width:  80, align : 'right'	, text: Language.get('amnt'			, '영수금액'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'lssn_stdt'	, width:  90, align : 'center'	, text: Language.get('lssn_stdt'	, '레슨시작일'		),
					},{	dataIndex: 'acce_dvcd'	, width: 100, align : 'center'	, text: Language.get('acce_dvcd'	, '수납구분'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('acce_dvcd') , hidden: true
					},{	dataIndex: 'stot_dvcd'	, width: 100, align : 'center'	, text: Language.get('stot_dvcd'	, '결제방법'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('stot_dvcd') , hidden: true
					},{	dataIndex: 'acct_nmbr'	, width: 130, align : 'center'	, text: Language.get('acct_nmbr'	, '입금계좌번호'	),
					},{	dataIndex: 'drtr_name'	, width: 100, align : 'center'	, text: Language.get('drtr_name'	, '입금 담당'		),
					},{	dataIndex: 'user_memo'	, flex : 1  , align : 'left'	, text: Language.get('user_memo'	, '메모'			),
					},{	dataIndex: 'updt_dttm'	, width: 150, align : 'center'	, text: Language.get('updt_dttm'	, '수정일시'		), hidden : false
					},{	dataIndex: 'crte_dttm'	, width: 150, align : 'center'	, text: Language.get('crte_dttm'	, '생성일시'		), hidden : false
					}
				]
			}
		;
		return item;
	}
});
