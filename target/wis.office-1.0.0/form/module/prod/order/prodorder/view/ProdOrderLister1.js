Ext.define('module.prod.order.prodorder.view.ProdOrderLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodorder-lister1',
	store		: 'module.prod.order.prodorder.store.ProdOrder1',

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

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">생산지시서</span>', action : 'writeAction', cls: 'button1-style'	},
					{	text	: '마감/해지',
//						hidden	: !_global.auth.auth_mtrl_1001,
						menu	: [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

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
					},{	dataIndex: 'line_clos'		, text : Language.get('line_clos'		,'진행상태'	) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'진행상태'	) , width : 60 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 150 , align : 'center'
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	,'착수예정'	) , width : 125 , align : 'center',hidden: true
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	,'종료예정'	) , width : 125 , align : 'center',hidden: true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 280 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 180 , align : 'left'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('prod_qntt'		,'생산수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'insp_wkct_yorn'	, text : Language.get('insp_wkct_yorn'	,'검사여부'	) , width : 70  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , width : 250  , align : 'left'
					}
				]
			}
		;
		return item;
	}
});