Ext.define('module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sorderworkreport-lister-master',
	store		: 'module.custom.aone.prod.order.sorderworkreport.store.SorderWorkReportMaster',

	selModel	: { selType: 'checkboxmodel', mode : 'single' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.columns	= me.columnItem();
		me.callParent();
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
					},{	dataIndex:	'acpt_dvcd'			, width: 70  , align : 'center'	, text: Language.get(''	, '입고유형'		),xtype: 'lookupcolumn', lookupValue : resource.lookup('acpt_dvcd')
					},{	dataIndex:	'invc_date'			, width: 90  , align : 'center'	, text: Language.get(''	, '입고일'			)
					},{	dataIndex:	'cstm_name'			, width: 120 , align : 'left'	, text: Language.get(''	, '거래처명'		)
					},{	dataIndex:	'cstm_idcd'			, width: 140 , align : 'left'	, text: Language.get(''	, '거래처ID'		),hidden: true
					},{	dataIndex:	'item_name'			, width: 220 , align : 'left'	, text: Language.get(''	, '품명'			)
					},{	dataIndex:	'item_spec'			, width: 130 , align : 'left'	, text: Language.get(''	, '규격'			)
					},{	dataIndex:	'item_idcd'			, width: 100 , align : 'left'	, text: Language.get(''	, '품목ID'		),hidden: true,
					},{	dataIndex:	'sral_numb'			, width: 100 , align : 'left'	, text: Language.get(''	, 'Serial No.'	)
					},{	dataIndex:	'invc_qntt'			, width: 50  , align : 'right'	, text: Language.get(''	, '수량'			)
					},{	dataIndex:	'remk_text'			, width: 210 , align : 'left'	, text: Language.get(''	, '고장증상'		)
					},{	dataIndex:	'prod_drtr_name'	, width: 90  , align : 'left'	, text: Language.get(''	, '엔지니어'		)
					},{	dataIndex:	'prod_drtr_idcd'	, width: 90  , align : 'left'	, text: Language.get(''	, '엔지니어ID'		),hidden: true,
					},{	dataIndex:	'work_strt_dttm'	, width: 140 , align : 'center'	, text: Language.get(''	, '작업시작'		)
					},{	dataIndex:	'work_endd_dttm'	, width: 140 , align : 'center'	, text: Language.get(''	, '작업종료'		)
					},{	dataIndex:	'need_time'			, width: 60  , align : 'center'	, text: Language.get(''	, '소요시간'		)
					},{	dataIndex:	'user_memo'			, width: 140 , align : 'left'	, text: Language.get(''	, '작업내용'		)
					}
				]
			};
		return item;
		}
	});