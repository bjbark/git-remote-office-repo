Ext.define('module.mtrl.po.purcisttwork.view.PurcIsttWorkLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcisttwork-lister',
	store		: 'module.mtrl.po.purcisttwork.store.PurcIsttWork',
	split		: true,
	selModel	: { selType: 'cellmodel'},
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
					{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex);
								rowIndexNum = rowindex;
								if(bool){
									record.set('istt_qntt',record.get('qntt'));
									me.cellEditAfter(element, record);
								}else{
									record.set('istt_qntt','0');
									me.cellEditAfter(element, record);
								}
							}
						}
					},{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'			) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), hidden : true
					},{	dataIndex: 'invc_numb'		, text : Language.get('offr_numb'		,'발주번호'		) , width : 100 , align : 'center'
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'발주항번'		) , width :  55 , align : 'center'
					},{	dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80  , align : 'center'
					},{	dataIndex: 'orig_invc_numb'	, text : Language.get('orig_invc_numb'	,'수주번호'		) , width : 120 , align : 'center',hidden	: ((_global.options.haccp_item_yorn != 0) || (_global.hq_id.toUpperCase()== 'N1000A-ONE')),
					},{	dataIndex: 'cstm_idcd'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 150 , align : 'left', hidden	: true
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 150 , align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 80  , align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 220 , align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 180 , align : 'left'
					},{	dataIndex: 'zone_name'		, text : Language.get('zone_name'		,'보관위치'		) , width : 120 , align : 'left', hidden : _global.hq_id.toUpperCase()!='N1000A-ONE' ? true : false,
//					},{	dataIndex: 'zone_name'		, text : Language.get('zone_name'		,'렉 위치'		) , width : 80  , align : 'left', hidden : _global.hq_id.toUpperCase()!='N1000A-ONE' ? true : false,
//					},{	xtype	: 'actioncolumn',
//						header	: '',
//						hidden	: (_global.options.haccp_item_yorn == 0),
//						width	: 20,
//						align	: 'center',
//						hidden  : _global.hq_id.toUpperCase()!= 'N1000A-ONE' ?  true : false,
//						items	: [
//							{	iconCls	: Const.SELECT.icon,
//								tooltip	: '렉 위치검색',
//								handler	: function (grid, rowIndex, colIndex, item, e, record) {
//									var search = Ext.ComponentQuery.query('module-purcisttwork-lister-search')[0];
//									var wrhs_idcd = search.down('[name = istt_wrhs_idcd]').getValue();
//									record.set('wrhs_idcd',wrhs_idcd);
//
//									resource.loadPopup({
//									select	: 'SINGLE',
//									widget	: 'lookup-wrhs-zone-popup',
//									params:{
//										prnt_idcd : '3300',
//										wrhs_idcd : wrhs_idcd,
//									},
//									result	: function(records) {
//										var	parent = records[0];
//										var grid = me.up('grid'),
//										store = me.getStore(),
//										selection = me.getSelectionModel().getSelection()[0]
//										row = store.indexOf(selection);
//											record.set('zone_name',parent.data.zone_name);
//											record.set('zone_idcd',parent.data.zone_idcd);
//											me.plugins[0].startEdit(row, 1);
//										},
//									})
//								},
//								scope : me
//							}
//						]
					},{	dataIndex: 'zone_idcd'		, text : Language.get('zone_idcd'		,'렉ID'		) , width : 50  , align : 'center', hidden : true,
					},{	dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width : 50  , align : 'center'
					},{	dataIndex: 'make_natn_name'	, text : Language.get('make_natn'		,'제조국'		) , width : 100 , align : 'left' , hidden	: (_global.options.haccp_item_yorn == 0),
					},{	xtype	: 'actioncolumn',
						header	: '',
						hidden	: (_global.options.haccp_item_yorn == 0),
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '제조국 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params:{
										prnt_idcd : '3300'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('make_natn',parent.data.base_code);
											record.set('make_natn_name',parent.data.base_name);
											me.plugins[0].startEdit(row, 1);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'make_cmpy_name2'	, text : Language.get('make_cmpy_name'	,'제조회사'		) , width : 150  , align : 'left' ,hidden	: (_global.options.haccp_item_yorn == 0),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						hidden	: (_global.options.haccp_item_yorn == 0),
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '제조회사 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params:{
										prnt_idcd : '3200'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('make_cmpy_name',parent.data.base_code);
											record.set('make_cmpy_name2',parent.data.base_name);
											me.plugins[0].startEdit(row, 1);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'offr_qntt'		, text : Language.get('offr_qntt'		,'발주수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{	dataIndex: 'dlvy_qntt'		, text : Language.get('dlvy_qntt'		,'납품수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum',hidden:true, format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'qntt'			, text : Language.get('upid_baln_qntt'	,'미입고수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'supl_dvcd'		, text : Language.get('supl_dvcd'		,'조달구분'		) , width : 100,  xtype : 'lookupcolumn', lookupValue : resource.lookup('supl_dvcd'), align : 'center', hidden : true
					},{	dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								focus:function(a,b,c,d){
									var grid = this.up('grid');
									var idx = grid.getSelectionModel (). getSelection ()[0],
									rowIndexNum = grid.getStore().indexOf(idx);
								},
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

											if(_global.hq_id.toUpperCase()=='N1000SJUNG'){
												grid.plugins[0].startEdit(row,grid.columns[24]);
											}else{
												grid.plugins[0].startEdit(row,grid.columns[25]);
											}
									}
								}
							}
						},
					},{ dataIndex	: 'pack_qntt'		, text : Language.get('pack_qntt'		,'패킹단위'	) , width : 80  , align : 'right',	hidden: _global.hqof_idcd.toUpperCase()!= 'N1000SJFLV',
							tdCls	: 'editingcolumn',
							editor	: {
								xtype		:'numericfield',
								selectOnFocus: true,
								allowBlank	: false,
								enableKeyEvents : true,
								listeners:{
									focus:function(a,b,c,d){
										var grid = this.up('grid');
										var idx = grid.getSelectionModel (). getSelection ()[0],
										rowIndexNum = grid.getStore().indexOf(idx);
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var grid = self.up('grid'),
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0],
												row = store.indexOf(selection);

											if(_global.hq_id.toUpperCase()=='N1000SJUNG'){
												grid.plugins[0].startEdit(row,grid.columns[25]);
											}else{
												grid.plugins[0].startEdit(row,grid.columns[26]);
											}
										}
									}
								}
							},
					},{	dataIndex	: 'lott_numb'		, text : Language.get('lott_numb'		,'Batch No'	) , width : 80  , align : 'left',
							hidden		: (_global.options.haccp_item_yorn == 0),
							tdCls		: 'editingcolumn',
							editor		: {
								xtype		:'textfield',
								selectOnFocus: true,
								allowBlank	: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var grid = self.up('grid'),
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0],
												row = store.indexOf(selection);

											if(_global.hq_id.toUpperCase()=='N1000SJUNG'){
												grid.plugins[0].startEdit(row,grid.columns[25]);
											}else{
												grid.plugins[0].startEdit(row,  grid.columns[27]);
											}
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
							allowBlank	: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										if(_global.hq_id.toUpperCase()=='N1000SJUNG'){
											grid.plugins[0].startEdit(row,grid.columns[26]);
										}else{
											grid.plugins[0].startEdit(row,  grid.columns[28]);
										}
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
							allowBlank	: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false,
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

										if(_global.hq_id.toUpperCase()=='N1000SJUNG'){
											grid.plugins[0].startEdit(row,grid.columns[27]);
										}else{
											grid.plugins[0].startEdit(row,  grid.columns[29]);
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
							allowBlank	: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false,
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
										if(_global.hq_id.toUpperCase()=='N1000SJUNG'){
											grid.plugins[0].startEdit(row,grid.columns[28]);
										}else{
											grid.plugins[0].startEdit(row,  grid.columns[30]);
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
						},
						renderer	: Ext.util.Format.dateRenderer('Y-m-d'),
					},{	dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		) , flex :   1, align : 'left',
						tdCls		: 'editingcolumn',
						editor		: {
							xtype	:'textfield',
							selectOnFocus: true,
							allowBlank	: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true : false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
								var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER){
										self.up("grid").plugins[0].startEdit(index+1 , 20);
									}else if(e.keyCode == e.TAB){
										var selection = self.up('grid').view.getSelectionModel().getCurrentPosition();
											if(index == (me.getStore().data.length-1) && selection.column == 16){
												selection = me.getSelectionModel().getSelection()[0],
												self.blur();
											}else{
												self.up("grid").plugins[0].startEdit(index , 24);
											}
									}
								}
							}
						}
					},{	dataIndex: 'diff_qntt'		, text : Language.get('diff_qntt'		,'차이수량'		) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true, format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'new_dlvy_qntt'	, text : Language.get('new_dlvy_qntt'	,'새로운납품수량'	) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true, format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'offr_pric'		, text : Language.get('offr_pric'		,'입고단가'		) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'입고금액'		) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'입고부가세'	) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width: 80  , align : 'right', xtype : 'numericcolumn', hidden : true
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
		var rowIndexNum;
		if(context.index >= 0){
			rowIndexNum = context.index;
		}else if( context.rowIdx >= 0){
			rowIndexNum = context.rowIdx;
		}
		var a = grid.getStore().getAt(rowIndexNum).get('qntt');
		var b = grid.getStore().getAt(rowIndexNum).get('istt_qntt');
		var c = grid.getStore().getAt(rowIndexNum).get('dlvy_qntt');
		var p = grid.getStore().getAt(rowIndexNum).get('offr_pric');
		//var amnt = b*p;							//금액
		//var v = Math.floor(amnt/100)*10;			//부가세
		var models = grid.getStore().getRange();

		if(b==0){
			models[rowIndexNum].set('diff_qntt',0);
			models[rowIndexNum].set('new_dlvy_qntt',0);
			models[rowIndexNum].set('istt_amnt',0);
			models[rowIndexNum].set('istt_vatx',0);
			models[rowIndexNum].set('ttsm_amnt',0);
		}else{
			// 220519 - 이강훈 - 삼정향료 입고 시 외자매입 북가세 없음
			// 22.09.08 - 이강훈 - 부가세 계산 방식 변경, 부가세 계산을 vtax_incl_yorn으로 처리
			var amnt = Math.round(b * p);
			var v = Math.round(amnt/Number(_global.tax_rt));

			if(_global.hq_id.toUpperCase()!= 'N1000A-ONE'){
				var vatx_incl_yorn = context.record.data.vatx_incl_yorn;
				if (vatx_incl_yorn == 0) {
					v = 0;
				}
			}

			//			var vatx_incl_yorn = context.record.data.vatx_incl_yorn;
//			if (vatx_incl_yorn == 0) {
//				v = 0;
//			}

			/*
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
					v = Math.trunc(amnt/Number(_global.tax_rt));
				}
			}
			*/

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
