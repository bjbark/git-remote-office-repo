Ext.define('module.custom.komec.prod.workbook.model.WorkBookInpt',{ extend:'Axt.data.Model',
	fields: [
				{	name: 'invc_numb' 			,  type: 'string'},		//INVOICE번호
				{	name: 'invc_date' 			,  type: 'string'},		//INVOICE일자
				{	name: 'bzpl_idcd'			,  type: 'string'},		//사업장
				{	name: 'prod_dept_idcd'		,  type: 'string'},		//생산부서ID
				{	name: 'cstm_idcd' 			,  type: 'string'},		//거래처ID
				{	name: 'wkfw_idcd' 			,  type: 'string'},		//공정흐름ID
				{	name: 'wkct_idcd' 			,  type: 'string'},		//공정ID
				{	name: 'cvic_idcd' 			,  type: 'string'},		//설비ID
				{	name: 'mold_idcd' 			,  type: 'string'},		//금형ID
				{	name: 'item_idcd' 			,  type: 'string'},		//품목ID
				{	name: 'mtrl_bacd' 			,  type: 'string'},		//재질분류코드
				{	name: 'cavity' 				,  type: 'string'},		//cavity
				{	name: 'pdsd_numb' 			,  type: 'string'},		//생산계획번호
				{	name: 'wkod_numb'			,  type: 'string'},		//작업지시번호
				{	name: 'wkod_seqn'			,  type: 'float' },		//작업지시순번
				{	name: 'dayn_dvcd' 			,  type: 'string'},		//주야구분코드
				{	name: 'indn_qntt' 			,  type: 'string'},		//지시수량
				{	name: 'item_name' 			,  type: 'string'},		//품명
				{	name: 'item_code' 			,  type: 'string'},		//아이템코드
				{	name: 'prod_qntt' 			,  type: 'string'},		//생산수량
				{	name: 'good_qntt' 			,  type: 'string'},		//양품수량
				{	name: 'poor_qntt' 			,  type: 'string'},		//불량수량
				{	name: 'theo_qntt' 			,  type: 'string'},		//이론수량
				{	name: 'succ_qntt' 			,  type: 'string'},		//인계수량
				{	name: 'ostt_qntt' 			,  type: 'string'},		//출고수량
				{	name: 'stok_qntt' 			,  type: 'float' },		//재고수량
				{	name: 'acct_bacd' 			,  type: 'string'},		//계정구분코드
				{	name: 'indn_qntt_1fst' 		,  type: 'string'},		//지시수량1
				{	name: 'prod_qntt_1fst' 		,  type: 'string'},		//생산수량1
				{	name: 'good_qntt_1fst' 		,  type: 'string'},		//양품수량1
				{	name: 'poor_qntt_1fst' 		,  type: 'string'},		//불량수량1
				{	name: 'succ_qntt_1fst' 		,  type: 'string'},		//인계수량1
				{	name: 'ostt_qntt_1fst' 		,  type: 'string'},		//출고수량1
				{	name: 'stok_qntt_1fst' 		,  type: 'string'},		//재고수량1
				{	name: 'work_strt_dttm' 		,  type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr}, 	//작업시작일시
				{	name: 'work_endd_dttm' 		,  type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr}, 	//작업종류일시
				{	name: 'need_time' 			,  type: 'string'},		//소요시간
				{	name: 'work_mnhr' 			,  type: 'string'},		//작업공수
				{	name: 'cycl_time' 			,  type: 'string'},		//회전시간
				{	name: 'wker_idcd' 			,  type: 'string'},		//작업자ID
				{	name: 'work_pcnt' 			,  type: 'float' },		//작업인원
				{	name: 'lott_numb' 			,  type: 'string'},		//lot번호
				{	name: 'rewd_objt_qntt' 		,  type: 'string'},		//재생대상수량
				{	name: 'work_cond_1fst' 		,  type: 'string'},		//작업조건1
				{	name: 'work_cond_2snd' 		,  type: 'string'},		//작업조건2
				{	name: 'work_cond_3trd' 		,  type: 'string'},		//작업조건3
				{	name: 'work_cond_4frt' 		,  type: 'string'},		//작업조건4
				{	name: 'work_cond_5fit' 		,  type: 'string'},		//작업조건5
				{	name: 'work_cond_6six' 		,  type: 'string'},		//작업조건6
				{	name: 'work_cond_7svn' 		,  type: 'string'},		//작업조건7
				{	name: 'stun_prod_qntt' 		,  type: 'string'},		//기준단위생산수량
				{	name: 'stun_good_qntt' 		,  type: 'string'},		//기준단위양품수량
				{	name: 'stun_poor_qntt' 		,  type: 'string'},		//기준단위불량수량
				{	name: 'work_dvcd' 			,  type: 'string'},		//작업구분코드
				{	name: 'wkct_insp_yorn' 		,  type: 'string'},		//공정검사여부
				{	name: 'last_wkct_yorn' 		,  type: 'string'},		//최종공정여부
				{	name: 'work_para' 			,  type: 'string'},		//작업조
				{	name: 'mtrl_ivst_yorn' 		,  type: 'string'},		//자재투입여부
				{	name: 'prog_stat_dvcd'		,  type: 'string'},		//진행상태구분코드
				{	name: 'dsct_resn_dvcd' 		,  type: 'string'},		//중단사유구분코드
				{	name: 'json_data' 			,  type: 'string'},		//JsonData

				{	name: 'line_seqn' 			,  type: 'float' , defaultValue: '1'},		//순번
				{	name: 'stok_type_dvcd' 		,  type: 'string'},		//재고유형구분코드
				{	name: 'isos_dvcd' 			,  type: 'string'},		//입출고구분코드
				{	name: 'invc_seqn' 			,  type: 'flaot' , defaultValue: '1'},		//Invoice순번
				{	name: 'wrhs_idcd' 			,  type: 'string'},		//창고ID
				{	name: 'qntt' 				,  type: 'float' },		//수량
				{	name: 'stok_symb' 			,  type: 'string'},		//재고부호
				{	name: 'uper_seqn' 			,  type: 'float' },		//상위순번
				{	name: 'disp_seqn' 			,  type: 'float' },		//표시순번

				{	name: 'drtr_idcd' 			,  type: 'string', defaultValue: _global.login_id},		//담당자ID
				{	name: 'sysm_memo'			,  type: 'string' },		//시스템메모
				{	name: 'prnt_idcd'			,  type: 'string' },		//부모ID
				{	name: 'line_levl'			,  type: 'float'  , defaultValue: '0'},	//ROW레벨
				{	name: 'line_ordr'			,  type: 'float'  },		//ROW순서
				{	name: 'line_stat'			,  type: 'string' , defaultValue: '0'},	//ROW상태
				{	name: 'line_clos'			,  type: 'string' , defaultValue: '0'},	//ROW마감
				{	name: 'find_name'			,  type: 'string' },		//찾기명
				{	name: 'updt_user_name'		,  type: 'string' },		//수정사용자명
				{	name: 'updt_ipad'			,  type: 'string' },		//수정IP
				{	name: 'updt_dttm'			,  type: 'string' , defaultValue: Ext.Date.format(new Date(),'Ymd')},		//수정일시
				{	name: 'updt_idcd'			,  type: 'string' , defaultValue:_global.login_pk },		//수정ID
				{	name: 'updt_urif'			,  type: 'string' },		//수정UI
				{	name: 'crte_user_name'		,  type: 'string' },		//생성사용자명
				{	name: 'crte_ipad'			,  type: 'string' },		//생성IP
				{	name: 'crte_dttm'			,  type: 'string' },		//생성일시
				{	name: 'crte_idcd'			,  type: 'string' },		//생성ID
				{	name: 'crte_urif'			,  type: 'string' },		//생성UI
			]
	});

