Ext.define('module.sale.order.slorlist2.view.SlorList2ListerMaster5', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist2-lister-master5',
	store		: 'module.sale.order.slorlist2.store.SlorList2Master5'	,

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
					{text : '<span class="write-button">인쇄</span>'			, action : 'previewAction' , cls: 'button1-style',hidden : _global.hq_id.toUpperCase()!='N1000SJUNG'? true : false	} , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				], pagingButton : false
			};
		return item ;
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('cstm_name') == '<<일계>>'){
				return 'text-blue';
			}else if(record.get('cstm_name') == '<<합계>>'){
				return 'text-warn';
			}else if(record.get('cstm_name') == '<<거래처계>>'){
				return 'text-green';
			}
		}
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'deli_date'	, text : Language.get('deli_date','납기일자'	) , width : 80
					},{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn','항번'		) , width : 70 , align : 'center'
					},{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name','거래처명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'item_code'	, text : Language.get('item_code','품목코드'	) , width : 70 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name','품명'		) , width : 280 , align : 'left',
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec','규격'		) , width : 150 , align : 'left'
					},{ dataIndex: 'invc_qntt'	, text : Language.get('invc_qntt','주문수량'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
//					},{	dataIndex: 'prod_trst_dvcd'	, width:  80, align: 'center'	, text: Language.get('prod_trst_dvcd'	, '생산구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('prod_trst_dvcd'),hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					},{ dataIndex: 'invc_pric'	, text : Language.get('invc_pric','단가'		) , width :  80 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'sply_amnt'	, text : Language.get('sply_amnt','금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt','부가세'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_amnt'	, text : Language.get('invc_amnt','합계금액'	) , width : 105 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_numb'	, text : Language.get('acpt_numb','주문번호'	) , width : 90  , align : 'center'
					},{ dataIndex: 'tele_numb'	, text : Language.get('tele_numb','전화번호'	) , width : 120 , align : 'center', hidden : _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG',
					},{ dataIndex: 'ostt_work_cont_1'	, text : Language.get('ostt_work_cont_1','출고작업내용 1'	) , width : 180 , align : 'left', hidden	: (_global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false),
					},{ dataIndex: 'ostt_work_cont_2'	, text : Language.get('ostt_work_cont_2','출고작업내용 2'	) , width : 180 , align : 'left', hidden	: (_global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false),
					},{	dataIndex: 'dely_cstm_name'	, text: Language.get(''					, '배송처'			), width: 120, align: 'left', hidden : (_global.options.mes_system_type.toUpperCase() != 'SJFLV'? true : false),
					},{ dataIndex: 'dlvy_addr'	, text : Language.get('','배송지'	) 			  , width : 180 , align : 'left', hidden : (_global.options.mes_system_type.toUpperCase() != 'SJFLV'? true : false),
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo' ,'비고'		) , flex  :100   , align : 'center'
					}
				]
			}
		;
		return item;
	}
});