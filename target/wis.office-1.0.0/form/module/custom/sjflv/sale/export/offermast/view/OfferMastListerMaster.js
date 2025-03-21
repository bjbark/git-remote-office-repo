Ext.define('module.custom.sjflv.sale.export.offermast.view.OfferMastListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-offermast-lister-master',
	store		: 'module.custom.sjflv.sale.export.offermast.store.OfferMastMaster',

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
					{	text : '<span class="write-button">부대비용 등록</span>'	, action : 'inexAction'		, cls: 'button-style'	} , '->',
					{	text : '<span class="write-button">Amend</span>'	, action : 'copyAction'		, cls: 'button-style'	} , '-','->',
					{	text : '<span class="write-button">수출오더등록</span>'	, action : ''		, cls: 'button1-style'	} , '-','->',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }, '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } ,
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
					{	dataIndex: 'line_clos'		, width:  50, align : 'center'	, text: Language.get('line_clos'		, '상태'				) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'bzpl_name'		, width: 120, align : 'left'	, text: Language.get('bzpl_name'		, '사업장'			)
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'left'	, text: Language.get('offr_numb'		, 'Offer 번호'		)
					},{	dataIndex: 'invc_date'		, width: 100, align : 'left'	, text: Language.get('offr_date'		, 'Offer Date'		)
					},{	dataIndex: 'amnd_degr'		, width:  50, align : 'right'	, text: Language.get('amnd_degr'		, 'AMD'				) , xtype: 'numericcolumn'
					},{	dataIndex: 'expt_dvcd'		, width: 100, align : 'center'	, text: Language.get('expt_dvcd'		, '수출구분'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('expt_dvcd')
					},{	dataIndex: 'mngt_numb'		, width: 120, align : 'left'	, text: Language.get('mngt_numb'		, 'Offer 관리번호'	)
					},{	dataIndex: 'offr_dvcd'		, width: 100, align : 'center'	, text: Language.get('offr_dvcd'		, 'Offer구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('offr_dvcd')
					},{	dataIndex: 'ship_viaa_dvcd'	, width: 100, align : 'center'	, text: Language.get('ship_viaa_dvcd'	, 'Ship Via'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('ship_viaa_dvcd')
					},{	dataIndex: 'buyr_name'		, width: 100, align : 'left'	, text: Language.get('buyr_name'		, 'Buyer'			)
					},{	dataIndex: 'mdtn_prsn'		, width: 100, align : 'left'	, text: Language.get('mdtn_prsn'		, '중개인'			)
					},{	dataIndex: 'drtr_name'		, width: 100, align : 'left'	, text: Language.get('drtr_name'		, '담당자'			)
					},{	dataIndex: 'pric_cond_dvcd'	, width: 100, align : 'center'	, text: Language.get('pric_cond_dvcd'	, '가격조건'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('pric_cond_dvcd')
					},{	dataIndex: 'trde_stot_dvcd'	, width: 100, align : 'center'	, text: Language.get('trde_stot_dvcd'	, '결제방법'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('trde_stot_dvcd')
					},{	dataIndex: 'stot_time_dvcd'	, width: 100, align : 'center'	, text: Language.get('stot_time_dvcd'	, '결제시기'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('stot_time_dvcd')
					},{	dataIndex: 'stot_ddln'		, width: 100, align : 'left'	, text: Language.get('stot_ddln'		, '결제기한'			)
					},{	dataIndex: 'mney_unit'		, width:  60, align : 'left'	, text: Language.get('mney_unit'		, '통화'				)
					},{	dataIndex: 'exrt'			, width:  80, align : 'right'	, text: Language.get('exrt'				, '적용환율'			) , xtype: 'numericcolumn'
					}
				]
			};
		return item;
	}
});
