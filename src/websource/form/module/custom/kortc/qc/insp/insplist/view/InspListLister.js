Ext.define('module.custom.kortc.qc.insp.insplist.view.InspListLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-insplist-lister',
	store		: 'module.custom.kortc.qc.insp.insplist.store.InspListLister',
	selModel	: { selType: 'checkboxmodel', mode : 'SIGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	text	: '승인/취소',
						hidden	: true,
						menu	: [
							{	text : '승인', action : 'okAction'
							},{	text : '취소', action : 'okCancelAction'
							}
						]
					},
					'-', '->', '-',
					{text : '<span class="write-button">부적합보고서 발행</span>'	, action : 'printAction'		, cls: 'button1-style' ,width:100,	} , '->',
//					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' },
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	''		, width:  50, align : 'center'	, text: Language.get( ''		, '승인'			)
					},{	dataIndex:	''		, width:  90, align : 'center'	, text: Language.get( ''		, '발행번호'		)
					},{	dataIndex:	''		, width:  90, align : 'center'	, text: Language.get( ''		, '검사일자'		)
					},{	dataIndex:	''		, width: 90, align : 'center'	, text: Language.get( ''		, '입고일자'		)
					},{	dataIndex:	''		, width: 90, align : 'center'	, text: Language.get( ''		, 'LOT NO'		)
					},{	dataIndex:	''		, width: 80, align : 'center'	, text: Language.get( ''		, '품목코드'		)
					},{	dataIndex:	''		, width: 150, align : 'center'	, text: Language.get( ''		, '거래처명'		)
					},{	dataIndex:	''		, width: 90, align : 'center'	, text: Language.get( ''		, '차종'			)
					},{	dataIndex:	''		, width: 250, align : 'left'	, text: Language.get( ''		, '품명'			)
					},{	dataIndex:	''		, width: 90, align : 'right'	, text: Language.get( ''		, '입고수량'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	''		, width: 90, align : 'right'	, text: Language.get( ''		, '검사수량'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	''		, width: 80, align : 'left'		, text: Language.get( ''		, '합/불'		)
					},{	dataIndex:	''		, width: 90, align : 'right'	, text: Language.get( ''		, '불량수량'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	''		, width: 90, align : 'right'	, text: Language.get( ''		, '불량률(%)'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	''		, flex: 1, align : 'left'	, text: Language.get( ''		, '특이사항 및 Reject 내용')
//					},{	dataIndex:	'clam_dvcd'		, width: 110, align : 'center'	, text: Language.get( ''		, '클레임종류'), xtype : 'lookupcolumn', lookupValue : resource.lookup('clam_dvcd')
					}
				]
			};
		return item;
	}
 });