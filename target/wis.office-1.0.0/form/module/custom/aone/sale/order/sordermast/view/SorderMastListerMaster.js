Ext.define('module.custom.aone.sale.order.sordermast.view.SorderMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-aone-sordermast-lister-master',
	store		: 'module.custom.aone.sale.order.sordermast.store.SorderMastMaster',

	width		: 515,
	minWidth	: 200,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me      = this;
		me.paging   = me.pagingItem();
		me.columns  = me.columnItem();
		me.callParent();
	},

	// 페이징 버튼
	pagingItem : function () {
		var me   = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '출고 등록/취소',
						menu : [
							{	text : '출고등록', action : 'releaseAction'			},
							{	text : '출고취소', action : 'releaseCancelAction'	}
						]
					},{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},{	text : '<span class="write-button">이미지업로드</span>', action : 'imageUpload'  , cls: 'button-style'
					},
					 '-', '->', '-',
					{	text : '<span class="write-button">입고전표 발행</span>'	 , action : 'orderPrintAction'	 , cls: 'button1-style'						} ,
					{	text : '<span class="write-button">견적서 발행</span>'	 , action : 'printAction'		 , cls: 'button1-style'						} ,
					{	text : '<span class="write-button">반입/반출증 발행</span>' , action : 'receiptAction'	 , cls: 'button1-style'	, width : 90		} ,
					{	text : '<span class="write-button">작업보고서 발행</span>' , action : 'workPrintAction'	 , cls: 'button1-style'	, width : 90		} ,
					 '-', '->', '-',
					{	text : '<span class="write-button">입고 등록</span>'	 , action : 'storeAction'		 , cls: 'button1-style'						} ,
					{	text : '<span class="write-button">수리비 산출</span>'	 , action : 'calcAction'		 , cls: 'button1-style'						} ,
					{	text : '<span class="write-button">재수리등록</span>'	 , action : 'amendAction'		 , cls: 'button1-style'	, itemId: 'btnAmend'} ,
					 '-', '->', '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon , action : Const.INSERT.action  , cls: 'button-style'						} ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon , action : Const.MODIFY.action  , cls: 'button-style'	, itemId: 'btnModify'},
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon , action : Const.DELETE.action  , cls: 'button-style'	, itemId: 'btnDelete'},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon , action : Const.EXPORT.action  , cls: 'button-style'						} ,
					 '-',
				]
			}
		;
		return item ;
	},

	// 입출고 리스트
	columnItem : function () {
		var me   = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_clos'			, width: 40  , align : 'center'	, text: Language.get('line_clos'		, '상태'			), xtype: 'lookupcolumn', lookupValue: resource.lookup('line_clos')
					},{	dataIndex:	'acpt_stat_dvcd'	, width: 60  , align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'		), xtype: 'lookupcolumn', lookupValue: resource.lookup('acpt_stat_dvcd')
					},{	dataIndex:	'repa_stat_dvcd'	, width: 60  , align : 'center'	, text: Language.get('repa_stat_dvcd'	, '제품상태'		), xtype: 'lookupcolumn', lookupValue: resource.lookup('repa_stat_dvcd')
					},{	dataIndex:	'invc_numb'			, width: 100  , align : 'center'	, text: Language.get('invc_numb'		, 'AoneCode'	),
						renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
							return '<a>'+value+'</a>';
						},
						listeners:{
							click : function(view,el,pos){
								var record = view.getStore().getAt(pos);
								var grid = view.up('grid');
								if(record){
									grid.imageView(record);
								}
							}
						}
					},{	dataIndex:	'acpt_dvcd'			, width: 60  , align : 'center'	, text: Language.get('acpt_dvcd'		, '입고유형'	), xtype: 'lookupcolumn', lookupValue: resource.lookup('acpt_dvcd')
					},{	dataIndex:	'invc_date'			, width: 90  , align : 'center'	, text: Language.get('invc_date'		, '접수일자'	)
					},{	dataIndex: 	'istt_date'			, width: 90  , align : 'center' , text: Language.get('istt_date' 		, '입고일자'	)
					},{	dataIndex:	'cstm_name'			, width: 140 , align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex:	'item_name'			, width: 180 , align : 'left'	, text: Language.get('item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 140 , align : 'left'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex:	'sral_numb'			, width: 100 , align : 'left'	, text: Language.get('sral_numb'		, 'Serial No.'	)
					},{	dataIndex:	'invc_qntt'			, width: 50  , align : 'right'	, text: Language.get('invc_qntt'		, '수량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'remk_text'			, width: 200 , align : 'left'	, text: Language.get('remk_text'		, '고장증상'	)
					},{	dataIndex:	'make_cost'			, width: 90  , align : 'right'	, text: Language.get('make_cost'		, '견적금액'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'deli_date2'		, width: 90  , align : 'center'	, text: Language.get('deli_date2'		, '출고예정일'	)
					},{	dataIndex:	'brin_yorn'			, width: 75  , align : 'center'	, text: Language.get('brin_yorn'		, '반입여부'	), xtype: 'lookupcolumn', lookupValue: resource.lookup('yorn')
					},{	dataIndex:	'prod_drtr_name'	, width: 70  , align : 'center'	, text: Language.get('prod_drtr_name'	, '엔지니어'	)
					},{	dataIndex:	'work_strt_dttm'	, width: 130 , align : 'left'	, text: Language.get('work_strt_dttm'	, '작업시작일'	)
					},{	dataIndex:	'work_endd_dttm'	, width: 130 , align : 'left'	, text: Language.get('work_endd_dttm'	, '작업완료일'	)
					},{	dataIndex:	'need_time'			, width: 65  , align : 'right'	, text: Language.get('need_time'		, '작업시간'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'ostt_date'			, width: 90  , align : 'center'	, text: Language.get('ostt_date'		, '출고일'		)
					},{	dataIndex:	'invc_amnt'			, width: 90  , align : 'right'	, text: Language.get('invc_amnt'		, '수리금액'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'bill_publ_yorn'	, width: 80  , align : 'center'	, text: Language.get('bill_publ_yorn'	, '세금계산서'	), xtype: 'lookupcolumn', lookupValue: resource.lookup('yorn')
					},{	dataIndex:	'bill_date'			, width: 90  , align : 'center'	, text: Language.get('bill_date'		, '청구일'		)
					},{	dataIndex:	'bill_amnt'			, width: 90  , align : 'right'	, text: Language.get('bill_amnt'		, '청구비'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'user_memo'			, width: 90  , align : 'left'	, text: Language.get('user_memo'		, '비고'		),
					},{	dataIndex:	'amnd_degr'			, width: 50  , align : 'center'	, text: Language.get('amnd_degr'		, '차수'		), hidden : true,
					},{	dataIndex:	'cstm_idcd'			, width: 140 , align : 'left'	, text: Language.get('cstm_idcd'		, '거래처ID'	), hidden : true,
					},{	dataIndex:	'item_idcd'			, width: 100 , align : 'left'	, text: Language.get('item_idcd'		, '품목ID'	), hidden : true,
					},{	dataIndex:	'line_seqn'			, width: 100 , align : 'center'	, text: Language.get('line_seqn'		, '제품'		), hidden : true,
					},{	dataIndex:	'wrhs_idcd'			, width: 100 , align : 'center'	, text: Language.get('wrhs_idcd'		, '창고ID'	), hidden : true,
					},{	dataIndex:	'zone_idcd'			, width: 100 , align : 'center'	, text: Language.get('zone_idcd'		, '구역ID'	), hidden : true,
					}
					]
			};
		return item;
	},
	imageView : function(record){
		resource.loadPopup({
			widget : 'module-upload-carouselpopup',
			param : {
				invc_numb  : record.get('invc_numb'),
				line_seqn  : record.get('line_seqn'),
				uper_seqn  : record.get('uper_seqn'),
				orgn_dvcd  : 'acpt_mast',
				file_dvcd_1fst : "3100"
			},
		});
	}
});

