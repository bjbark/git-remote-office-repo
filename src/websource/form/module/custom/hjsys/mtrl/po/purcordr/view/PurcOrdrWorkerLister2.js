Ext.define('module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrWorkerLister2', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-purcordr-worker-lister2',
	store: 'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrInvoice2',
	split		: true,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
				items : [
					'->',
					{xtype:'button',text : '<span class ="btnTemp" style="color:green; font-size : 13px;">행추가</span>', iconCls: Const.INSERT.icon,handler: me.rowInsert }
					, '-',
					{xtype:'button',text : Const.DELETE.text, iconCls: Const.DELETE.icon, handler: me.rowDelete }
					, '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : 'updateAction2' ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style', hidden : true },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : 'cancelAction2' ,cls: 'button-style' }, '-'
				], pagingButton : false
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
					{	dataIndex:	'item_code'		, width:  65, align : 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex:	'acct_bacd'		, width:  65, align : 'center'	, text: Language.get('acct_bacd'		, '계정구분'		)
						, xtype : 'lookupcolumn'
						, lookupValue : [["1001","원자재"],["1002","부자재"]],
					},{	dataIndex:	'item_name'		, width: 150, align : 'left'	, text: Language.get('item_name'		, '품명'			)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목코드 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-item-popup-v4',
										params:{
											 stor_grp : _global.stor_grp , line_stat : '0',acct_bacd:'자재'
										},
										result	: function(records) {
											var value = records[0];
											record.set('item_idcd',value.data.item_idcd);
											record.set('item_code',value.data.item_code);
											record.set('item_name',value.data.item_name);
											record.set('item_spec',value.data.item_spec);
											record.set('acct_bacd',value.data.acct_bacd);
										}
									});
								}
							}
						]
					},{	dataIndex:	'item_spec'		, width: 150, align : 'left'	, text: Language.get('item_spec'		, '규격'			)
					},{	dataIndex:	'need_qntt'		, width:  60, align : 'right'	, text: Language.get('need_qntt'		, '소요량'			), xtype: 'numericcolumn'
					},{	dataIndex:	'unoffr'		, width:  75, align : 'right'	, text: Language.get('unoffr'			, '미발주수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'base_qntt'		, width:  70, align : 'right'	, text: Language.get('base_qntt'		, '재고수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'unit_wigt'		, width:  60, align : 'right'	, text: Language.get('unit_wigt'		, '장당kg'		), xtype: 'numericcolumn',hidden:!(_global.hqof_idcd.toUpperCase()=="N1000HJSYS")
					},{	dataIndex:	'stok_used_qntt', width:  85, align : 'right'	, text: Language.get('stok_used_qntt'	, '재고사용수량'		), xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},{	dataIndex:	'puch_qntt'		, width:  70, align : 'right'	, text: Language.get('puch_qntt'		, '발주수량'		), xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex:	'ordr_wigt'		, width:  80, align : 'right'	, text: Language.get('ordr_wigt'	, '발주kg'		), xtype: 'numericcolumn',hidden:!(_global.hqof_idcd.toUpperCase()=="N1000HJSYS")
					},{	dataIndex:	'offr_pric'		, width:  80, align : 'right'	, text: Language.get('offr_pric'	, '단가'			), xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER|| e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						}
					},{	dataIndex:	'offr_amnt'		, width:  80, align : 'right'	, text: Language.get('offr_amnt'	, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'offr_vatx'		, width:  70, align : 'right'	, text: Language.get('offr_vatx'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'deli_date2'	, width:  90, align : 'center'	, text: Language.get('deli_date2'	, '납기일자'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[16]);
									}
								},
							}
						},
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
									date2 = Ext.Date.format(date1,'Y-m-d'),
									a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
						return a;
						},
					},{	dataIndex:	'user_memo'		, flex :   1, align : 'left'	, text: Language.get('user_memo', '메모'		)
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER ) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, grid.columns[8]);
									}else if (e.keyCode == e.TAB) {
										var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					}
				]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
		context.record.recalculation( me.editor.getRecord() );
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			var store = me.getStore();
			var selection = me.getSelectionModel().getSelection()[0];
			var row = store.indexOf(selection);
			var need_qntt = selection.data.need_qntt;
			var stok_used_qntt = selection.data.stok_used_qntt;
			var puch_qntt = selection.data.puch_qntt;
			//
			console.log(console.log(me));
			if(field === 'puch_qntt'){
				if(value > 999999){
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
				if(value > 0){
					context.record.set('ordr_wigt', selection.get('unit_wigt')*value);
				}
			}
//
			if(field === 'stok_used_qntt' && value > need_qntt){
				Ext.Msg.alert("알림","입력하신 재고사용수량이 소요량보다 많습니다.");
				context.record.set(field, 0);
				return false;
			}else if (field === 'stok_used_qntt' && value < 0){
				Ext.Msg.alert("알림","재고사용수량은 0보다 작을 수 없습니다.");
				context.record.set(field, 0);
				return false;
			}

			if (field === 'puch_qntt' && value < 0){
				Ext.Msg.alert("알림","입력하신 발주수량은 0보다 작을 수 없습니다.");
				context.record.set(field, 0);
				return false;
			}
			if(context.record.get('chk')=='Y'){

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
										Ext.ComponentQuery.query('module-purcordr-worker-editor')[0].down('[name = change]').setValue('Y');
									}
								}
							});
						}
					}
				]
			});
		},
	},
	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			select		= myform.getSelectionModel().getSelection()[0],
			lastidx		= store.count()
		;
		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq		= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;
		record = Ext.create( store.model.modelName , {
			updt_user_name	: _global.login_nm,
			updt_idcd		: _global.login_id,
			line_seqn		: max_seq,	//
			chk				: 'Y'
		});
		// ROW 추가
		store.add(record);
		myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
	},
	/******************************************************************d
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('grid'),
			records		= myform.getSelectionModel().getSelection();
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
