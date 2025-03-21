Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLister4', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-dailypurclist-lister4',
	store	: 'module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister4',

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
					},{	dataIndex:	'cstm_name'				, width: 200, align : 'left'		, text: Language.get('cstm_name'		, '입고처'	)
					},{	dataIndex:	'asmt_name'				, width: 230, align : 'left'		, text: Language.get('asmt_name'		, '부자재명'	)
					},{	dataIndex:	'asmt_spec'				, width: 150, align : 'left'		, text: Language.get('asmt_spec'		, '규격'		)
					},{	dataIndex:	'asmt_dvcd'				, width: 100, align : 'center'		, text: Language.get('asmt_dvcd'		, '구분'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{	dataIndex:	'istt_qntt'				, width:  80, align : 'right'		, text: Language.get('istt_qntt'		, '수량'		), xtype : 'numericcolumn'
					},{	dataIndex:	'unit_name'				, width:  50, align : 'left'		, text: Language.get('unit_name'		, '단위'		)
					},{	dataIndex:	'istt_pric'				, width:  80, align : 'right'		, text: Language.get('istt_pric'		, '단가'		), xtype : 'numericcolumn'
					},{	dataIndex:	'istt_amnt'				, width: 120, align : 'right'		, text: Language.get('istt_amnt'		, '공급가액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'acpt_cstm_name'		, width: 170, align : 'left'		, text: Language.get('acpt_cstm_name'	, '상호'		)
					},{	dataIndex:	'prod_name'				, width: 420, align : 'left'		, text: Language.get('prod_name'		, '제품명'	)
					}
				]
			}
		;
		return item;
	}

});
