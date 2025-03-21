Ext.define('module.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purccstmlist1-lister',
	store		: 'module.mtrl.isttcalc.purccstmlist1.store.PurcCstmList1',
	border		: 0,
	columnLines	: true,
//	selModel	: { selType: 'checkboxmodel', mode : 'MULIT' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'invc_date'			, width: 90,  align : 'center',	text: Language.get( ''		, '입고일자'	)
					},{	dataIndex:	'cstm_name'			, width: 230, align : 'left'  ,	text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'item_name'			, width: 230, align : 'left'  ,	text: Language.get( 'item_name'		, '품명'	)
					},{	dataIndex:	'item_spec'			, width: 230, align : 'left'  ,	text: Language.get( 'item_spec'		, '규격'	)
					},{	dataIndex:	'qntt'				, width: 80,  align : 'right' ,	text: Language.get( 'carr_amnt'		, '입고수량'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'pric'				, width: 100, align : 'right' ,	text: Language.get( 'befr_pric'		, '단가'	), xtype : 'numericcolumn'
					},{	dataIndex:	'sply_amnt'			, width: 130, align : 'right' ,	text: Language.get( ''		, '공급가액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'			, width: 130, align : 'right' ,	text: Language.get( ''		, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'			, width: 150, align : 'right' ,	text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'iomy_amnt'			, width: 130, align : 'right' ,	text: Language.get( 'txbl_ttsm'		, '지급액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'npay_amnt'			, width: 150, align : 'right' ,	text: Language.get( 'unpay'			, '잔액'	), xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			};
		return item;
	}
 });