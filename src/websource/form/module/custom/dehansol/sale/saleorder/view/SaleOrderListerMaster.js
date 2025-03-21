Ext.define('module.custom.dehansol.sale.saleorder.view.SaleOrderListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleorder-lister-master',
	store		: 'module.custom.dehansol.sale.saleorder.store.SaleOrderMaster',

	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'},
//		{ ftype: 'filters',
//		  autoReload: false,
//		  local: true ,
//		  filters: [
//		    {   type: 'string',
//	            dataIndex: 'invc_numb'
//	        },{   type: 'string',
//	            dataIndex: 'puch_reqt_numb'
//	        }
//		  ]
//		}
	],
	plugins		: [{ ptype:'filterbar'},{ptype  :'cellediting-directinput', clicksToEdit: 1 },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
}],

//	viewConfig: {
//		markDirty: false,
//		loadMask : false,
//		enableTextSelection: true
//	},
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
					{	xtype	: 'button',
						iconCls	: 'filterIcon',
						toggleGroup:'master',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'			},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',
					{	text	: '엑셀업로드',
						menu	: [
							{	text : '대덕전자 ', action : 'uploadAction'
							},{	text : 'TLB', action : 'uploadAction2'
							},{	text : '코리아써키트2공장', action : 'uploadAction4'
							},{	text : '코리아써키트3공장', action : 'uploadAction5'
							},{	text : '기타업체', action : 'uploadAction3'
							}
						]
					},{	text : '<span class="write-button">데이터복원</span>'	, action : 'RestoreAction'		, cls: 'button1-style'	,width:  75} , '-',
					'-', '->', '-',
					{	text : '<span class="write-button">주문복사</span>'		, action : 'copyAction'			, cls: 'button1-style'	,width:  70 } , '-',
					{	text : '<span class="write-button">필름수령</span>'		, action : 'FilmAction'			, cls: 'button1-style'	,width:  70} , '-',
					{	text : '<span class="write-button">라벨발행</span>'		, action : 'LabelAction'		, cls: 'button1-style'	,width:  70} , '-',
					{	text : '<span class="write-button">검사성적서발행</span>'	, action : 'InspReportAction'	, cls: 'button1-style'	,width:  90} , '-',
					{	text : '<span class="write-button">거래명세서발행</span>'	, action : 'InvoiceAction'		, cls: 'button1-style'	,width:  90} , '-',
					{	text : '<span class="write-button">출고</span>'			, action : 'ReleaseAction'		, cls: 'button1-style'	,width:  60} , '-',
					{	text : '<span class="write-button">출고취소</span>'		, action : 'ReleaseCancelAction', cls: 'button1-style'	,width:  80} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action	,cls: 'button-style',
					},{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action	,cls: 'button-style',
					},{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action	,cls: 'button-style' ,
					},{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action	,cls: 'button-style' ,
					} , '-' ,
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')/*filter: 'disabled'*/
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '수주상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('acpt_date'		, '수주일자'		)
					},{	dataIndex: 'crte_dttm'		, width: 130, align : 'center'	, text: Language.get(''					, '업로드시간'	)
					},{	dataIndex: 'deli_date'		, width:  80, align : 'center'	, text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex: 'cstm_name'		, width: 140, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'cstm_modl_name'	, width: 160, align : 'left'	, text: Language.get(''					, '모델명'		)
					},{	dataIndex: 'dict_yorn'		, width:  65, align : 'left'	, text: Language.get(''					, 'RIRET여부'	), xtype : 'lookupcolumn',lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'plmk_size_horz'	, width:  50, align : 'right'	, text: Language.get('plmk_size_horz'	, '가로'			)
					},{	dataIndex: 'plmk_size_vrtl'	, width:  50, align : 'right'	, text: Language.get('plmk_size_vrtl'	, '세로'			)
					},{	dataIndex: 'mesh_bacd_name'	, width:  65, align : 'center'	, text: Language.get('mesh'				, 'MESH'		)
					},{	dataIndex: 'invc_qntt'		, width:  45, align : 'right'	, text: Language.get('invc_qntt'		, '발주수량'		), xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'plmk_kind_name2', width:  80, align : 'center'	, text: Language.get('plmk_kind_name'	, '제판종류명'	)
					},{	dataIndex: 'invc_pric'		, width:  70, align : 'right'	, text: Language.get('invc_pric'		, '단가'			), xtype: 'numericcolumn',
					},{	dataIndex: 'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'		, '금액'			), xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'rpst_item_idcd'	, width:  80, align : 'center'	, text: Language.get('rpst_item_idcd'	, '표준품목코드'	)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
								{	iconCls	: Const.SELECT.icon,
									tooltip	: '표준품목코드',
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										me.loadpopup(record);
									},
									scope : me
								}
							], filter: 'disabled'
					},{	dataIndex: 'mesh_type_dvcd'	, width:  80, align : 'center'	, text: Language.get('mesh_type_dvcd'	, '망사타입'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('mesh_type_dvcd'), hidden:true
					},{	dataIndex: 'tool_numb'		, width: 110, align : 'center'	, text: Language.get('tool_numb'		, 'TOOL번호'			)
					},{	dataIndex: 'cstm_prod_numb'	, width: 140, align : 'left'	, text: Language.get('cstm_prod_numb'	, '제품번호'			)
					},{	dataIndex: 'cstm_code'		, width:  70, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'		)
					},{	dataIndex: 'tool_revs'		, width: 110, align : 'center'	, text: Language.get('tool_revs'		, 'TOOL_REV번호'		)
					},{	dataIndex: 'sufc_dvcd'		, width:  60, align : 'center'	, text: Language.get('sufc_dvcd'		, '면종류'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('sufc_dvcd')
					},{	dataIndex: 'trst_name'		, width: 100, align : 'center'	, text: Language.get('trst_name'		, '의뢰자'			), filter: true
					},{	dataIndex: 'item_name'		, width: 100, align : 'center'	, text: Language.get('item_name'		, '품명'				), filter: true, hidden:true
					},{	dataIndex: 'puch_reqt_numb'	, width:  90, align : 'center'	, text: Language.get('puch_reqt_numb'	, '구매요청번호'		), filter: true, hidden:true
					},{	dataIndex: 'pdgr'			, width:  60, align : 'center'	, text: Language.get('pdgr'				, '제품군'			), filter: true, hidden:true
					},{	dataIndex: 'fixt_code'		, width:  80, align : 'center'	, text: Language.get('fixt_code'		, '치공구코드'		), filter: true, hidden:true
					},{	dataIndex: 'prcs_type'		, width:  60, align : 'center'	, text: Language.get('prcs_type'		, '주문유형'			), filter: true, hidden:true
					},{	dataIndex: 'cstm_name2'		, width: 140, align : 'left'	, text: Language.get('cstm_name2'		, '고객명'			), filter: true, hidden:true
					},{	dataIndex: 'fixt_type_dvcd'	, width:  65, align : 'center'	, text: Language.get('fixt_type_dvcd'	, '치공구유형구분코드'	), filter: true, hidden:true
					},{	dataIndex: 'film_numb'		, width: 100, align : 'center'	, text: Language.get('film_numb'		, '필름번호'			), filter: true, hidden:true
					},{	dataIndex: 'film_kind_dvcd'	, width: 100, align : 'center'	, text: Language.get('film_kind_dvcd'	, '필름종류'			), filter: true, hidden:true
					},{	dataIndex: 'film_name'		, width: 100, align : 'center'	, text: Language.get('film_name'		, '필름명'			), filter: true, hidden:true
					},{	dataIndex: 'film_acpt_offe'	, width: 100, align : 'center'	, text: Language.get('film_acpt_offe'	, '필름수령처'		), filter: true, hidden:true
					},{	dataIndex: 'film_acpt_yorn'	, width:  65, align : 'center'	, text: Language.get('film_acpt_yorn'	, '필름수령여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), filter: true, hidden:true
					},{	dataIndex: 'film_acpt_dttm'	, width: 130, align : 'center'	, text: Language.get('film_acpt_dttm'	, '필름수령일자'		), filter: true, hidden:true
					},{	dataIndex: 'plmk_numb'		, width: 150, align : 'left'	, text: Language.get('plmk_numb'		, '제판번호'			), filter: true, hidden:true
					},{	dataIndex: 'plmk_kind_code'	, width: 150, align : 'left'	, text: Language.get('plmk_kind_code'	, '제판종류코드'		), filter: true, hidden:true
					},{	dataIndex: 'dict_dvsn_name'	, width:  90, align : 'center'	, text: Language.get('dict_dvsn_name'	, '다이렉트구분명'		), filter: true, hidden:true
					},{	dataIndex: 'xscl'			, width:  70, align : 'right'	, text: Language.get('xscl'				, 'x스케일'			), filter: true, hidden:true
					},{	dataIndex: 'yscl'			, width:  70, align : 'right'	, text: Language.get('yscl'				, 'y스케일'			), filter: true, hidden:true
					},{	dataIndex: 'plmk_size'		, width:  60, align : 'center'	, text: Language.get('plmk_size'		, '제판사이즈'		), filter: true, hidden:true
					},{	dataIndex: 'nwol_dvsn_name'	, width:  80, align : 'center'	, text: Language.get('nwol_dvsn_name'	, '신구구분명'		), filter: true, hidden:true
					},{	dataIndex: 'wkct_ordr'		, width:  65, align : 'right'	, text: Language.get('wkct_ordr'		, '공정순서'			), filter: true, hidden:true
					},{	dataIndex: 'strt_flor'		, width:  55, align : 'right'	, text: Language.get('strt_flor'		, '시작층'			), filter: true, hidden:true
					},{	dataIndex: 'endd_flor'		, width:  55, align : 'right'	, text: Language.get('endd_flor'		, '종료층'			), filter: true, hidden:true
					},{	dataIndex: 'otod_istt_cstm'	, width: 120, align : 'left'	, text: Language.get('otod_istt_cstm'	, '외주입고거래처'		), filter: true, hidden:false
					},{	dataIndex: 'mcmp_istt_cstm'	, width: 120, align : 'left'	, text: Language.get('mcmp_istt_cstm'	, '자사입고거래처'		), filter: true, hidden:true
					},{	dataIndex: 'make_entr_name'	, width: 120, align : 'left'	, text: Language.get('make_entr_name'	, '제작업체명'		), filter: true, hidden:true
					},{	dataIndex: 'puch_reqt_date'	, width:  80, align : 'center'	, text: Language.get('puch_reqt_date'	, '구매요청일자'		), filter: true, hidden:true
					},{	dataIndex: 'chit_elec_date'	, width:  80, align : 'center'	, text: Language.get('chit_elec_date'	, '전표전기일자'		), filter: true, hidden:true
					},{	dataIndex: 'istt_qntt'		, width:  65, align : 'right'	, text: Language.get('istt_qntt'		, '입고수량'			), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'base_unit'		, width:  70, align : 'center'	, text: Language.get('base_unit'		, '기본단위'			), filter: true, hidden:true
					},{	dataIndex: 'wkct_code'		, width:  70, align : 'left'	, text: Language.get('wkct_code'		, '공정코드'			), filter: true, hidden:true
					},{	dataIndex: 'wkct_name'		, width: 110, align : 'left'	, text: Language.get('wkct_name'		, '공정명'			), filter: true, hidden:true
					},{	dataIndex: 'cavity'			, width:  90, align : 'left'	, text: Language.get('cavity'			, 'CAVITY'			), filter: true, hidden:true
					},{	dataIndex: 'stnd_sufc'		, width:  80, align : 'center'	, text: Language.get('stnd_sufc'		, '기준면'			), filter: true, hidden:true
					},{	dataIndex: 'jigg_code'		, width:  80, align : 'center'	, text: Language.get('jigg_code'		, '지그코드'			), filter: true, hidden:true
					},{	dataIndex: 'jigg_grup_code'	, width:  80, align : 'center'	, text: Language.get('jigg_grup_code'	, '지그그룹코드'		), filter: true, hidden:true
					},{	dataIndex: 'bbtt_jigg_type'	, width:  80, align : 'center'	, text: Language.get('bbtt_jigg_type'	, 'BBT지그타입'		), filter: true, hidden:true
					},{	dataIndex: 'revs_numb'		, width: 140, align : 'left'	, text: Language.get('revs_numb'		, '리비전번호'		), filter: true, hidden:true
					},{	dataIndex: 'mtrl_name'		, width: 140, align : 'left'	, text: Language.get('mtrl_name'		, '자재명'			), filter: true, hidden:true
					},{	dataIndex: 'indv_qntt'		, width:  60, align : 'right'	, text: Language.get('indv_qntt'		, '개체수'			), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'hole_diam'		, width:  60, align : 'right'	, text: Language.get('hole_diam'		, '홈파이'			), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'hpjg_proc_mthd'	, width:  90, align : 'left'	, text: Language.get('hpjg_proc_mthd'	, 'HP지그가공방법'		), filter: true, hidden:true
					},{	dataIndex: 'prjg_proc_mthd'	, width: 100, align : 'left'	, text: Language.get('prjg_proc_mthd'	, '인쇄지그가공방법'	), filter: true, hidden:true
					},{	dataIndex: 'yval_cetr'		, width: 100, align : 'right'	, text: Language.get('yval_cetr'		, 'Y값중심'			), filter: true, hidden:true
					},{	dataIndex: 'bbtt_pont'		, width: 100, align : 'right'	, text: Language.get('bbtt_pont'		, 'BBT포인트'			), filter: true, hidden:true
					},{	dataIndex: 'jgup_qntt'		, width: 100, align : 'right'	, text: Language.get('jgup_qntt'		, '지그업수'			), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'hole_qntt'		, width: 100, align : 'right'	, text: Language.get('hole_qntt'		, '홀수'				), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'brcd'			, width: 100, align : 'left'	, text: Language.get('brcd'				, '바코드'			), filter: true, hidden:true
					},{	dataIndex: 'full_angl'		, width: 100, align : 'left'	, text: Language.get('full_angl'		, '견장각도'			), filter: true, hidden:true
					},{	dataIndex: 'tens_from'		, width: 100, align : 'left'	, text: Language.get('tens_from'		, '텐션부터'			), filter: true, hidden:true
					},{	dataIndex: 'tens_util'		, width: 100, align : 'left'	, text: Language.get('tens_util'		, '텐션까지'			), filter: true, hidden:true
					},{	dataIndex: 'wkly_1fst'		, width: 100, align : 'right'	, text: Language.get('wkly_1fst'		, '주간1'			), filter: true, hidden:true
					},{	dataIndex: 'wkly_2snd'		, width: 100, align : 'right'	, text: Language.get('wkly_2snd'		, '주간2'			), filter: true, hidden:true
					},{	dataIndex: 'spmr_hold_yorn'	, width: 100, align : 'left'	, text: Language.get('spmr_hold_yorn'	, '사급자재보유여부'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), filter: true, hidden:true
					},{	dataIndex: 'spmr_acpt_dttm'	, width: 100, align : 'left'	, text: Language.get('spmr_acpt_dttm'	, '사급자재수령일시'	), filter: true, hidden:true
					},{	dataIndex: 'scrp_publ_yorn'	, width: 100, align : 'left'	, text: Language.get('scrp_publ_yorn'	, '사급자재수령처'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), filter: true, hidden:true
					},{	dataIndex: 'olmt_tick'		, width: 100, align : 'left'	, text: Language.get('olmt_tick'		, '유제두께'			), filter: true, hidden:true
					},{	dataIndex: 'norm_yorn'		, width: 100, align : 'left'	, text: Language.get('norm_yorn'		, '양산여부'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), filter: true, hidden:true
					}
				]
			};
		return item;
	},
	loadpopup:function(record){
		resource.loadPopup({
			select	: 'SINGLE',
			widget	: 'lookup-item-popup-dehansol',
			params:{
				cstm_idcd : record.get('cstm_idcd')
			},
			result	: function(records) {
				var	parent = records[0];
				var qntt = record.get('invc_qntt');
				record.set('rpst_item_idcd',parent.data.item_code);
				record.set('invc_pric',parent.data.shpm_pric_1fst);
				record.set('sply_amnt',qntt * parent.data.shpm_pric_1fst);
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/rpst_item.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify(record.data)
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});

			}
		})
	}
});
