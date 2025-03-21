Ext.define('module.sale.order.slorlist2.view.SlorList2ListerMaster4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist2-lister-master4',
	store		: 'module.sale.order.slorlist2.store.SlorList2Master4'	,

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
					{	xtype: 'rownumberer'		, width:  40, text: 'NO', align : 'center'
					},{	dataIndex: 'invc_date'	, text : Language.get('acpt_date','주문일자'	) , width : 80
					},{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name','거래처명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'item_clss_bacd_name', text : Language.get('item_clss_bacd_name','품목군'		) , width :  180 , align : 'left'
					},{ dataIndex: 'item_code'	, text : Language.get('item_code','품목코드'	) , width : 70 , align : 'center'/*, summaryType : 'count'*/
					},{ dataIndex: 'item_name'	, text : Language.get('item_name','품명'		) , width : 230 , align : 'left',
						render:function(){
							return '<span data-qwidth="180" '+'data-qtip="'+value+'">'+value+'</span>';
						}
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec','규격'		) , width : 120 , align : 'left'
					},{ dataIndex: 'modl_name'	, text : Language.get('modl_name','모델명'	) , width :  130 , align : 'left'
					},{ dataIndex: 'unit_name'	, text : Language.get('unit_name','단위'		) , width :  50 , align : 'left'
					},{ dataIndex: 'invc_qntt'	, text : Language.get('invc_qntt','주문수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_pric'	, text : Language.get('invc_pric','단가'		) , width :  80 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'sply_amnt'	, text : Language.get('sply_amnt','금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt','부가세'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_amnt'	, text : Language.get('invc_amnt','합계금액'	) , width : 105 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_numb'	, text : Language.get('acpt_numb','주문번호'	) , width : 130 , align : 'center'
					},{ dataIndex: 'item_bacd_name'	, text : Language.get('item_bacd_name','품목구분'	) , flex : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});