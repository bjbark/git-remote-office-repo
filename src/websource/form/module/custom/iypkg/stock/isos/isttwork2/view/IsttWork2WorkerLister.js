Ext.define('module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2WorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isttwork2-worker-lister',
	store		: 'module.custom.iypkg.stock.isos.isttwork2.store.IsttWork2Worker',

	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	columnLines : true,
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
					{	text : '<span class="write-button">부자재 추가</span>'	, action : 'codeAction'		, cls: 'button1-style'	} ,
					'->','-',
					{	text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
								click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
					'-',
					{	text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style'	},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'chk'				, width:  35, align : 'center'	, text: Language.get('chk'				, '선택'		), xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex);
								rowIndexNum = rowindex;
								if(bool){
									if( record.get('unistt') != 0 || record.get('unistt') != ''){
										record.set('istt_qntt',record.get('unistt'));
									}
									me.cellEditAfter(element, record);
								}else{
									record.set('istt_qntt','0');
									me.cellEditAfter(element, record);
								}
							}
						}
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 100 , align : 'left'   , hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex: 'acpt_cstm_name'	, text : Language.get('acpt_cstm_name'	,'수주처명'		) , width : 130 , align : 'left'   , hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex: 'prod_name'		, text : Language.get('prod_name'		,'품명'		) , width : 230 , align : 'left'   , hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'발주일자'		) , width : 100 , align : 'center' , hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'발주처명'		) , width : 140 , align : 'left'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '발주처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records) {
											var	parent = records[0] ;

											record.set('cstm_name',parent.data.cstm_name);
											record.set('cstm_idcd',parent.data.cstm_idcd);
										}
									});
								},
								scope : me
							}
						]
					},{	dataIndex: 'cstm_idcd'		, text : Language.get('cstm_idcd'		,'발주처ID'	) , width : 140 , align : 'left', hidden: true,
					},{	dataIndex: 'asmt_code'		, text : Language.get('asmt_code'		,'부자재코드'	) , width : 100 , align : 'center' , hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{ dataIndex: 'asmt_name'		, text : Language.get('asmt_name'		,'부자재명'		) , width : 230 , align : 'left'
						, tdCls		: 'editingcolumn',
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
									store = me.getStore(),
									selection = me.getSelectionModel().getSelection()[0],
									row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, 1);

										me.cellEditAfter();
									}
								}
							}
						}
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '부자재명 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-asmt-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records) {
											var	parent = records[0] ;

											record.set('asmt_name',parent.data.asmt_name);
											record.set('asmt_idcd',parent.data.asmt_idcd);
											record.set('asmt_dvcd',parent.data.asmt_dvcd);

											if(parent.data.unit_idcd != ''){
												record.set('unit_idcd',parent.data.unit_idcd);
												record.set('unit_name',parent.data.unit_name);
											}

//											Ext.Ajax.request({
//												url			: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr2/get/pric.do',
//												params		: {
//													token	: _global.token_id ,
//													param	: JSON.stringify({
//														stor_id		: _global.stor_id,
//														asmt_idcd	: parent.data.asmt_idcd,
//														cstm_idcd	: values.cstm_idcd
//													})
//												},
//												async	: false,
//												method	: 'POST',
//												success	: function(response, request) {
//													var result = Ext.decode(response.responseText);
//													record.set('offr_pric',result.records[0].pric);
//												}
//											});
										}
									});
								},
								scope : me
							}
						]
					},{ dataIndex: 'asmt_dvcd'		, text : Language.get('asmt_dvcd'		,'구분'		) , width : 100 , align : 'center' , xtype : 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width :  80 , align : 'center'
					},{ dataIndex: 'offr_qntt'		, text : Language.get('offr_qntt'		,'발주수량'		) , width :  70 , align : 'right'  , xtype: 'numericcolumn' , hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex: 'sum_istt_qntt'	, text : Language.get('sum_istt_qntt'	,'입고한수량'	) , width :  75 , align : 'right'  , xtype: 'numericcolumn' , hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex: 'unistt'			, text : Language.get('unistt'			,'미입고잔량'	) , width :  75 , align : 'right'  , xtype: 'numericcolumn' , hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고할수량'	) , width :  80 , align : 'right'  , xtype: 'numericcolumn', summaryType: 'sum'
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
										grid.plugins[0].startEdit(row+1, grid.columns[8]);
										me.cellEditAfter();
									}
								}
							}
						}
					},{ dataIndex: 'offr_pric'		, text : Language.get('offr_pric'		,'단가'		) , width :  70 , align : 'right' , xtype: 'numericcolumn'
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
										grid.plugins[0].startEdit(row+1, grid.columns[9]);
										me.cellEditAfter();
									}
								}
							}
						}
					},{ dataIndex: 'vatx_incl_yorn'	, text : Language.get(''				,'자료구분'		) , width :  70 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn') //부가세포함여부
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'공급가'		) , width :  80 , align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'		) , width :  70 , align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계'		) , width : 100 , align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'asmt_idcd'		, hidden : true
					},{ dataIndex: 'offr_path_dvcd'	, value : 2 , hidden : true
					}
				]
			}
		;
		return item;
	},


	cellEditAfter  : function (editor, context) {
		var me = this;
		var grid		= this;
		var pric		= grid.getStore().getAt(rowIndexNum).get('offr_pric');		//발주단가
		var unistt		= grid.getStore().getAt(rowIndexNum).get('unistt');			//미입고잔량
		var qntt		= grid.getStore().getAt(rowIndexNum).get('istt_qntt');		//입고수량

		var amnt		= Math.floor(pric*qntt);											//공급가
		var v			= Math.floor(amnt*Number(_global.tax_rt)/1000)*10;					//부가세

		var models		= grid.getStore().getRange();

		if(_global.hqof_idcd.toUpperCase() == 'N1000DAE-A'){
			models[rowIndexNum].set('istt_amnt',amnt);
			models[rowIndexNum].set('istt_vatx',v);
			models[rowIndexNum].set('ttsm_amnt',amnt+v);
		}else{
			if(qntt > unistt){
				Ext.Msg.alert("알림", "입고수량을 다시 입력해주십시오.");
				models[rowIndexNum].set('istt_qntt',0);
			}else if(qntt < 0){
				Ext.Msg.alert("알림", "입고수량을 다시 입력해주십시오.");
				models[rowIndexNum].set('istt_qntt',0);
			}else{
				models[rowIndexNum].set('istt_amnt',amnt);
				models[rowIndexNum].set('istt_vatx',v);
				models[rowIndexNum].set('ttsm_amnt',amnt+v);
			}
		}
	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	},

	/* 행 추가  */
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			search		= Ext.ComponentQuery.query('module-isttwork2-worker-search')[0],
			values		= search.getValues()
		;

		record = Ext.create( store.model.modelName , {
			offr_path_dvcd	: 2,
			change			: 'Y',
			unit_idcd		: 'EA',
			unit_name		: 'EA'
		});
		store.add(record);
		record.commit();
	},

	/* 행 삭제 */
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
});