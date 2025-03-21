Ext.define('module.sale.salework.view.SaleWorkListerDetail', { extend: 'Axt.grid.Panel',

    alias  		: 'widget.module-salework-lister-detail',
	store 		: 'module.sale.salework.store.SaleWorkDetail',

	border 		: 0 ,
	columnLines : true ,
	features      : [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnconfig'  } ],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },

	/**
	 *
	 */
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
			 		{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'}
			 	],
			 	pagingButton : false
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
				{ 	defaults: {style: 'text-align:center'   },
					items : [
	        		    {dataIndex: 'seq_dsp'       , width:  45, text: Language.get('seq',           '항번') },
	        			{dataIndex: 'item_code'        , width: 110, text: Language.get('itm_code',     '품목코드')   },
//	        			{dataIndex: 'itm_shrt_cd'   , width:  90, text: Language.get('itm_shrt_cd'    , '단축코드' ) },
	        			{dataIndex: 'item_name'        , width: 200, text: Language.get('item_name',       '품명')  , summaryType : 'count' },
	        			{dataIndex: 'item_spec'        , width: 150, text: Language.get('itm_spec',     '규격') },
	        			{dataIndex: 'unit_name'        , width:  50, text: Language.get('itm_unit',     '단위') },
	        			{dataIndex: 'piece_qty'     , width:  60, text: Language.get('piece_qty',      '포장량')     , align : 'right', xtype : 'numericcolumn'  },
	        			{dataIndex: 'qty'           , width:  50, text: Language.get('quantity',      '수량')     , align : 'right', xtype : 'numericcolumn'  ,  summaryType : 'sum' },
	        			{dataIndex: 'pri'           , width:  60, text: Language.get('pri',         '단가')     , align : 'right', xtype : 'numericcolumn' },
	        			{dataIndex: 'sply_amt'      , width:  70, text: Language.get('sply_amt','공급가')   , align : 'right', xtype : 'numericcolumn' , font_color : 'red'  ,  summaryType : 'sum' },
	        			{dataIndex: 'tax_amt'       , width:  70, text: Language.get('tax_amt',           '세액')     , align : 'right', xtype : 'numericcolumn', font_color : 'green'  ,  summaryType : 'sum'  },
	        			{dataIndex: 'txfree_amt'    , width:  70, text: Language.get('txfree_amt',       '비과세')   , align : 'right', xtype : 'numericcolumn', summaryType : 'sum'  },
	        			{dataIndex: 'inv_amt'       , width:  70, text: Language.get('inv_amt',  '금액')     , align : 'right', xtype : 'numericcolumn', font_color : 'blue'  ,  summaryType : 'sum' }
//	        			{dataIndex: 'po_pri'        , width:  70, text: Language.get('price_purchase','구매가')    , align : 'right', xtype : 'numericcolumn' },
//	        			{dataIndex: '_margin'       , width:  80, text: Language.get('margin_percent'   ,'마진율')   , align : 'right', xtype : 'numericcolumn' , format : '#,##0.##%' },
//	        			{dataIndex: 'brand_nm'      , width: 110, text: Language.get('brand',     		'브랜드') },
//	        			{dataIndex: 'mfg_nm'        , width: 110, text: Language.get('maker',     		'제조사') }
	        		]
	    	 	};
		return item;
	}

 });




