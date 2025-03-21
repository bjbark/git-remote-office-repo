Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanListerPror', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-porderplan-lister-pror',

	store: 'module.custom.kortc.prod.order.porderplan.store.PorderPlanPror',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	viewConfig: {
		markDirty: false,
		loadMask : false,
		enableTextSelection: true
	},
	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">생산지시</span>', action : 'prorAction'	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">삭제</span>', action : 'deleteAction'	, cls: 'button1-style'	} , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	xtype: 'rownumberer'		, width:  50, text: '순번', align : 'center'
					},{	dataIndex:	'prog_stat_dvcd', text: Language.get('prog_stat_dvcd'	, '진행상태'		), width :  80, align : 'center', xtype:'lookupcolumn'  , lookupValue:resource.lookup('prog_stat_dvcd')
					},{	dataIndex:	'indn_qntt'		, text: Language.get('indn_qntt'		, '지시수량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'strt_dttm'		, text: Language.get('strt_dttm'		, '생산시작'		), width : 130, align : 'center'
					},{	dataIndex:	'endd_dttm'		, text: Language.get('endd_dttm'		, '생산종료'		), width : 130, align : 'center'
					},{	dataIndex:	'wkfw_name'		, text: Language.get('wkfw_name'		, '생산라인'		), width : 120, align : 'left'
					},{	dataIndex:	'lott_numb'		, text: Language.get('lott_numb'		, 'lot 번호'		), width : 120, align : 'left'
					},{	dataIndex:	'remk_text'		, text: Language.get('remk_text'		, '전달사항'		), flex : 1,minWidth : 150, align : 'left'	,
					}
				]
			};
		return item;
	}
});
