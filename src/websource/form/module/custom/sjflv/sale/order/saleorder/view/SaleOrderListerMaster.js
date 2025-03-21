Ext.define('module.custom.sjflv.sale.order.saleorder.view.SaleOrderListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-saleorder-lister-master',
	store		: 'module.custom.sjflv.sale.order.saleorder.store.SaleOrderMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }],
	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		var hidden = !(_global.hqof_idcd=='N1000INKOP');
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem(hidden);
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
					{	text : '마감/해지',
						hidden : _global.hq_id.toUpperCase()=='N1000HNTOP'? true : false,
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',
					{	text	: '승인/취소',
						hidden	: (_global.options.acpt_fix_yorn==0),
						menu	: [
							{	text : '승인', action : 'okAction'
							},{	text : '취소', action : 'okCancelAction'
							}
						]
					},
					'-',
					{	text	: '확인/취소',
						hidden	: _global.hq_id.toUpperCase()=='N1000SJUNG'? true : false,
						menu	: [
							{	text : '확인', action : 'confirmAction'
							},{	text : '취소', action : 'confirmCancelAction'
							}
						]
					},
					'->', '-',
					{	text : '<span class="write-button">주문목록보기 취소</span>', action : 'goOrderWork', cls: 'button1-style', width : 100, itemId : 'goWorkBtn', hidden : true },
					{	text : '<span class="write-button">엑셀 Upload</span>', action : 'uploadAction'	, cls: 'button1-style',
						hidden	: (_global.stor_id.toUpperCase() != 'N1000KITEC1000'?true:false)} , '-',
					{	text : '납기분석'	, iconCls: 'icon-chart',     action : 'ganttAction' , cls: 'button-style' , hidden	: (_global.options.mes_system_type.toUpperCase() == 'SJFLV'?true:false) } , '-' ,
					{	text : '<span class="write-button">인수증 출력</span>', action : 'printAction',cls: 'button1-style', width: 70 },
					{	text : '<span class="write-button">거래명세서 출력</span>', action : 'printAction2',cls: 'button1-style', width: 100 /*, hidden: _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG'*/},
					{	text : '<span class="write-button">거래명세서 통합출력</span>', action : 'printAction3',cls: 'button1-style', width: 110},
					{	text : '<span class="write-button">납기일자 변경</span>', action : 'deliAction',cls: 'button1-style', width: 90 },
					{	text : '<span class="write-button">수주복사</span>'	, action : 'copyAction'		, cls: 'button1-style'},
					{	text : '<span class="write-button">출고</span>'	, action : 'orderAction'	, cls: 'button1-style' , hidden	: (_global.options.mes_system_type.toUpperCase() == 'SJFLV'?true:false) 	} , '-',
//					{	text : '명세서'			, iconCls: Const.REPORT.icon, action : 'etcPrintAction'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style', itemId:'insertBtn' },
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style', itemId:'modifyBtn' },
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style', itemId:'deleteBtn' }
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function (hidden) {
		var me = this,
			item_sjflv = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  35, align: 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  55, align: 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'pdod_date'		, width:  80, align: 'center'	, text: Language.get('pdod_date'		, '생산계획'		)
					},{	dataIndex: 'prod_yorn'		, width:  55, align: 'center'	, text: Language.get('prod_yorn'		, '생산여부'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'cnfm_yorn'		, width:  55, align: 'center'	, text: Language.get('cnfm_yorn'		, '주문확인'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'invc_numb'		, width:  80, align: 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'line_seqn'		, width:  35, align: 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex: 'cstm_code'		, width:  80, align: 'center'	, text: Language.get('cstm_code'		, '거래처코드'		) , hidden:true
					},{	dataIndex: 'cstm_name'		, width: 180, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'mdtn_prsn'		, width: 120, align: 'left'		, text: Language.get('mdtn_prsn'		, 'SD 업체'			) ,
					},{	dataIndex: 'invc_date'		, width:  75, align: 'center'	, text: Language.get('acpt_date'		, '수주일자'		)
					},{	dataIndex: 'deli_date'		, width:  75, align: 'center'	, text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex: 'expt_dvcd'		, width:  55, align: 'center'	, text: Language.get('expt_dvcd'		, '조달구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('expt_dvcd')
					},{	dataIndex: 'acpt_dvcd'		, width:  60, align: 'center'	, text: Language.get('acpt_dvcd'		, '수주구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_dvcd')
					},{	dataIndex: 'prod_trst_dvcd'	, width:  55, align: 'center'	, text: Language.get('prod_trst_dvcd'	, '생산구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('prod_trst_dvcd')
					},{	dataIndex: 'drtr_name'		, width:  65, align: 'left'		, text: Language.get('sale_drtr_name'	, '영업담당자'		)
					},{	dataIndex: 'pcod_numb'		, width:  80, align: 'center'	, text: Language.get('pcod_numb'		, '고객주문번호'	)
					},{	dataIndex: 'item_code'		, width: 120, align: 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex: 'item_name'		, width: 220, align: 'left'		, text: Language.get('item'				, '품목명'			)
					},{	dataIndex: 'item_spec'		, width: 150, align: 'left'		, text: Language.get('item_spec'		, '품목규격'		)
					},{	dataIndex: 'mcls_name'		, width: 100, align: 'left'		, text: Language.get('mcls_name'		, '중분류'			)
					},{	dataIndex: 'labl_chck_yorn'	, width:  55, align: 'center'	, text: Language.get('labl_chck_yorn'	, '라벨확인'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'invc_qntt'		, width:  65, align: 'right'	, text: Language.get('acpt_qntt'		, '수주수량'		) , xtype : 'numericcolumn', format : '#,##0.###'
					},{	dataIndex: 'invc_pric'		, width:  80, align: 'right'	, text: Language.get('invc_pric'		, '품목단가'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'sply_amnt'		, width:  80, align: 'right'	, text: Language.get('amnt'				, '공급가액'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'vatx_amnt'		, width:  80, align: 'right'	, text: Language.get('amnt'				, '부가세액'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'invc_amnt'		, width:  80, align: 'right'	, text: Language.get('amnt'				, '합계금액'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'ostt_date'		, width:  75, align: 'center'	, text: Language.get('ostt_date'		, '출고일자'		)
					},{	dataIndex: 'ostt_qntt'		, width:  65, align: 'right'	, text: Language.get('ostt_qntt'		, '출고수량'		) , xtype : 'numericcolumn', format : '#,##0.###'
					},{	dataIndex: 'upid_baln_qntt'	, width:  65, align: 'right'	, text: Language.get('upid_baln_qntt'	, '미납잔량'		) , xtype : 'numericcolumn', format	: '#,##0.###'
					},{	dataIndex: 'sale_amnt'		, width:  80, align: 'right'	, text: Language.get('ostt_amnt'		, '출고금액'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'dely_cstm_name'	, width: 120, align: 'left'		, text: Language.get(''					, '배송처'			)
					},{	dataIndex: 'dlvy_addr'		, width: 120, align: 'left'		, text: Language.get(''					, '배송지'			)
					},{	dataIndex: 'tele_numb'		, width: 120, align: 'center'	, text: Language.get('tele_numb'		, '전화번호'		)
					},{	dataIndex: 'hdph_numb'		, width: 120, align: 'center'	, text: Language.get('hdph_numb'		, '휴대전화'		)
					},{	dataIndex: 'user_memo'		, width: 150, align: 'left'		, text: Language.get('user_memo'		, '비고'			)
					},{	dataIndex: 'new_line_seqn'	, hidden : true
					}
				]
			},
			item_sjung = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  35, align: 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  55, align: 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'pdod_date'		, width:  80, align: 'center'	, text: Language.get('pdod_date'		, '생산계획'		)
					},{	dataIndex: 'prod_yorn'		, width:  55, align: 'center'	, text: Language.get('prod_yorn'		, '생산여부'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'invc_numb'		, width: 100, align: 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'line_seqn'		, width:  35, align: 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex: 'cstm_code'		, width:  80, align: 'center'	, text: Language.get('cstm_code'		, '거래처코드'		) , hidden:true
					},{	dataIndex: 'cstm_name'		, width: 180, align: 'left'		, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'invc_date'		, width:  75, align: 'center'	, text: Language.get('acpt_date'		, '수주일자'		)
					},{	dataIndex: 'deli_date'		, width:  75, align: 'center'	, text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex: 'expt_dvcd'		, width:  55, align: 'center'	, text: Language.get('expt_dvcd'		, '조달구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('expt_dvcd')		,hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					},{	dataIndex: 'acpt_dvcd'		, width:  60, align: 'center'	, text: Language.get('acpt_dvcd'		, '수주구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_dvcd')		,hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					},{	dataIndex: 'prod_trst_dvcd'	, width:  55, align: 'center'	, text: Language.get('prod_trst_dvcd'	, '생산구분'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('prod_trst_dvcd'),hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					},{	dataIndex: 'drtr_name'		, width:  65, align: 'left'		, text: Language.get('sale_drtr_name'	, '영업담당자'		)
					},{	dataIndex: 'pcod_numb'		, width:  80, align: 'center'	, text: Language.get('pcod_numb'		, '고객주문번호'		)
					},{	dataIndex: 'item_code'		, width: 120, align: 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex: 'item_name'		, width: 220, align: 'left'		, text: Language.get('item'				, '품목명'			)
					},{	dataIndex: 'item_spec'		, width: 150, align: 'left'		, text: Language.get('item_spec'		, '품목규격'		)
					},{	dataIndex: 'invc_qntt'		, width:  80, align: 'right'	, text: Language.get('acpt_qntt'		, '수주수량'		) , xtype : 'numericcolumn', format : '#,##0.###'
					},{	dataIndex: 'invc_pric'		, width:  80, align: 'right'	, text: Language.get('invc_pric'		, '품목단가'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'sply_amnt'		, width:  80, align: 'right'	, text: Language.get('amnt'				, '공급가액'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'vatx_amnt'		, width:  80, align: 'right'	, text: Language.get('amnt'				, '부가세액'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'invc_amnt'		, width:  80, align: 'right'	, text: Language.get('amnt'				, '합계금액'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'ostt_date'		, width:  75, align: 'center'	, text: Language.get('ostt_date'		, '출고일자'		)
					},{	dataIndex: 'ostt_qntt'		, width:  65, align: 'right'	, text: Language.get('ostt_qntt'		, '출고수량'		) , xtype : 'numericcolumn', format : '#,##0.###'
					},{	dataIndex: 'upid_baln_qntt'	, width:  65, align: 'right'	, text: Language.get('upid_baln_qntt'	, '미납잔량'		) , xtype : 'numericcolumn', format	: '#,##0.###'
					},{	dataIndex: 'sale_amnt'		, width:  80, align: 'right'	, text: Language.get('ostt_amnt'		, '출고금액'		) , xtype : 'numericcolumn', format	: '#,##0.##'
					},{	dataIndex: 'dely_cstm_name'	, width: 120, align: 'left'		, text: Language.get(''					, '배송처'			)
					},{	dataIndex: 'dlvy_addr'		, width: 120, align: 'left'		, text: Language.get(''					, '배송지'			)
					},{	dataIndex: 'user_memo'		, width: 150, align: 'left'		, text: Language.get('user_memo'		, '비고'			)
					},{	dataIndex: 'new_line_seqn'	, hidden : true
					}
				]
			}
		return _global.hq_id.toUpperCase()=='N1000SJFLV'? item_sjflv : item_sjung;
	}
});
