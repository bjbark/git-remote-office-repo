Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sorderlist1-lister-detail',
	store		: 'module.custom.aone.sale.order.sorderlist1.store.SorderList1Detail',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'acpt_stat_dvcd'	, text : Language.get('acpt_stat_dvcd'	,'진행상태'		)	, width : 60  , align : 'center' , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{ dataIndex: 'repa_stat_dvcd'	, text : Language.get('repa_stat_dvcd'	,'수리상태'		)	, width : 60  , align : 'center' , xtype : 'lookupcolumn' , lookupValue : resource.lookup('repa_stat_dvcd'),
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'AoneCode'	)	, width : 80  , align : 'center'
					},{ dataIndex: 'acpt_dvcd'		, text : Language.get('acpt_dvcd'		,'입고유형'		)	, width : 60  , align : 'center' , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_dvcd')
					},{ dataIndex: 'amnd_degr'		, text : Language.get('amnd_degr'		,'차수'		)	, width : 60  , align : 'center' , hidden :true
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'입고일'		)	, width : 90  , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		)	, width : 140 , align : 'left'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		)	, width : 180 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		)	, width : 140 , align : 'left'
					},{ dataIndex: 'sral_numb'		, text : Language.get('sral_numb'		,'Serial No.')	, width : 100 , align : 'left'
					},{ dataIndex: 'deli_date2'		, text : Language.get('deli_date2'		,'출고예정일'	)	, width : 90  , align : 'center'
					},{ dataIndex: 'invc_qntt'		, text : Language.get('invc_qntt'		,'수량'		)	, width : 50  , align : 'right'  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'invc_amnt'		, text : Language.get('invc_amnt'		,'금액'		)	, width : 90  , align : 'right'  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'prod_drtr_name'	, text : Language.get('prod_drtr_name'	,'엔지니어'		)	, width : 70  , align : 'center'
					},{ dataIndex: 'ostt_date'		, text : Language.get('ostt_date'		,'출고일'		)	, width : 90  , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'고장증상'		)	, width : 200 , align : 'left'
					},{	dataIndex: 'bill_publ_yorn'	, width: 90   , text: Language.get('bill_publ_yorn'	, '세금계산서'	), xtype: 'lookupcolumn', lookupValue: resource.lookup('yorn'), align : 'center'	
					},{	dataIndex: 'bill_date'		, width: 90  , text: Language.get('bill_date'		, '청구일'		), align : 'center'	
					},{	dataIndex: 'bill_amnt'		, width: 90  , text: Language.get('bill_amnt'		, '청구비'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex: 'tkot_date'		, width: 90  , text: Language.get('tkot_date'		, '반출일'		), 
					},{	dataIndex: 'tkot_text'		, flex:1,minWidth: 120  , align : 'right'	, text: Language.get('tkot_text'		, '반출내용'	), 
					}
				]
			}
		;
		return item;
	}
});