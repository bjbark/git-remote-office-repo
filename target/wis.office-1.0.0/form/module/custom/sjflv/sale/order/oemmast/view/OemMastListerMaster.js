Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-oemmast-lister-master',
	store		: 'module.custom.sjflv.sale.order.oemmast.store.OemMastMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }],
//	viewConfig: {
//		listeners: {
//			refresh: function(view) {
//				var nodes = view.getNodes();
//				for (var i = 0; i < nodes.length; i++) {
//					var node = nodes[i];
//					var record = view.getRecord(node);
//					var cells = Ext.get(node).query('td');
//					var tr = Ext.get(node).query('tr');
//					for(var j = 0; j < cells.length; j++) {					//출고완료
//						if(record.get('os_qntt')>0){
//							Ext.fly(cells[j]).setStyle('background-color', '#99ccff');
//							Ext.fly(cells[j]).setStyle('color', 'Green');
//						}
//						if(record.get('invc_qntt')<=record.get('is_qntt')){	//입고완료
//							Ext.fly(cells[j]).setStyle('background-color', '#d9ffcc');
//							Ext.fly(cells[j]).setStyle('color', 'black');
//						}
//					}
//				}
//			}
//		},
//		markDirty: false,
//		loadMask : false
//	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		var hidden = !(_global.hqof_idcd=='N1000INKOP');
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem(hidden);
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '마감/해지',
						hidden	: true,
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'->', '-',
					{	text : '<span class="write-button">OEM 원료출고</span>'	, action : 'outAction'	,cls: 'button-style', width: 85} , '-',
					{	text : '<span class="write-button">OEM 제품입고</span>'	, action : 'inAction'	,cls: 'button-style', width: 85} , '-',
					{	text : '<span class="write-button">OEM 생산비 등록</span>'	, action : 'priceAction'	,cls: 'button-style', width: 95} , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action 	,cls: 'button-style' } , '-' ,

				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function (hidden) {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
				      {	dataIndex: 'line_clos'		, width:  40, align: 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
				    },{	dataIndex: 'acpt_stat_dvcd'	, width:  55, align: 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, width:  75, align: 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'cstm_name'		, width: 130, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'cstm_code'		, width:  80, align: 'center'	, text: Language.get('cstm_code'		, '거래처코드'	) , hidden:true
					},{	dataIndex: 'invc_date'		, width:  75, align: 'center'	, text: Language.get('acpt_date'		, '수주일자'		)
					},{	dataIndex: 'deli_date'		, width:  75, align: 'center'	, text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex: 'prod_trst_dvcd'	, width:  60, align: 'center'	, text: Language.get('prod_trst_dvcd'	, '생산구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('prod_trst_dvcd')
					},{	dataIndex: 'item_code'		, width: 110, align: 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex: 'item_idcd'		, width: 110, align: 'center'	, text: Language.get('item_code'		, '품목ID'		) , hidden : true
					},{	dataIndex: 'item_name'		, width: 190, align: 'left'		, text: Language.get('item'				, '품목명'		)
					},{	dataIndex: 'item_spec'		, width: 110, align: 'left'		, text: Language.get('item_spec'		, '품목규격'		)
					},{	dataIndex: 'mcls_name'		, width:  80, align: 'left'		, text: Language.get('mcls_name'		, '중분류'		) ,
					},{	dataIndex: 'invc_qntt'		, width:  70, align: 'right'	, text: Language.get('acpt_qntt'		, '수주수량'		) , xtype : 'numericcolumn', format	: '#,##0.###'
					},{	dataIndex: 'rcpt_cmpy_idcd'	, width: 100, align: 'left'		, text: Language.get('rcpt_cmpy_name'	, '인수처명'		), hidden : true
					},{	dataIndex: 'rcpt_cmpy_name'	, width: 100, align: 'left'		, text: Language.get('rcpt_cmpy_name'	, '인수처명'		)
					},{	dataIndex: 'os_date'		, width:  85, align: 'center'	, text: Language.get('ostt_date'		, '원료출고일자'	)
					},{	dataIndex: 'os_qntt'		, width:  85, align: 'right'	, text: Language.get('ostt_qntt'		, '원료출고수량'	) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'is_date'		, width:  85, align: 'center'	, text: Language.get(''					, '제품입고일자'	)
					},{	dataIndex: 'is_qntt'		, width:  85, align: 'right'	, text: Language.get(''					, '제품입고수량'	) , xtype : 'numericcolumn', format	: '#,##0.###'
					},{	dataIndex: 'bsmt_pric'		, width:  90, align: 'right'	, text: Language.get('bsmt_pric'		, '제품원료비'	) , xtype : 'numericcolumn', format	: '#,##0.###'
					},{	dataIndex: 'make_cost'		, width:  90, align: 'right'	, text: Language.get('make_cost'		, '제품임가공비'	) , xtype : 'numericcolumn', format	: '#,##0.###'
					},{	dataIndex: 'prod_cost'		, width:  90, align: 'right'	, text: Language.get('prod_cost'		, '제품생산비'	) , xtype : 'numericcolumn', format	: '#,##0.###'
					},{	dataIndex: 'new_line_seqn'	, hidden : true
					},{	dataIndex: 'unit_idcd'		, width : 10, hidden : true
					}
				]
			};
		return item;
	}
});
