Ext.define('module.sale.project.salework.view.SaleWorkListerPopup', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salework-lister-popup',
	store		: 'module.sale.project.salework.store.SaleWorkListerPopup',
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	border		: 0,
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
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
						handler: me.rowInsert
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
						handler: me.rowDelete
					},
					'->' ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cofm_date'	, text : Language.get('cofm_date'	,'확정일자'		) , width : 80 , align : 'center',hidden:true
					},{ dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'순번'		)			, width : 80 , align : 'center'
					},{ dataIndex: 'invc_numb'	, text : Language.get('mold_numb'	,'금형번호'		)		, width : 80 , align : 'center'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '금형번호 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var form		= me.up('window').down('form'),
										form_values		= form.getValues()
									;
									if(form_values.cstm_idcd!=""){
										resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'module-salework-pjodpopup',
											params:{
												cstm_idcd : form_values.cstm_idcd
											},
											result	: function(records) {
												var	parent = records[0];

												Ext.Ajax.request({
													url		: _global.location.http() + '/sale/project/salework/get/sale_work_tax_v1.do',
													params	: {
														token : _global.token_id,
														param : JSON.stringify({
															stor_id	: _global.stor_id,
															invc_numb : parent.data.pjod_idcd
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
															if(result.records.length){
																var store = grid.getStore();
																var length = grid.getStore().data.items.length;
																var items = grid.getStore().data.items;
																var chk = 0;
																for (var int = 0; int < length-1; int++) {
																	if(items[int].data.invc_numb == result.records[0].invc_numb
																		&& items[int].data.amnd_degr == result.records[0].amnd_degr){
																		Ext.Msg.alert("알림","이미 등록되어 있습니다.");
																		chk = 1;
																		break;
																	}
																}
																if(!chk){
																	record.set('invc_numb',parent.data.pjod_idcd);
																	record.set('amnd_degr',result.records[0].amnd_degr);
																	record.set('plan_amnt',result.records[0].plan_amnt);
																	record.set('ttsm_amnt',result.records[0].ttsm_amnt);
																	record.set('notp_amnt',result.records[0].notp_amnt);
																	record.set('item_idcd',result.records[0].item_idcd);
																}
															}
														}
													},
													failure : function(result, request) {
													},
													callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
													}
												});
											},
										})
									}else{
										Ext.Msg.alert("알림","거래처를 선택해주십시오.");
									}
								},
								scope : me
							}
						]
					},{	dataIndex: 'amnd_degr'	, text : Language.get('amnd_degr'		,'차수'			) , width :  100 , align : 'center'
					},{	dataIndex: 'plan_amnt'	, text : Language.get('plan_amnt'	,'계획금액'		) , width : 100 , xtype : 'numericcolumn',hidden:true
					},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'계산서발행'		) , width : 120, xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'notp_amnt'	, text : Language.get('notp_amnt'	,'미발행잔액'		) , width : 120 , xtype : 'numericcolumn', summaryType: 'sum',hidden:true
					},{	dataIndex: 'item_idcd'	, text : Language.get('item_idcd'	,'품목ID'		) , width : 100 ,hidden : true
					},{	dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'발행금액'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true
						},
						summaryRenderer: function(value, summaryData, field) {
							var window	= me.up('window');
								form	= window.down('form')
							;
							var val = Math.floor(value/10)+'0';
							form.down('[name=sale_amnt]').setValue(val);
							return value;
						}
					}
				]
			}
		;
		return item;
	},
	/******************************************************************
	 * 추가하기 위해 ROW를 생성하고, Focus를 옮긴다.(Ctrl+ Insert or 행추가 버튼)
	 ******************************************************************/
	rowInsert: function(){
		var me			= this,
			myform		= me.up('window').down('grid'),
			store		= me.up('window').down('grid').getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
//			master		= Ext.ComponentQuery.query('module-eposetstoreschd-lister-mst')[0],
			select		= myform.getSelectionModel().getSelection()[0],
			lastidx		= store.count(),
			form		= me.up('window').down('form'),
			form_values		= form.getValues()
		;
		if(form_values.cstm_idcd!=""){
			max_seq = 0;
			store.each(function(findrecord) {
				if (findrecord.get('line_seqn') > max_seq) {
					max_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
				}
			});
			max_seq = max_seq + 1;
			record = Ext.create( store.model.modelName , {
				cofm_date	: Ext.util.Format.date(new Date(),'Ymd') ,	//
				line_seqn	: max_seq,	//
				modify		: 'Y',
			});

	//			record.recalculation(editor.getRecord());

			// ROW 추가
			store.add(record);

			myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
		}else{
			Ext.Msg.alert("알림","거래처를 선택해주십시오.");
		}
	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('window').down('grid'),
			records = myform.getSelectionModel().getSelection();
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
	}
});