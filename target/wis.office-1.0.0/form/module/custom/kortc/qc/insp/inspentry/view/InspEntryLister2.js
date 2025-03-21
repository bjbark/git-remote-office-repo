Ext.define('module.custom.kortc.qc.insp.inspentry.view.InspEntryLister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry-lister2',
	store		: 'module.custom.kortc.qc.insp.inspentry.store.InspEntryLister2',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SIGLE' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {

		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-', '->', '-',
					{text : '<span class="write-button">부적합보고서 발행</span>'	, action : 'printAction'		, cls: 'button1-style' ,width:100,	} , '->',
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' },
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
					{	dataIndex:	'invc_numb'		, width: 90, align : 'center'	, text: Language.get( ''		, '발행번호'		)
					},{	dataIndex:	'insp_date'		, width: 90, align : 'center'	, text: Language.get( ''		, '검사일자'		)
					},{	dataIndex:	'invc_date'		, width: 90, align : 'center'	, text: Language.get( ''		, '입고일자'		)
					},{	dataIndex:	'lott_numb'		, width: 90, align : 'center'	, text: Language.get( ''		, 'LOT NO'		)
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get( ''		, '거래처명'		)
					},{	dataIndex:	'crty_bacd_name', width: 90, align : 'center'	, text: Language.get( ''		, '차종'			)
					},{	dataIndex:	'item_code'		, width: 80, align : 'center'	, text: Language.get( ''		, '품목코드'		)
					},{	dataIndex:	'item_name'		, width: 250, align : 'left'	, text: Language.get( ''		, '품명'			)
					},{	dataIndex:	'istt_qntt'		, width: 90, align : 'right'	, text: Language.get( ''		, '입고수량'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'pass_yorn'		, width: 60, align : 'center'	, text: Language.get( ''		, '합/불'		), xtype : 'lookupcolumn', lookupValue : [['0','합격'],['1','불합격']]
					},{	dataIndex:	'poor_qntt'		, width: 90, align : 'right'	, text: Language.get( ''		, '불량수량'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'poor_rate'		, width: 90, align : 'right'	, text: Language.get( ''		, '불량률(%)'		), xtype : 'numericcolumn'
					},{	dataIndex:	'remk_text'		, flex: 1, align : 'left'		, text: Language.get( ''		, '특이사항 및 Reject 내용')
					}
				]
			};
		return item;
	}
 });