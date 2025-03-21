Ext.define('module.custom.dehansol.item.salepricework.view.SalePriceWorkLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salepricework-lister',
	store		: 'module.custom.dehansol.item.salepricework.store.SalePriceWork',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true }],
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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		, '상태'		) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex: 'invc_date'		, text : Language.get(''				, '등록일자'	) , width :  90 , align : 'center'
					},{	dataIndex: 'item_idcd'		, text : Language.get(''				, '품목코드'	) , width : 100 , align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		, '업체명'	) , width : 180
					},{	dataIndex: 'item_make_dvcd'	, text : Language.get('item_make_dvcd'	, '제판종류'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('item_make_dvcd')
					},{	dataIndex: 'item_type_dvcd'	, text : Language.get('item_type_dvcd'	, '필름유제'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('item_type_dvcd')
					},{	dataIndex: 'mesh_name'		, text : Language.get('mesh_name'		, '메쉬명'	) , width : 100
					},{	dataIndex: 'diag_sqre'		, text : Language.get('diag_sqre'		, '대각/평각'	) , width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'plmk_size_horz'	, text : Language.get('plmk_size_horz'	, '가로'		) , width : 80  , xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'plmk_size_vrtl'	, text : Language.get('plmk_size_vrtl'	, '세로'		) , width : 80  , xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'dict_yorn'		, text : Language.get('dict_yorn'		, '다이렉트'	) , width : 70  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'unit_name'		, text : Language.get(''				, '단위'		) , width : 75
					},{	dataIndex: 'mesh_ndqt'		, text : Language.get('mesh_ndqt'		, '메쉬소요량') , width : 85  , xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		, '판매단가'	) , width : 150 , xtype: 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});