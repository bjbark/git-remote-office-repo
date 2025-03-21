Ext.define('module.custom.komec.stock.isos.prodnotwork.view.ProdNotWorkLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodnotwork-lister2',
	store		: 'module.custom.komec.stock.isos.prodnotwork.store.ProdNotWorkLister2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					'->','-' ,
					{	text : '<span class="write-button">불량폐기</span>'	, action : 'poordeleteAction' , cls: 'button1-style'},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'item_idcd'			, width:  80, align : 'left'   , text: Language.get( 'item_idcd'		, '품목ID'	), hidden : true
					},{	dataIndex:	'pdod_date'			, width: 90 , align : 'center' , text: Language.get( 'istt_date'		, '불량일자'		)
					},{	dataIndex:	'item_code'			, width:  90, align : 'center' , text: Language.get( 'item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'   , text: Language.get( 'item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 150, align : 'left'   , text: Language.get( 'item_spec'		, '규격'		)
					},{	dataIndex:	'unit_idcd'			, width:  80, align : 'left'   , text: Language.get( 'unit_idcd'		, '단위ID'	), hidden : true
					},{	dataIndex:	'unit_name'			, width:  50, align : 'left'   , text: Language.get( 'unit_name'		, '단위'		)
					},{	dataIndex:	'lott_numb'			, width: 120, align : 'left'   , text: Language.get( 'lott_numb'		, 'LOT번호'	)
					},{	dataIndex:	'poor'				, width:  80, align : 'right'  , text: Language.get( 'istt_qntt'		, '불량수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					}
				]
			}
		;
		return item;
	}
});