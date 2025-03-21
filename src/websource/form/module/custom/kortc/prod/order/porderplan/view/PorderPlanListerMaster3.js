Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanListerMaster3', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-porderplan-lister-master3',
	store		: 'module.custom.kortc.prod.order.porderplan.store.PorderPlanMaster3',

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
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, text: Language.get('line_clos'		, '상태'			) , width:  90, align : 'center'	, xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, text: Language.get('invc_numb'		, '지시번호'		) , width: 100, align : 'center'
					},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'		, '거래처명'		) , width: 150
					},{	dataIndex: 'acpt_numb'		, text: Language.get('acpt_numb'		, '수주번호'		) , width: 100, align : 'center'
					},{	dataIndex: 'item_name'		, text: Language.get('item_name'		, '품명'			) , width: 150
					},{	dataIndex: 'item_spec'		, text: Language.get('item_spec'		, '규격'			) , width: 120
					},{	dataIndex: ''		, text: Language.get(''		, '차종'			) , width: 100
					},{	dataIndex: 'modl_name'		, text: Language.get('modl_name'		, '모델명'		) , minWidth : 100,flex :   1
					},{	dataIndex: 'indn_qntt'		, text: Language.get('indn_qntt'		, '지시수량'		) , width:  80,xtype:'numericcolumn'
					},{	dataIndex: 'strt_dttm'		, text: Language.get('strt_dttm'		, '생산시작예정'	) , width: 130, align : 'center'
					},{	dataIndex: 'endd_dttm'		, text: Language.get('endd_dttm'		, '생산종료예정'	) , width: 130, align : 'center'
					},{	dataIndex: 'wkfw_name'		, text: Language.get('wkfw_name'		, '생산라인'		) , width: 100
					}
				]
			};
		return item;
	}
});
