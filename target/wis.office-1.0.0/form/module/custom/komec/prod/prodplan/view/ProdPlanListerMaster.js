Ext.define('module.custom.komec.prod.prodplan.view.ProdPlanListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodplan-lister-master',
	store		: 'module.custom.komec.prod.prodplan.store.ProdPlanMaster',

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
					{	dataIndex: 'line_clos'		, text: Language.get('line_clos'		, '상태'			) , width	:  50, align : 'center'	, xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, text: Language.get('acpt_numb'		, '주문번호'		) , width	: 100, align : 'center'
					},{	dataIndex: 'invc_date'		, text: Language.get('invc_date'		, '등록일자'		) , width	: 100, align : 'center'
					},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'		, '거래처명'		) , flex	: 	1
					}
				]
			};
		return item;
	}
});
