Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLister2', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-dailypurclist-lister2',
	store	: 'module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister2',

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
					},{	dataIndex:	'cstm_name'				, width: 170, align : 'left'		, text: Language.get('cstm_name'		, '외주처'		)
					},{	dataIndex:	'wkct_name'				, width: 100, align : 'left'		, text: Language.get('wkct_name'		, '공정명'		)
					},{	dataIndex:	'wkun_dvcd'				, width:  80, align : 'center'		, text: Language.get('wkun_dvcd'		, '작업단위'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd')
					},{	dataIndex:	'istt_qntt'				, width:  80, align : 'right'		, text: Language.get('istt_qntt'		, '수량'		), xtype : 'numericcolumn'
					},{	dataIndex:	'unit_name'				, width: 100, align : 'center'		, text: Language.get('unit_name'		, '수량단위'	)
					},{	dataIndex:	'istt_pric'				, width:  80, align : 'right'		, text: Language.get('istt_pric'		, '단가'		), xtype : 'numericcolumn'
					},{	dataIndex:	'istt_amnt'				, width: 120, align : 'right'		, text: Language.get('istt_amnt'		, '공급가액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'acpt_cstm_name'		, width: 170, align : 'left'		, text: Language.get('acpt_cstm_name'	, '수주처'		)
					},{	dataIndex:	'prod_name'				, width: 300, align : 'left'		, text: Language.get('prod_name'		, '품명'		)
					},{	dataIndex:	'prod_spec'				, width: 150, align : 'left'		, text: Language.get('prod_spec'		, '제품규격'	)
					}
				]
			}
		;
		return item;
	}

});
