Ext.define('module.custom.iypkg.stock.isos.isttwork3.view.IsttWork3Lister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-isttwork3-lister2',
	store		: 'module.custom.iypkg.stock.isos.isttwork3.store.IsttWork3Lister2',
	border		: 0,
	columnLines	: true,
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
			};
		return item ;
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('invc_date').length < 8){
				return 'text-warn';
			}else if(record.get('fabc_name') == '일계'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get( 'invc_date'		, '발주일자'	)
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'	, text: Language.get( 'cstm_name'		, '발주처명'	)
					},{	dataIndex:	'fabc_name'			, width: 200, align : 'left'	, text: Language.get( 'fabc_name'		, '원단명'		)
					},{	dataIndex:	'ppln_dvcd'			, width:  60, align : 'right'	, text: Language.get( 'ppln_dvcd'		, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'fdat_spec'			, width: 100, align : 'left'	, text: Language.get( 'fdat_spec'		, '재단규격'	)
					},{	dataIndex:	'item_fxqt'			, width:  80, align : 'right'	, text: Language.get( 'item_fxqt'		, '절수'		)
					},{	dataIndex:	'scre_spec'			, width: 100, align : 'right'	, text: Language.get( 'scre_spec'		, '재단및스코어'	)
					},{	dataIndex:	'offr_qntt'			, width:  80, align : 'right'	, text: Language.get( 'offr_qntt'		, '발주량'		), xtype : 'numericcolumn'
					},{	dataIndex:	'istt_qntt'			, width:  80, align : 'right'	, text: Language.get( 'istt_qntt'		, '입고량'		), xtype : 'numericcolumn'
					},{	dataIndex:	'unistt'			, width:  80, align : 'right'	, text: Language.get( 'unistt'			, '미입고'		), xtype : 'numericcolumn'
					},{	dataIndex:	'deli_date'			, width: 100, align : 'center'	, text: Language.get( 'deli_date'		, '납기일자'	)
					},{	dataIndex:	'acpt_cstm_name'	, width: 150, align : 'left'	, text: Language.get( 'acpt_cstm_name'	, '수주처명'	)
					},{	dataIndex:	'acpt_invc_numb'	, width: 170, align : 'left'	, text: Language.get( 'acpt_invc_numb'	, '수주번호'	)
					},{	dataIndex:	'prod_name'			, width: 200, align : 'left'	, text: Language.get( 'prod_name'		, '품명'		)
					}
				]
			};
		return item;
	}
 });