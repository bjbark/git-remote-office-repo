Ext.define('module.stock.isos.goodsosttlist.view.GoodsOsttListListerMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsosttlist-lister-master2',
	store		: 'module.stock.isos.goodsosttlist.store.GoodsOsttListMaster2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	viewConfig: {
		listeners: {
			refresh: function(view) {
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');
					for(var j = 0; j < cells.length; j++) {
						if(record.get('trns_type')=='3'){	// 반품인 경우
							Ext.fly(cells[j]).setStyle('background-color', '#CBFFC8');
						}
						if(record.get('trns_type')=='2'){	// 반품인 경우
							Ext.fly(cells[j]).setStyle('background-color', 'Yellow');
						}
					}
				}
			}
		},
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '4' || record.get('rnum') == '5'){
				return 'text-warn';
			}else if(record.get('rnum') == '2'){
				return 'text-blue';
			}else if(record.get('rnum') == '3' ){
				return 'text-green';
			}
		},
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : false,
				items	: [
					'-', '->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'invc_numb'		, text : Language.get('shpm_numb'		,'출고번호'	) , width : 140 , align : 'center'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 260
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 160
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('shpm_date'		,'출고일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'출고담당'	) , width : 75 , align : 'left'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 130
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden: true
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'	) , width : 100 , align : 'center'
					},{ dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'		,'창고'		) , width :  80
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'출고수량'	) , width :  90 , xtype : 'numericcolumn', align : 'right', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		,'단가'		) , width :  80 , xtype : 'numericcolumn', align : 'right', format	: '#,##0.###'
					},{ dataIndex: 'sale_amnt'		, text : Language.get('sale_amnt'		,'금액'		) , width :  80 , xtype : 'numericcolumn', align : 'right', format	: '#,##0.###'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get('vatx_amnt'		,'부가세'		) , width :  80 , xtype : 'numericcolumn', align : 'right', format	: '#,##0.###'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'	) , width :  80 , xtype : 'numericcolumn', align : 'right', format	: '#,##0.###'
					},{ dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'주문번호'	) , width : 80 , align : 'center'
					},{ dataIndex: 'acpt_dvcd'		, text : Language.get('acpt_dvcd'		,'수주구분'	) , width : 80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('acpt_dvcd')
					},{ dataIndex: 'prod_trst_dvcd'	, text : Language.get('prod_trst_dvcd'	,'생산구분'	) , width : 80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prod_trst_dvcd'), hidden :_global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false,
					},{ dataIndex: 'remk_text'		, text : Language.get('user_memo'		,'비고'		) , width  : 400
					},{ dataIndex: ''				, text : Language.get(''				,''			) , width :0
					}
				]
			}
		;
		return item;
	}
});