Ext.define('module.custom.dehansol.stock.isos.saleostt.view.SaleOsttListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleostt-lister-master',
	store		: 'module.custom.dehansol.stock.isos.saleostt.store.SaleOsttMaster',

	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'},
	],
	plugins		: [	{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },
	],

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
					{	text : '<span class="write-button">출고</span>'		, action : 'ReleaseAction'		, cls: 'button1-style'	,width:  60} , '-',
					{	text : '<span class="write-button">출고취소</span>'		, action : 'ReleaseCancelAction', cls: 'button1-style'	,width:  80} , '-',

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
					{	xtype: 'rownumberer'		, width:  50, text: '순번', align : 'center'
					},{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos'), filter : true/*filter: 'disabled'*/
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '수주상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd'), filter: true
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'		), filter: true
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('acpt_date'		, '수주일자'		), filter: true
					},{	dataIndex: 'crte_dttm'		, width: 130, align : 'center'	, text: Language.get(''					, '업로드시간'		), filter: true
					},{	dataIndex: 'deli_date'		, width:  80, align : 'center'	, text: Language.get('deli_date'		, '납기일자'		), filter: true
					},{	dataIndex: 'cstm_name'		, width: 140, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'		), filter: true
					},{	dataIndex: 'cstm_modl_name'	, width: 160, align : 'left'	, text: Language.get('modl_name'		, '모델명'			), filter: true
					},{	dataIndex: 'dict_yorn'		, width:  65, align : 'left'	, text: Language.get(''					, 'RIRET여부'		), filter: true, xtype : 'lookupcolumn',lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'plmk_size_horz'	, width:  50, align : 'right'	, text: Language.get('plmk_size_horz'	, '가로'			), filter: true
					},{	dataIndex: 'plmk_size_vrtl'	, width:  50, align : 'right'	, text: Language.get('plmk_size_vrtl'	, '세로'			), filter: true
					},{	dataIndex: 'mesh_bacd_name'	, width:  65, align : 'center'	, text: Language.get('mesh'				, 'MESH'		), filter: true
					},{	dataIndex: 'plmk_kind_name2', width:  80, align : 'center'	, text: Language.get('plmk_kind_name'	, '제판종류명'		), filter: true
					},{	dataIndex: 'invc_qntt'		, width:  45, align : 'right'	, text: Language.get('invc_qntt'		, '발주수량'		), xtype: 'numericcolumn', summaryType: 'sum', filter: true
					},{	dataIndex: 'invc_pric'		, width:  70, align : 'right'	, text: Language.get('invc_pric'		, '단가'			), xtype: 'numericcolumn', filter: true
					},{	dataIndex: 'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'		, '금액'			), xtype: 'numericcolumn', summaryType: 'sum', filter: true
					},{	dataIndex: 'rpst_item_idcd'	, width:  80, align : 'center'	, text: Language.get('rpst_item_idcd'	, '표준품목코드'		), filter: true
					},{	dataIndex: 'mesh_type_dvcd'	, width:  80, align : 'center'	, text: Language.get('mesh_type_dvcd'	, '망사타입'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('mesh_type_dvcd'), filter: true,hidden:true
					},{	dataIndex: 'tool_numb'		, width: 110, align : 'center'	, text: Language.get('tool_numb'		, 'TOOL번호'		), filter: true
					},{	dataIndex: 'cstm_prod_numb'	, width: 140, align : 'left'	, text: Language.get('cstm_prod_numb'	, '제품번호'		), filter: true
					},{	dataIndex: 'cstm_code'		, width:  70, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'		), filter: true
					},{	dataIndex: 'tool_revs'		, width: 110, align : 'center'	, text: Language.get('tool_revs'		, 'TOOL_REV번호'	), filter: true
					},{	dataIndex: 'sufc_dvcd'		, width:  60, align : 'center'	, text: Language.get('sufc_dvcd'		, '면종류'			), xtype : 'lookupcolumn' , lookupValue : resource.lookup('sufc_dvcd'), filter: true
					},{	dataIndex: 'cstm_modl_name'	, width: 100, align : 'center'	, text: Language.get('cstm_modl_name'	, '의뢰자'			), filter: true, hidden:true
					},{	dataIndex: 'trst_name'		, width: 100, align : 'center'	, text: Language.get('trst_name'		, '의뢰자'			), filter: true
					},{	dataIndex: 'item_name'		, width: 100, align : 'center'	, text: Language.get('item_name'		, '품명'			), filter: true, hidden:true
					},{	dataIndex: 'puch_reqt_numb'	, width:  90, align : 'center'	, text: Language.get('puch_reqt_numb'	, '구매요청번호'		), filter: true, hidden:true
					},{	dataIndex: 'pdgr'			, width:  60, align : 'center'	, text: Language.get('pdgr'				, '제품군'			), filter: true, hidden:true
					},{	dataIndex: 'fixt_code'		, width:  80, align : 'center'	, text: Language.get('fixt_code'		, '치공구코드'		), filter: true, hidden:true
					},{	dataIndex: 'prcs_type'		, width:  60, align : 'center'	, text: Language.get('prcs_type'		, '주문유형'		), filter: true, hidden:true
					},{	dataIndex: 'cstm_name2'		, width: 140, align : 'left'	, text: Language.get('cstm_name2'		, '고객명'			), filter: true, hidden:true
					},{	dataIndex: 'fixt_type_dvcd'	, width:  65, align : 'center'	, text: Language.get('fixt_type_dvcd'	, '치공구유형구분코드'	), filter: true, hidden:true
					},{	dataIndex: 'film_numb'		, width: 100, align : 'center'	, text: Language.get('film_numb'		, '필름번호'		), filter: true, hidden:true
					},{	dataIndex: 'film_kind_dvcd'	, width: 100, align : 'center'	, text: Language.get('film_kind_dvcd'	, '필름종류'		), filter: true, hidden:true
					},{	dataIndex: 'film_name'		, width: 100, align : 'center'	, text: Language.get('film_name'		, '필름명'			), filter: true, hidden:true
					},{	dataIndex: 'film_acpt_offe'	, width: 100, align : 'center'	, text: Language.get('film_acpt_offe'	, '필름수령처'		), filter: true, hidden:true
					},{	dataIndex: 'film_acpt_yorn'	, width:  65, align : 'center'	, text: Language.get('film_acpt_yorn'	, '필름수령여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), filter: true, hidden:true
					},{	dataIndex: 'film_acpt_dttm'	, width: 130, align : 'center'	, text: Language.get('film_acpt_dttm'	, '필름수령일자'		), filter: true, hidden:true
					},{	dataIndex: 'plmk_numb'		, width: 150, align : 'left'	, text: Language.get('plmk_numb'		, '제판번호'		), filter: true, hidden:true
					},{	dataIndex: 'plmk_kind_code'	, width: 150, align : 'left'	, text: Language.get('plmk_kind_code'	, '제판종류코드'		), filter: true, hidden:true
					},{	dataIndex: 'dict_dvsn_name'	, width:  90, align : 'center'	, text: Language.get('dict_dvsn_name'	, '다이렉트구분명'	), filter: true, hidden:true
					},{	dataIndex: 'xscl'			, width:  70, align : 'right'	, text: Language.get('xscl'				, 'x스케일'		), filter: true, hidden:true
					},{	dataIndex: 'yscl'			, width:  70, align : 'right'	, text: Language.get('yscl'				, 'y스케일'		), filter: true, hidden:true
					},{	dataIndex: 'plmk_size'		, width:  60, align : 'center'	, text: Language.get('plmk_size'		, '제판사이즈'			), filter: true, hidden:true
					},{	dataIndex: 'nwol_dvsn_name'	, width:  80, align : 'center'	, text: Language.get('nwol_dvsn_name'	, '신구구분명'		), filter: true, hidden:true
					},{	dataIndex: 'wkct_ordr'		, width:  65, align : 'right'	, text: Language.get('wkct_ordr'		, '공정순서'		), filter: true, hidden:true
					},{	dataIndex: 'strt_flor'		, width:  55, align : 'right'	, text: Language.get('strt_flor'		, '시작층'			), filter: true, hidden:true
					},{	dataIndex: 'endd_flor'		, width:  55, align : 'right'	, text: Language.get('endd_flor'		, '종료층'			), filter: true, hidden:true
					},{	dataIndex: 'otod_istt_cstm'	, width: 120, align : 'left'	, text: Language.get('otod_istt_cstm'	, '외주입고거래처'	), filter: true, hidden:true
					},{	dataIndex: 'mcmp_istt_cstm'	, width: 120, align : 'left'	, text: Language.get('mcmp_istt_cstm'	, '자사입고거래처'	), filter: true, hidden:true
					},{	dataIndex: 'make_entr_name'	, width: 120, align : 'left'	, text: Language.get('make_entr_name'	, '제작업체명'		), filter: true, hidden:true
					},{	dataIndex: 'puch_reqt_date'	, width:  80, align : 'center'	, text: Language.get('puch_reqt_date'	, '구매요청일자'		), filter: true, hidden:true
					},{	dataIndex: 'chit_elec_date'	, width:  80, align : 'center'	, text: Language.get('chit_elec_date'	, '전표전기일자'		), filter: true, hidden:true
					},{	dataIndex: 'istt_qntt'		, width:  65, align : 'right'	, text: Language.get('istt_qntt'		, '입고수량'		), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'base_unit'		, width:  70, align : 'center'	, text: Language.get('base_unit'		, '기본단위'		), filter: true, hidden:true
					},{	dataIndex: 'wkct_code'		, width:  70, align : 'left'	, text: Language.get('wkct_code'		, '공정코드'		), filter: true, hidden:true
					},{	dataIndex: 'wkct_name'		, width: 110, align : 'left'	, text: Language.get('wkct_name'		, '공정명'			), filter: true, hidden:true
					},{	dataIndex: 'cavity'			, width:  90, align : 'left'	, text: Language.get('cavity'			, 'CAVITY'		), filter: true, hidden:true
					},{	dataIndex: 'stnd_sufc'		, width:  80, align : 'center'	, text: Language.get('stnd_sufc'		, '기준면'			), filter: true, hidden:true
					},{	dataIndex: 'jigg_code'		, width:  80, align : 'center'	, text: Language.get('jigg_code'		, '지그코드'		), filter: true, hidden:true
					},{	dataIndex: 'jigg_grup_code'	, width:  80, align : 'center'	, text: Language.get('jigg_grup_code'	, '지그그룹코드'		), filter: true, hidden:true
					},{	dataIndex: 'bbtt_jigg_type'	, width:  80, align : 'center'	, text: Language.get('bbtt_jigg_type'	, 'BBT지그타입'		), filter: true, hidden:true
					},{	dataIndex: 'revs_numb'		, width: 140, align : 'left'	, text: Language.get('revs_numb'		, '리비전번호'		), filter: true, hidden:true
					},{	dataIndex: 'mtrl_name'		, width: 140, align : 'left'	, text: Language.get('mtrl_name'		, '자재명'			), filter: true, hidden:true
					},{	dataIndex: 'indv_qntt'		, width:  60, align : 'right'	, text: Language.get('indv_qntt'		, '개체수'			), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'hole_diam'		, width:  60, align : 'right'	, text: Language.get('hole_diam'		, '홈파이'			), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'hpjg_proc_mthd'	, width:  90, align : 'left'	, text: Language.get('hpjg_proc_mthd'	, 'HP지그가공방법'	), filter: true, hidden:true
					},{	dataIndex: 'prjg_proc_mthd'	, width: 100, align : 'left'	, text: Language.get('prjg_proc_mthd'	, '인쇄지그가공방법'	), filter: true, hidden:true
					},{	dataIndex: 'yval_cetr'		, width: 100, align : 'right'	, text: Language.get('yval_cetr'		, 'Y값중심'		), filter: true, hidden:true
					},{	dataIndex: 'bbtt_pont'		, width: 100, align : 'right'	, text: Language.get('bbtt_pont'		, 'BBT포인트'		), filter: true, hidden:true
					},{	dataIndex: 'jgup_qntt'		, width: 100, align : 'right'	, text: Language.get('jgup_qntt'		, '지그업수'		), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'hole_qntt'		, width: 100, align : 'right'	, text: Language.get('hole_qntt'		, '홀수'			), xtype: 'numericcolumn', summaryType: 'sum', filter: true, hidden:true
					},{	dataIndex: 'brcd'			, width: 100, align : 'left'	, text: Language.get('brcd'				, '바코드'			), filter: true, hidden:true
					},{	dataIndex: 'full_angl'		, width: 100, align : 'left'	, text: Language.get('full_angl'		, '견장각도'		), filter: true, hidden:true
					},{	dataIndex: 'tens_from'		, width: 100, align : 'left'	, text: Language.get('tens_from'		, '텐션부터'		), filter: true, hidden:true
					},{	dataIndex: 'tens_util'		, width: 100, align : 'left'	, text: Language.get('tens_util'		, '텐션까지'		), filter: true, hidden:true
					},{	dataIndex: 'wkly_1fst'		, width: 100, align : 'right'	, text: Language.get('wkly_1fst'		, '주간1'			), filter: true, hidden:true
					},{	dataIndex: 'wkly_2snd'		, width: 100, align : 'right'	, text: Language.get('wkly_2snd'		, '주간2'			), filter: true, hidden:true
					},{	dataIndex: 'spmr_hold_yorn'	, width: 100, align : 'left'	, text: Language.get('spmr_hold_yorn'	, '사급자재보유여부'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), filter: true, hidden:true
					},{	dataIndex: 'spmr_acpt_dttm'	, width: 100, align : 'left'	, text: Language.get('spmr_acpt_dttm'	, '사급자재수령일시'	), filter: true, hidden:true
					},{	dataIndex: 'scrp_publ_yorn'	, width: 100, align : 'left'	, text: Language.get('scrp_publ_yorn'	, '사급자재수령처'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), filter: true, hidden:true
					},{	dataIndex: 'olmt_tick'		, width: 100, align : 'left'	, text: Language.get('olmt_tick'		, '유제두께'		), filter: true, hidden:true
					},{	dataIndex: 'norm_yorn'		, width: 100, align : 'left'	, text: Language.get('norm_yorn'		, '양산여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), filter: true, hidden:true
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
