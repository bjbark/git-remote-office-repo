Ext.define('module.sale.order.slorlist2.view.SlorList2ListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist2-lister-detail',
	store		: 'module.sale.order.slorlist2.store.SlorList2Detail',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },
//	       		   { ptype:'filterbar'},{
//        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
//        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
//        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
//    }
	       		   ],	columnLines : true,

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
//					{	xtype   : 'button',
//						iconCls : 'filterIcon',
//						toggleGroup:'detail',
//						listeners:{
//							toggle:function(toggle){
//								var filter = me.filterBar;
//									filter.setVisible(toggle.pressed);
//							}
//						},
//					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'	, text : Language.get('acpt_date','주문일자'	) , width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center', hidden : _global.hqof_idcd.toUpperCase()== 'N1000SJUNG',
					},{ dataIndex: 'deli_date'	, text : Language.get('deli_date','납기일자'	) , width : 100 , align : 'center', hidden : _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG',
					},{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name','거래처명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'item_code'	, text : Language.get('item_code','품목코드'	) , width : 100 , align : 'center', summaryType : 'count'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name','품명'		) , width : 150 , align : 'left',
						render:function(){
							console.log(value);
							return '<span data-qwidth="200" '+'data-qtip="'+value+'">'+value+'</span>';
						}
					},{ dataIndex: 'item_clss_bacd_name', text : Language.get('item_clss_bacd_name','품목군'	), width : 180  , align : 'left', hidden	: _global.hq_id != 'N1000nbolt',
					},{ dataIndex: 'item_bacd_name'		, text : Language.get('item_bacd_name','품목구분'	) , width : 120  , align : 'left' , hidden	: _global.hq_id != 'N1000nbolt',
					},{ dataIndex: 'item_spec'			, text : Language.get('item_spec','규격'			) , width : 120  , align : 'left' , hidden	: _global.hq_id != 'N1000nbolt',
					},{ dataIndex: 'item_wigt'			, text : Language.get('','중량'					) , width : 80   , align : 'right', xtype	: 'numericcolumn'
					},{ dataIndex: 'pcod_numb'			, text : Language.get('','고객주문번호'				) , width : 120  , align : 'left' , hidden	: _global.hqof_idcd.toUpperCase() != 'N1000KOMEC'
					},{ dataIndex: 'cstm_prcs_numb'		, text : Language.get('','고객주문번호'				) , width : 120  , align : 'left' , hidden	: _global.hqof_idcd.toUpperCase() == 'N1000KOMEC'
					},{ dataIndex: 'cstm_mold_code'		, text : Language.get('','고객금형코드'				) , width : 120  , align : 'left'
					},{ dataIndex: 'drwg_numb'			, text : Language.get('','도면번호'					) , width : 120  , align : 'left'
					},{ dataIndex: 'modl_name'			, text : Language.get('modl_name','모델명'			) , width : 100  , align : 'left'
					},{ dataIndex: 'unit_name'			, text : Language.get('unit_name','단위'			) , width :  50  , align : 'left'
					},{ dataIndex: 'invc_qntt'			, text : Language.get('invc_qntt','주문수량'		) , width :  80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_pric'			, text : Language.get('invc_pric','단가'			) , width :  80  , xtype : 'numericcolumn'
					},{ dataIndex: 'sply_amnt'			, text : Language.get('sply_amnt','금액'			) , width :  80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'			, text : Language.get('vatx_amnt','부가세'			) , width :  70  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_amnt'			, text : Language.get('invc_amnt','합계금액'		) , width :  80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_numb'			, text : Language.get('acpt_numb','주문번호'		) , width : 150  , align : 'center'
					},{ dataIndex: 'tele_numb'			, text : Language.get('tele_numb','전화번호'		) , width : 120  , align : 'center'
					},{ dataIndex: 'user_memo'			, text : Language.get('user_memo','비고'			) , flex  : 100  , align : 'left'
					}
				]
			}
		;
		return item;
	}
});