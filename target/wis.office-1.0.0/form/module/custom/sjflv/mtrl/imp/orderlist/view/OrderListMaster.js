Ext.define('module.custom.sjflv.mtrl.imp.orderlist.view.OrderListMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-orderlist-master',
	store		: 'module.custom.sjflv.mtrl.imp.orderlist.store.OrderListMaster',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
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
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
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
				items : [
					{	dataIndex: ''		, text : Language.get(''		,'선택'		) , width : 50 , align : 'center'
					},{	dataIndex: ''		, text : Language.get(''		,'확정'		) , width : 50 ,  align : 'center'
					},{	dataIndex: ''		, text : Language.get(''		,'중단'		) , width : 50 ,  align : 'center'
					},{	dataIndex: 'line_stat'		, text : Language.get('line_stat'	,'상태'		) , width : 50  ,  align : 'center'
					},{	dataIndex: 'bzpl_name'		, text : Language.get('bzpl_name'	,'사업장'		) , width : 100 ,  align : 'center'
					},{	dataIndex: 'ordr_numb'		, text : Language.get('ordr_numb'	,'Order No'	) , width : 120
					},{	dataIndex: 'amnd_degr'		, text : Language.get('amnd_degr'	,'AMD'		) , width : 50  ,  align : 'center'
/*데이터 없음*/			},{	dataIndex: 'incm_dvcd'		, text : Language.get('incm_dvcd'	,'수입구분'		) , width : 80  ,  xtype: 'lookupcolumn' , lookupValue: resource.lookup('incm_dvcd'),align:'center' 
					},{	dataIndex: 'mngt_numb'		, text : Language.get('mngt_numb'	,'관리번호'		) , width : 70
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'	,'대표품목'		) , width : 100
					},{	dataIndex: 'ordr_date'		, text : Language.get('ordr_date'	,'PO Date'	) , width : 80,  align : 'center'
					},{	dataIndex: 'ship_viaa_dvcd'	, text : Language.get('ship_viaa_dvcd','Ship Via'), width : 80,  align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'ship_viaa_dvcd' ),align:'center'
					},{	dataIndex: ''		, text : Language.get(''		,'Vendor'	) , width : 100 ,  align : 'center'
					},{	dataIndex: 'mdtn_prsn'		, text : Language.get('mdtn_prsn'	,'중개인'		) , width : 100 ,  align : 'left'
					},{	dataIndex: 'drtr_name'		, text : Language.get('drtr_name'	,'담당자'		) , width : 100 ,  align : 'left'
					},{	dataIndex: 'pric_cond_dvcd'	, text : Language.get('pric_cond_dvcd','가격조건'	) , width : 80  ,  align : 'left'
					},{	dataIndex: 'trde_stot_dvcd'	, text : Language.get('trde_stot_dvcd','결제방법'	) , width : 80  ,  align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( '' ),align:'center'
					},{	dataIndex: 'stot_time_dvcd'	, text : Language.get('stot_time_dvcd','결제시기'	) , width : 80  ,  align : 'center'
					},{	dataIndex: 'stot_ddln'		, text : Language.get('stot_ddln'	,'결제기한'		) , width : 100 ,
					},{	dataIndex: 'mney_unit'		, text : Language.get('mney_unit'	,'통화'		) , width : 100 ,
					},{	dataIndex: 'exch_pric'		, text : Language.get('exch_pric'	,'적용환율'		) , width : 100 ,  xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});