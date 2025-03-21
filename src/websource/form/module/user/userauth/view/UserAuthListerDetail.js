Ext.define('module.user.userauth.view.UserAuthListerDetail', { extend : 'Ext.tree.Panel',
	plugins: ['gridcolumnmenu'],

	alias       : 'widget.module-userauth-lister-detail',
	store       : 'module.user.userauth.store.UserAuthDetail',
	border      : 0,
	columnLines : true ,
	rootVisible : false , // 최상위 node 숨김
	rowLines    : true,
	stripeRows  : true,
	singleExpand: false,
	plugins     : [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent : function () {
		var me = this;
			me.dockedItems = [ me.pagingItem() ];
			me.columns = me.columnItem();
			me.callParent();
	},

	pagingItem : function () {
		var me = this ,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					{	text: Language.get('auth_cpoy', '권한 가져오기'), iconCls: Const.UPDATE.icon, action : 'AuthCopyAction'		},
					'-','->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action , cls: 'button-style'	},
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, action : Const.CANCEL.action , cls: 'button-style'	},
					'-'
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				width   : 650,
				items   : [
					{	text : Language.get('use_yn','사용여부')			, dataIndex: 'active_yn'	, width: 60  , xtype : 'checkcolumn', processEvent : me.checkboxProcessEvent,
						customMenu: [me.getHeaderCheckMenu('active_yn')], scope:me
					},{	text : Language.get('menu_nm','메뉴명')			, dataIndex: 'text'			, flex :  1  , xtype : 'treecolumn' , renderer : me.treeRenderer  // width : 250
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
			xtype     : 'menucheckitem',
			text      : Language.get('all_select','전체선택'),
			id        : 'customMenu'+dataIndex, // id는 반드시 지정해야 한다.
			listeners : {
				click : function ( item, e, eOpts ) {
					var checked       = item.checked;
					var store         = me.getStore();
					var nodeInterface = store.getRootNode();
					// record의 data에 active_yn을 true로 해주고 밑에서 grid view를 refresh를 해야 속도 저하 문제가 없다 record.set('active_yn', true);를 하면 속도저하 문제가 많다.
					if(dataIndex==='active_yn') {
						nodeInterface.cascadeBy(function(record){
							console.log(record.internalId);
							if(record.internalId!=='root') { // root가 아닌 모든 folder, leaf에 check
								//setNoAfterEdit는 Axt.data.Model에 있는 set메서드를 개조한 메서드이다.
//								record.setNoAfterEdit(dataIndex, checked);
								record.dirtyValue(dataIndex, checked);
							}
						});
					} else {
						nodeInterface.cascadeBy(function(record){
							if(record.internalId!=='root' && record.get('leaf')) { // leaf만 체크
								// check박스가 그려진 경우만 model에 set한다
								var isDrawCheckBox = record.get(dataIndex + '_def') && (record.get('active_yn')); // <== checkbox가 그려진 조건
								if (isDrawCheckBox) {
									//setNoAfterEdit는 Axt.data.Model에 있는 set메서드를 개조한 메서드이다.
//									record.setNoAfterEdit(dataIndex, checked);
									record.dirtyValue(dataIndex, checked);
								}
							}
						});
					}
					me.getView().refresh();
					item.ownerCt.setVisible(false) ; /* 클릭 후 메뉴 숨김 */
				}
			}
		};
	},

	treeRenderer: function(value, meta, record, rowIndex, colIndex, store, grid ) {
		return record.get('row_sts') == '0' ? value : '<span style="color:red;">'+ value+'</span>';// + '<div style="float:right;">'+expmark+'</div>' ;
	},
	checkboxProcessEvent : function(name, grid, view, rowIndex, colIndex) {
		if (name == 'mousedown') {
			var record = grid.store.getAt(rowIndex);
			if (record.get('row_sts') == '0') {
				var	column = grid.headerCt.getGridColumns()[colIndex];
				if (column.dataIndex == 'active_yn') {
					if (record.get('leaf')) { /* 화면인 경우 */
						record.set( column.dataIndex , !record.get(column.dataIndex));
						if (record.get(column.dataIndex)){
							var node = record.parentNode ;
							while (node.parentNode) {
								if (node.internalId != 'root') {
									node.set(column.dataIndex , true );
									node = node.parentNode;
								}
							}
						}
					} else { /* 폴더인 경우 */
						if (record.get(column.dataIndex)){
							console.log('if?')
							record.cascadeBy(function(node) {
//								node.set(column.dataIndex , false );
								node.dirtyValue(column.dataIndex, false);
							});
						} else {
							console.log('else');
							record.cascadeBy(function(node) {
//								node.set(column.dataIndex , true  );
								node.dirtyValue(column.dataIndex, true);
							});
						}
						grid.panel.getView().refresh();
					}
				} else {
					if (record.data.leaf && (record.get(column.dataIndex + '_def' )) && record.get('active_yn') ){
						record.set( column.dataIndex , !record.get( column.dataIndex));
					} else {
						record.set( column.dataIndex , false);
					}
				}
			} else { record.set( 'active_yn' , false );}
		} else {
			return Ext.grid.ActionColumn.superclass.processEvent.apply(this, arguments);
		}
	},
	checkboxRenderer: function(value, meta, record, rowIndex, colIndex, store, grid ) {
		if (record.data.leaf && (record.get(grid.headerCt.getGridColumns()[colIndex].dataIndex + '_def' )) && (record.get('active_yn') == 1)) {
			var cssPrefix = Ext.baseCSSPrefix, cls = [cssPrefix + 'grid-checkcolumn'];
			if (this.disabled) { meta.tdCls += ' ' + this.disabledCls; }
			if (value) { cls.push(cssPrefix + 'grid-checkcolumn-checked'); }
			return '<img class="' + cls.join(' ') + '" src="' + Ext.BLANK_IMAGE_URL + '"/>';
		};
	}
});