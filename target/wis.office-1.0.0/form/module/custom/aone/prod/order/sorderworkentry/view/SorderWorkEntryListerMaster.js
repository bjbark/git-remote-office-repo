Ext.define('module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sorderworkentry-lister-master',
	store		: 'module.custom.aone.prod.order.sorderworkentry.store.SorderWorkEntryMaster',

	selModel	: { selType: 'checkboxmodel', mode : 'single' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{	text : '<span class="write-button">부품대기</span>'		 , action : 'waitAction'		 , cls: 'button1-style'},
					{	text : '<span class="write-button">실적보고</span>'		 , action : 'popupAction'		 , cls: 'button1-style'},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon , action : Const.EXPORT.action  , cls: 'button-style' }
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
					{	dataIndex:	'acpt_stat_dvcd'	, width: 60  , align : 'center'	, text: Language.get(''	, '진행상태'		),xtype: 'lookupcolumn', lookupValue: resource.lookup('acpt_stat_dvcd')
					},{	dataIndex:	'repa_stat_dvcd'	, width: 60  , align : 'center'	, text: Language.get(''	, '수리상태'		),xtype: 'lookupcolumn', lookupValue: resource.lookup('repa_stat_dvcd')
					},{	dataIndex:	'invc_numb'			, width: 100 , align : 'center'	, text: Language.get(''	, 'AoneCode'	)
					},{	dataIndex:	'amnd_degr'			, width: 50  , align : 'center'	, text: Language.get(''	, '차수'			),hidden: true,
					},{	dataIndex:	'acpt_dvcd'			, width: 80  , align : 'center'	, text: Language.get(''	, '입고유형'		),xtype: 'lookupcolumn', lookupValue : resource.lookup('acpt_dvcd')
					},{	dataIndex:	'invc_date'			, width: 120 , align : 'center'	, text: Language.get(''	, '입고일'			)
					},{	dataIndex:	'cstm_name'			, width: 120 , align : 'left'	, text: Language.get(''	, '거래처명'		)
					},{	dataIndex:	'cstm_idcd'			, width: 140 , align : 'left'	, text: Language.get(''	, '거래처ID'		),hidden: true
					},{	dataIndex:	'item_name'			, width: 220 , align : 'left'	, text: Language.get(''	, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 130 , align : 'left'	, text: Language.get(''	, '규격'			)
					},{	dataIndex:	'item_idcd'			, width: 100 , align : 'left'	, text: Language.get(''	, '품목ID'		),hidden: true,
					},{	dataIndex:	'sral_numb'			, width: 100 , align : 'left'	, text: Language.get(''	, 'Serial No.'	)
					},{	dataIndex:	'invc_qntt'			, width: 60  , align : 'right'	, text: Language.get(''	, '수량'			)
					},{	dataIndex:	'remk_text'			, width: 210 , align : 'left'	, text: Language.get(''	, '고장증상'		)
					},{	dataIndex:	'prod_drtr_name'	, width: 90  , align : 'left'	, text: Language.get(''	, '엔지니어'		)
					},{	dataIndex:	'prod_drtr_idcd'	, width: 90  , align : 'left'	, text: Language.get(''	, '엔지니어ID'		),hidden: true,
					},{	dataIndex:	'plan_date'			, width: 180 , align : 'center'	, text: Language.get(''	, '작업계획일정'		)
					},{	dataIndex:	'memo'				, width: 140 , align : 'left'	, text: Language.get(''	, '지시사항'		)
					},{	dataIndex:	'work_invc_numb'	, width: 100 , align : 'left'	, text: Language.get(''	, '작업보고서 번호'	),hidden: true
					}
				]
			};
		return item;
		}
	});