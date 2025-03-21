Ext.define('modulemtrl.isttcalc.purcbillwork.view.PurcBillWorkListerMaster', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purcbillwork-lister-master',
	store		: 'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerMaster',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

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
					{	text : '<span class="write-button">세금계산서  삭제</span>'	, action : 'deleteAction'		, cls: 'button1-style' ,width:  110,	} , '-',
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	''			, width:  40, align : 'center'	, text: Language.get( ''		, '선택'		)
					},{	dataIndex:	''			, width:  90, align : 'center'	, text: Language.get( ''		, '접수일자'	)
					},{	dataIndex:	''			, width:  80, align : 'center'	, text: Language.get( ''		, '거래처코드'	)
					},{	dataIndex:	''			, width: 200, align : 'left'	, text: Language.get( ''		, '거래처명'	)
					},{	dataIndex:	''			, width: 170, align : 'left'	, text: Language.get( ''		, '이메일'		)
					},{	dataIndex:	''			, width:  90, align : 'center'	, text: Language.get( ''		, '발행일자'	)
					},{	dataIndex:	''			, width:  80, align : 'center'	, text: Language.get( ''		, '영수/청구'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width:  80, align : 'left'	, text: Language.get( ''		, '부서'		)
					},{	dataIndex:	''			, width:  90, align : 'left'	, text: Language.get( ''		, '담당자'		)
					},{	dataIndex:	''			, width: 150, align : 'right'	, text: Language.get( ''		, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	''			, width: 150, align : 'right'	, text: Language.get( ''		, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	''			, width: 190, align : 'right'	, text: Language.get( ''		, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			};
		return item;
	}
 });