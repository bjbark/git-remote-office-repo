Ext.define('module.mtrl.po.purctrstwork.view.PurcTrstWorkListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purctrstwork-lister-master',
	store		: 'module.mtrl.po.purctrstwork.store.PurcTrstWorkMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ,{ ptype:'filterbar'}],

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
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				pagingButton : true,
				items : [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						},
					},
					'-','->','->','->','->','-',
//					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				],
			};
		return item ;
	},
	renderer : function (val, meta, record) {

	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_clos'		, width: 40, align : 'center'	, text: Language.get(''	, '상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'invc_date'		, width: 80, align : 'center'	, text: Language.get(''	, '요청일자'	)
					},{	dataIndex:	'invc_numb'		, width: 80, align : 'center'	, text: Language.get(''	, '요청번호'	)
					},{	dataIndex:	'drtr_name'		, width: 80, align : 'left'		, text: Language.get(''	, '요청자'	)
					}
				]
			};
		return item;
	}
});
