Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListListerPart3', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-salelist-lister-part3',
	store		: 'module.sale.sale.saleosttlist.store.SaleOsttListPart3',

	width		: 450,
	minWidth	: 200,
	split		: true,

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
//	columnLines : true,

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},


	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'saleosttlist',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'->', '-' ,
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'inv_dt'			, text: Language.get('ostt_date'	,'출고일자'		)	, width:  80  , align:'center'
						},{	dataIndex: 'invc_numb'		, text: Language.get('ostt_numb'	,'출고번호'		)	, width: 100  , align:'center'
						},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'	,'거래처명'		)	, width: 120
						},{ dataIndex: 'item_clss_bacd_name', text : Language.get('item_clss_bacd_name','품목군') , width :  180 , align : 'left', hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
						},{	dataIndex: 'item_code'		, text: Language.get('itm_code'		,'품목코드'		)	, width: 110  , align:'center'
						},{	dataIndex: 'item_idcd'		, text: Language.get('item_idcd'	,'품목id'		)	, width: 110  , align:'center', hidden : true
						},{ dataIndex: 'item_bacd_name'	, text: Language.get('item_bacd_name','품목구분'		) 	, width: 100  , align : 'left', hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
						},{	dataIndex: 'item_name'		, text: Language.get('item_name'	,'품명'			)	, width: 150  , summaryType : 'count'
						},{	dataIndex: 'item_spec'		, text: Language.get('itm_spec'		,'규격'			)	, width: 150
						},{ dataIndex: 'make_bacd_name'	, text: Language.get('make_bacd_name','제조구분'		) 	, width: 100  , align: 'left' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
						},{ dataIndex: 'mtrl_bacd_name'	, text: Language.get('mtrl_bacd_name','재질구분'		) 	, width: 100  , align: 'left' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
						},{	dataIndex: 'pcod_numb'		, text: Language.get(''				,'고객주문번호'	)	, width: 100  , align:'center', hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
						},{	dataIndex: 'cstm_mold_code'	, text: Language.get('cstm_mold_code','고객금형코드'	)	, width: 100  , align:'center', hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
						},{	dataIndex: 'drwg_numb'		, text: Language.get(''				,'도면번호'		)	, width: 100  , align:'center', hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
						},{	dataIndex: 'sale_unit'		, text: Language.get('itm_unit'		,'단위'			)	, width:  50
						},{	dataIndex: 'ostt_qntt'		, text: Language.get('qntt'			,'수량'			)	, width:  60  , align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
						},{	dataIndex: 'sale_pric'		, text: Language.get('invc_pric'	,'단가'			)	, width:  80  , align:'right' , xtype : 'numericcolumn'
						},{	dataIndex: 'sale_amnt'		, text: Language.get('sply_amnt'	,'공급가액'		)	, width: 100  , align:'right' , xtype : 'numericcolumn' , font_color : 'red'   , summaryType : 'sum'
						},{	dataIndex: 'vatx_amnt'		, text: Language.get('tax_amt'		,'부가세'			)	, width:  80  , align:'right' , xtype : 'numericcolumn' , font_color : 'green' , summaryType : 'sum'
						},{	dataIndex: 'ttsm_amnt'		, text: Language.get('ttsm_amnt'	,'합계'			)	, width: 110  , align:'right' , xtype : 'numericcolumn' , font_color : 'blue'  , summaryType : 'sum'
						},{	dataIndex: 'acpt_deli_date'	, text: Language.get('deli_date'	,'납기일자'		)	, width:  80
						},{	dataIndex: 'remk_text'		, text: Language.get(''				,'비고'			)	, width: 100  , align:'right' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
						},{	dataIndex: 'user_memo'		, text: Language.get('memo'			,'메모'			)	, flex :   1
						}
					]
				};
		return item;
	}
 });





