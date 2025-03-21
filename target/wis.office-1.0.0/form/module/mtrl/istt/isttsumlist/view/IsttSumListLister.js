Ext.define('module.mtrl.istt.isttsumlist.view.IsttSumListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isttsumlist-lister',
	store		: 'module.mtrl.istt.isttsumlist.store.IsttSumListLister',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }],

	initComponent: function () {
		var rowIndexNum;
		var me = this;
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
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,

					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
//					{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width : 105 , align : 'center',xtype:'checkcolumn',
//						listeners:{
//							checkchange:function(element, rowindex, bool, rec) {
//								var record = me.store.getAt(rowindex);
//								rowIndexNum = rowindex;
//								if(bool){
//									record.set('istt_qntt',record.get('qntt'));
//									me.cellEditAfter(element, record);
//								}else{
//									record.set('istt_qntt','0');
//									me.cellEditAfter(element, record);
//								}
//							}
//						}
//					},
					{	dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 200 , align : 'left' , flex : 1
					},{	dataIndex: 'buss_numb'		, text : Language.get('buss_numb'		,'사업자등록번호'	) , width : 150 , align : 'center'
					},{	dataIndex: 'boss_name'		, text : Language.get('boss_name'		,'대표자명'		) , width : 150 , align : 'center'
					},{	dataIndex: 'hdph_numb'		, text : Language.get('hdph_numb'		,'연락처'		) , width : 150 , align : 'center',hidden	: (_global.options.haccp_item_yorn != 0),
					},{	dataIndex: 'cstm_idcd'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 150 , align : 'left' , hidden	: true
					},{	dataIndex: 'drtr_idcd'		, text : Language.get('drtr_idcd'		,'담당자명'		) , width : 150 , align : 'center'
					},{	dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'공급가액'		) , width : 150 , align : 'left' , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'		) , width : 150 , align : 'left' , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width : 150 , align : 'center' , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{dataIndex: 'supl_dvcd'		, text : Language.get('supl_dvcd'		,'조달구분'		) , width : 150 , align : 'center' , xtype : 'lookupcolumn', lookupValue : resource.lookup('supl_dvcd') , hidden : true
					},{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'Batch No'	) , width : 80  , align : 'left' ,
							hidden		: (_global.options.haccp_item_yorn == 0),
							tdCls		: 'editingcolumn',
							editor		: {
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
										}
									}
								}
							}
					},{	dataIndex	: 'cstm_lott_numb'		, text : Language.get(''	,'Supplier No'	) , width : 80  , align : 'left',
						hidden		: (_global.options.haccp_item_yorn == 0),
						tdCls		: 'editingcolumn',
						editor		: {
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
									}
								}
							}
						}
					},{	dataIndex: 'make_natn'	, text : Language.get('make_natn'	,'제조국'		) , width : 100  , align : 'left' ,
						hidden	: (_global.options.haccp_item_yorn == 0),
						tdCls	: 'editingcolumn',
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
									}
								}
							}
						}
					},{	dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조회사'		) , width : 100  , align : 'left' ,
						hidden	: (_global.options.haccp_item_yorn == 0) /*||  _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true:false*/ ,
						tdCls	: 'editingcolumn',
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
									}
								}
							}
						}
					},{	dataIndex: 'make_date'		, text : Language.get('make_date'		,'제조일자'		) , width : 80  , align : 'center' ,
						hidden	: (_global.options.haccp_item_yorn == 0),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										var val = this.getValue()
										var a = "";
										if(val != null){
											if((typeof val) == "object"){
												var date1 = new Date(val);
												date2 = Ext.Date.format(date1,'Y-m-d'),
												a = date2;
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
										}
										if(a!="" && a != null){
											this.setValue(a);
										}else{
											this.setValue(val);
										}
									}
								}
							}
						},
						renderer	: Ext.util.Format.dateRenderer('Y-m-d'),
					},{	dataIndex	: 'rtil_ddln_date'		, text : Language.get('rtil_ddln_date'		,'유통기한'	) , width : 80  , align : 'center',
						hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false:true,
						tdCls		: 'editingcolumn',
						editor		: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										var val = this.getValue()
										var a = "";
										if(val != null){
											if((typeof val) == "object"){
												var date1 = new Date(val);
												date2 = Ext.Date.format(date1,'Y-m-d'),
												a = date2;
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
										}
										if(a!="" && a != null){
											this.setValue(a);
										}else{
											this.setValue(val);
										}
									}
								}
							}
						},
						renderer	: Ext.util.Format.dateRenderer('Y-m-d'),
					},{	dataIndex	: 'rtil_ddln'		, text : Language.get('rtil_ddln'		,'유통기한'	) , width : 80  , align : 'left',
						hidden		: (_global.options.haccp_item_yorn == 0) ||  _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true:false ,
						tdCls		: 'editingcolumn',
						editor		: {
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
									}
								}
							}
						}
					}
					 ,{	dataIndex: 'diff_qntt'		, text : Language.get('diff_qntt'		,'차이수량'		) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'new_dlvy_qntt'	, text : Language.get('new_dlvy_qntt'	,'새로운납품수량'	) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'offr_pric'		, text : Language.get('offr_pric'		,'입고단가'		) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'입고금액'		) , width: 80  , align : 'right', xtype : 'numericcolumn',hidden : true
					},{	dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'입고부가세'	) , width: 80  , align : 'right', xtype : 'numericcolumn',hidden : true
					},{	dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width: 80  , align : 'right', xtype : 'numericcolumn',hidden : true
					},{ dataIndex: 'rcpt_insp_yorn'	, text : Language.get('rcpt_insp_yorn'	,'인수검사여부'	) , width: 120 , align : 'center', hidden : true
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;
		var grid = this;
		var a = grid.getStore().getAt(rowIndexNum).get('qntt');
		var b = grid.getStore().getAt(rowIndexNum).get('istt_qntt');
		var c = grid.getStore().getAt(rowIndexNum).get('dlvy_qntt');
		var p = grid.getStore().getAt(rowIndexNum).get('offr_pric');

		var amnt = b*p;							//금액
		var v = Math.floor(amnt/100)*10;		//부가세

		//220519 - 이강훈 - 삼정향료 입고 시 외자매입 북가세 없음
		if(_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
			amnt = Math.round(b * p);

			var supl_dvcd = grid.getStore().getAt(rowIndexNum).get('supl_dvcd');
			if(supl_dvcd == "6000") {
				v = 0;
			}else{
				v = Math.trunc(amnt/Number(_global.tax_rt));
			}
		} else {
			amnt = Math.floor((b * p) / 10) * 10;

			var supl_dvcd = grid.getStore().getAt(rowIndexNum).get('supl_dvcd');
			if(supl_dvcd == "6000") {
				v = 0;
			}else{
				v = Math.turnc(amnt/Number(_global.tax_rt));
			}
		}

		var models = grid.getStore().getRange();
		if(a<b){
			Ext.Msg.alert("알림", "입고수량을 다시 입력해주십시오.");
			models[rowIndexNum].set('istt_qntt',0);
		}else if(a>b){
			models[rowIndexNum].set('diff_qntt',a-b);
			models[rowIndexNum].set('new_dlvy_qntt',b+c);
			models[rowIndexNum].set('istt_amnt',amnt);
			models[rowIndexNum].set('istt_vatx',v);
			models[rowIndexNum].set('ttsm_amnt',amnt+v);
		}else if(a=b){
			models[rowIndexNum].set('diff_qntt',0);
			models[rowIndexNum].set('new_dlvy_qntt',b+c);
			models[rowIndexNum].set('istt_amnt',amnt);
			models[rowIndexNum].set('istt_vatx',v);
			models[rowIndexNum].set('ttsm_amnt',amnt+v);
		}
//		lister.grid.view.getSelectionModel().onKeyDown();
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
