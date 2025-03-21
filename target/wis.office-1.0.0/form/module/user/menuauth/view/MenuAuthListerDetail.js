Ext.define('module.user.menuauth.view.MenuAuthListerDetail', {extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-menuauth-lister-detail',
	store		: 'module.user.menuauth.store.MenuAuthDetail',
	border		: 0,
	columnLines	: true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  item = {
			xtype : 'toolbar', dock : 'bottom',
			items : [
				'->', '-',
				{	text	: Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action , cls: 'button-style'
				},{	text	: Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, button : 'detail' , cls: 'button-style'
				},
				'-'
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var  me = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	text: Language.get('dept','부서')			, dataIndex: 'dept_name'	, width:  90 },
					{	text: Language.get('user_name','사원명')		, dataIndex: 'user_name'	, width: 100 , summaryType : 'count'  },
					{	text: Language.get('로그인 ID','로그인 ID')		, dataIndex: 'lgin_idcd'	, width: 100 },
					{	text: Language.get(''  ,'사용여부')			, dataIndex: 'active_yn'	, width:  60  , xtype : 'checkcolumn' , tdCls : 'editingcolumn',
						customMenu: [me.getHeaderCheckMenu('active_yn')], scope:me
					},{	text: Language.get('hqof_idcd','본사코드')	, dataIndex: 'hqof_idcd'	, width: 120 , hidden : true
					},{	text: Language.get('auth_dvcd','비고')		, dataIndex: 'auth_dvcd'	, flex:  1 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('auth_dvcd')
					}
				]
			};
		return item;
	},


	/**
	* @private
	* 상단의 columnItem()에서 사용하며<br/>
	* customMenu를 생성할때 공통적으로 사용하기위한 메서드
	*/
	getHeaderCheckMenu : function (dataIndex) {
		var me = this;
		return {
			xtype : 'menucheckitem',
			text : '전체선택',    // check menu
			id   : 'customMenu'+dataIndex, // id는 반드시 지정해야 한다.
			listeners : {
				click : function ( item, e, eOpts ) {
					var checked = item.checked;
					var store = me.getStore();
					store.data.items.forEach( function( item ){
						if (dataIndex === 'active_yn') {
							item.dirtyValue(dataIndex, checked);
						} else {
							var def = dataIndex + '_def' ;
							if ( item.data.active_yn && item.get(def) ){
								item.dirtyValue(dataIndex, checked && item.data.active_yn );
							}
						}
					});
					me.getView().refresh();
					item.ownerCt.setVisible(false) ; /* 클릭 후 메뉴 숨김 */
				}
			}
		};
	},


	checkboxProcessEvent : function(name, grid, view, rowIndex, colIndex){
		var record = grid.store.getAt(rowIndex);
		var column = grid.headerCt.getGridColumns()[colIndex];
		if ( name === 'click' ){ /* 클릭할때만 체크됨 (마우스 오버시 체크안됨) */
			if ((record.get(column.dataIndex + '_def' )) && record.get('active_yn') ){
				record.set( column.dataIndex , !record.get( column.dataIndex));
			} else {
				record.set( column.dataIndex , false);
			}
		}
	},

	checkboxRenderer: function(value, meta, record, rowIndex, colIndex, store, grid ) {
		if (record.get(grid.headerCt.getGridColumns()[colIndex].dataIndex + '_def' )) {
			var cssPrefix = Ext.baseCSSPrefix, cls = [cssPrefix + 'grid-checkcolumn'];
			if (this.disabled) { meta.tdCls += ' ' + this.disabledCls; }
			if (value) { cls.push(cssPrefix + 'grid-checkcolumn-checked'); }

			return '<img class="' + cls.join(' ') + '" src="' + Ext.BLANK_IMAGE_URL + '"/>';
		};
	}
});