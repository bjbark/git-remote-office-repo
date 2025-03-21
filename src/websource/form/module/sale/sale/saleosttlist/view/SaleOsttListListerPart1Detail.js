Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListListerPart1Detail', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-salelist-lister-part1-detail',
	store		: 'module.sale.sale.saleosttlist.store.SaleOsttListDetail',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },


	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'part1detail',cls: 'button-style' }
				], pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'seq_dsp'	, width:  45, text: Language.get('seq'		,'항번'			) ,align: 'center'
						},{	dataIndex: 'item_code'	, width: 110, text: Language.get('itm_code'	,'품목코드'		)
						},{	dataIndex: 'item_name'	, width: 200, text: Language.get('item_name','품명'			) , summaryType : 'count'
						},{	dataIndex: 'item_spec'	, width: 150, text: Language.get('itm_spec'	,'규격'			)
						},{	dataIndex: 'unit_name'	, width:  50, text: Language.get('itm_unit'	,'단위'			)
						},{	dataIndex: 'acpt_numb'	, width: 150, text: Language.get('acpt_numb','주문번호'		)
						},{	dataIndex: 'qty'		, width:  60, text: Language.get('qntt'		,'수량'			) , align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
						},{	dataIndex: 'pri'		, width:  80, text: Language.get('invc_pric','단가'			) , align:'right' , xtype : 'numericcolumn'
						},{	dataIndex: 'sply_amt'	, width:  70, text: Language.get('sply_amnt','공급가액'		) , align:'right' , xtype : 'numericcolumn' , font_color : 'red'   , summaryType : 'sum'
						},{	dataIndex: 'tax_amt'	, width:  70, text: Language.get('tax_amt'	,'부가세'		) , align:'right' , xtype : 'numericcolumn' , font_color : 'green' , summaryType : 'sum'
						},{	dataIndex: 'inv_amt'	, width:  70, text: Language.get('ttsm_amnt','합계'			) , align:'right' , xtype : 'numericcolumn' , font_color : 'blue'  , summaryType : 'sum'
						},{	dataIndex: 'user_memo'	, flex :   1, text: Language.get('memo'		,'메모'			)
						}
					]
				};
		return item;
	}
 });






