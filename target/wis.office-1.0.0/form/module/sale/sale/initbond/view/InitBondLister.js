Ext.define('module.sale.sale.initbond.view.InitBondLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-initbond-lister',
	store		: 'module.sale.sale.initbond.store.InitBond',
	border		: 0,
	split		: true,
	features	: [{ ftype : 'grid-summary' }],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	text : '<span class="write-button">집계 마감</span>'	, action : 'closeAction'		, cls: 'button1-style'	} ,
					,'-','->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style', handler: me.rowInsert },
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style', handler: me.rowDelete },
					'-','-',
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style' },
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, button : 'lister', cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'drtr_name'			, width: 100, align : 'left'	, text: Language.get('drtr_name'		, '담당자'		)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '담당자 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										params	: {tema : ''},
										result	: function(records) {
											var	parent = records[0];
											record.set('drtr_idcd',parent.data.user_idcd);
											record.set('drtr_name',parent.data.user_name);
										}
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'cstm_name'			, width: 200, align : 'left'	, text: Language.get('cstm_name'		, '거래처'		),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var trns_yymm,
										store = Ext.ComponentQuery.query('module-initbond-lister')[0].getStore(),
										check = '1'
									;
									if(record.data.trns_yymm.length >0 ){
										trns_yymm = record.data.trns_yymm;
									}
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup2',
										params	: {tema : '', sale_cstm_yorn : '1', trns_yymm : trns_yymm },
										result	: function(records) {
											var	parent = records[0]
												lister = Ext.ComponentQuery.query('module-initbond-lister'),
												listerstore = lister[0].getStore()
											;
											if(  record.get('cstm_idcd') != '' && record.get('cstm_idcd') != parent.data.cstm_idcd){
												Ext.Msg.alert("알림","새로운 거래처는 행추가로 새로 등록하여 주시기 바랍니다.");
												check = '0';
											}
											if (parent.data.cstm_idcd != '' && parent.data.cstm_idcd != null){
												listerstore.each(function(findrecord){
													if(findrecord.get('cstm_idcd') == parent.data.cstm_idcd ){
														Ext.Msg.alert("알림","내역에 이미 추가된 거래처 입니다. 내역을 확인하여 주시기 바랍니다.");
														check = '0';
													}
												});
											}
											if(check == '1'){
												record.set('cstm_idcd',parent.data.cstm_idcd);
												record.set('cstm_name',parent.data.cstm_name);
												record.set('cstm_code',parent.data.cstm_code);

											}
										}
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'trns_bill_amnt'	, width: 150, align : 'right'	, text: Language.get( ''	, '거래명세서기준'	), xtype : 'numericcolumn'
						, tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[5]);
									}
								}
							}
						}
					},{	dataIndex:	'rqbl_amnt'			, width: 150, align : 'right'	, text: Language.get( ''	, '청구서기준'		), xtype : 'numericcolumn'
						, tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}
					},{	dataIndex:	'txbl_amnt'			, width: 150, align : 'right'	, text: Language.get( ''	, '세금계산서기준'	), xtype : 'numericcolumn'
						, tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{	dataIndex:	'remk_text'	, flex :  1, align : 'left'	, text: Language.get( ''	, '비고'				), minWidth : 300, maxWidth : 800
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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
										grid.plugins[0].startEdit(row+1, grid.columns[4]);
									}
								}
							}
						}
					}
				]
			};
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

			 if (field === 'trns_bill_amnt' && value > 10000000){
				Ext.Msg.show({ title: '거래명세서금액 확인', msg: '거래명세서금액이 10,000,000원을 넘었습니다. 계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}else{
							context.record.reset();
						}
					}
				});
				return false;
			}else  if (field === 'rqbl_amnt' && value > 10000000){
				Ext.Msg.show({ title: '청구서금액 확인', msg: '청구서금액이 10,000,000원을 넘었습니다. 계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}else{
							context.record.reset();
						}
					}
				});
				return false;
			}else  if (field === 'txbl_amnt' && value > 10000000){
				Ext.Msg.show({ title: '세금계산서금액 확인', msg: '세금계산서금액이 10,000,000원을 넘었습니다. 계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}else{
							context.record.reset();
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
			myform		= Ext.ComponentQuery.query('module-initbond-lister')[0],
			search		= Ext.ComponentQuery.query('module-initbond-search')[0],
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			lastidx		= store.count()
		;

		if(search.getValues().trns_yymm == ''||search.getValues().trns_yymm == null) {
			Ext.Msg.alert("알림","년월을 입력하여 주십시오.");
		}else{
			record = Ext.create( store.model.modelName , {
				trns_yymm	: search.getValues().trns_yymm,		//년월
				modify		: 'Y'				//수정유무
			});

			// ROW 추가
			store.add(record);
			myform.plugins[0].startEdit(lastidx , 5);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
		}
	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var myform	= Ext.ComponentQuery.query('module-initbond-lister')[0],
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