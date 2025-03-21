Ext.define('module.mtrl.isttcalc.npaysumlist.view.NpaySumListLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-npaysumlist-lister',
	store		: 'module.mtrl.isttcalc.npaysumlist.store.NpaySumList',
	border		: 0,
	columnLines	: true,
//	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
				    {	dataIndex:	'cstm_code'			, width: 80,  align : 'center',	text: Language.get( 'cstm_code'		, '거래처코드'	)
				    },{	dataIndex:	'cstm_name'			, width: 230, align : 'left'  ,	text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'bmon_init'			, width: 120, align : 'right' ,	text: Language.get( 'carr_amnt'		, '기초이월'	), xtype : 'numericcolumn', summaryType: 'sum', hidden:true
					},{	dataIndex:	'bmon_amnt'			, width: 120, align : 'right' ,	text: Language.get( 'befr_pric'		, '전월잔액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'sply_amnt'			, width: 120, align : 'right' ,	text: Language.get( ''		, '공급가액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'			, width: 120, align : 'right' ,	text: Language.get( ''		, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'			, width: 120, align : 'right' ,	text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'paym_amnt'			, width: 120, align : 'right' ,	text: Language.get( 'txbl_ttsm'		, '지급금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'npay_amnt'			, width: 120, align : 'right' ,	text: Language.get( 'unpay'			, '미지급잔액'	), xtype : 'numericcolumn', summaryType: 'sum'

					}
				]
			};
		return item;
	}
 });