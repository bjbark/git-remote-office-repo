Ext.define('module.custom.kitec.prod.prodplanv3.view.ProdPlanV3Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodplanv3-lister',
	store		: 'module.custom.kitec.prod.prodplanv3.store.ProdPlanV3',

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
					'->','-' ,
					{	text : '<span class="write-button">엑셀 업로드</span>'	, action : 'ProdPlanAction'	, cls: 'button1-style'	,width:  80} , '-',
					{	text : '<span class="write-button">생산계획이관</span>'	, action : 'ProdPlanAction'	, cls: 'button1-style'	,width:  80} , '-',
					{	text : '<span class="write-button">실적집계</span>'		, action : 'ProdTotalAction', cls: 'button1-style'	,width:  70} , '-',
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
					{	dataIndex: 'item_name'				, text : Language.get('item_name'			,'품목명'		) , width : 350 , align : 'left'
					},{ dataIndex: 'plan_degr'				, text : Language.get('plan_degr'			,'계획차수'		) , width :  60 , align : 'center',hidden :true
					},{ dataIndex: 'cumn_pdsd_qntt'			, text : Language.get('cumn_pdsd_qntt'		,'당월생산계획'	) , width : 110 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''						, text : Language.get(''					,'납품주기'		) , width :  90
					},{ dataIndex: 'pdsd_1mnb'				, text : Language.get('pdsd_1mnb'			,'전월생산계획'	) , width : 110 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'optm_stok_1mnb'			, text : Language.get('optm_stok_1mnb'		,'적정재고'		) , width : 110 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'emon_stok_1mnb'			, text : Language.get('emon_stok_lmnb'		,'현재고'		) , width : 110 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'lyer_avrg_pdsd_qntt'	, text : Language.get('lyer_avrg_pdsd_qntt'	,'전년월평균생산'	) , width : 130 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'avrg_pdsd_qntt_6mns'	, text : Language.get('avrg_pdsd_qntt_6mns'	,'6개월평균생산'	) , width : 140 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'avrg_pdsd_qntt_3mns'	, text : Language.get('avrg_pdsd_qntt_3mns'	,'3개월평균생산'	) , width : 140 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'bmon_pdsd_qntt'			, text : Language.get('bmon_pdsd_qntt'		,'전월생산수량'	) , width : 110 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});