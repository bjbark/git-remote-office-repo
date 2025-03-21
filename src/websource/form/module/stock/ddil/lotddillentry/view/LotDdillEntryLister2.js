Ext.define('module.stock.ddil.lotddillentry.view.LotDdillEntry2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lotddillentry-lister2',
	store		: 'module.stock.ddil.lotddillentry.store.LotDdillEntry2',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'filterbar'}],

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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'lotddillDetail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'->', '-' ,
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
						handler: me.rowInsert
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
						handler: me.rowDelete
					},
					'->',
					{	text : '<span class="write-button">결과등록</span>', iconCls: 'icon-enrollment', action : 'okAction',cls: 'button1-style'			},
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
				items : [
					{	dataIndex:	'lott_numb'		, width: 120, align : 'center'	, text: Language.get('lott_numb'	, 'LOT번호'	)
					},{	dataIndex:	'stor_plac'		, width : 120, align : 'left'	, text: Language.get('stor_plac'	, '보관장소'),
								tdCls	: 'editingcolumn',
								editor	: {
									xtype		:'textfield',
									selectOnFocus: true,
									allowBlank	: false
								}
					},{	dataIndex:	'item_code'		, width: 150, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
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
										params	: {tema:''},
										result	: function(records) {
											var	parent = records[0];
											record.set('item_idcd',parent.data.item_idcd);
											record.set('item_name',parent.data.item_name);
											record.set('item_code',parent.data.item_code);
											record.set('item_spec',parent.data.item_spec);
											record.set('unit_name',parent.data.unit_name);
										}
									})
								},
								scope : me
							}
						]

					},{	dataIndex:	'modify'		, flex :  80, align : 'center'	, text: Language.get('modify'		, '수정확인'	), hidden : true
					},{	dataIndex:	'item_idcd'		, width: 120, align : 'center'	, text: Language.get('item_idcd'	, '품목ID'	), hidden : true
					},{	dataIndex:	'item_name'		, width: 200, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 120, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'book_good_qntt', width:  80, align : 'right'	, text: Language.get('book_good_qntt', '장부재고'), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ddil_good_qntt', width:  80, align : 'right'	, text: Language.get('ddil_good_qntt', '실사수량'), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
						,listeners:{
							change:function(){
								this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{	dataIndex:	'diff_good_qntt', width:  80, align : 'right'	, text: Language.get('diff_good_qntt', '차이수량'), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'user_memo'		, width:  120, align : 'left'	, text: Language.get('user_memo'	, '메모')
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

	cellEditAfter : function (lister2, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.book_good_qntt;
		var b = this.getSelectionModel().getSelection()[0].data.ddil_good_qntt;
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		models[pos].set('diff_good_qntt',Math.abs(a-b));
	},

	listeners : {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(lister2, context) {
			var me = this;
			me.cellEditAfter(lister2, context);
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
			myform		= Ext.ComponentQuery.query('module-lotddillentry-lister2')[0],
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
			Ext.Msg.alert("알림","LOT실사대장을 작성 후 작업하십시오.");
		}else{
			record = Ext.create( store.model.modelName , {
				invc_numb	: invc_numb,		//invoice번호
				line_seqn	: max_seq,			//순번
				modify		: 'Y'				//수정유무
			});
			console.log(record)
			// ROW 추가
			store.add(record);
			myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
		}
	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var myform	= Ext.ComponentQuery.query('module-lotddillentry-lister2')[0],
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
