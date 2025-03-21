Ext.define('module.custom.iypkg.prod.worklist4.view.WorkList4Lister4', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-worklist4-lister4',
//	store		: 'module.custom.iypkg.prod.worklist4.store.WorkList4Lister2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
				, pagingButton : false
			};
		return item ;
	},

	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	''	, width: 120, align : 'center'	, text: Language.get(''		, '입고일자'	)
					},{	dataIndex:	''	, width: 170, align : 'left'	, text: Language.get( ''	, '입고처명'	)
					},{	dataIndex:	''	, width: 230, align : 'left'	, text: Language.get( ''	, '제품명'		)
					},{	dataIndex:	''	, width: 100, align : 'center'	, text: Language.get( ''	, '제품규격'	)
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, '입고수량'	)
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, '단가'		)
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, '공급가액'	)
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, '부가세'		)
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, '합계금액'	)
					},{	dataIndex:	''	, width: 170, align : 'center'	, text: Language.get(''		, 'P/O No'	)
					},{	dataIndex:	''	, width: 170, align : 'center'	, text: Language.get( ''	, '수주번호'	)
					},{	dataIndex:	''	, width: 170, align : 'left'	, text: Language.get( ''	, '수주처'		)
					}
				]
			};
		return item;
	}
 });