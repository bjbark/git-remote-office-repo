var	_global;
(function() {
	_global = {
		language : undefined,
		solution : '14821',
		lang_gbcd: 'kor',
		contract : {
			isowner : function () {
				return (((_global.hq_gb == '1' || _global.hq_gb == '2') && _global.hq_gb == '1') || (_global.hq_gb == '3' || _global.hq_gb == '4'));
			},
		},
		location : {
			href : window.location.origin,
			host : '', // staging서버 도메인
			http : function( patten ){ return (patten == 'file') ? _global.location.href + '/system' : _global.location.host + '/system'; } // if (patten == 'file'){	return _global.location.host + '/module'} else {	return _global.location.href + '/module'		}
		},
		api_path		: 'system',
		api_host_info	: '', // staging서버 도메인
		app_site		: 'system',
		sdk_host		: 'resource/sdk',
		admin_yn		: '',
		provider		: '',
		item_class		: 3 ,
		token_id		: '' ,
		corp_id			: '' ,
		corp_nm			: '' ,
		hq_grp			: '' ,
		hq_id			: 'N1000WINFO' ,
		hqof_idcd		: 'N1000WINFO' ,
		hq_gb			: '1' ,			/* 본사 구분 			*/
		epodb_id		: '' ,			/* 매장 수발주 DB 정보	*/
		stor_bs			: '' ,
		stor_grp		: '1' ,
		stor_id			: 'N1000WINFO1000' ,
		stor_grp		: '' ,			/* 매장 구분			*/
		stor_cd			: '' ,
		sales_gb		: '' ,			/* 매출계정구분		*/
		stor_nm			: '' ,
		emp_id			: '' ,			/* login_id			*/
		login_id		: '' ,			/* login_id			*/
		login_nm		: '' ,
		login_pk		: '' ,			/* emp_id			*/
		work_pos		: '00',			/* 포스번호 			*/
		cost_drtr_yorn	: false, 		/* 원가계산 담당자 여부	*/
		tax_rt			:  10 ,
		tax_type		: '0' ,			/* 부가세 타입  0=부가세 포함/1:부가세 별도 */
		sale_tax_type	: '0' ,			/* 임시 : 매출 부가세 타입  0=부가세 포함/1:부가세 별도 */
		recv_tax_type	: '0' ,			/* 임시 : 매출 부가세 타입  0=부가세 포함/1:부가세 별도 */
		point_type		: '0' ,			/*					*/
		point_rate		:  0 ,			/* 일반 적립율			*/
		cash_point_rate :  0 ,			/* 현금 적립율			*/
		card_point_rate :  0 ,			/* 카드 적립율			*/
		dept_id			: '' ,
		dept_nm			: '' ,
		jobcl_id		: '' ,
		manager_gb		: '' ,
		jobcl_nm		: '' ,
		auth_gb			: '' ,
		taxdb_id		: '' ,
		smsdb_id		: '' ,
		hq_pos_id		: '' ,
		logo_url		: '',
		pos_ddns		: '',
		img_ddns		: '',
		img_http		: '',
		epo_ddns		: '',
		regex_itm_ds	: '',
		regex_itm_sn	: '',
		regex_cust_sn	: '',
		regex_vend_sn	: '',
		debugged		: false ,		/* false 이면 실제품 true 이면 개발자 */
		etax_id			: '' ,			/* 전자세금계산서 업체	*/
		etax_cd			: '' ,			/* 전자세금계산서 계정	*/
		etax_pw			: '' ,			/* 전자세금계산서 PW	*/
		hq_sms_id		: '' ,			/* bonsa sms 업체 id	*/
		hq_sms_cd		: '' ,			/* bonsa sms 코드	*/
		stor_sms_id		: '' ,			/* store sms 업체 id	*/
		stor_sms_cd		: '' ,			/* store sms 코드	*/
		stor_tax_id		: '' ,			/* store fax 업체 id	*/
		stor_tax_cd		: '' ,			/* store fax 코드	*/
		stor_fax_id		: '' ,			/* store fax 업체 id	*/
		stor_fax_cd		: '' ,			/* store fax 코드	*/
		biz_hp_no		: '' ,			/* 사업장 Mobile No	*/
		ftp_url			: '',
		theme			: '',
		frc_cd			: '',
		frc_nm			: '',
		brd_cd			: '',
		brd_nm			: '',
		brd_nm			: '',
		frc_chg			: false,
		brd_chg			: false,
		stre_chg		: true,
		objects			: {
			synchro		: [],
			markets		: [],
			service		: {},
			app_site	: 'system'
		},
		auth : {
			auth_admn_1001	: false,
			auth_admn_1002	: false,
			auth_admn_1003	: false,
			auth_admn_1004	: false,
			auth_admn_1005	: false,
			auth_admn_1006	: false,
			auth_admn_1007	: false,
			auth_admn_1008	: false,
			auth_admn_1009	: false,
			auth_admn_1010	: false,
			auth_admn_1001	: false, /* 도원금형 : 수주상담관리 승인 및 마감 버튼 */
			auth_sale_1002	: false,
			auth_sale_1003	: false,
			auth_sale_1004	: false,
			auth_sale_1005	: false,
			auth_sale_1006	: false,
			auth_sale_1007	: false,
			auth_sale_1008	: false,
			auth_sale_1009	: false,
			auth_sale_1010	: false,
			auth_mtrl_1001	: false,
			auth_mtrl_1002	: false,
			auth_mtrl_1003	: false,
			auth_mtrl_1004	: false,
			auth_mtrl_1005	: false,
			auth_mtrl_1006	: false,
			auth_mtrl_1007	: false,
			auth_mtrl_1008	: false,
			auth_mtrl_1009	: false,
			auth_mtrl_1010	: false,
			auth_stok_1001	: false,
			auth_stok_1002	: false,
			auth_stok_1003	: false,
			auth_stok_1004	: false,
			auth_stok_1005	: false,
			auth_stok_1006	: false,
			auth_stok_1007	: false,
			auth_stok_1008	: false,
			auth_stok_1009	: false,
			auth_stok_1010	: false,
			auth_prod_1001	: false,
			auth_prod_1002	: false,
			auth_prod_1003	: false,
			auth_prod_1004	: false,
			auth_prod_1005	: false,
			auth_prod_1006	: false,
			auth_prod_1007	: false,
			auth_prod_1008	: false,
			auth_prod_1009	: false,
			auth_prod_1010	: false,
			auth_qc_1001	: false,
			auth_qc_1002	: false,
			auth_qc_1003	: false,
			auth_qc_1004	: false,
			auth_qc_1005	: false,
			auth_qc_1006	: false,
			auth_qc_1007	: false,
			auth_qc_1008	: false,
			auth_qc_1009	: false,
			auth_qc_1010	: false,
			auth_cost_1001	: false,
			auth_cost_1002	: false,
			auth_cost_1003	: false,
			auth_cost_1004	: false,
			auth_cost_1005	: false,
			auth_eis_1001	: false,
			auth_eis_1002	: false,
			auth_eis_1003	: false,
			auth_eis_1004	: false,
			auth_eis_1005	: false,
			auth_eis_1006	: false,
			auth_eis_1007	: false,
			auth_eis_1008	: false,
			auth_eis_1009	: false,
			auth_eis_1010	: false,
			auth_mobl_1001	: false,
			auth_mobl_1002	: false,
			auth_mobl_1003	: false,
			auth_mobl_1004	: false,
			auth_mobl_1005	: false,
			auth_mobl_1006	: false,
			auth_mobl_1007	: false,
			auth_mobl_1008	: false,
			auth_mobl_1009	: false,
			auth_mobl_1010	: false,
			auth_down_file_1001	 : false,
			auth_down_excel_1001 : false
		},
		options : {
			acpt_fix_yorn		: true		/* 수주확정							*/
			,init_pswd			: ''		/* 초기비밀번호						*/
			,auto_spts_yorn		: false		/* 자동출하지시						*/
			,istt_lott_yorn		: true		/* 출고LOT대장작성						*/
			,mins_stok_yorn		: true		/* 마이너스재고허용						*/
			,sale_item_yorn		: true		/* 건별매출처리						*/
			,purc_insp_yorn		: true		/* 수입검사여부						*/
			,mtrl_lott_yorn		: true		/* 자재LOT관리						*/
			,purc_ordr_fix_yorn	: true		/* 발주확정							*/
			,item_adon_disp_yorn: false		/* 품목추가정보표시						*/
			,item_spec_disp_yorn: true		/* 품목속성정보표시						*/
			,insp_drtr_idcd		: ''		/* 무검사입고담당						*/
			,dflt_hqof_idcd		: ''		/* 본사ID							*/
			,vatx_incl_yorn		: true		/* 부가세포함							*/
			,theme				: 'ext-all'	/* theme							*/
			,item_popp_auto		: false
			,cstm_popp_auto		: false
			,item_insp_type_yorn: true		/* 품목에 검사유형을 연결할 것인지 여부		*/
			,insp_type_wkct_incl: false		/* 검사유형에 공정지정					*/
			,insp_item_ctq		: false		/* 검사항목_CTQ포함					*/
			,insp_item_mthd		: false		/* 검사항목_검사항목포함					*/
			,insp_item_levl		: false		/* 검사항목_검사수준포함					*/
			,insp_item_lot		: false		/* 검사항목_lot판정기준사용				*/
			,insp_item_goal		: false		/* 검사항목_목표수준사용					*/
			,insp_item_uppr		: false		/* 검사항목_상한값사용					*/
			,insp_item_lwlt		: false		/* 검사항목_하한값사용					*/
			,haccp_item_yorn	: false		/* HACCP 항목 표시여부					*/
			,maker_need_yorn	: false		/* 입고시 제조사 및 제조일자 필수 여부		*/
			,cert_chck_yorn		: ''		/* 설치코드 Check 여부					*/
			,logo_name			: 'WOOSHIN.png'	/* 회사 로고 파일명					*/
			,acpt_direct_order	: false		/* 수주관리 화면에서 생산지시 버튼 노출여부	*/
			,prod_order_type	: '' 		/* 생산지시 타입						*/
			,stnd_lead_days		: 0			/* 표준 리드타임						*/
			,mtrl_sale_yorn		: false		/* 원자재수주여부						*/
			,esti_mrgn_rate		: 25		/* 견적마진율							*/
			,work_book_tema		: 'Middle'	/* 견적마진율							*/
			,work_order_sheet	: 'ProdOrderV2.jrf'/* 작업지시서 양식명				*/
			,ejac_item_yorn		: false		/* 사출업체용 항목 표시여부				*/
			,rsvd_ordr_spts		: false		/* 예비생산오더의 출하지시 가능 여부			*/
			,rsvd_ordr_spts		: 'Invoice.jrf'/* 거래명세표 양식 명					*/
			,mold_used_yorn		: false		/* 금형정보 사용 여부					*/
			,prod_line_used_yorn: false		/* 생산라인정보 사용 여부					*/
			,item_lott_divd_yorn: false		/* 자재 입고시 롯트 분리여부				*/
			,item_size_used_yorn: false		/* 품목코드 길이,폭,두께 사용여부			*/
			,wndw_wdbf_idcd		: false		/* bf 분류코드						*/
			,wndw_wdsf_idcd		: false		/* sf 분류코드						*/
			,wndw_wdmf_idcd		: false		/* mf 분류코드						*/
			,item_brnd_yorn		: false		/* 품목코드에 브랜드 코드 연결 여부			*/
			,wndw_mtrl_loss_rate_1 : 0      /* 원자재LOSS율						*/
			,wndw_mtrl_loss_rate_2 : 0      /* 부자재LOSS율						*/
			,wndw_glss_loss_rate   : 0      /* 유리LOSS율							*/
			,wndw_weld_loss_rate   : 0      /* 용접 LOSS(mm)						*/
			,wndw_rein_interval    : 0      /* 보강재 비스 간격(mm)					*/
			,wndw_anchor_interval  : 0      /* 앵커 부착 간격(mm)					*/
			,wndw_esti_base_rate	: 0			/* 견적요율 기본값					*/
			,wndw_esti_base_rate_yorn : false	/* 견적요율 기본값 표시여부			*/
			,wndw_esti_dtil_disp_yorn : false	/* 견적원가 구성조건 표시여부			*/
			,wndw_esti_base_color	  : ''		/* 견적 대표색상 기본값				*/
			,wndw_pnyg_calc	          : ''		/* 평당원가 공식 참조기준				*/
			,wndw_dupl_base_color	  : ''		/* 이중창 색상 기본값				*/
			,wndw_esti_amnt_cut_unit  : ''		/* 견적단가 금액 최소단위				*/
			,wndw_esti_amnt_cut_round : ''		/* 견적단가 계산방법					*/
			,wndw_wdbf_buff	          : ''		/* 창틀 완충구 기본 값				*/
			,wndw_esti_rate_balcony	  : 0		/* 발코니창 견적요율					*/
			,wndw_esti_rate_turning	  : 0		/* 터닝도어 견적요율					*/
			,wndw_esti_rate_system    : 0		/* 시스템창 견적요율					*/
			,wndw_esti_rate_general   : 0		/* 일반창 견적요율					*/
			,wndw_esti_rate_project   : 0		/* 프로젝트 견적요율					*/
			,wndw_esti_rate_fix       : 0		/* 고정창 견적요율					*/
			,sysm_logg_used_yorn      : false	/* 시스템 로그 사용여부				*/
			,mes_log_json_fields      : ''		/* 시스템 로그 기타항목 값			*/
			,cvic_hist_card_name      : ''		/* 설비이력카드 양식명				*/
			, esti_vald_days          : 15      /*  견적유효일수					*/
			, prod_istt_wrhs_idcd     : ''      /*  제품 기본 입고 창고				*/
			, gfee_rate               : 5       /*  일반관리비 비율					*/
			, dflt_bzpl_idcd          : ''      /*  기본 사업장 코드					*/
			, item_size_used_yorn     : false   /*  품목 길이 폭 두깨 사용여부			*/
			, wndw_wdbf_idcd          : ''      /*  bf 분류코드					*/
			, wndw_wdsf_idcd          : ''      /*  SF 분류코드					*/
			, wndw_wdmf_idcd          : ''      /*  MF 분류코드					*/
			, item_brnd_yorn          : false   /*  품목코드에 브랜드 코드 적용여부		*/
			, esti_excel_cstm_1       : ''      /*  견적서 업로드 업체 1				*/
			, esti_excel_cstm_2       : ''      /*  견적서 업로드 업체 2				*/
			, esti_excel_cstm_3       : ''      /*  견적서 업로드 업체 3				*/
			, esti_excel_cstm_4       : ''      /*  견적서 업로드 업체 4				*/
			, esti_excel_brnd_1       : ''      /*  견적서 업로드 브랜드1				*/
			, esti_excel_brnd_2       : ''      /*  견적서 업로드 브랜드2				*/
			, esti_excel_brnd_3       : ''      /*  견적서 업로드 브랜드3				*/
			, esti_excel_brnd_4       : ''      /*  견적서 업로드 브랜드4				*/
			, wndw_cutt_loss          : 8       /*  창호 절단기 컷당Loss(mm)			*/
			, wndw_init_loss          : 10      /*  창호 절단기 롱바당 시작Loss(mm)	*/
			, esti_auto_fix_yorn      : true    /*  견적서 확정 기능 사용여부			*/
			, pswd_level              : 3       /*  비빌번호 보안 수준				*/
			, mes_system_type         : ''      /*  MES 시스템 유형				*/
			, my_brand_name           : ''      /*  자사 브랜드명					*/
			, dashboard_used_yorn     : false   /*  데쉬보드 사용여부				*/
			, dashboard_path          : ''      /*  데쉬보드 Source 경로  custom.sjflv.eis.sjdashbord	*/
			, notification_path          : ''      /*  데쉬보드 Source 경로  custom.sjflv.eis.sjdashbord	*/
			, barobill_use_yorn       : false   /*  바로빌 사용여부	*/
			, default_number_format   : '#,##0.###'
		},
		web_ddns    : '',
		autoLoginParams : undefined
	};
	if (!((window.location.port=='')||(window.location.port==80)||(window.location.port==8070))) {
		_global.location.host = window.location.protocol + '//' + window.location.host ;
		_global.api_host_info = _global.location.host;
	}
	_global.api_http = _global.api_host_info + '/' + _global.api_path ;
	_global.debuging = (window.location.hostname == 'localhost');

	function write(content) {
		document.write(content);
	}
	var scripts =
		[
			// daum post api
			window.location.protocol === 'http:'?'http://dmaps.daum.net/map_js_init/postcode.v2.js':'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js',
			_global.sdk_host+"/extjs/ext-all.js",
			_global.sdk_host+"/extjs/locale/ext-lang-ko.js",
			_global.sdk_host+"/extjs/axtjs/axt.js",
							"app.js",
			"//code.jquery.com/jquery-3.4.1.min.js",
			"//code.jquery.com/ui/jquery-ui-git.js",
			"https://www.gstatic.com/charts/loader.js",
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js",				// 엑셀
			"https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js",		// 엑셀
			"/resource/js/jquery-circle-progress-master/dist/circle-progress.js",
			"https://cdn.jsdelivr.net/npm/chart.js"
		],
		styleSheets = [
			_global.sdk_host+"/extjs/resources/css/ext-all.css",
			_global.sdk_host+"/extjs/axtjs/resources/css/clearbutton.css",
			_global.sdk_host+"/extjs/axtjs/resources/css/images.css",
			_global.sdk_host+"/extjs/axtjs/resources/css/default.css",
							"resource/css/images.css",
			"//code.jquery.com/ui/jquery-ui-git.css",
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css",
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"
		], i, ln, path
	;


	for (i = 0,ln = styleSheets.length; i < ln; i++) {
		var path = styleSheets[i];
		if (typeof path != 'string') {
			path = path.path;
		}
		if(path ==_global.sdk_host+"/extjs/resources/css/ext-all.css"){
			write('<link rel="stylesheet" id="theme1" href="'+path+'">');
		}else{
			write('<link rel="stylesheet" href="'+path+'">');
		}
	}

	for (i =  0,ln = scripts.length; i < ln; i++) {
		var path = scripts[i];
		if (typeof path != 'string') {
			path = path.path;
		}
		write('<script src="'+path+'"></'+'script>');
	}
})();

