Ext.define('module.qc.insp.inspentry51.model.InspEntry51Popup',{ extend:'Axt.data.Model',
	fields:	[
		{	name: 'insp_type_idcd'			, type: 'string',	defaultValue : _global.hqof_idcd},		//검사유형ID
		{	name: 'line_seqn'				, type: 'string'},	//순번
		{	name: 'insp_sbsc_name'			, type: 'string'},	//검사항목명
		{	name: 'insp_mthd_dvcd'			, type: 'string'},	//검사방법구분코드
		{	name: 'insp_levl_uppt'			, type: 'int'},		//검사수준상
		{	name: 'insp_levl_midl'			, type: 'int'},		//검사수준중
		{	name: 'insp_levl_lprt'			, type: 'int'},		//검사수준하
		{	name: 'insp_cond'				, type: 'string'},	//검사조건
		{	name: 'rslt_iput_dvcd'			, type: 'string'},	//결과입력구분코드
		{	name: 'goal_levl'				, type: 'string'},	//목표수준
		{	name: 'uppr_valu'				, type: 'string'},	//상한값
		{	name: 'lwlt_valu'				, type: 'string'},	//하한값
		{	name: 'remk_text'				, type: 'string'},	//비고
		{	name: 'uper_seqn'				, type: 'float'	},	//상위순번
		{	name: 'disp_seqn'				, type: 'float'	},	//표시순번
		{	name: 'insp_cvic_idcd'			, type: 'string'},	//설비코드
		{	name: 'cvic_name'				, type: 'string'},	//설비이름
		{	name: 'base_name'				, type: 'string'},	//검사항목명
		{	name: 'invc_numb'				, type: 'string'},	//INVOICE 번호
		{	name: 'msmt_valu_1fst'			, type: 'string'},	//측정값1
		{	name: 'acpt_numb'				, type: 'string'},	//수주번호


		{	name: 'user_memo'				, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'				, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'				, type: 'string' },		//부모ID
		{	name: 'line_levl'				, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'				, type: 'string' },		//ROW순서
		{	name: 'line_stat'				, type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'				, type: 'string' },		//ROW마감
		{	name: 'find_name'				, type: 'string' },		//찾기명
		{	name: 'updt_user_name'			, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'				, type: 'string' },		//수정IP
		{	name: 'updt_dttm'				, type: 'string' },		//수정일시
		{	name: 'updt_idcd'				, type: 'string' },		//수정ID
		{	name: 'updt_urif'				, type: 'string' },		//수정UI
		{	name: 'crte_user_name'			, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'				, type: 'string' },		//생성IP
		{	name: 'crte_dttm'				, type: 'string' },		//생성일시
		{	name: 'crte_idcd'				, type: 'string' },		//생성ID
		{	name: 'crte_urif'				, type: 'string' },		//생성UI
	]
});
