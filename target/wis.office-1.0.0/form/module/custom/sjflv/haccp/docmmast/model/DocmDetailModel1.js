Ext.define('module.custom.sjflv.haccp.docmmast.model.DocmDetailModel1', { extend:'Axt.data.Model',
	fields: [
		{	name: 'mngt_numb'			, type: 'string'	// 관리번호
		},{	name: 'line_seqn'			, type: 'int'		// 순번
		},{	name: 'apvl_name_1fst'		, type: 'string'	// 결재명#1
		},{	name: 'apvl_name_2snd'		, type: 'string'	// 결재명#2
		},{	name: 'apvl_name_3trd'		, type: 'string'	// 결재명#3
		},{	name: 'apvl_drtr_idcd_1fst'	, type: 'string'	// 결재담당자ID#1
		},{	name: 'apvl_drtr_idcd_2snd'	, type: 'string'	// 결재담당자ID#2
		},{	name: 'apvl_drtr_idcd_3trd'	, type: 'string'	// 결재담당자ID#3
		},{	name: 'apvl_drtr_name_1fst'	, type: 'string'	// 결재담당자명#1
		},{	name: 'apvl_drtr_name_2snd'	, type: 'string'	// 결재담당자명#2
		},{	name: 'apvl_drtr_name_3trd'	, type: 'string'	// 결재담당자명#3
		},{	name: 'user_memo'			, type: 'string'	// 사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	// 시스템메모
		}
	]
});
