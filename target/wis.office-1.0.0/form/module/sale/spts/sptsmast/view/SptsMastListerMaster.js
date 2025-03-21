Ext.define('module.sale.spts.sptsmast.view.SptsMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sptsmast-lister-master',

	store		: 'module.sale.spts.sptsmast.store.SptsMastMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item = {
				defaults : {style: 'text-align:center'},
				items    : [
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, width: 110, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'		) , hidden : false
					},{	dataIndex: 'pcod_numb'		, width: 110, align : 'center'	, text: Language.get('pcod_numb'		, '고객주문번호'		)
					},{	dataIndex: 'cstm_lott_numb'	, width:  80, align : 'center'	, text: Language.get('cstm_lott_numb'	, 'LOT번호'		)
					},{	dataIndex: 'cstm_code'		, width:  70, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'		)
					},{	dataIndex: 'cstm_name'		, width: 160, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('acpt_date'		, '주문일자'		)
					},{	dataIndex: 'max_deli'		, width:  80, align : 'center'	, text: Language.get('max_deli'			, '납기일자'		)
					},{	dataIndex: 'drtr_name'		, width: 110, align : 'left'	, text: Language.get('drtr_name'		, '영업담당'		)
					},{	dataIndex: 'user_memo'		, flex : 100, align : 'left'	, text: Language.get('user_memo'		, '비고'			)
					}
				]
			};
		return item;
	}
});