Ext.define('module.custom.komec.prod.prodplan.view.ProdPlanListerMaster3', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodplan-lister-master3',
	store		: 'module.custom.komec.prod.prodplan.store.ProdPlanMaster3',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'}],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },{ptype  :'cellediting-directinput', clicksToEdit: 1 } ],

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
				    '->',
				    {	text : '<span class="write-button">취소</span>'		, action : 'deleteAction'	, cls : 'button1-style'},
					'-', '->',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					'-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : 'exportAction2' 	, cls : 'button-style' } , '-' ,
				]
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
					{	dataIndex: 'line_clos'		, text: Language.get('line_clos'		, '상태'			) , width:  90, align : 'center'	, xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, text: Language.get('invc_numb'		, '지시번호'		) , width: 100, align : 'center'
					},{	dataIndex: 'pdod_date'		, text: Language.get('pdod_date'		, '지시일자'		) , width: 100, align : 'center',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							selectOnFocus: true,
							enableKeyEvents : true,

						}
					},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'		, '거래처명'		) , width: 150
					},{	dataIndex: 'acpt_numb'		, text: Language.get('acpt_numb'		, '수주번호'		) , width: 100, align : 'center'
					},{	dataIndex: 'item_name'		, text: Language.get('item_name'		, '품명'			) , width: 150
					},{	dataIndex: 'item_spec'		, text: Language.get('item_spec'		, '규격'			) , width: 120
					},{	dataIndex: ''				, text: Language.get(''					, '차종'			) , width: 100
					},{	dataIndex: 'modl_name'		, text: Language.get('modl_name'		, '모델명'			) , minWidth : 100,flex :   1
					},{	dataIndex: 'indn_qntt'		, text: Language.get('indn_qntt'		, '지시수량'		) , width:  80,	xtype:'numericcolumn'
					},{	dataIndex: 'orig_indn_qntt'	, text: Language.get(''					, '당초지시수량'		) , width:  80,	xtype:'numericcolumn'	, hidden : true
					},{	dataIndex: '		'		, text: Language.get('strt_dttm'		, '생산일정'		) , width: 200, align : 'center'	,
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
					},{	dataIndex: 'drtr_name'		, text: Language.get('drtr_name'		, '담당자'			) , width: 70	, align : 'left'
					},{	dataIndex: 'drtr_idcd'		, text: Language.get('drtr_idcd'		, '담당자ID'		) , width: 70	, hidden: true
					},{	dataIndex: 'wkfw_name'		, text: Language.get('wkfw_name'		, '생산라인'		) , width: 100	, align : 'left'
					},{	dataIndex: 'prog_stat_dvcd'	, text: Language.get('prog_stat_dvcd'	, '진행상태'		) , width: 100	, hidden: true
					}
				]
			};
		return item;
	}
});
