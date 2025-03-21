Ext.define('module.custom.sjflv.sale.export.ordermast.view.OrderMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-sjflv-ordermast-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-sjflv-ordermast-worker-search'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">행추가</span>', handler: me.rowInsert		, cls: 'button-style'} ,
					{	text : '<span class="write-button">행삭제</span>', handler: me.rowDelete		, cls: 'button1-style'} ,
					'-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'		, '항번'		)
					},{	dataIndex:	'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 160, align : 'left'	, text: Language.get('item_name'		, '품명'		), minWidth : 180
					},{	dataIndex:	'item_spec'		, width: 150, align : 'center'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex:	'unit_name'		, width: 120, align : 'center'	, text: Language.get(''			, 'HS Code'		)
					},{	dataIndex:	'unit_name'		, width:  50, align : 'center'	, text: Language.get('unit_name'		, '단위'		)
					},{	dataIndex:	'qntt'			, width:  80, align : 'right'	, text: Language.get('qntt'				, '수량'		), xtype:'numericcolumn'
					},{	dataIndex:	'exch_pric'		, width:  80, align : 'right'	, text: Language.get('exch_pric'		, '판매단가'	), xtype:'numericcolumn'
					},{	dataIndex:	'exch_amnt'		, width: 100, align : 'right'	, text: Language.get('exch_amnt'		, '판매금액'	), xtype:'numericcolumn'
					},{	dataIndex:	'krwn_pric'		, width:  80, align : 'right'	, text: Language.get('krwn_pric'		, '원화단가'	), xtype:'numericcolumn'
					},{	dataIndex:	'krwn_amnt'		, width: 100, align : 'right'	, text: Language.get('krwn_amnt'		, '원화금액'	), xtype:'numericcolumn'
					},{	dataIndex:	'deli_date'		, width: 100, align : 'center'	, text: Language.get('deli_date'		, '납기일자'	)
					},{	dataIndex:	'user_memo'		, width: 200, align : 'left'	, text: Language.get('user_memo'		, '비고'	)
					}
				]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
		context.record.recalculation( me.editor.getRecord() );

//		var a = this.getSelectionModel().getSelection()[0].data.srfc_proc_yorn;		//표면처리여부
//		var b = this.getSelectionModel().getSelection()[0].data.deli_date2;			//납기일자
//
//
//		if(a==0){
//			b = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
//		}else{
//			b = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
//		}
//		store.each(function(findrecord){
//			b += findrecord.get('deli_date2');
//		});

//		if(qty == 0){
//			date = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
//		}else{
//			date = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
//		}
//		panel.down('[name=deli_date2]').setValue(date);

//		var invc_qntt		= this.getSelectionModel().getSelection()[0].data.invc_qntt;		//수량
//		var cont_pric		= this.getSelectionModel().getSelection()[0].data.cont_pric;		//단가
//		var sply_amnt		= this.getSelectionModel().getSelection()[0].data.sply_amnt;		//공급가
//		var vatx_amnt		= this.getSelectionModel().getSelection()[0].data.vatx_amnt;		//부가세
//		var invc_amnt		= this.getSelectionModel().getSelection()[0].data.invc_amnt;		//합계금액
//
//		var amnt		= Math.floor(invc_qntt*cont_pric);			//공급가
//		var vatx		= Math.floor((invc_qntt*cont_pric)*0.1);	//부가세
//		var ttsm		= amnt+vatx;								//합계
//
//		var grid		= this;
//		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
//		var models		= grid.getStore().getRange();
//
//		console.log(vatx,'vatx');
//		if(invc_qntt > 0 && cont_pric > 0){
//			models[pos].set('sply_amnt', amnt);
//			models[pos].set('vatx_amnt', vatx);
//			models[pos].set('invc_amnt', ttsm);
//		}

//		editor.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			var records = me.getSelectionModel().getSelection();
			//
			if(field === 'invc_qntt' && value > 999999){
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

		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	}
});
