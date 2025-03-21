Ext.define('module.prod.jig.jiglist.model.JigList', { extend:'Axt.data.Model',
	fields: [
		{	name: 'jigg_idcd'			, type: 'string' },		//지그ID
		{	name: 'jigg_code'			, type: 'string' },		//지그코드
		{	name: 'jigg_name'			, type: 'string' },		//지그명
		{	name: 'jigg_spec'			, type: 'string' },		//지그규격
		{	name: 'jigg_stat_dvcd'		, type: 'string' },		//지그상태구분코드
		{	name: 'jigg_kind_dvcd'		, type: 'string' },		//지그종류구분코드
		{	name: 'wkct_idcd'			, type: 'string' },		//공정ID
		{	name: 'mngt_drtr_idcd'		, type: 'string' },		//관리담당자ID
		{	name: 'mngt_dept_idcd'		, type: 'string' },		//관리부서ID
		{	name: 'dept_name'			, type: 'string' },		//부서명
		{	name: 'aset_idcd'			, type: 'string' },		//자산ID
		{	name: 'aset_name'			, type: 'string' },		//자산명
		{	name: 'puch_cstm_idcd'		, type: 'string' },		//구매거래처ID
		{	name: 'cstm_name'			, type: 'string' },		//거래처명
		{	name: 'puch_cstm_name'		, type: 'string' },		//구매거래처명
		{	name: 'vend_tele_numb'		, type: 'string' },		//구매거래처전화번호
		{	name: 'afsv_tele_numb'		, type: 'string' },		//AS전화번호
		{	name: 'sral_numb_strt'		, type: 'string' },		//시리얼번호시작
		{	name: 'sral_numb_endd'		, type: 'string' },		//시리얼번호종료
		{	name: 'jigg_qntt'			, type: 'float'  },		//지그수량
		{	name: 'puch_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//구매일자
		{	name: 'norm_ivst_date'		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//양산투입일자
		{	name: 'jigg_usge'			, type: 'string' },		//지그용도
		{	name: 'puch_amnt'			, type: 'float'  },		//구매금액
		{	name: 'dsse_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//폐기일자
		{	name: 'dsse_resn'			, type: 'string' },		//폐기사유
		{	name: 'imge_1fst'			, type: 'string' },		//이미지1
		{	name: 'imge_2snd'			, type: 'string' },		//이미지2
		{	name: 'chek_ccle_dvcd'		, type: 'string' },		//점검주기
		{	name: 'cvic_type_dvcd'		, type: 'string' },		//설비형식
		{	name: 'cvic_abty'			, type: 'string' },		//설비능력
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
	]
});

