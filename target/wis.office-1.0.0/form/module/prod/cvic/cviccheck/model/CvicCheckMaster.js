Ext.define('module.prod.cvic.cviccheck.model.CvicCheckMaster',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'cvic_idcd'			, type: 'string' },		//설비ID
		{	name: 'cvic_code'			, type: 'string' },		//설비코드
		{	name: 'cvic_name'			, type: 'string' },		//설비명
		{	name: 'cvic_spec'			, type: 'string' },		//설비규격
		{	name: 'modl_name'			, type: 'string' },		//모델명
		{	name: 'cvic_stat_dvcd'		, type: 'string' },		//설비상태구분코드
		{	name: 'cvic_kind_dvcd'		, type: 'string' },		//설비종류구분코드
		{	name: 'wkct_idcd'			, type: 'string' },		//공정ID
		{	name: 'wkct_name'			, type: 'string' },		//공정명
		{	name: 'labo_rate_idcd'		, type: 'string' },		//직급ID
		{	name: 'labo_rate_name'		, type: 'string' },		//직급명
		{	name: 'istl_loct'			, type: 'string' },		//설치장소
		{	name: 'move_drtr_name'		, type: 'string' },		//이동담당자명
		{	name: 'mngt_drtr_idcd'		, type: 'string' },		//관리담당자명
		{	name: 'mngt_dept_idcd'		, type: 'string' },		//관리부서ID
		{	name: 'dept_name'			, type: 'string' },		//관리부서명
		{	name: 'aset_idcd'			, type: 'string' },		//자산ID
		{	name: 'aset_name'			, type: 'string' },		//자산명
		{	name: 'puch_cstm_idcd'		, type: 'string' },		//구매거래처ID
		{	name: 'cstm_name'			, type: 'string' },		//구매거래처명
		{	name: 'puch_cstm_name'		, type: 'string' },		//구매거래처명
		{	name: 'vend_tele_numb'		, type: 'string' },		//구매처전화번호
		{	name: 'afsv_tele_numb'		, type: 'string' },		//AS전화번호
		{	name: 'mchn_numb'			, type: 'string' },		//기기번호
		{	name: 'puch_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//구매일자
		{	name: 'cvic_usge'			, type: 'string' },		//설비용도
		{	name: 'puch_amnt'			, type: 'float'  },		//구매금액
		{	name: 'cvic_type'			, type: 'string' },		//설비형식
		{	name: 'make_natn_idcd'		, type: 'string' },		//제조국가ID
		{	name: 'make_natn_name'		, type: 'string' },		//제조국가명
		{	name: 'make_cmpy_name'		, type: 'string' },		//제조회사명
		{	name: 'prod_abty'			, type: 'float'  },		//생산능력
		{	name: 'cvic_imge_1fst'		, type: 'string' },		//설비이미지1
		{	name: 'cvic_imge_2snd'		, type: 'string' },		//설비이미지2
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
		{	name: 'cstm_burd_rate'		, type: 'float'  },		//거래처부담비율
		{	name: 'norm_ivst_date'		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//양산투입일자
		{	name: 'succ_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//인계일자
		{	name: 'succ_cstm_idcd'		, type: 'string' },		//인계거래처ID
		{	name: 'chek_ccle_dvcd'		, type: 'string' },		//점검주기구분코드
		{	name: 'chek_type_idcd'		, type: 'string' },		//점검유형구분코드
		{	name: 'chek_type_name'		, type: 'string' },		//점검유형구분명
		{	name: 'rnmt_dvcd'			, type: 'string' },		//구동방식구분코드
		{	name: 'base_name'			, type: 'string' },		//제조국가명
		{	name: 'sral_numb'			, type: 'string' },		//시리얼넘버
		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' },		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' },		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI
		{	name: 'modify'				, type: 'string' },		//생성UI

		{	name: 'lcls_idcd'			, type: 'string' },		//대분류ID
		{	name: 'mcls_idcd'			, type: 'string' },		//중분류ID
		{	name: 'scls_idcd'			, type: 'string' },		//소분류ID
		{	name: 'clss_name'			, type: 'string' },		//분류명
	]
});
