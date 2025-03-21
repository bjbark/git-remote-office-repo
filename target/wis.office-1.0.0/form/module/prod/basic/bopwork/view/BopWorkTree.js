Ext.define('module.prod.basic.bopwork.view.BopWorkTree', { extend: 'Ext.tree.Panel',
	alias		: 'widget.module-bopwork-tree',
	store		: 'module.prod.basic.bopwork.store.BopWorkTree',
	border	: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,
	plugins     : [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],
	viewConfig	: {
		plugins: { ptype: 'treeviewdragdrop' }
	},
	initComponent: function () {
		var me = this;
		me.dockedItems  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
//					{	text : '<span class="write-button">승인</span>'	, action : 'approveAction'		, cls: 'button-style', width: 80	} ,
//					{	text : '<span class="write-button">승인취소</span>'	, action : 'approveCancel'		, cls: 'button-style', width: 80	} ,
					{	text : '<span class="write-button">BOP작성</span>'	, action : 'bopInsert'		, cls: 'button-style', width: 80	} ,
					'->', '-' ,
					{	text : '<span class="write-button">작업일정작성</span>'	, action : 'bopCopy'		, cls: 'button-style', width: 80	} ,
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
				items		: [
					{	text	: '품목 트리'	, dataIndex: 'text'	, width : 300	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{	text : '순서'		, dataIndex: 'line_seqn'		, width : 40	, align  : 'center', xtype : 'numericcolumn', hidden : true
					},{ text : '품목코드'	, dataIndex: 'item_idcd'		, width : 70	, hidden : false
					},{ text : '투입품명'	, dataIndex: 'item_name'		, width : 200	, hidden : true
					},{ text : '품목규격'	, dataIndex: 'item_spec'		, width : 130	, hidden : true
					},{ text : '소요량'		, dataIndex: 'need_qntt'		, width : 85	, xtype  : 'numericcolumn', hidden:true
					},{ text : '사용'		, dataIndex: 'used_yorn'		, width : 60	, xtype  : 'checkcolumn',
						processEvent : me.checkboxProcessEvent,
						customMenu: [me.getHeaderCheckMenu('used_yorn')],
						scope:me
					},{	text : '등록일자'	, dataIndex: 'strt_date'		, width : 80	, hidden : true
					},{ text : '메모'		, dataIndex: 'user_memo'		, flex  : 1		, hidden : true
					}
				]
			}
		;
		return item;
	},
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
					// record의 data에 used_yorn을 true로 해주고 밑에서 grid view를 refresh를 해야 속도 저하 문제가 없다 record.set('used_yorn', true);를 하면 속도저하 문제가 많다.
					if(dataIndex==='used_yorn') {
						nodeInterface.cascadeBy(function(record){
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
								var isDrawCheckBox = record.get(dataIndex + '_def') && (record.get('used_yorn')); // <== checkbox가 그려진 조건
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
	checkboxProcessEvent : function(name, grid, view, rowIndex, colIndex) {
		if (name == 'mousedown') {
			var record = grid.store.getAt(rowIndex);
			console.log(record);
			var	column = grid.headerCt.getGridColumns()[colIndex];
			if (column.dataIndex == 'used_yorn') {
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
						record.cascadeBy(function(node) {
							node.set(column.dataIndex , false );
						});
					} else {
						record.cascadeBy(function(node) {
							node.set(column.dataIndex , true  );
						});
					}
				}
			} else {
				if (record.data.leaf && (record.get(column.dataIndex + '_def' )) && record.get('used_yorn') ){
					record.set( column.dataIndex , !record.get( column.dataIndex));
				} else {
					record.set( column.dataIndex , false);
				}
			}
		}
	},
});