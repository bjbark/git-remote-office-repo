Ext.define('module.basic.basemast.view.BaseMastLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-basemast-lister',
	store		: 'module.basic.basemast.store.BaseMast',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnconfig'  } ], // grid의 columns 순서, 숨김 정보를 저장/복원하는 플러그인
	/**
	 * 콤포넌트 초기화 이벤트
	 */
	initComponent : function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 * 그리드 하단의 페이징 툴바 및 액션버튼을 등록한다.
	 */
	pagingItem : function () {
		var	me = this,
			item = {
				xtype	: 'grid-paging',
				itemId	: 'mainbutton',
				items	: [
					{text : '업로드', action: 'testUploadAction', hidden: true },
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action,cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action,cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action,cls: 'button-style' } ,
					'-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action,cls: 'button-style' }
				]
			}
		;
		return item ;
	},

	/**
	 * 그리드 컬럼 내용 등록
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'} ,
				items	: [
					{	text		: '사용'       ,
						dataIndex	: 'line_stat' ,
						width		: 45,
						xtype		: 'lookupcolumn' ,
						lookupValue	: resource.getList('line_stat'),
						align		: 'center'
					},{	text		: Language.get( '' ,  '코드'  ),
						dataIndex	: 'base_code',
						width		: 100,
						align		: 'center'
					},{	text		: Language.get( '' ,  '코드명'  ),
						dataIndex	: 'base_name',
						summaryType	: 'count',
						width		: 180
					},{	text		: Language.get( '' ,  '영문명'  ),
						dataIndex	: 'base_engl_name',
						width		: 180
					},{	text		: Language.get( '' ,  '메모사항'  ),
						dataIndex	: 'user_memo'  ,
						flex		: 1
					}
				]
			}
		;
		return item;
	}
 });