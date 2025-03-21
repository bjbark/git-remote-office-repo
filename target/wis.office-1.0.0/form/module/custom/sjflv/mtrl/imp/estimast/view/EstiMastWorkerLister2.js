Ext.define('module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerLister2', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-worker-lister2',
	store	: 'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastWorkerLister4',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
//	viewConfig: {
//		markDirty: false,
//		loadMask : false
//	},

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items	: [
									'-', '->', '-',
							{	text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
//								listeners: {
//			 			 			click:function(self,e){
//										me.lineInsert({});
//									}
//								}
										handler: me.rowInsert
							},
							'-',
							{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
									listeners: {
										click:function(self,e){
											me.lineDelete({});
										}
									}
//								handler: me.rowDelete

							},{	text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' } ,
							{	text : '<span class="write-button">닫기</span>'	, action : 'cancelAction'		, cls: 'button-style', width: 80	} ,
						]
				, pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'assi_seqn'		, width: 50 , align : 'center'	, text: Language.get('assi_seqn'	, '항번'		)
					},{	dataIndex:	'qntt'			, width:  80, align : 'right'	, text: Language.get('esti_qntt'	, '수량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0.##'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}
					},{	dataIndex:	'pric'			, width:  80, align : 'right'	, text: Language.get('esti_pric'	, '단가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[10]);
									}
								}
							}
						},
					},{	dataIndex:	'amnt'			, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					}
				]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context,rowIndexNum) {
		var me = this;
		var me		= this,
			models	= me.getStore().getRange(),
			field	= context.field,
			value	= context.value,
			qntt,pric
		;
		//
		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		qntt	= me.getStore().getAt(rowIndex).get('qntt');		//발주량
		pric	= me.getStore().getAt(rowIndex).get('pric');		//개당단가

		if(field=='qntt' || field=='pric'){
			models[rowIndex].set('amnt',Math.round(qntt * pric));
		}

	},

//	cellEditAfter : function (editor, context) {
//		var me = this,
//			grid = this,
//			pos = this.view.getSelectionModel().getCurrentPosition().row,
//			editor = Ext.ComponentQuery.query('module-estimast-worker-editor3')[0],
//			models = grid.getStore().getRange()
//		;
//		context.record.recalculation( editor.getRecord() );
////		models[pos].set('amnt',context.value * context.value);
//	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'qntt' && value > 999999){
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

		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	},

	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			master		= Ext.ComponentQuery.query('module-estimast-worker-lister3')[0],
			editor		= Ext.ComponentQuery.query('module-estimast-worker-editor3')[0],
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			item_idcd	= '',
			assi_seqn	= 0,
			select		= master.getSelectionModel().getSelection()[0],
			lastidx		= store.count()
		;

		if(select){
			//max_seq = 0;
			item_idcd = select.get('item_idcd');
			store.each(function(record){
				assi_seqn = record.get('assi_seqn');
			})
			if (assi_seqn == undefined) {
				assi_seqn = 0;
			}
			var seq = assi_seqn + 1;

			record = Ext.create( store.model.modelName , {
				invc_numb	: select.get("invc_numb"),		//invoice번호
				line_seqn	: select.get("line_seqn"),		//순번
				assi_seqn	: seq,			//항번
				item_idcd	: item_idcd,	//순번
				modify		: 'Y',				//수정유무
				qntt		: '',
				pric		: '',
			});

			// ROW 추가
			store.add(record);
			myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
		}else{
			Ext.Msg.alert('알림','품목을 선택해주세요.');
		}
	},

	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records.length != 0){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove(records);
					}
				}
			});
		}
	},

//	rowDelete: function(){
//		var me = this,
//			myform		= me.up('grid'),
//			records		= myform.getSelectionModel().getSelection();
//		if(records.length == 0){
//			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
//		}else{
//			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
//				fn : function (button) {
//					if (button==='yes') {
//						myform.getStore().remove (records);
//					}
//				}
//			});
//		}
//	}
});
