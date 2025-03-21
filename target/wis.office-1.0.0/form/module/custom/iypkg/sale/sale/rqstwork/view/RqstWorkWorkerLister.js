Ext.define('module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-rqstwork-worker-lister',
	store		: 'module.custom.iypkg.sale.sale.rqstwork.store.RqstWorkWorkerLister',

	split		: true,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'filterbar'} ],

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-rqstwork-worker-search'}];
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},'-','->','->','->','->','-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				],
			}
		;
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
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex,
									sale_pric = record.get('sale_pric'),
									lister = Ext.ComponentQuery.query('module-rqstwork-worker-lister')[0]
								;
								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									record.set('sale_qntt', record.get('unpaid'));
									me.cellEditAfter(element, record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									record.set('sale_qntt','0');
									record.set('sale_amnt','0');
									record.set('vatx_amnt','0');
									record.set('ttsm_amnt','0');
									record.set('porm_qntt','0');
//									lister.down('[name=sply_amnt_edit]').reset();
//									lister.down('[name=vatx_amnt_edit]').reset();
//									lister.down('[name=ttsm_amnt_edit]').reset();
									me.cellEditAfter(element, record);
								}
							}
						}
					},{	dataIndex:	'ostt_date'			, width:  80, align : 'center'	, text: Language.get( 'ostt_date'	, '출고일자'		)
					},{	dataIndex:	'ostt_dvcd'			, width:  60, align : 'left'	, text: Language.get( 'ostt_dvcd'	, '출고구분'		), xtype	: 'lookupcolumn', lookupValue : resource.lookup('ostt_dvcd'),hidden : true,
					},{	dataIndex:	'cstm_name'			, width: 160, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'		),
					},{	dataIndex:	'acpt_numb'			, width: 130, align : 'center'	, text: Language.get( 'acpt_numb'	, '수주번호'		),
					},{	dataIndex:	'prod_name'			, width: 160, align : 'left'	, text: Language.get( 'prod_name'	, '품명'			),
					},{	dataIndex:	'prod_code'			, width: 160, align : 'left'	, text: Language.get( 'prod_code'	, '품목코드'		), hidden : true,
					},{	dataIndex:	'prod_leng'			, width:  45, align : 'right'	, text: Language.get( 'prod_leng'	, '장'			),
					},{	dataIndex:	'prod_widh'			, width:  45, align : 'right'	, text: Language.get( 'prod_widh'	, '폭'			),
					},{	dataIndex:	'prod_hght'			, width:  45, align : 'right'	, text: Language.get( 'prod_hght'	, '고'			),
					},{	dataIndex:	'ostt_qntt'			, width:  80, align : 'right'	, text: Language.get( 'ostt_qntt'	, '출고수량'		), xtype: 'numericcolumn',
					},{	dataIndex:	'unpaid'			, width:  80, align : 'right'	, text: Language.get( 'unpaid'		, '미청구수량'	), xtype: 'numericcolumn',
					},{	dataIndex:	'sale_qntt'			, width:  80, align : 'right'	, text: Language.get( 'sale_qntt'	, '청구수량'		), xtype: 'numericcolumn', summaryType: 'sum',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[11]);//10
									}
								}
							}
						},
					},{	dataIndex:	'porm_qntt'			, width:  50, align : 'right'	, text: Language.get( 'porm_qntt'	, '가감'		), xtype: 'numericcolumn',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[12]);
									}
								}
							}
						}
					},{	dataIndex:	'real_sale_qntt'	, width:  80, align : 'right'	, text: Language.get( 'real_sale_qntt', '실청구수량'		), xtype: 'numericcolumn',
						listeners : {
							blur : function(self){
								console.log(self);
							}
						}
					},{	dataIndex:	'vatx_incl_yorn'	, width:  60, align : 'center'	, text: Language.get( ''			, '자료구분'		),
						xtype	: 'lookupcolumn',
						lookupValue : resource.lookup('yorn'),
						tdCls	: 'editingcolumn',
						editable: false,
						editor	: {
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('yorn'),
							value		: '1',
							editable	: false,
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[17]);//12
									}
								}
							}
						}
					},{	dataIndex:	'sale_pric'			, width:  90, align : 'right'	, text: Language.get( 'sale_pric'	, '단가'		), xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex:	'sale_amnt'			, width:  90, align : 'right'	, text: Language.get( 'sale_amnt'	, '공급가액'		), xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex:	'vatx_amnt'			, width:  90, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세액'		), xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex:	'ttsm_amnt'			, width:  90, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'		), xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'	, text: Language.get('user_memo'	, '비고'			),
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
										grid.plugins[0].startEdit(row+1, grid.columns[10]);
									}
								}
							}
						}
					},{	dataIndex: 'pcod_numb'			, width: 130, align : 'left'	, text: Language.get('pcod_numb'		, 'P/O No'	)
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (lister2, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.ostt_qntt;		//출고수량
		var c = this.getSelectionModel().getSelection()[0].data.unpaid;			//미청구수량
		var d = this.getSelectionModel().getSelection()[0].data.sale_qntt;		//청구수량
		var g = this.getSelectionModel().getSelection()[0].data.sale_pric;		//단가
		var p = this.getSelectionModel().getSelection()[0].data.porm_qntt;		//가감
		var amnt = Math.floor(g*d/10)*10;	//금액
		var v = Math.floor(amnt*0.1);		//부가세
		var grid = this;
		var store = grid.getStore();
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		var saqn = 0;var sale = 0;var vatx = 0;var ttsm = 0;

		if(a<d || d<0 || c<d || isNaN(d) == true){
			Ext.Msg.alert("알림", "청구수량을 다시 입력해주십시오.");
			models[pos].set('sale_qntt',0);
			return;
		}else{
			if(p!=''){ //가감계산
				models[pos].set('porm_rate',((d-p)/d)*100);
				if(c-p>=0){
					models[pos].set('sale_qntt',(c-p));	
				}else{
					Ext.Msg.alert('알림','가감수량을 확인해주세요.');
					models[pos].set('porm_qntt',0);
					return;
				}
			}
			if(a>=d){	//출고수량이 청구수량보다 크거나 같으면
				models[pos].set('sale_amnt',amnt);
				models[pos].set('vatx_amnt',v);
				models[pos].set('ttsm_amnt',amnt+v);

			}
		}

//		context.record.recalculation( this.getSelectionModel().getSelection()[0] );
	},

	listeners: {
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
	}
});
