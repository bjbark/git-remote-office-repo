Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLister1', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-dailypurclist-lister1',
	store	: 'module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister1',

	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('cstm_name') == '월계'){
				return 'text-warn';
			}else if(record.get('cstm_name') == '일계'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'invc_date'				, width: 100, align : 'center'		, text: Language.get('invc_date'		, '매입일자'	), defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
					},{	dataIndex:	'cstm_name'				, width: 180, align : 'left'		, text: Language.get('cstm_name'		, '매입처'		)
					},{	dataIndex:	'fabc_name'				, width: 200, align : 'left'		, text: Language.get('fabc_name'		, '원단명'		)
					},{	dataIndex:	'ppkd_dvcd'				, width:  80, align : 'center'		, text: Language.get('ppkd_dvcd'		, '지종명'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('ppkd_dvcd')
					},{	dataIndex:	'ppln_dvcd'				, width:  60, align : 'center'		, text: Language.get('ppln_dvcd'		, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'fabc_spec'				, width: 150, align : 'left '		, text: Language.get('fabc_spec'		, '원단규격'	)
					},{	dataIndex:	'item_fxqt'				, width:  60, align : 'right'		, text: Language.get('item_fxqt'		, '절수'		), xtype : 'numericcolumn'
					},{	dataIndex:	'istt_qntt'				, width:  80, align : 'right'		, text: Language.get('istt_qntt'		, '입고량'		), xtype : 'numericcolumn'
					},{	dataIndex:	'mxm2_pric'				, width:  80, align : 'right'		, text: Language.get('mxm2_pric'		, 'm2/단가'	), xtype : 'numericcolumn'
					},{	dataIndex:	'pqty_pric'				, width:  80, align : 'right'		, text: Language.get('pqty_pric'		, '단가'		), xtype : 'numericcolumn'
					},{	dataIndex:	'istt_amnt'				, width: 120, align : 'right'		, text: Language.get('istt_amnt'		, '공급가액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'alm2_pric'				, width:  80, align : 'right'		, text: Language.get('alm2_pric'		, '총m2'		), xtype: 'numericcolumn'
					},{	dataIndex:	'acpt_cstm_name'		, width: 150, align : 'left'		, text: Language.get('acpt_cstm_name'	, '수주처'		)
					},{	dataIndex:	'prod_name'				, width: 355, align : 'left'		, text: Language.get('prod_name'		, '품명'		)
					},{	dataIndex:	'cost_amnt'				, width:  70, align : 'right'		, text: Language.get('cost_amnt'		, '원가율'		), xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}

});
