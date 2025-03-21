Ext.define('module.basic.refnmast.view.RefnMastLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-refnmast-lister',
	store		: 'module.basic.refnmast.store.RefnMast',
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
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action,cls: 'button-style' } ,
					'-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action,cls: 'button-style' } ,
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
				    { 	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width :50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
				    },{ dataIndex: 'refn_dvcd'		, text : Language.get('refn_dvcd'		,'코드구분'		) , width : 60, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('refn_dvcd')
					},{	dataIndex: 'refn_code'		, text : Language.get('refn_code'		,'코드'		) , width : 80, align : 'center'
					},{	dataIndex: 'refn_cont_1fst'	, text : Language.get('refn_cont_1fst'	,'코드내용#1'	) , flex : 1 , minWidth : 200, align : 'left'
					},{	dataIndex: 'refn_cont_2snd'	, text : Language.get('refn_cont_2snd'	,'#2'		) , flex : 1 , minWidth : 200, align : 'left'
					},{	dataIndex: 'refn_cont_3trd'	, text : Language.get('refn_cont_3trd'	,'#3'		) , flex : 1 , minWidth : 200, align : 'left'
					},{	dataIndex: 'refn_cont_4frt'	, text : Language.get('refn_cont_4frt'	,'#4'		) , flex : 1 , minWidth : 200, align : 'left'
					},{	dataIndex: 'refn_cont_5fit'	, text : Language.get('refn_cont_5fit'	,'#5'		) , flex : 1 , minWidth : 200, align : 'left'
					},{	dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'메모사항'		) , flex : 1 , minWidth : 200, align : 'left'
					}
				]
			}
		;
		return item;
	}
 });