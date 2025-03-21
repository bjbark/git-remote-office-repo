Ext.define('module.eis.project.eisreport.model.EisReportMaster',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'pjod_idcd'			,type: 'string'},		//프로젝트수주id
		{	name: 'item_name'			,type: 'string'},		//품명
		{	name: 'work_item_name'		,type: 'string'},		//금형명
		{	name: 'wkct_name'			,type: 'string'},		//공정명
		{	name: 'cstm_name'			,type: 'string'},		//
		{	name: 'modl_name'			,type: 'string'},		//모델명
		{	name: 'regi_date'			,type: 'string',defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//수주일
		{	name: 'ppsl_deli_date'		,type: 'string',defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//요청납기일
		{	name: 'deli_date'			,type: 'string',defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일
		{	name: 'work_stat_name'		,type: 'string'},		//상황
		{	name: 'work_ordr_dvcd'		,type: 'string'},		//
		{	name: 'ordr_degr'			,type: 'string'},		//차수

	]
});
