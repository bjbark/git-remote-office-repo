Ext.define('module.basic.mngtsbscmast.view.MngtSbscMastLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-mngtsbscmast-lister',
	store		: 'module.basic.mngtsbscmast.store.MngtSbscMast',
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
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'사용'		)	, width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'mngt_sbsc_dvcd'	, text : Language.get('mngt_sbsc_dvcd'	,'항목구분'		)	, width : 100 , align : 'center', xtype :'lookupcolumn', lookupValue : resource.lookup('mngt_sbsc_dvcd'),hidden: true
					},{ dataIndex: 'mngt_sbsc_code'	, text : Language.get('mngt_sbsc_code'	,'항목코드'		)	, width :  80 , align : 'center'
					},{ dataIndex: 'mngt_sbsc_name'	, text : Language.get('mngt_sbsc_name'	,'항목명'		)	, width : 400 , align : 'left'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'메모사항'		)	, flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
 });