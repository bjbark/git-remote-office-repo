Ext.define('module.custom.kortc.prod.order.porderlist.view.PorderListListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-porderlist-lister-detail',

	store: 'module.custom.kortc.prod.order.porderlist.store.PorderListDetail',

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
					},{	dataIndex:	'wkct_name'		, text: Language.get('wkct_name'		, '공정명'		), flex  :    1 , minWidth:   120 , align : 'left'
					},{	dataIndex:	'otod_yorn'		, text: Language.get('otod_yorn'		, '외주여부'		), width :   70 , align : 'center',xtype:'checkcolumn',sortable:false
					},{	dataIndex:	'indn_qntt'		, text: Language.get('indn_qntt'		, '지시수량'		), width :   70 , xtype:'numericcolumn'
					},{	dataIndex:	'plan_strt_dttm', text: Language.get('plan_strt_dttm'	, '생산시작예정'	), width :  130 , align : 'left'
					},{	dataIndex:	'plan_endd_dttm', text: Language.get('plan_endd_dttm'	, '생산종료예정'	), width :  130 , align : 'left'
					},{	dataIndex:	'insp_wkct_yorn', text: Language.get('insp_wkct_yorn'	, '검사공정'		), width :   70 , align : 'center',xtype:'checkcolumn',sortable:false,
					},{	dataIndex:	'last_wkct_yorn', text: Language.get('last_wkct_yorn'	, '최종공정'		), width :   70 , align : 'center',xtype:'checkcolumn',sortable:false
					},{	dataIndex:	'cofm_yorn'		, text: Language.get('cofm_yorn'		, '확정여부'		), width :   70 , align : 'center',xtype:'checkcolumn',sortable:false
					},{	dataIndex:	'prog_stat_dvcd', text: Language.get('prog_stat_dvcd'	, '진행상태'		), width :  100 , align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('prog_stat_dvcd')
					}
				]
			};
		return item;
	}
});
