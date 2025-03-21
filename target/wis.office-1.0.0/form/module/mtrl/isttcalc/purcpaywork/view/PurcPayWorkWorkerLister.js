Ext.define('module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcpaywork-worker-lister',
	store		: 'module.mtrl.isttcalc.purcpaywork.store.PurcPayWorkWorkerLister',

	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary', remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purcpaywork-worker-search'}];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'-', '->', '-',
					{	text : '<span class="write-button">전체 발행</span>'	, action : 'InsertAction'		, cls: 'button1-style' ,width:  90,	} ,
					'->','-',
					{text : Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' },
				], pagingButton : true
			}
		;
		return item ;
	},




	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'chk'			, width:  35, align : 'center'	, text: Language.get('chk'	, '선택'		), xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex,
									lister = Ext.ComponentQuery.query('module-purcpaywork-worker-lister')[0],
									search = Ext.ComponentQuery.query('module-purcpaywork-worker-search')[0]
								;
								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									record.set('iomy_amnt',record.get('ttsm_amnt'));
									me.cellEditAfter(element, record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									search.down('[name=total_amnt]').reset();
									record.set('iomy_amnt','0');
									me.cellEditAfter(element, record);
								}
							}
						}
						},{	dataIndex:	'new_invc_numb'		, width: 100, align : 'center'	, text: Language.get( 'new_invc_numb'	, '번호'	), hidden: true
						},{	dataIndex:	'istt_date'			, width: 80, align : 'center'	, text: Language.get( 'istt_date'	, '입고일자'	)
						},{	dataIndex:	'istt_numb'			, width: 70, align : 'center'	, text: Language.get( 'istt_numb'	, '입고번호'	)
						},{	dataIndex:	'line_seqn'			, width: 50, align : 'center'	, text: Language.get( 'line_seqn'	, '항번'		)
						},{	dataIndex:	'item_code'			, width: 90, align : 'left'		, text: Language.get( 'item_code'	, '품목코드'	)
						},{	dataIndex:	'item_name'			, width: 200, align : 'left'	, text: Language.get( 'item_name'	, '품명'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
						},{	dataIndex:	'item_spec'			, width: 140, align : 'left'	, text: Language.get( 'item_spec'	, '규격'		)
						},{	dataIndex:	'unit_name'			, width:  60, align : 'center'	, text: Language.get( 'unit_name'	, '단위'		)
						},{	dataIndex:	'sply_amnt'			, width: 110, align : 'right'	, text: Language.get( 'sply_amnt'	, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
						},{	dataIndex:	'vatx_amnt'			, width: 110, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
						},{	dataIndex:	'ttsm_amnt'			, width: 130, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	'unpaid'			, width: 130, align : 'right'	, text: Language.get( 'unpaid'	, '미지급액'	), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	'iomy_amnt'			, width: 130, align : 'right'	, text: Language.get( 'iomy_amnt'		, '지급액'		), xtype : 'numericcolumn', summaryType: 'sum'
							, tdCls : 'editingcolumn',
							editor	: {
								xtype		:'numericfield',
								selectOnFocus: true,
								allowBlank	: false,
								enableKeyEvents : true,
									listeners:{
									focus:function(a,b,c,d){
										var grid = this.up('grid');
										var idx = grid.getSelectionModel (). getSelection ()[0];
										rowIndexNum = grid.getStore().indexOf(idx);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var grid = self.up('grid'),
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0],
												row = store.indexOf(selection);
										}
									}
								}
							}
						},{	dataIndex: 'user_memo'			, flex:  1, align : 'left'		, text: Language.get( 'user_memo'	, '비고'		)
					}
				]
			}
		;
		return item;
	},


	cellEditAfter  : function (editor, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.sply_amnt;	//공급가
		var b = this.getSelectionModel().getSelection()[0].data.iomy_amnt;	//지급액(입력)
		var c = this.getSelectionModel().getSelection()[0].data.unpaid;		//미지급액
		var grid = this;
		var models = grid.getStore().getRange();
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var store = grid.getStore();
		var search	= Ext.ComponentQuery.query('module-purcpaywork-worker-search')[0];
		var ttsm	= 0;

		if(b > c){
			Ext.Msg.alert("알림", "미지급액보다 액수가 큽니다 지급액을 다시 입력해주십시오.");
			models[pos].set('iomy_amnt',0);
			return;
		}

		if(a>=b){
			store.each(function(findrecord){
				ttsm += findrecord.get('iomy_amnt');
			});

			search.down('[name=total_amnt]').setValue(ttsm);
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}

});
