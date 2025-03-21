Ext.define('module.prod.basic.wkctmast.view.WkctMastOtodLister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-wkctmast-otod-lister2',
	store		: 'module.prod.basic.wkctmast.store.WkctMastOtod2',
	border		: 0,
	columnLines	: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					}
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	''				, width:  60, align : 'center'   , text: Language.get( ''	, '상태'		),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	''				, width: 100, align : 'left'     , text: Language.get( ''	, '수량'		),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	''				, width: 100, align : 'right'    , text: Language.get( ''	, '구매단가'	),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	''				, width:  80, align : 'left'     , text: Language.get( ''	, '수량단위'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '수량단위 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8001', tema : ''},
										result	: function(records) {
											var	parent = records[0];
											record.set('item_clss_bacd',parent.data.base_code);
											record.set('item_clss_bacd_name',parent.data.base_name);
										}
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	''				, width: 180, align : 'left'     , text: Language.get( ''	, '비고'		),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					}
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
	},

	listeners: {
//		validateedit : function (editor, context, eOpts ) {
//			var me = this;
//			var field = context.field;
//			var value = context.value;
//
//			if(field === 'istt_qntt' && value > 999999){
//				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
//					fn : function (button) {
//						if (button==='yes') {
//							context.record.set(field, context.value);
//							me.cellEditAfter(editor, context);
//						}
//					}
//				});
//				return false;
//			}
//
//			return true;
//		},

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-wkctmast-editor')[0].down('[name=change]').setValue('Y');
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
					/* Ctrl + Insert */
					{	ctrl:true, key: 45,
						fn: function(key,e){
							me.appendRow({});
						}
					},
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
	},

	/**
	 * 새로운 Line을 추가한다....(자료 입력은 그리드에서 직접 입력한다.)
	 */
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			mlister		= Ext.ComponentQuery.query('module-wkctmast-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-wkctmast-editor')[0]
		;
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;
		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			cstm_idcd		: editor.getValues().cstm_idcd,
			drtr_name		: '',
			wkps_name		: '',
			dept_name		: '',
			tele_numb		: '',
			hdph_numb		: '',
			faxi_numb		: '',
			mail_addr		: '',
			remk_text		: '',
			drtr_dvcd		: '',
			rpst_drtr_yorn	: '1'
		});
		Ext.ComponentQuery.query('module-wkctmast-editor')[0].down('[name=change]').setValue('Y');
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					me.getStore().remove (records);
				}
			}
		});
		Ext.ComponentQuery.query('module-wkctmast-editor')[0].down('[name=change]').setValue('Y');
	},
 });





