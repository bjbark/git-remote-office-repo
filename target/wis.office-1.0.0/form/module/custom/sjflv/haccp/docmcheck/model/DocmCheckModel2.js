Ext.define('module.custom.sjflv.haccp.docmcheck.model.DocmCheckModel2', { extend:'Axt.data.Model',
	fields: [
		{	name: 'mngt_numb'			, type: 'string'	// 관리번호
		},{	name: 'invc_date'			, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 작성일자
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
		},{	name: 'docm_bacd_1fst'		, type: 'string'	// 문서분류#1
		},{	name: 'docm_bacd_2snd'		, type: 'string'	// 문서분류#2
		},{	name: 'docm_bacd_3trd'		, type: 'string'	// 문서분류#3
		},{	name: 'docm_name'			, type: 'string'	// 문서명
		},{	name: 'docm_numb'			, type: 'string'	// 문서번호
		},{	name: 'json_data'			, type: 'string'	// JSONDATA
		}
	],
});
