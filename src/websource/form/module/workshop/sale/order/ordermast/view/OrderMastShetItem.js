Ext.define('module.workshop.sale.order.ordermast.view.OrderMastShetItem', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-ordermast-lister-shetItem',
	store		: 'module.workshop.sale.order.ordermast.store.OrderMastShetItem',

	split		: true,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function () {
		var me = this
			me.paging		= me.pagingItem();
			me.columns		= me.columnItem();
			me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
//					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, cls: 'button-style', handler: me.rowInsert
//					},
//					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, cls: 'button-style', handler: me.rowDelete
//					},
//					 '-' ,
//					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : 'updateAction', cls: 'button-style' },
					{text : Const.CANCEL.text, iconCls: Const.CANCEL.icon, action : 'cancelAction', cls: 'button-style' }
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			acct_bacd = '부자재',
			item = {
				defaults	: {   style: 'text-align:center'},
				items		: [
							{	dataIndex:	'line_seqn'	, width:  60, align : 'center'	, text: Language.get( 'line_seqn'	, '순번'		),hidden : true,
							},{	dataIndex:	'assi_seqn'	, width: 60	, align : 'left'	, text: Language.get( 'assi_seqn'	, '보조순번'	),hidden: true
							},{	dataIndex:	'prnt_shet_name'	, width: 200, align : 'left'	, text: Language.get( 'fabc_name'	, '용지명'	),
							}
//							,{	xtype	: 'actioncolumn',
//								header	: '',
//								width	: 20,
//								name	: 'fname',
//								align	: 'center',
//								items	: [
//									{	iconCls	: Const.SELECT.icon,
//										tooltip	: '용지코드',
//										handler	: function (grid, rowIndex, colIndex, item, e, record) {
//											resource.loadPopup({
//												select	: 'SINGLE',
//												widget	: 'lookup-shet-popup-workshop',
//												params:{ stor_grp : _global.stor_grp , line_stat : '0', lcls_idcd : '000048',scls_idcd : record.data.scls_idcd,mcls_idcd : '000054'},
//												result	: function(records) {
//													record.set('fabc_idcd',records[0].data.shet_idcd);
//													record.set('prnt_shet_name',records[0].data.shet_name);
//													record.set('shet_wght',records[0].data.shet_wght);
//													record.set('fabc_seqn',records[0].data.line_seqn);
//													record.set('dprt_blwt_pric',records[0].data.dprt_blwt_pric);
//													record.set('sprt_blwt_pric',records[0].data.sprt_blwt_pric);
//													record.set('dprt_colr_pric',records[0].data.dprt_colr_pric);
//													record.set('sprt_colr_pric',records[0].data.sprt_colr_pric);
//												},
//											})
//
//										},
//										scope : me
//									}
//								]
//						}
							,{	dataIndex:	'fabc_idcd'			, width: 200, align : 'left'	, text: Language.get( 'fabc_idcd'		, '용지id'	),hidden: true
						},{	dataIndex:	'fabc_seqn'			, width: 80, align : 'left'		, text: Language.get( 'fabc_idcd'		, '용지순번'	),hidden: true
						},{	dataIndex:	'dprt_blwt_pric'	, width: 80, align : 'left'		, text: Language.get( 'dprt_blwt_pric'	, '흑백양면'	),hidden: true
						},{	dataIndex:	'sprt_blwt_pric'	, width: 80, align : 'left'		, text: Language.get( 'sprt_blwt_pric'	, '흑백단면'	),hidden: true
						},{	dataIndex:	'dprt_colr_pric'	, width: 80, align : 'left'		, text: Language.get( 'dprt_colr_pric'	, '컬러양면'	),hidden: true
						},{	dataIndex:	'sprt_colr_pric'	, width: 80, align : 'left'		, text: Language.get( 'sprt_colr_pric'	, '컬러단면'	),hidden: true
						},{	dataIndex:	'shet_wght'			, width:  80, align : 'right'	, text: Language.get( 'shet_wght'		, '무게'		),
						},{	dataIndex:	'fabc_seqn'			, width: 80, align : 'left'		, text: Language.get( 'fabc_idcd'		, '단가순번'	),hidden: true
						},{	dataIndex:	'prnt_colr_bacd_shet', width:  80, align : 'center'	, text: Language.get( 'prnt_colr_name'	, '컬러'	), xtype:'lookupcolumn',lookupValue:resource.lookup('prnt_mthd_dvcd'),
//							tdCls : 'editingcolumn',
//							editor	: {
//								xtype		:'lookupfield',
//								selectOnFocus: true,
//								allowBlank	: true,
//								lookupValue : resource.lookup('prnt_mthd_dvcd'),
//								listeners	: {
//									change : function(self, value ) {
//									var grid = self.up('grid');
//										val = this.getValue();
//										myform	= Ext.ComponentQuery.query('module-ordermast-lister-shetItem')[0];
//										select = myform.getSelectionModel().getSelection()[0];
//
//										pric1 =select.get('dprt_blwt_pric')
//										pric2 =select.get('sprt_blwt_pric')
//										pric3 =select.get('dprt_colr_pric')
//										pric4 =select.get('sprt_colr_pric')
//
//										if(val == '1'){
//											select.set('shet_esti_pric',pric1);
//										}else if(val == '2'){
//											select.set('shet_esti_pric',pric2)
//										}else if(val == '3'){
//											select.set('shet_esti_pric',pric3)
//										}else if(val == '4'){
//											select.set('shet_esti_pric',pric4)
//										}
//
//									},
//								}
//							},
						},{	dataIndex:	'page_qntt'				, width:  80, align : 'right'	, text: Language.get( 'page_qntt'		, '페이지수'	), xtype:'numericcolumn',
//							tdCls : 'editingcolumn',
//							editor	: {
//								xtype		:'numericfield',
//								selectOnFocus: true,
//								allowBlank	: true,
//							},
						},{	dataIndex:	'shet_esti_pric'		, width: 100, align : 'right'	, text: Language.get( 'shet_esti_pric'	, '견적단가'	), xtype:'numericcolumn',
//							tdCls : 'editingcolumn',
//							editor	: {
//								xtype		:'numericfield',
//								selectOnFocus: true,
//								allowBlank	: true,
//							},
						},{	dataIndex:	'shet_esti_amnt'		, width: 150, align : 'right'	, text: Language.get( 'esti_amnt'		, '견적금액'	), xtype:'numericcolumn'
						}
					]
				}
			;
		return item;
	},

	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			store		= myform.getStore(),
			record		= undefined,
			max_seq		= 0,
			lastidx		= store.count(),
			tree		= Ext.ComponentQuery.query('module-ordermast-tree')[0],
			select		= tree.getSelectionModel().getSelection()[0]
			editor		= Ext.ComponentQuery.query('module-ordermast-worker-editor')[0],
			invc_numb	= editor.down('[name=invc_numb]').getValue()
			line_seqn	= select.get('line_seqn'),
			scls_idcd	= select.get('item_scls_idcd')

		;
		max_seq = 0;
		store.each(function(findrecord) {
			if (findrecord.get('assi_seqn') > max_seq) {
				max_seq		= findrecord.get('assi_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;
		record = Ext.create( store.model.modelName , {
			invc_numb	: invc_numb,
			line_seqn	: line_seqn,
			assi_seqn	: max_seq,
			scls_idcd	: scls_idcd
		});

		console.log(record.data.scls_idcd);
		console.log(scls_idcd);

		// ROW 추가
		store.add(record);
		Ext.ComponentQuery.query('module-ordermast-worker-editor2')[0].down('[name=modify]').setValue('Y');

		myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('grid'),
			records		= myform.getSelectionModel().getSelection();
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
		}Ext.ComponentQuery.query('module-workshop-ordermast-editor2')[0].down('[name=modify]').setValue('Y');
	},
	cellEditAfter : function (editor, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.page_qntt;				//페이지
		var b = this.getSelectionModel().getSelection()[0].data.shet_esti_pric;			//견적단가
//		var amnt = this.getSelectionModel().getSelection()[0].data.shet_esti_amnt;		//견적금액
//		var qntt = this.getSelectionModel().getSelection()[0].data.page_qntt;			//컬러
		var shet = this.getSelectionModel().getSelection()[0].data.prnt_shet_name;		//컬러
		var dvcd = this.getSelectionModel().getSelection()[0].data.prnt_colr_bacd_shet;	//컬러
		var co1 = this.getSelectionModel().getSelection()[0].data.dprt_blwt_pric;		//흑백양면
		var co2 = this.getSelectionModel().getSelection()[0].data.sprt_blwt_pric;		//흑백단면
		var co3 = this.getSelectionModel().getSelection()[0].data.dprt_colr_pric;		//컬러양면
		var co4 = this.getSelectionModel().getSelection()[0].data.sprt_colr_pric;		//컬러단면
		var c = a*b;

		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		var select;
		if(context.record){
			select = context.record;
		}else{
			select = context;
		}

		if(shet == null || shet == ""){
			models[pos].set('shet_esti_pric',0)
			models[pos].set('shet_esti_amnt',0)
			models[pos].set('page_qntt',0)
			models[pos].set('prnt_colr_bacd_shet',null)
			Ext.Msg.alert("알림", "먼저 용지명을 선택해주세요.");
			return;
		}

//		if(dvcd == '1'){
//			select.set('shet_esti_pric',co1);
//			models[pos].set('shet_esti_amnt',c);
//		}else if(dvcd == '2'){
//			select.set('shet_esti_pric',co2);
//			models[pos].set('shet_esti_amnt',c);
//		}else if(dvcd == '3'){
//			select.set('shet_esti_pric',co3);
//			models[pos].set('shet_esti_amnt',c);
//		}else if(dvcd == '4'){
//			select.set('shet_esti_pric',co4);
//			models[pos].set('shet_esti_amnt',c);
//		}

		models[pos].set('shet_esti_amnt',c);

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
	},
});
