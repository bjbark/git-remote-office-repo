Ext.define('module.sale.spts.sptsmast.view.SptsMastListerMaster2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sptsmast-lister-master2',

	store		: 'module.sale.spts.sptsmast.store.SptsMastMaster2',

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
					'->','->','->',
					{	text : '<span class="write-button">납품처 변경</span>'	, action : 'changeAction', cls: 'button1-style',hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'	, width: 90},
					'->', '-',
					{	text : '<span class="write-button">출고지시취소</span>'	, action : 'ordercancleAction', cls: 'button1-style'	},
					{	text : '<span class="write-button">거래명세서 출력</span>', action : 'printAction'	,	cls: 'button1-style', width: 100	},
					'-' ,'->',
					{	text : '<span class="write-button">식별표출력</span>'	, action : 'writeAction', cls: 'button1-style',
						hidden	: _global.stor_id!= 'N1000KITEC1000'
							},
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('spts_numb'		, '출고지시번호'	)
					},{	dataIndex: 'cstm_code'		, width:  80, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'		)
					},{	dataIndex: 'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'dlvy_cstm_name'	, width: 150, align : 'left'	, text: Language.get('dlvy_cstm_name'	, '납품처명'		),hidden : _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					},{	dataIndex: 'ostt_schd_date'	, width:  80, align : 'center'	, text: Language.get('ostt_schd_date'	, '출고예정일자'		)
					},{	dataIndex: 'max_deli'		, width:  80, align : 'center'	, text: Language.get('max_deli'			, '납기일자'		)
					},{	dataIndex: 'drtr_name'		, width: 110, align : 'left'	, text: Language.get('drtr_name'		, '영업담당'		)
					},{	dataIndex: 'remk_text'		, flex : 100, align : 'left'	, text: Language.get('remk_text'		, '비고'			)
					}
				]
			};
		return item;
	}
});
