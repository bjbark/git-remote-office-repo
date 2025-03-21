Ext.define('module.basic.carmast.view.CarMastLister', { extend	: 'Axt.grid.Panel',
	alias		: 'widget.module-carmast-lister',
	store		: 'module.basic.carmast.store.CarMast',
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

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'},
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
					'-',
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'}
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	= {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'line_stat'		, width:  50, align : 'center',	text: Language.get( ''		, '상태'		), xtype :'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'cars_code'		, width: 100, align : 'center',	text: Language.get( ''		, '차량코드'	)
					},{	dataIndex:	'base_name'		, width: 100, align : 'left'  ,	text: Language.get( ''		, '차종'		), xtype :'lookupcolumn', lookupValue : resource.lookup('crty_bacd')
					},{	dataIndex:	'load_volm'		, width:  60, align : 'right' ,	text: Language.get( ''		, '적재량'		)
					},{	dataIndex:	'cars_numb'		, width: 130, align : 'left'  ,	text: Language.get( ''		, '차량번호'	)
					},{	dataIndex:	'cars_alis'		, width: 100, align : 'left'  ,	text: Language.get( ''		, '차량명'		)
					},{	dataIndex:	'puch_date'		, width: 100, align : 'center',	text: Language.get( ''		, '구입일자'	)
					},{	dataIndex:	'cars_year_prod', width:  70, align : 'center',	text: Language.get( ''		, '년식'		)
					},{	dataIndex:	'insp_date'		, width: 100, align : 'center',	text: Language.get( ''		, '검사일자'	)
					},{	dataIndex:	'runn_dvcd'		, width: 100, align : 'center',	text: Language.get( ''		, '운행구분'	), xtype :'lookupcolumn', lookupValue : resource.lookup('runn_dvcd')
					},{	dataIndex:	'nwek_name'		, width: 100, align : 'left'  ,	text: Language.get( ''		, '차주명'		)
					},{	dataIndex:	'inst_totl_amnt', width:  80, align : 'right' ,	text: Language.get( ''		, '할부총액'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'inst_mont'		, width:  60, align : 'center',	text: Language.get( ''		, '할부개월'	)
					},{	dataIndex:	'monh_paid_amnt', width:  80, align : 'right' ,	text: Language.get( ''		, '월불입금'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'paid_date'		, width: 100, align : 'center',	text: Language.get( ''		, '불입일'		)
					},{	dataIndex:	'expr_date'		, width: 100, align : 'center',	text: Language.get( ''		, '만기일자'	)
					},{	dataIndex:	'inst_bank_name', width: 100, align : 'left'  ,	text: Language.get( ''		, '할부금융사'	)
					},{	dataIndex:	'insu_amnt'		, width: 100, align : 'right' ,	text: Language.get( ''		, '보험금액'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'insu_dvcd'		, width: 100, align : 'center',	text: Language.get( ''		, '보험구분'	), xtype :'lookupcolumn', lookupValue : resource.lookup('insu_dvcd')
					},{	dataIndex:	'insu_trff'		, width:  60, align : 'right' ,	text: Language.get( ''		, '보험요율'	)
					},{	dataIndex:	'insu_open_date', width: 100, align : 'center',	text: Language.get( ''		, '보험개시일'	)
					},{	dataIndex:	'insu_expr_date', width: 100, align : 'center',	text: Language.get( ''		, '보험만기일'	)
					},{	dataIndex:	'paid_mthd_dvcd', width: 100, align : 'center',	text: Language.get( ''		, '납입구분'	), xtype :'lookupcolumn', lookupValue : resource.lookup('paid_mthd_dvcd')
					},{	dataIndex:	'insu_cmpy_name', width: 100, align : 'left'  ,	text: Language.get( ''		, '보험사명'	)
					},{	dataIndex:	'insu_drtr_name', width: 100, align : 'left'  ,	text: Language.get( ''		, '담당자'		)
					},{	dataIndex:	'tele_numb'		, width: 120, align : 'center',	text: Language.get( ''		, '전화번호'	)
					},{	dataIndex:	'hdph_numb'		, width: 120, align : 'center',	text: Language.get( ''		, '휴대폰번호'	)
					},{	dataIndex:	'emgc_tele_numb', width: 120, align : 'center',	text: Language.get( ''		, '비상전화'	)
					},{	dataIndex:	'frst_date'		, width: 100, align : 'center',	text: Language.get( ''		, '1회일자'	)
					},{	dataIndex:	'frst_amnt'		, width: 100, align : 'right',	text: Language.get( ''		, '1회금액'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'secd_date'		, width: 100, align : 'center',	text: Language.get( ''		, '2회일자'	)
					},{	dataIndex:	'secd_amnt'		, width: 100, align : 'right',	text: Language.get( ''		, '2회금액'	), xtype: 'numericcolumn', format: '#,##0'
					}
				]
			};
		return item;
	}
 });