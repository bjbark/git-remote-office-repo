Ext.define('module.custom.komec.prod.prodplan.view.ProdPlanListerMaster2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodplan-lister-master2',
	store		: 'module.custom.komec.prod.prodplan.store.ProdPlanMaster2',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false,
		enableTextSelection: true
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">생산지시</span>'		, action : 'prodAction'			, cls : 'button1-style'},
					'-', '->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action 	, cls : 'button-style' } , '-' ,
				],
				pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'		, text: Language.get('line_seqn'		, '항번'			), width :  50, align : 'center'
					},{	dataIndex:	'item_name'		, text: Language.get('item_name'		, '품명'			), width : 150, align : 'left'
					},{	dataIndex:	'item_spec'		, text: Language.get('item_spec'		, '규격'			), width : 100, align : 'left'
					},{	dataIndex:	''				, text: Language.get(''		 			, '차종'			), width : 100, align : 'left'
					},{	dataIndex:	'modl_name'		, text: Language.get('modl_name'		, '모델명'			), width : 120, align : 'left'
					},{	dataIndex:	'invc_qntt'		, text: Language.get('invc_qntt'		, '수주수량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'stok_asgn_qntt', text: Language.get('stok_asgn_qntt'	, '재고사용량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'need_qntt'		, text: Language.get('need_qntt'		, '생산필요량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'totl_indn_qntt', text: Language.get('totl_indn_qntt'	, '지시수량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'pror_remn_qntt', text: Language.get('pror_remn_qntt'	, '지시잔량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	''				, text: Language.get(''					, '생산일정'		), width : 160, align : 'right' ,
						renderer:function(val,meta,record){
							var schedule = '',
								strt = record.get('strt_dttm'),
								endd = record.get('endd_dttm')
								;

							if(strt!=undefined && endd!=undefined){
								schedule  = strt.substr(5).replace("-", "/");
								schedule += " ~ ";
								schedule += endd.substr(5).replace("-", "/");
							}
							return schedule
						}
					},{	dataIndex:	'strt_dttm'		, text: Language.get('strt_dttm'		, '생산시작예정'		), width :  75, align : 'right' , hidden: true
					},{	dataIndex:	'endd_dttm'		, text: Language.get('endd_dttm'		, '생산종료예정'		), width :  75, align : 'right' , hidden: true
					},{	dataIndex:	'wkfw_name'		, text: Language.get('wkfw_name'		, '생산라인'		), width :  75, align : 'right'
					},{	dataIndex:	'wkfw_idcd'		, text: Language.get('wkfw_idcd'		, '생산라인ID'		), width :  75, align : 'right'	, hidden: true
					},{	dataIndex:	''				, text: Language.get(''					, '전달사항'		), width :  75, align : 'right'
					},{	dataIndex:	'prog_stat_dvcd', text: Language.get('prog_stat_dvcd'	, '진행상태'		), width :  75, align : 'right' , hidden: true
					}
				]
			};
		return item;
	}
});
