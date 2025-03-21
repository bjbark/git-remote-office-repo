Ext.define('module.custom.sjflv.mtrl.imp.blmast.view.BlMastLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-blmast-lister-master',
	store		: 'module.custom.sjflv.mtrl.imp.blmast.store.BlMastListerMaster',
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
					{	text : '<span class="write-button">부대비용 등록</span>'	, action : 'costAction'		, cls: 'button1-style' ,width:  90,	} , '-',
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
					{	dataIndex:	''			, width: 100, align : 'center'	, text: Language.get( ''		, 'B/L No'		)
					},{	dataIndex:	''			, width: 60, align : 'center'	, text: Language.get( ''		, 'B/L차수'		)
					},{	dataIndex:	''			, width: 40, align : 'left'		, text: Language.get( ''		, '최종'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width:  90, align : 'center'	, text: Language.get( ''		, 'B/L Date'	)
					},{	dataIndex:	''			, width:  90, align : 'left'	, text: Language.get( ''		, '수입구분'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width:  90, align : 'left'	, text: Language.get( ''		, '선적일자'		)
					},{	dataIndex:	''			, width:  70, align : 'left'	, text: Language.get( ''		, '사업장'			)
					},{	dataIndex:	''			, width:  80, align : 'left'	, text: Language.get( ''		, 'Vendor'		)
					},{	dataIndex:	''			, width:  110, align : 'left'	, text: Language.get( ''		, '중개인'			)
					},{	dataIndex:	''			, width:  40, align : 'center'	, text: Language.get( ''		, '상태'			)
					},{	dataIndex:	''			, width:  70, align : 'left'	, text: Language.get( ''		, '담당자'			)
					},{	dataIndex:	''			, width:  110, align : 'right'	, text: Language.get( ''		, '금액'			), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	''			, width:  40, align : 'left'	, text: Language.get( ''		, '화폐'			)
					},{	dataIndex:	''			, width:  110, align : 'right'	, text: Language.get( ''		, '원화금액'		), xtype : 'numericcolumn'
					},{	dataIndex:	''			, width:  90, align : 'right'	, text: Language.get( ''		, '가격조건'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('incm_dvcd')
					},{	dataIndex:	''			, width:  90, align : 'right'	, text: Language.get( ''		, '결제방법'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('incm_dvcd')
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''		, '결제시기'		)
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''		, '결제기한'		)
					},{	dataIndex:	''			, width:  90, align : 'right'	, text: Language.get( ''		, '적용환율'		)
					}
				]
			};
		return item;
	}
 });