Ext.define('module.project.projword.view.ProjWordLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-projword-lister',
	store: 'module.project.projword.store.ProjWord',
	columnLines: true ,
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},

	/**
	 *
	 */
	initComponent: function () {
		var me = this;


		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this, item =
		{
			xtype	: 'grid-paging',
			items	: [
				'->', '-' ,
				{text : '<span class="write-button">표준단어 일괄배포</span>'	, action : 'copyAllAction'   , cls: 'button1-style', width: 200
					,tooltip: { text: '관제 시스템 내부에서 표준단어(회사 CODE가 COMMON)를 각 고객사 단어로 일괄 등록한다.', anchor: 'top'}}
				,'->', '-' ,
				{text : '<span class="write-button">표준단어 가져오기(관제 내부)</span>'	, action : 'makeAction'   , cls: 'button1-style', width: 200
					,tooltip: { text: '관제 시스템 내부에서 회사 CODE가 COMMON인 자료 중 검색조건에서 선택한 회사의 단어에 미등록된 단어를 검색한 회사 단어에 추가한다.', anchor: 'top'}}
				,'->', '-' ,
				{text : '<span class="write-button">단어 이관(관제에서 고객DB로)</span>'	, action : 'copyAction'   , cls: 'button1-style', width:200
				,tooltip: { text: '관제 시스템에 등록된 회사별 단어를 고객사 DB에 이관한다.(고객별 단어 수정은 관제 시스템에 등록된 내용을 수정하는 것이고,이 작업에 의해 고객사에 적용된다.) <<수정시 마다 작업 필요 함>> ', anchor: 'top'}}
				,'->', '-' ,
				{text : '<span class="write-button">DB에서 단어 수집 후 관제에 등록</span>'	, action : 'createAction' , cls: 'button1-style', width: 200
				,tooltip: { text: '테스트 사이트의 DB 구조를 분석하여 관제용 단어에 신규 단어를 추가한다. ', anchor: 'top'}}
				,'->', '-' ,
				{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style' } ,
				{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style' } ,
				{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style' } , '-' ,
				{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style' }
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'hqof_idcd'			, width: 100 , align: 'cewnter'	, text: '본사'
					},{	dataIndex:	'word_code'			, width: 150 , align: 'left'	, text: '단어코드'
					},{	dataIndex:	'word_name'			, width: 150 , align: 'left'	, text: '단어명'
					},{	dataIndex:	'word_dvcd'			, width:  80 , align: 'center'	, text: '단어구분'	, xtype: 'lookupcolumn', lookupValue : resource.getList('word_dvcd' ) ,
					},{	dataIndex:	'locl_yorn'			, width:  50 , align: 'center'	, text: 'Local'	, xtype: 'lookupcolumn', lookupValue : resource.getList('yorn' ) ,
					},{	dataIndex:	'word_eglh_name'	, width: 150 , align: 'left'	, text: '영어'
					},{	dataIndex:	'word_chna_name'	, width: 150 , align: 'left'	, text: '중국어'
					},{	dataIndex:	'word_jpan_name'	, width: 150 , align: 'left'	, text: '일어'
					},{	dataIndex:	'word_etcc_name'	, width: 150 , align: 'left'	, text: '기타'
					},{	dataIndex:	'line_stat'			, width:  50 , align: 'center'	, text: '숨김'		, xtype: 'lookupcolumn', lookupValue : resource.getList('line_stat' ) ,
					},{	dataIndex:	'word_idcd'			, width: 150 , align: 'left'	, text: '단어ID'
					}
				]
			}
		;
		return item;
	}
});




