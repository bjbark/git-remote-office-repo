Ext.define('module.custom.iypkg.eis.eisreport18.view.EisReport18Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport18-lister',
	store		: 'module.custom.iypkg.eis.eisreport18.store.EisReport18',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE'},
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			console.log(record);
			if(record.get('rnum') == '2'){
				return 'text-warn';
			}else if(record.get('rnum') == '1'){
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
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'prod_name'			, width: 230, align : 'left'	, text: Language.get( ''	, '품명'		)
					},{	dataIndex:	'bxty_spec'			, width: 120, align : 'left'	, text: Language.get(''		, '상자규격'	)
					},{	dataIndex:	'cstm_name'			, width: 170, align : 'left'	, text: Language.get(''		, '매출처명'	)
					},{	dataIndex:	'ostt_qntt'			, width:  60, align : 'right'	, text: Language.get( ''	, '출고량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_pric'			, width:  80, align : 'right'	, text: Language.get( ''	, '단가'		), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '공급가액'	), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_cstm_name'	, width: 170, align : 'left'	, text: Language.get( ''	, '입고처'		)
					},{	dataIndex:	'fabc_name'			, width: 170, align : 'left'	, text: Language.get( ''	, '원단명'		)
					},{	dataIndex:	'ppln_dvcd'			, width:  80, align : 'center'	, text: Language.get( ''	, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'fabc_spec'			, width: 120, align : 'left'	, text: Language.get( ''	, '원단규격'	)
					},{	dataIndex:	'istt_qntt'			, width:  60, align : 'right'	, text: Language.get(''		, '투입량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_pric'			, width:  80, align : 'right'	, text: Language.get(''		, '단가'		), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '공급가액'	), xtype: 'numericcolumn'
					},{	dataIndex:	''					, width:  60, align : 'right'	, text: Language.get( ''	, '부가율'		), xtype: 'numericcolumn'
					}
				]
			};
		return item;
	}
 });