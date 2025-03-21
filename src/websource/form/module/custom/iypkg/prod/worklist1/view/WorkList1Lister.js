Ext.define('module.custom.iypkg.prod.worklist1.view.WorkList1Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-worklist1-lister',
	store		: 'module.custom.iypkg.prod.worklist1.store.WorkList1',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
			if(record.get('rnum') == '4' || record.get('rnum') == '5'){
				return 'text-warn';
			}else if(record.get('rnum') == '3'){
				return 'text-blue';
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'invc_date'	, width: 90, align : 'center'	, text: Language.get(''		, '생산일자'	)
					},{	dataIndex:	'wkct_name'	, width: 100, align : 'left'	, text: Language.get(''		, '공정명'	)
					},{	dataIndex:	'wkct_stnm'	, width: 100, align : 'left'	, text: Language.get( ''	, '보고공정명')
					},{	dataIndex:	'acpt_date'	, width: 90, align : 'center'	, text: Language.get( ''	, '수주일자'	)
					},{	dataIndex:	'cstm_name'	, width: 170, align : 'left'	, text: Language.get( ''	, '거래처'	)
					},{	dataIndex:	'prod_name'	, width: 230, align : 'left'	, text: Language.get( ''	, '품명'		)
					},{	dataIndex:	'prod_spec'	, width: 120, align : 'left'	, text: Language.get( ''	, '규격'		)
					},{	dataIndex:	'acpt_qntt'	, width: 100, align : 'right'	, text: Language.get( ''	, '수주량'	),xtype:'numericcolumn'
					},{	dataIndex:	'plan_qntt'	, width: 100, align : 'right'	, text: Language.get( ''	, '생산량'	),xtype:'numericcolumn'
					},{	dataIndex:	'loss_qntt'	, width: 100, align : 'right'	, text: Language.get( ''	, 'LOSS량'	),xtype:'numericcolumn'
					},{	dataIndex:	'mxm2_pric'	, width: 100, align : 'right'	, text: Language.get( ''	, '단가'		),xtype:'numericcolumn'
					},{	dataIndex:	'amnt'		, width: 100, align : 'right'	, text: Language.get( ''	, '금액'		),xtype:'numericcolumn'
					},{	dataIndex:	''	, width: 100, align : 'right'	, text: Language.get( ''	, 'm2/총'	)
					}
				]
			};
		return item;
	}
 });