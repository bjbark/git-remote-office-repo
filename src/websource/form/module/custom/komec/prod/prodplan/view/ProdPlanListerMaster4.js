Ext.define('module.custom.komec.prod.prodplan.view.ProdPlanListerMaster4', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodplan-lister-master4',
	store		: 'module.custom.komec.prod.prodplan.store.ProdPlanMaster4',

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
					'-', '->', '-',
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action 	, cls : 'button-style' } , '-' ,
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
					{	xtype: 'rownumberer'		, width:  60, text: '작업순서', align : 'center'
					},{	dataIndex:	'wkct_idcd'		, text: Language.get('wkct_idcd'		, '공정코드'		), width :  100 , align : 'center'
					},{	dataIndex:	'wkct_name'		, text: Language.get('wkct_name'		, '공정명'			), flex  :    1 , minWidth:   120 , align : 'left'
					},{	dataIndex:	'otod_yorn'		, text: Language.get('otod_yorn'		, '외주여부'		), width :   70 , align : 'center',xtype:'checkcolumn',sortable:false
					},{	dataIndex:	'indn_qntt'		, text: Language.get('indn_qntt'		, '지시수량'		), width :   70 , xtype:'numericcolumn'
					},{	dataIndex:	'	'			, text: Language.get(''					, '생산일정'		), width :  190 , align : 'center' ,
						renderer:function(val,meta,record){
							var schedule = '',
								strt = record.get('plan_strt_dttm'),
								endd = record.get('plan_endd_dttm')
								;

							if(strt!=undefined && endd!=undefined){
								schedule  = strt.substr(5).replace("-", "/");
								schedule += " ~ ";
								schedule += endd.substr(5).replace("-", "/");
							}
							return schedule
						}
					},{	dataIndex:	'lott_numb'		, text: Language.get('lott_numb'		, 'Lot No'	), width :  80 , align : 'left'	, xtype:'lookupcolumn'	,lookupValue:resource.lookup('prog_stat_dvcd')
					},{	dataIndex:	'drtr_name'		, text: Language.get('drtr_name'		, '담당자'		), width :  80 , align : 'left'	, xtype:'lookupcolumn'	,lookupValue:resource.lookup('prog_stat_dvcd')
					},{	dataIndex:	'prog_stat_dvcd', text: Language.get('prog_stat_dvcd'	, '진행상태'	), width :  80 , align : 'left'	, xtype:'lookupcolumn'	,lookupValue:resource.lookup('prog_stat_dvcd')
					}
				]
			};
		return item;
	}
});
