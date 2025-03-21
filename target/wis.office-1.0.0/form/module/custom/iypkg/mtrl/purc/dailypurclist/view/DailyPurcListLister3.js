Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLister3', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-dailypurclist-lister3',
	store	: 'module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister3',

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
					},{	dataIndex:	'cstm_name'				, width: 250, align : 'left'		, text: Language.get('cstm_name'		, '입고처'	)
					},{	dataIndex:	'prod_name'				, width: 455, align : 'left'		, text: Language.get('prod_name'		, '상품명'	)
					},{	dataIndex:	'prod_spec'				, width: 150, align : 'left'		, text: Language.get('prod_spec'		, '상품규격'	)
					},{	dataIndex:	'istt_qntt'				, width:  80, align : 'right'		, text: Language.get('istt_qntt'		, '입고량'	), xtype : 'numericcolumn'
					},{	dataIndex:	'istt_pric'				, width:  80, align : 'right'		, text: Language.get('istt_pric'		, '단가'		), xtype : 'numericcolumn'
					},{	dataIndex:	'istt_amnt'				, width: 120, align : 'right'		, text: Language.get('istt_amnt'		, '공급가액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'acpt_cstm_name'		, width: 250, align : 'left'		, text: Language.get('acpt_cstm_name'	, '수주처'	)
					},{	dataIndex:	'acpt_numb'				, width: 140, align : 'left'		, text: Language.get('acpt_numb'		, '수주번호'	)
					},{	dataIndex:	'addi_rate'				, width:  70, align : 'right'		, text: Language.get('addi_rate'		, '부가율'	), xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}

});
