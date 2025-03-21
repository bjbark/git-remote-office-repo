Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister5', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcbillwork-lister5',
	store	: 'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister5',

	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'SINGLE'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purcbillwork-worker-search3'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">매입계산서 발행</span>', action : 'txblAction3'	, cls: 'button1-style', style : 'width : 100px'	}
				]
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
					{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get('invc_date'	, '입고일자'	)
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'	, '외주처명'	)
					},{	dataIndex:	'acpt_numb'		, width: 200, align : 'left'	, text: Language.get('acpt_numb'	, '수주번호'	), hidden : true
					},{	dataIndex:	'prod_name'		, width: 230, align : 'left'	, text: Language.get('prod_name'	, '품명'		)
					},{	dataIndex:	'acpt_qntt'		, width:  60, align : 'right'	, text: Language.get('acpt_qntt'	, '수주량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'wkct_name'		, width: 100, align : 'center'	, text: Language.get('wkct_name'	, '공정명'		)
					},{	dataIndex:	'wkun_dvcd'		, width:  80, align : 'center'	, text: Language.get('wkun_dvcd'	, '작업단위'	), xtype: 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd')
					},{	dataIndex:	'istt_qntt'		, width:  60, align : 'right'	, text: Language.get('istt_qntt'	, '입고량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'subt_qntt'		, width:  50, align : 'right'	, text: Language.get('subt_qntt'	, '감량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'txbl_qntt'		, width:  80, align : 'right'	, text: Language.get('txbl_qntt'	, '발행한 수량'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'untxbl'		, width:  80, align : 'right'	, text: Language.get('untxbl'		, '미발행 수량'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'qntt'			, width:  80, align : 'right'	, text: Language.get('qntt'			, '발행할 수량'	), xtype: 'numericcolumn' , summaryType: 'sum',
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
										grid.plugins[0].startEdit(row+1, grid.columns[7]);
									}
								}
							}
						},
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '수량단위'	)
					},{	dataIndex:	'istt_pric'		, width:  70, align : 'right'	, text: Language.get('istt_pric'	, '단가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'istt_amnt'		, width: 100, align : 'right'	, text: Language.get('istt_amnt'	, '공급가액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'istt_vatx'		, width: 100, align : 'right'	, text: Language.get('istt_vatx'	, '부가세액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					}
				]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
		var qntt			= this.getSelectionModel().getSelection()[0].data.qntt;			//수량
		var pric			= this.getSelectionModel().getSelection()[0].data.istt_pric;	//단가
		var untxbl			= this.getSelectionModel().getSelection()[0].data.untxbl;		//미발행수량
		var sply_amnt		= this.getSelectionModel().getSelection()[0].data.istt_amnt;	//공급가액
		var vatx_amnt		= this.getSelectionModel().getSelection()[0].data.istt_vatx;	//부가세액
		var ttsm_amnt		= this.getSelectionModel().getSelection()[0].data.ttsm_amnt;	//합계금액

		var amnt		= qntt*pric;					//공급가
		var vatx		= Math.round((amnt)*0.1);		//부가세
		var ttsm		= amnt+vatx;					//합계

		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		if(qntt > 0){
			models[pos].set('istt_amnt', amnt);
			models[pos].set('istt_vatx', vatx);
			models[pos].set('ttsm_amnt', ttsm);
		}if(qntt < 0){
			Ext.Msg.alert("알림", "발행할 수량을 다시 입력해주십시오.");
			models[pos].set('qntt',0);
			models[pos].set('istt_amnt', 0);
			models[pos].set('istt_vatx', 0);
			models[pos].set('ttsm_amnt', 0);
		}if(qntt > untxbl){
			Ext.Msg.alert("알림", "발행할 수량을 다시 입력해주십시오.");
			models[pos].set('qntt',0);
			models[pos].set('istt_amnt', 0);
			models[pos].set('istt_vatx', 0);
			models[pos].set('ttsm_amnt', 0);
		}if(qntt == 0){
			models[pos].set('qntt',0);
			models[pos].set('istt_amnt', 0);
			models[pos].set('istt_vatx', 0);
			models[pos].set('ttsm_amnt', 0);
		}
	},


	listeners: {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},
	},

	//행추가
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined
		;

		record = Ext.create( store.model.modelName , {
			line_seqn		: 1,
			txbl_path_dvcd	: 13,		//기타매입
		});

		Ext.ComponentQuery.query('module-purcbillwork-worker-lister2-search')[0].down('[name=change]').setValue('Y');
		store.add(record);
	},


	//행삭제
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records.length != 0){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
					}
				}
			});
			Ext.ComponentQuery.query('module-purcbillwork-worker-lister2-search')[0].down('[name=change]').setValue('Y');
		}else{
			Ext.Msg.alert("알림","선택된 자료가 없습니다.");
		}
	},


});
