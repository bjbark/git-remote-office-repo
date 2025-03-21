Ext.define('module.cost.stndcost.model.StndCost',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'stnd_date'				, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr //기준일자
		},{	name: 'mold_idcd'				, type: 'string'		//금형ID
		},{	name: 'mold_name'				, type: 'string'		//금형명
		},{	name: 'mtrl_bacd'				, type: 'string'		//재질분류코드
		},{	name: 'mtrl_name'				, type: 'string' 		//재질분류코드이름
		},{	name: 'mtrl_bacd_name'			, type: 'string' 		//재질분류코드
		},{	name: 'used_tons'				, type: 'float'			//사용톤수
		},{	name: 'grab_dvcd'				, type: 'string'		//등급구분코드
		},{	name: 'runr_wigt'				, type: 'float'			//런너중량
		},{	name: 'prod_wigt'				, type: 'float'			//제품중량
		},{	name: 'cycl_time'				, type: 'float'			//회전시간
		},{	name: 'daly_mtrl_usag_qntt'		, type: 'float'			//일일재료사용량
		},{	name: 'need_mnhr'				, type: 'float'			//소요공수
		},{	name: 'mtrl_wdrw_rate'			, type: 'float'			//재료회수율
		},{	name: 'mtrl_cost'				, type: 'float'			//재료비
		},{	name: 'labo_cost'				, type: 'float'			//노무비
		},{	name: 'udir_labo_nonn'			, type: 'float'			//간접노무비
		},{	name: 'cost_ttsm'				, type: 'float'			//원가합계
		},{	name: 'sale_pric'				, type: 'float'			//판매단가
		},{	name: 'cost_rate'				, type: 'float'			//원가비율

		},{	name: 'user_memo'				, type: 'string'		//사용자메모
		},{	name: 'sysm_memo'				, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'				, type: 'string'		//부모ID
		},{	name: 'line_levl'				, type: 'float'	, defaultValue: '0'		//ROW레벨
		},{	name: 'line_ordr'				, type: 'string'		//ROW순서
		},{	name: 'line_stat'				, type: 'string', defaultValue: '0'		//ROW상태
		},{	name: 'line_clos'				, type: 'string'		//ROW마감
		},{	name: 'find_name'				, type: 'string'		//찾기명
		},{	name: 'updt_user_name'			, type: 'string'		//수정사용자명
		},{	name: 'updt_ipad'				, type: 'string'		//수정IP
		},{	name: 'updt_dttm'				, type: 'string'		//수정일시
		},{	name: 'updt_idcd'				, type: 'string'		//수정ID
		},{	name: 'updt_urif'				, type: 'string'		//수정UI
		},{	name: 'crte_user_name'			, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'				, type: 'string'		//생성IP
		},{	name: 'crte_dttm'				, type: 'string'		//생성일시
		},{	name: 'crte_idcd'				, type: 'string'		//생성ID
		},{	name: 'crte_urif'				, type: 'string'		//생성UI
		}
	]
});
