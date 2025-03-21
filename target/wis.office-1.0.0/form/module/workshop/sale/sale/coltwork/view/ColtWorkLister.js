Ext.define('module.workshop.sale.sale.coltwork.view.ColtWorkLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-coltwork-lister'			,
	store		: 'module.workshop.sale.sale.coltwork.store.ColtWork'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : '<span class="write-button">개별 수금등록</span>'	, action : 'coltinsertAction'	, cls: 'button1-style'	, width : 95} ,
					{	text : '<span class="write-button">수금등록</span>'		, action : 'orderAction'		, cls: 'button1-style'	} ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: ''		, text : Language.get(''		,'상태')		, width :  60
					},{ dataIndex: ''		, text : Language.get(''		,'주문번호')	, width :  110	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'견적일자')	, width :  90
					},{ dataIndex: ''		, text : Language.get(''		,'수주일자')	, width :  90
					},{ dataIndex: ''		, text : Language.get(''		,'제작계획일')	, width :  90
					},{ dataIndex: ''		, text : Language.get(''		,'제작일자')	, width :  90
					},{ dataIndex: ''		, text : Language.get(''		,'납기일자')	, width :  90
					},{ dataIndex: ''		, text : Language.get(''		,'출고일자')	, width :  90
					},{ dataIndex: ''		, text : Language.get(''		,'회원명')		, width : 150
					},{ dataIndex: ''		, text : Language.get(''		,'주문명')		, width :  90	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'배송방법')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'배송메모')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'주문메모')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'주문금액')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'전화번호')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'소속회사')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'대분류')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'중분류')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'소분류')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'제목')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'컬러')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'인쇄방법')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'원단명')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'사이즈')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'페이지')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'권')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'제본')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'제본방향')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'제본철')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'제작방향')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'첨부파일')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'견적단가')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'견적금엑')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'표지사양')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'표지컬러')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'표지원단')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'표지디자인')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'첨부파일')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'표지단가')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'표지금액')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'간지원단')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'간지페이지')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'색간지')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'간지인쇄')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'색인표')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'간지단가')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'무색코팅')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'광택코팅')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'엠보싱')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'무광')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'유광')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'책받침')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'타공수')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'무선제본')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'메탈와이어')	, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'바인더')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'소프트커버무선'), width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'소프트커버펼침'), width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'떡제본')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'평철')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'반책')		, width : 100	, align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'기타가공금액')	, width : 100	, align : 'center'
					}
				]
			}
		;
		return item;
	}
});