Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster1Test', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsosttwork-lister-master1-test',
	store		: 'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1Test',
	
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
//					{	text : '<span class="write-button">라벨 출력</span>', action : 'printAction2',cls: 'button1-style', width: 70	},
//					{	text : '<span class="write-button">운송비 등록</span>', action : 'pricAction'	, cls: 'button-style'  ,width:80 },
//					{	text : '<span class="write-button">송장번호 업로드</span>', action : 'excelAction'	, cls: 'button-style'  ,width:90, hidden: _global.hq_id.toUpperCase() != 'N1000SJFLV'},
					{	text : '<span class="write-button">인수증 출력</span>', action : 'printAction3',cls: 'button1-style', width: 70	},
					{	text : '<span class="write-button">거래명세서 출력</span>', action : 'printAction',cls: 'button1-style', width: 100	},
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'} ,'-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId : 'master'	}

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
					},{	dataIndex: 'invc_numb'		, text : Language.get('shpm_numb'		,'출고번호'		) , width : 150 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 130
					},{ dataIndex: 'dlvy_cstm_name'	, text : Language.get('dlvy_cstm_name'	,'납품처명'		) , width : 130
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden: true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('shpm_date'		,'출고일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'출고담당'		) , width : 100
					},
/*					{ dataIndex: 'ostt_trnt_dvcd'	, text : Language.get('ostt_trnt_dvcd'	,'출고운송방법'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('ostt_trnt_dvcd')
					},{ dataIndex: 'ostt_trnt_amnt'	, text : Language.get('ostt_trnt_amnt'	,'출고운송비용'	) , width : 100 , align : 'right', xtype : 'numericcolumn'
					},{ dataIndex: 'remk_text'		, text : Language.get(''				,'출고운송비고'	) , width : 120 ,
					},
*/
					{ dataIndex: 'ostt_item_list'	, text : Language.get('ostt_item_list'	,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});