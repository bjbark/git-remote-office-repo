Ext.define('module.sale.sale.salelist3.view.SaleList3Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-salelist3-lister',
	store		: 'module.sale.sale.salelist3.store.SaleList3',
	border		: 0,
	columnLines	: true,
	features	: [{  ftype: 'grid-summary' } ],
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
			if(record.get('fabc_name') == '합계'){
				return 'text-warn';
			}else if(record.get('rnum') == '2'){
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
					{	dataIndex:	'fabc_name'			, width: 180, align : 'left'	, text: Language.get(''		, '원단명'		)
					},{	dataIndex:	'ppln_dvcd'			, width:  80, align : 'center'	, text: Language.get(''		, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'fdat_spec'			, width: 120, align : 'left'	, text: Language.get( ''	, '재단규격'	)
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'	, text: Language.get( ''	, '입고처'		)
					},{	dataIndex:	'istt_qntt'			, width:  70, align : 'right'	, text: Language.get( ''	, '입고수량'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'pqty_pric'			, width:  80, align : 'right'	, text: Language.get( ''	, '단가/개'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'istt_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '공급가'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'm2'				, width:  80, align : 'right'	, text: Language.get( ''	, '총m2'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'acpt_cstm_name'	, width: 130, align : 'left'	, text: Language.get( ''	, '수주처명'	)
					},{	dataIndex:	'prod_name'			, width: 230, align : 'left'	, text: Language.get( ''	, '품명'		)
					},{	dataIndex:	'prod_spec'			, width: 120, align : 'left'	, text: Language.get( ''	, '상자규격'	)
					},{	dataIndex:	'ostt_qntt'			, width:  70, align : 'right'	, text: Language.get( ''	, '출고수량'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'sale_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '공급가'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'persent'			, width:  70, align : 'right'	, text: Language.get( ''	, '재료비율'	)
					}
				]
			};
		return item;
	}
 });