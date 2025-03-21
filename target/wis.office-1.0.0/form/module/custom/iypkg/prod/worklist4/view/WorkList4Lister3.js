Ext.define('module.custom.iypkg.prod.worklist4.view.WorkList4Lister3', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-worklist4-lister3',
//	store		: 'module.custom.iypkg.prod.worklist4.store.WorkList4Lister3',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계'){
				return 'text-warn';
			}else if(record.get('cstm_name') == '월계'){
				return 'text-warn';
			}else if(record.get('cstm_name') == '일계'){
				return 'text-blue';
			}else if(record.get('cstm_name') == '소계'){
				return 'text-green';
			}
		}
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
					{	dataIndex:	''	, width: 120, align : 'center'	, text: Language.get(''		, '발주일자'	)
					},{	dataIndex:	''	, width: 170, align : 'left'	, text: Language.get( ''	, '발주처명'	)
					},{	dataIndex:	''	, width: 230, align : 'left'	, text: Language.get( ''	, '제품명'		)
					},{	dataIndex:	''	, width: 100, align : 'center'	, text: Language.get( ''	, '제품규격'	)
					},{	dataIndex:	''	, width: 100, align : 'left'	, text: Language.get( ''	, 'P/O No'	)
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, '수주량'		)
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, '발주량'		)
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, '미발주'		)
//					},{	dataIndex:	''	, width: 100, align : 'left'	, text: Language.get( ''	, '비고'		)
					},{	dataIndex:	''	, width: 170, align : 'center'	, text: Language.get( ''	, '수주번호'	)
					},{	dataIndex:	''	, width: 100, align : 'center'	, text: Language.get( ''	, '수주일자'	)
					},{	dataIndex:	''	, width: 100, align : 'left'	, text: Language.get( ''	, '수주처'		)
					}
				]
			};
		return item;
	}
 });