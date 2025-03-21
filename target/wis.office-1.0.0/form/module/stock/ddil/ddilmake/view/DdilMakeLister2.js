Ext.define('module.stock.ddil.ddilmake.view.DdilMakeLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-ddilmake-lister2',
	store		: 'module.stock.ddil.ddilmake.store.DdilMake2',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : '<span class="write-button">결과등록</span>', iconCls: 'icon-enrollment', action : 'okAction',cls: 'button1-style'			},
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
						handler: me.rowInsert
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
						handler: me.rowDelete
					},
					'-', '-' ,
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex: 'stor_plac'		, width: 120, align : 'center'	, text: Language.get('stor_plac'	, '보관위치'	)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '보관위치 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var wrhs_idcd = Ext.ComponentQuery.query('module-ddilmake-search')[0].down('[name=wrhs_idcd]').getValue();
									if(wrhs_idcd == '' || wrhs_idcd == null){
										Ext.Msg.alert("알림","창고를 선택하여 주시기 바랍니다.");
										return;
									}
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-wrhs-zone-popup',
										params	: {tema : '', wrhs_idcd : wrhs_idcd},
										result	: function(records) {
											var	parent = records[0];
											record.set('zone_idcd',parent.data.zone_idcd);
											record.set('stor_plac',parent.data.zone_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'item_code'		, width: 100, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
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
											record.set('unit_name',parent.data.unit_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'modify'		, width:  80, align : 'center'	, text: Language.get('modify'		, '수정확인'	), hidden : true
					},{	dataIndex:	'item_name'		, width: 150, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 150, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'book_good_qntt', width: 100, align : 'right'	, text: Language.get('book_good_qntt', '장부재고'), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ddil_good_qntt', width: 100, align : 'right'	, text: Language.get('ddil_good_qntt', '실사수량'), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e){
									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER || e.keyCode == e.TAB){
										self.up("grid").plugins[0].startEdit(index , 11);
									}
								},
							}
						}
					},{	dataIndex:	'diff_good_qntt', width: 100, align : 'right'	, text: Language.get('diff_good_qntt', '차이수량'), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	, '메모')
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e){
									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER){
										self.up("grid").plugins[0].startEdit(index+1 , 9);
									}else if(e.keyCode == e.TAB){
										var selection = self.up('grid').view.getSelectionModel().getCurrentPosition();
										if(index == (me.getStore().data.length-1) && selection.column == 11){
											selection = me.getSelectionModel().getSelection()[0],
											self.blur();
										}else{
											self.up("grid").plugins[0].startEdit(index , 9);
										}
									}
								},
							}
						}
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (lister2, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.book_good_qntt;
		var b = this.getSelectionModel().getSelection()[0].data.ddil_good_qntt;
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		models[pos].set('diff_good_qntt',Math.abs(a-b));
	},

	keypress: {
		element: 'el',
		fn: function(e, iElement ) {
			key = e.getKey();
			if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC && key != e.TAB ) {
				var grid = Ext.getCmp(this.id),
					pos  = grid.getView().selModel.getCurrentPosition()
				;
			}
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var	me		= this;
			var	field	= context.field;
			var	value	= context.value;
			//
			if(field === 'ddil_good_qntt' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}
					}
			});
				return false;
			} else if (field === 'pri' && value > 10000000){
				Ext.Msg.show({ title: '단가확인', msg: '단가가 10,000,000원을 넘었습니다. 계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
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
			myform		= Ext.ComponentQuery.query('module-ddilmake-lister2')[0],
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			invc_numb	= '',
			lastidx		= store.count()
		;
		max_seq = 0;

		store.each(function(findrecord) {
			if (invc_numb==''){
				invc_numb = findrecord.get('invc_numb');
			}
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;
		if(invc_numb == ''||invc_numb == null) {
			Ext.Msg.alert("알림","실사대장을 작성 후 작업하십시오.");
		}else{
			record = Ext.create( store.model.modelName , {
				invc_numb	: invc_numb,		//invoice번호
				line_seqn	: max_seq,			//순번
				modify		: 'Y'				//수정유무
			});

			// ROW 추가
			store.add(record);
			myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
		}
	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var myform	= Ext.ComponentQuery.query('module-ddilmake-lister2')[0],
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
