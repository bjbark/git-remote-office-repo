Ext.define('module.sale.order.slorlist2.view.SlorList2ListerMaster6', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist2-lister-master6',
	store		: 'module.sale.order.slorlist2.store.SlorList2Master6'	,

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],	columnLines : true,
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
					{text : '<span class="write-button">인수증 출력</span>'		, action : 'printAction'   ,cls: 'button1-style', width: 70 },
					{text : '<span class="write-button">거래명세서 출력</span>'	, action : 'printAction2'  ,cls: 'button1-style', width: 100 /*, hidden: _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG'*/},
					{text : '<span class="write-button">거래명세서 통합출력</span>'	, action : 'printAction3'  ,cls: 'button1-style', width: 110},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				], pagingButton : false
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('acpt_date','주문일자'	) , width : 80
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name','거래처명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code','품목코드'	) , width : 70 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name','품명'		) , width : 280 , align : 'left',
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec','규격'		) , width : 150 , align : 'left'
					},{ dataIndex: 'invc_qntt'		, text : Language.get('invc_qntt','주문수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_pric'		, text : Language.get('invc_pric','단가'		) , width :  80 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'sply_amnt'		, text : Language.get('sply_amnt','금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get('vatx_amnt','부가세'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_amnt'		, text : Language.get('invc_amnt','합계금액'	) , width : 105 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex: 'deli_date'		, text : Language.get('deli_date','납기일자'	) , width : 80
					},{	dataIndex: 'dely_cstm_name'	, text: Language.get(''			 ,'배송처'		) , width: 120, align: 'left',
					},{ dataIndex: 'dlvy_addr'		, text : Language.get(''		 ,'배송지'		) , width : 180 , align : 'left',
					},{ dataIndex: 'tele_numb'		, text : Language.get('tele_numb','전화번호'	) , width : 120 , align : 'center', hidden : _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG',
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo','비고'		) , flex  :100   , align : 'center'
					}
				]
			}
		;
		return item;
	}
});