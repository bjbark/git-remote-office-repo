Ext.define('module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-purcpaywork-worker-lister',

	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary', remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-sjflv-purcpaywork-worker-search'}];
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
//					{	text : '<span class="write-button">전체 발행</span>'	, action : 'InsertAction'		, cls: 'button1-style' ,width:  90,	} ,
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
									lister = Ext.ComponentQuery.query('module-sjflv-purcpaywork-worker-lister')[0],
									search = Ext.ComponentQuery.query('module-sjflv-purcpaywork-worker-search')[0]
								;
								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									record.set('iomy_amnt',record.get('unpaid'));
									me.cellEditAfter(element, record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									search.down('[name=total_amnt]').reset();
									record.set('iomy_amnt','0');
									me.cellEditAfter(element, record);
								}
							}
						}
						},{	dataIndex:	'istt_date'			, width: 80, align : 'center'	, text: Language.get( 'istt_date'	, '입고일자'	)
						},{	dataIndex:	'invc_numb'			, width: 90, align : 'center'	, text: Language.get( 'istt_numb'	, '입고번호'	)
						},{	dataIndex:	'line_seqn'			, width: 40, align : 'center'	, text: Language.get( 'line_seqn'	, '항번'		)
						},{	dataIndex:	'cstm_name'			, width: 120, align : 'left'		, text: Language.get( 'cstm_name'	, '거래처'	)
						},{	dataIndex:	'item_code'			, width: 90, align : 'left'		, text: Language.get( 'item_code'	, '품목코드'	)
						},{	dataIndex:	'item_name'			, width: 200, align : 'left'	, text: Language.get( 'item_name'	, '품명'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
						},{	dataIndex:	'item_spec'			, width: 140, align : 'left'	, text: Language.get( 'item_spec'	, '규격'		)
						},{	dataIndex:	'unit_name'			, width:  60, align : 'center'	, text: Language.get( 'unit_name'	, '단위'		)
						},{	dataIndex:	'sply_amnt'			, width: 110, align : 'right'	, text: Language.get( 'sply_amnt'	, '공급가'	), xtype : 'numericcolumn', summaryType: 'sum'
						},{	dataIndex:	'vatx_amnt'			, width: 110, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세'	), xtype : 'numericcolumn', summaryType: 'sum'
						},{	dataIndex:	'ttsm_amnt'			, width: 130, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	'unpaid'			, width: 130, align : 'right'	, text: Language.get( 'unpaid'		, '미지급액'	), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	'iomy_amnt'			, width: 130, align : 'right'	, text: Language.get( 'iomy_amnt'	, '지급액'	), xtype : 'numericcolumn', summaryType: 'sum'
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
		var	me		= this,
			grid	= this,
			selects	= grid.getStore().getUpdatedRecords(),
			models	= grid.getStore().getRange(),
			pos		= this.view.getSelectionModel().getCurrentPosition().row,
			store	= grid.getStore(),
			search	= Ext.ComponentQuery.query('module-sjflv-purcpaywork-worker-search')[0],
			ttsm	= 0,
			msg		= ""
		;
		Ext.each(selects,function(findrecord){
			var istt_type = findrecord.get('istt_type'),
				unpaid = findrecord.get('unpaid'),
				iomy_amnt = findrecord.get('iomy_amnt')
			;

			if(istt_type == 'puch'){
				if(unpaid >= iomy_amnt){
					ttsm += iomy_amnt;
				}else{
					msg = "금액을 확인해주세요.";
					findrecord.set('iomy_amnt', 0);
					return;
				}
			}else{
				if( iomy_amnt > 0){
					iomy_amnt =iomy_amnt * -1;
					findrecord.set('iomy_amnt', iomy_amnt);
				}
				if(unpaid <= iomy_amnt){
					ttsm += iomy_amnt;
				}else{
					msg = "금액을 확인해주세요.";
					findrecord.set('iomy_amnt', 0);
					return;
				}
			}
		});
		if(msg!=""){
			Ext.Msg.alert('알림',msg);
			return;
		}else{
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
