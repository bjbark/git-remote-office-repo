Ext.define('module.custom.iypkg.prod.worklist3.view.WorkList3Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-worklist3-lister',
	store		: 'module.custom.iypkg.prod.worklist3.store.WorkList3',

	selModel: {selType: 'checkboxmodel', mode : 'SINGLE'},

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '3'){
				return 'text-warn';
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
					{	dataIndex:	'wkct_name'		, width: 130, align : 'left'	, text: Language.get('wkct_name'	, '공정명'		)
					},{	dataIndex:	'cstm_name'		, width: 180, align : 'left'	, text: Language.get('cstm_name'	, '외주처명'	)
					},{	dataIndex:	'istt_qntt'		, width:  80, align : 'right'	, text: Language.get('istt_qntt'	, '입고량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'subt_qntt'		, width:  60, align : 'right'	, text: Language.get('subt_qntt'	, '감량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_pric'		, width:  80, align : 'right'	, text: Language.get('istt_pric'	, '단가'		), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_amnt'		, width: 100, align : 'right'	, text: Language.get('istt_amnt'	, '공급가액'	), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_vatx'		, width: 100, align : 'right'	, text: Language.get('istt_vatx'	, '부가세'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn'
					}
				]
			}
		;
		return item;
	}

 });