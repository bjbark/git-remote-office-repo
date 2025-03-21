Ext.define('module.custom.dhtec.sale.order.saleplanorder2.view.SalePlanOrder2Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleplanorder2-lister'			,
	store		: 'module.custom.dhtec.sale.order.saleplanorder2.store.SalePlanOrder2'	,
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
					{	text	: '계약확정/취소',
						hidden	: (_global.options.acpt_fix_yorn==0),
						menu	: [
							{	text : '확정', action : 'okAction'
							},{	text : '취소', action : 'okCancelAction'
							}
						]
					},
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
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
				items	: [
					{	dataIndex : ''	, text : Language.get('acpt_numb'	,'계획년월'		), width: 90, align : 'center'
					},{	dataIndex : ''	, text : Language.get('acpt_numb'	,'판매'		), width: 60, align : 'center'
					},{	dataIndex : ''	, text : Language.get('acpt_numb'	,'영업담당'		), width: 120, align : 'center'
					},{	text: Language.get(''	,'품목'		), dataIndex : ''	, align : 'center',
						columns: [
							{	dataIndex: ''		, text: Language.get(''		, '품목코드'		) , width:  80, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							},{	dataIndex: ''		, text: Language.get(''		, '품목명'		) , width:  200, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							},{	dataIndex: ''		, text: Language.get(''		, '규격'		) , width:  150, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							}
						]
					},{	dataIndex : ''	, text : Language.get('acpt_numb'	,'고객'		), width: 100, align : 'center'
					},{
						text: Language.get('acpt_date'	,'계획'		), dataIndex : 'invc_date'	, align : 'center',
						columns: [
							{	text : Language.get('ordr_date'	,'수량'		), dataIndex: 'invc_date', align : 'center'
							}
						]
					},{	dataIndex : ''	, text : Language.get(''	,'단가'		), width: 120, align : 'center'
					},{	dataIndex : ''	, text : Language.get(''	,'환율'		), width: 120, align : 'center'
					},{
						text: Language.get('acpt_date'	,'계획'		), dataIndex : 'invc_date'	, align : 'center',
						columns: [
							{	text : Language.get('ordr_date'	,'금액'		), dataIndex: 'invc_date', align : 'center'
							}
						]
					},{	dataIndex : ''	, text : Language.get(''	,'비고'		), width: 250, align : 'center'
					},{	dataIndex : ''	, text : Language.get(''	,'계획확정여부'		), width: 100, align : 'center'
					}
				]
			}
		;
		return item;
	}
});
