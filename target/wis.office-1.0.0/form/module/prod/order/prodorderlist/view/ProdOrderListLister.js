Ext.define('module.prod.order.prodorderlist.view.ProdOrderList', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodorderlist-lister',
	store		: 'module.prod.order.prodorderlist.store.ProdOrderList',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

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
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'isoslist',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'->', '-' ,
					{	text : '<span class="write-button">라벨발행</span>'	, action : 'labelAction' , cls: 'button1-style',hidden : _global.hq_id.toUpperCase()!='N1000KOMEC' ? true:false},
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), hidden : (_global.hq_id.toUpperCase() !='N1000NBOLT'?false:true)
					},{	dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 150 , align : 'center'
					},{ dataIndex: 'acpt_numb'		, text : Language.get('	'				,'수주번호'	) , width : 100 , align : 'center'
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'	) , width :  80 , align : 'center'
					},{ dataIndex: 'wkfw_idcd'		, text : Language.get('wkfw_idcd'		,'생산라인'	) , width : 100 , align : 'center', hidden : true
					},{ dataIndex: 'bomt_degr'		, text : Language.get('bomt_degr'		,'BOM차수'	) , width :  70 , align : 'center', hidden : true
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	,'착수예정'	) , width : 125 , align : 'center'
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	,'종료예정'	) , width : 125 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 100 , align : 'left'
					},{ dataIndex: 'item_idcd'		, text : Language.get('	'				,'품목구분'	) , width : 100 , align : 'left' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 200 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 180 , align : 'left'
					},{ dataIndex: 'item_wigt'		, text : Language.get('	'				,'중량'		) , width : 80 , align : 'right' , xtype : 'numericcolumn', hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{ dataIndex: 'mtrl_bacd_name'	, text : Language.get('	'				,'재질구분'	) , width : 100 , align : 'left' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{ dataIndex: 'make_bacd_name'	, text : Language.get('	'				,'제조구분'	) , width : 100 , align : 'left' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{ dataIndex: 'drwg_numb'		, text : Language.get('	'				,'도면번호'	) , width : 100 , align : 'left' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'deli_date'		, text : Language.get('	'				,'납기일자'	) , width : 100 , align : 'left' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{ dataIndex: 'insp_wkct_yorn'	, text : Language.get('insp_wkct_yorn'	,'검사여부'	) , width :  70 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden:true
					},{ dataIndex: 'remk_text'		, text : Language.get('	'				,'비고'		) , width : 100 , align : 'left' , hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					}

				]
			}
		;
		return item;
	}
});