Ext.define('module.custom.iypkg.sale.sale.salecolt.view.SaleColtDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-iypkg-salecolt-detail',
	store		: 'module.custom.iypkg.sale.sale.salecolt.store.SaleColtDetail',
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
					{	dataIndex: 'invc_numb'		, text : Language.get('colt_numb'		,'수금번호'		) , width : 90 , align : 'center'
					},{	dataIndex: 'invc_date'		, text : Language.get('colt_date'		,'수금일자'		) , width : 80 ,  align : 'center' ,hidden:true
					},{	dataIndex: 'iput_amnt_date'	, text : Language.get('iput_amnt_date'	,'입금일자'		) , width : 80,  align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 90
					},{	dataIndex: 'dept_name'		, text : Language.get('dept_name'		,'부서명'		) , width : 80
					},{	dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'담당자명'		) , width : 80
					},{	dataIndex: 'stot_dvcd'		, text : Language.get('stot_dvcd'		,'결제구분'		) , width :  70, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'stot_dvcd' ),align:'center'
					},{	dataIndex: 'stot_bass'		, text : Language.get('stot_bass'		,'결제근거'		) , width :  100
					},{	dataIndex: 'apvl_yorn'		, text : Language.get('apvl_yorn'		,'승인여부'		) , width :  60, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),align:'center'
					},{	dataIndex: 'apvl_drtr_name'	, text : Language.get('apvl_drtr_name'	,'승인담당자'		) , width :  100,hidden:true
					},{	dataIndex: 'apvl_date'		, text : Language.get('apvl_date'		,'승인일자'		) , width : 80 ,  align : 'center',hidden:true
					},{	dataIndex: 'publ_date'		, text : Language.get('publ_date'		,'발행일자'		) , width : 80 ,  align : 'center'
					},{	dataIndex: 'expr_date'		, text : Language.get('expr_date'		,'만기일자'		) , width : 80 ,  align : 'center'
					},{	dataIndex: 'paym_bank_name'	, text : Language.get('paym_bank_name'	,'지급은행명'		) , width : 100 ,
					},{	dataIndex: 'colt_amnt'		, text : Language.get('paym_bank_name'	,'수금금액'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});