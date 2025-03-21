Ext.define('module.sale.sale.salework.view.SaleWorkListerMaster2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-salework-lister-master2',
	store		: 'module.sale.sale.salework.store.SaleWorkListerMaster2',
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
					},{	dataIndex:	''			, width:  90, align : 'center'	, text: Language.get( ''		, '출고일자'	)
					},{	dataIndex:	''			, width:  90, align : 'center'	, text: Language.get( ''		, '출고번호'	)
					},{	dataIndex:	''			, width:  80, align : 'center'	, text: Language.get( ''		, '거래처코드'	)
					},{	dataIndex:	''			, width: 230, align : 'left'	, text: Language.get( ''		, '거래처명'	)
					},{	dataIndex:	''			, width: 120, align : 'left'	, text: Language.get( ''		, '전화번호'	)
					},{	dataIndex:	''			, width: 160, align : 'left'	, text: Language.get( ''		, '사업자등록번호')
					},{	dataIndex:	''			, width: 170, align : 'left'	, text: Language.get( ''		, '이메일'		)
					},{	dataIndex:	''			, width: 100, align : 'center'	, text: Language.get( ''		, '출고구분'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width:  90, align : 'left'	, text: Language.get( ''		, '부서'		)
					},{	dataIndex:	''			, width:  90, align : 'left'	, text: Language.get( ''		, '담당자'		)
					}
				]
			};
		return item;
	}
 });