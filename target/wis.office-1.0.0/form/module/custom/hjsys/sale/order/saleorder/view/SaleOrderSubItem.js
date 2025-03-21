Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderSubItem', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleorder-lister-subItem',
	store		: 'module.custom.hjsys.sale.order.saleorder.store.SaleOrderSubItem',

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
					{	text : '<span class="write-button">작업지시서</span>', action : 'printAction'	, cls: 'button1-style'	,itemId:'treePrint'} ,
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
						handler: me.rowInsert
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
						handler: me.rowDelete
					},
					 '-' ,
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : 'updateAction', cls: 'button-style' },
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
					{	dataIndex : 'item_idcd'			, text : Language.get('wkfw_idcd'		,'ID'			) , width :  50 , align :'center', hidden : true,
					},{ dataIndex : 'acct_bacd'			, text : Language.get('acct_bacd'		,'계정구분'		) , width :  60 , align :'center', hidden : true
						, xtype : 'lookupcolumn'
						, lookupValue : [["1002", "부자재"],["1003", "소모품"]],
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: true,
							editable	: false,
							lookupValue: [["1002", "부자재"],["1003", "소모품"]],
							listeners	: {
								blur	: function(){
									var val = this.getValue();
									if(val == '1002'){
										acct_bacd = '부자재';
									}else{
										acct_bacd = '소모품';
									}
								}
							}
						},
					},{ dataIndex : 'item_code'			, text : Language.get('item_code'		,'자재코드'		) , width :  70 , align :'center',
					},{ dataIndex : 'item_name'			, text : Language.get('item_name'		,'자재명'			) , width : 180 , align :'left',
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var check = 1;
									if(record.data.acct_bacd != ''){
										if(record.data.acct_bacd == '1002'){
											acct_bacd = '부자재';
										}else{
											acct_bacd = '소모품';
										}
									}else{
										check = 0;
									}
									if(check == 1){
										resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-item-popup-v4',
											params	: { stor_grp : _global.stor_grp, line_stat : '0', acct_bacd : '1002' ,acct : record.data.acct_bacd ,acct_name : acct_bacd, add : '1', find : record.data.item_name},
											result	: function(records) {
												var	parent = records[0],
													store  = Ext.ComponentQuery.query('module-saleorder-lister-subItem')[0].getStore(),
													chk = 1
												;
												store.each(function(findrecord){
													if(findrecord.get('item_idcd') == parent.data.item_idcd){
														Ext.Msg.alert("알림","이미 추가된 자재 입니다.");
														chk = 0;
													}
												});

												if(chk == 1){
													record.set('item_idcd',parent.data.item_idcd);
													record.set('item_name',parent.data.item_name);
													record.set('item_code',parent.data.item_code);
													record.set('item_leng',parent.data.item_leng);
													record.set('item_widh',parent.data.item_widh);
													record.set('item_spec',parent.data.item_spec);
													record.set('mtrl_bacd',parent.data.mtrl_bacd);
													record.set('mtrl_bacd_name',parent.data.mtrl_bacd_name);
												}
											},
										})
									}
								},
								scope : me
							}
						]
					},{ dataIndex : 'mtrl_bacd_name'	, text : Language.get('mtrl_bacd_name'	,'재질'			) , width :  90 , align : 'left', hidden : true
					},{ dataIndex : 'item_spec'			, text : Language.get('item_spec'		,'자재규격'		) , width : 150 , align : 'left',
					},{ dataIndex:  'set_qntt'			, text : Language.get('set_qntt'		,'제품수량/장당'	) , width :  90 , xtype :'numericcolumn',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
						},
					},{ dataIndex:  'need_qntt'			, text : Language.get('need_qntt'		,'수량'			) , width :  90 , xtype :'numericcolumn',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
						},
					},{ dataIndex: 'offr_yorn', text : Language.get('offr_yorn'	,'발주여부'		) , width : 90, xtype:'numericcolumn', hidden : true,
					},{ dataIndex: 'orig_invc_numb', text : Language.get('orig_invc_numb'	,'발주품목'		) , width : 90, xtype:'numericcolumn', hidden : true,
					},{ dataIndex: 'ostt_yorn', text : Language.get('ostt_yorn'	,'출고여부'		) , width : 90, xtype:'numericcolumn', hidden : true,
					}
				]
			}
		;
		return item;
	},

	rowInsert: function(){
		var me			= this,
			grid		= me.up('grid'),
			editor		= Ext.ComponentQuery.query('module-saleorder-worker-editor4')[0],
			field		= editor.getForm().getValues(),
			store		= grid.getStore(),
			record		= undefined,
			lastidx		= store.count(),
			max_seq		= 0,
			chk_seq		= 1
		;
		var invc_numb = field.invc_numb;
		var item_idcd = field.item_idcd;
		if(store.data.length > 0){
			store.each(function(findrecord) {
				if (findrecord.get('line_seqn') > max_seq) {
					chk_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
				}
			});
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hjsys/sale/order/saleorder/get/mtrl_seqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb		: invc_numb,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})

			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					max_seq = result.records[0].count+1
					if(chk_seq >= max_seq){
						max_seq = chk_seq+1;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		record = Ext.create( store.model.modelName , {
			invc_numb	: invc_numb,
			line_seqn	: max_seq,			//순번
			acct_bacd	: '1002',
			prnt_idcd	: item_idcd
		});

		// ROW 추가
		store.add(record);
		grid.plugins[0].startEdit(lastidx , 0);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....

	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var	me		= this,
			myform	= me.up('grid'),
			records	= myform.getSelectionModel().getSelection();

		if ( records[0].get("orig_invc_numb") != '') {
			Ext.Msg.alert("알림", "이미 발주되어 삭제가 불가능합니다.");
			return;
		}

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
	},
	cellEditAfter  : function (lister2, context) {
		var me = this,
			grid = this,
			models = me.getStore().getRange(),
			pos = me.view.getSelectionModel().getCurrentPosition().row,
			need_qntt = me.getSelectionModel().getSelection()[0].data.need_qntt,
			set_qntt = me.getSelectionModel().getSelection()[0].data.set_qntt,
			editor = Ext.ComponentQuery.query('module-saleorder-worker-editor4')[0],
			values = editor.getForm().getValues(),
			invc_qntt = values.need_qntt,
			acpt_qntt = values.acpt_qntt
		;
		if(context.field =="set_qntt"){
			if(set_qntt < 0){
				models[pos].set('need_qntt',0);
				grid.plugins[0].startEdit(pos,7)
				return;
			}else{
				models[pos].set('need_qntt',invc_qntt*set_qntt);
				grid.plugins[0].startEdit(pos+1, 7)
			}
		}
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
