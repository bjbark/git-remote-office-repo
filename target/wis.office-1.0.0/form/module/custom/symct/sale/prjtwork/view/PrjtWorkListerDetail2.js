Ext.define('module.custom.symct.sale.prjtwork.view.PrjtWorkListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtwork-lister-detail2',
	store		: 'module.custom.symct.sale.prjtwork.store.PrjtWorkDetail2',
	split		: true,
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
						handler: me.rowInsert
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
						handler: me.rowDelete
					},
					'-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text : Language.get('line_seqn'	, '순번'		)
					},{	dataIndex:	'pjod_idcd'		, width: 150, align : 'center'	, text : Language.get('pjod_idcd'	, '공정id'	), hidden:true
					},{	dataIndex:	'item_code'		, width: 200, align : 'center'	, text : Language.get('drwg_numb'	, '도면번호'	)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-item-popup',
										params	: {tema : ''},
										result	: function(records) {
											var	parent = records[0];
											record.set('item_idcd',parent.data.item_idcd);
											record.set('item_name',parent.data.item_name);
											record.set('item_code',parent.data.item_code);
											record.set('item_spec',parent.data.item_spec);
										}
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					}
// 1. 부품내역 규격 column제거
//					,{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 170 , align : 'left'
//					}
// 2. 부품내역 재질구분=재질 column제거
//					,{	dataIndex: 'mtrl_dvcd'	, text : Language.get('mtrl_dvcd'	,'재질'		) , width : 120 , align : 'center',
//						tdCls : 'editingcolumn', xtype : 'lookupcolumn',lookupValue : resource.lookup('mtrl_dvcd'),
//						editor	: {
//							xtype		:'lookupfield',
//							selectOnFocus: true,
//							lookupValue : resource.lookup('mtrl_dvcd'),
//							allowBlank	: true
//						},
//						listeners:{
//							change:function(){
//								this.view.getSelectionModel().getCurrentPosition();
//							}
//						}
//					}
					,{	dataIndex: 'acpt_qntt'	, text : Language.get('acpt_qntt'	,'수량'		) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
						}
						,listeners:{
							change:function(){
								this.view.getSelectionModel().getCurrentPosition();
							}
						}
					}
// 3. 부품내역 조달구분=조달방법 column 제거
//					,{	dataIndex: 'supl_dvcd'	, text : Language.get('supl_dvcd'	,'조달방법'		) , width :  80 , xtype : 'lookupcolumn', lookupValue : resource.lookup('supl_dvcd'), align : 'center',
//						tdCls : 'editingcolumn', xtype : 'lookupcolumn',lookupValue : resource.lookup('supl_dvcd'),
//						editor	: {
//							xtype		:'lookupfield',
//							selectOnFocus: true,
//							lookupValue : resource.lookup('supl_dvcd'),
//							allowBlank	: true
//						},
//						listeners:{
//							change:function(){
//								this.view.getSelectionModel().getCurrentPosition();
//							}
//						}
//					}
					,{	dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 100 , align : 'center'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (listerdetail2, context) {
		var me = this;
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		listerdetail2.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (lister, context, eOpts ) {
			var	me = this;
			var	field = context.field;
			var	value = context.value;
			return true;
		},
		edit: function(lister, context) {
			var me = this;
			me.cellEditAfter(lister, context);
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var	me		= this;
			var	field	= context.field;
			var	value	= context.value;
			//

			if(field === 'acpt_qntt' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}
					}
			});
				return false;
			}
			return true;
		},

		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},
		/*   추가 및 삭제 버튼에 대한 처리 내용을 기술한다....
		 *   삭제할 경우 확인여부를 다시 확인하여 삭제 처리한다.(store에서 Remove)
		 *   추가할 경우 새로운 로우를 생성한 후 기본값들을 set한다......
		 */
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target  : me.getEl().dom,
				binding : [
					{	/* Ctrl + Delete */
						ctrl:true, key: 46,
						fn: function(key,e){
							me.rowDelete();
						}
					},{	/* Ctrl + Insert */
						ctrl:true, key: 45,
						fn: function(key,e){
							me.rowInsert();
						}
					}
				]
			});
		},
	},

	/******************************************************************
	 * 추가하기 위해 ROW를 생성하고, Focus를 옮긴다.(Ctrl+ Insert or 행추가 버튼)
	 ******************************************************************/
	rowInsert: function(){
		var me			= this,
			myform		= Ext.ComponentQuery.query('module-prjtwork-lister-detail2')[0],
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			lastidx		= store.count(),
			listermaster = Ext.ComponentQuery.query('module-prjtwork-lister-master')[0],
			selectMaster = listermaster.getSelectionModel().getSelection()[0],
			selectDetail= myform.getSelectionModel().getSelection()[0],
			mrecord     = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]


		;
		max_seq = 0;

		if(!selectMaster && !selectDetail ){
			Ext.Msg.alert("알림", '수주목록을 선택해주세요' );
			return;
		}

		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;
			record = Ext.create( store.model.modelName , {
				pjod_idcd	: mrecord.get('pjod_idcd'),	//
				line_seqn	: max_seq,			//
				modify		: 'Y'				//수정유무
			});
			// ROW 추가
			store.add(record);
			myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
//		}

	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var myform	= Ext.ComponentQuery.query('module-prjtwork-lister-detail2')[0],
			records = myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						myform.getStore().remove (records);
					}
				}
			});
		}
	}

});