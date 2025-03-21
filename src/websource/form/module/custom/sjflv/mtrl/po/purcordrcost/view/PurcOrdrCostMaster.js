Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordrcost-master',
	store		: 'module.custom.sjflv.mtrl.po.purcordrcost.store.PurcOrdrCostMaster',

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
					{	dataIndex:	'line_clos'		, width: 40, align : 'center'	, text: Language.get(''	, '상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'exps_line_clos', width: 40, align : 'center'	, text: Language.get(''	, '마감'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'invc_numb'		, width: 120, align : 'center'	, text: Language.get(''	, '입고번호'	)
					},{	dataIndex:	'invc_date'		, width: 70, align : 'left'		, text: Language.get(''	, '입고일자'	)
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get(''	, '거래처명'	)
					}
				]
			};
		return item;
	}
});
