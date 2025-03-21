Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-porderplan-lister-master',
	store		: 'module.custom.kortc.prod.order.porderplan.store.PorderPlanMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false,
		enableTextSelection: true
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
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, text: Language.get('line_clos'		, '상태'		) , width :  50, align : 'center'	 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, text: Language.get('invc_numb'		, '주문번호'	) , width : 100, align : 'center'
					},{	dataIndex: 'amnd_degr'		, text: Language.get('amnd_degr'		, '차수'		) , width :  40, align : 'center'
					},{	dataIndex: 'ordr_dvcd'		, text: Language.get('ordr_dvcd'		, '오더구분'	) , width :  70, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('ordr_dvcd')
					},{	dataIndex: 'acpt_case_name'	, text: Language.get('acpt_case_name'	, '주문명'	) , flex  :   1, minWidth : 160, align : 'left'
					},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'		, '거래처명'	) , width : 140, align : 'left'
					},{	dataIndex: 'invc_date'		, text: Language.get('invc_date'		, '등록일자'	) , width : 100, align : 'center'
					},{	dataIndex: 'deli_date'		, text: Language.get('deli_date'		, '납기일자'	) , width : 100, align : 'center'
					}
				]
			};
		return item;
	}
});
