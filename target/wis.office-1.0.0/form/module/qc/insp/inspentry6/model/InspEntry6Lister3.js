Ext.define('module.qc.insp.inspentry6.model.InspEntry6Lister3',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'invc_numb'			, type: 'string' },		//INVOICE번호
		{	name: 'bzpl_idcd'			, type: 'string' },		//사업장ID
		{	name: 'invc_date'			, type: 'string' ,defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },//INVOICE일자
		{	name: 'spts_numb'			, type: 'string' },		//출고의뢰번호
		{	name: 'line_seqn'			, type: 'string' },
		{	name: 'spts_seqn'			, type: 'float'  },		//출고의뢰순번
		{	name: 'spts_date'			, type: 'string' ,defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },//출고의뢰일자
		{	name: 'spts_dept_idcd'		, type: 'string' },		//출고의뢰부서ID
		{	name: 'spts_drtr_idcd'		, type: 'string' },		//출고의뢰담당자ID
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'item_name'			, type: 'string' },		//품명
		{	name: 'unit_idcd'			, type: 'string' },		//단위ID
		{	name: 'spts_qntt'			, type: 'string' },		//출고의뢰수량
		{	name: 'deli_date'			, type: 'string'  ,defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },//납기일자
		{	name: 'wrhs_idcd'			, type: 'string' },		//창고ID
		{	name: 'wrhs_name'			, type: 'string' },		//창고명
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
		{	name: 'cstm_name'			, type: 'string' },		//거래처명
		{	name: 'insp_drtr_idcd'		, type: 'string' },		//검사담당자ID
		{	name: 'insp_drtr_name'		, type: 'string' },		//검사담당자명
		{	name: 'insp_qntt'			, type: 'float'  },		//검사수량
		{	name: 'pass_qntt'			, type: 'float'  },		//합격수량
		{	name: 'rett_qntt'			, type: 'float'  },		//반품수량
		{	name: 'dsse_qntt'			, type: 'float'  },		//폐기수량
		{	name: 'scex_qntt'			, type: 'float'  },		//특채수량
		{	name: 'poor_qntt'			, type: 'float'  },		//불량수량
		{	name: 'rewk_qntt'			, type: 'float'  },		//재작업수량
		{	name: 'remk_text'			, type: 'string' },		//비고
		{	name: 'wkct_insp_dvcd'			, type: 'string' },		//
		{	name: 'insp_sbsc_seqn'		, type: 'string' },		//

		{	name: 'user_memo'			, type: 'string'},		//사용자메모
		{	name: 'sysm_memo'			, type: 'string'},		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string'},		//부모ID
		{	name: 'line_levl'			, type: 'float' , defaultValue: '0'},		//ROW레벨
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
		{	name: 'trtm_drtr_name'		, type: 'string' },		//조치담당자
		{	name: 'trtm_drtr_idcd'		, type: 'string' },		//조치담당자id
		{	name: 'trtm_date'			, type: 'string'  , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },//조치일자
		{	name: 'amnd_degr'			, type: 'string' },
		{	name: 'pref_rank'			, type: 'string' },
		{	name: 'plan_sttm'			, type: 'string' },
		{	name: 'plan_edtm'			, type: 'string' },
		{	name: 'acpt_qntt'			, type: 'string' },
		{	name: 'wkfw_idcd'			, type: 'string' },

		]
});
