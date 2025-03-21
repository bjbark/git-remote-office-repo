Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerMaster4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sorderlist1-lister-master4',
	store		: 'module.custom.aone.sale.order.sorderlist1.store.SorderList1Master4'	,

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

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum')== '2'){
				return 'text-blue';
			}
		}
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

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('prod_drtr_name') == '소계'){
				return 'text-green';
			}else if(record.get('prod_drtr_name') == '합계'){
				return 'text-blue';
			}
		}
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center' , sortable : false},
				items : [
					{	dataIndex: 'prod_drtr_name'	, text : Language.get('','엔지니어'		) , width : 70  , align : 'center'
					},{ dataIndex: 'acpt_stat_dvcd'	, text : Language.get('','진행상태'		) , width : 60  , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd'),
					},{ dataIndex: 'repa_stat_dvcd'	, text : Language.get('','수리상태'		) , width : 60  , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('repa_stat_dvcd'),
					},{ dataIndex: 'invc_numb'		, text : Language.get('','AoneCode'	) , width : 80  , align : 'center'
					},{ dataIndex: 'acpt_dvcd'		, text : Language.get('','입고유형'		) , width : 60  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_dvcd'), align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('','입고일'		) , width : 90  , align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('','거래처명'		) , width : 140 , align : 'left'
					},{ dataIndex: 'item_code'		, text : Language.get('','품목코드'		) , width : 70  , align : 'center', hidden : true
					},{ dataIndex: 'item_name'		, text : Language.get('','품명'		) , width : 180 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('','규격'		) , width : 140 , align : 'left',
					},{ dataIndex: 'sral_numb'		, text : Language.get('','Serial No.'), width : 100 , align : 'left',
					},{ dataIndex: 'deli_date2'		, text : Language.get('','출고예정일'	) ,	width : 90  , align : 'center'
					},{ dataIndex: 'invc_qntt'		, text : Language.get('','수량'		) , width : 50  , align : 'right' , xtype: 'numericcolumn', format: '#,##0'
					},{ dataIndex: 'invc_amnt'		, text : Language.get('','금액'		) , width : 90  , align : 'right' , xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex: 'ostt_date'		, text : Language.get('','출고일'		) , width: 90   , align : 'center'
					},{	dataIndex: 'remk_text'		, text : Language.get('','고장증상'		) , width: 200  , align : 'left'
					},{	dataIndex:	'bill_publ_yorn', width: 95  , align : 'center'	, text: Language.get('bill_publ_yorn'	, '세금계산서여부'), xtype: 'lookupcolumn', lookupValue: resource.lookup('yorn')
					},{	dataIndex:	'bill_date'		, width: 90  , align : 'center'	, text: Language.get('bill_date'		, '청구일'		)
					},{	dataIndex:	'bill_amnt'		, width: 90  , align : 'right'	, text: Language.get('bill_amnt'		, '청구비'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'tkot_date'		, width: 90  , align : 'center'	, text: Language.get('tkot_date'		, '반출일'		)
					},{	dataIndex:	'tkot_text'		, flex : 1, minWidth: 90  , align : 'left'	, text: Language.get('tkot_text'		, '반출내용'		)
					}
				]
			}
		;
		return item;
	}
});