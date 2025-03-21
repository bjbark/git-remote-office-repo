Ext.define('module.sale.project.prjttestordr.model.PrjtTestOrdrMaster',{ extend:'Axt.data.Model',
	fields : [
		{name: 'line_seqn'	,		type: 'float'  },		//
		{name: 'pjod_idcd'	,		type: 'string' },		//
		{name: 'cvic_name'	,		type: 'string' },		//
		{name: 'indn_qntt'	,		type: 'float'  },		//
		{name: 'regi_date'	,		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},			//
		{name: 'sttm'		,		type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//
		{name: 'edtm		',		type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//
		{name: 'user_memo'	,		type: 'string' },		//
		{name: 'line_clos'	,		type: 'float'  },		//
		{name: 'amnd_degr'	,		type: 'float'  },		//
		{name: 'expt_dvcd'	,		type: 'string' } ,		//
		{name: 'cstm_name '	,		type: 'string' },		//
		{name: 'prjt_name '	,		type: 'string' },		//
		{name: 'item_name'	,		type: 'string' },		//
		{name: 'item_spec'	,		type: 'string' },		//
		{name: 'modl_name'	,		type: 'string' },		//
		{name: 'regi_date2'	,		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'deli_date'	,		type: 'float'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'strt_date'	,		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'endd_date '	,		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//
		{name: 'cofm_yorn '	,		type: 'string' },		//
		{name: 'cofm_date'	,		type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//



		{name: 'wkct_idcd',				type: 'string'},		//공정ID
		{name: 'wkct_name',				type: 'string'},		//공정명
		{name: 'cvic_idcd',				type: 'string'},		//설비ID
		{name: 'poor_qntt',				type: 'float' , defaultValue : 0},		//불량수량
		{name: 'pass_qntt',				type: 'float' , defaultValue : 0},		//합격수량
		{name: 'loss_rate',				type: 'float' , defaultValue : 0},		//loss율
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'drtr_name',				type: 'string'},		//당당자명
		{name: 'sttm1',					type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr } ,		//시작시간
		{name: 'sttm2',					type: 'string' , defaultValue : '00:00'},		//시작시간
		{name: 'edtm1',					type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr } ,		//종료시간
		{name: 'edtm2',					type: 'string' , defaultValue : '00:00'},		//종료시간
		{name: 'uper_seqn',				type: 'float' },		//상위순번
		{name: 'disp_seqn',				type: 'float' },		//표시순번
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI

	]
});
