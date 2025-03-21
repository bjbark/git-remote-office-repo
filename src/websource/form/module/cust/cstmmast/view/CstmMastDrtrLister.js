Ext.define('module.cust.cstmmast.view.CstmMastDrtrLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmmast-drtr-lister',
	store		: 'module.cust.cstmmast.store.CstmMastDrtr',
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
					{	dataIndex:	'drtr_name'				, width:  80, align : 'left'   , text: Language.get( 'drtr_name'	, '담당자명'		),
						editor	: {
							maxLength		: 20,
							maxLengthText	: '한글 20자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'wkps_name'				, width:  80, align : 'left'   , text: Language.get( 'wkps_name'	, '직위'			),
						editor	: {
							maxLength		: 100,
							maxLengthText	: '한글 100자 이내로 작성하여 주십시오.',
							selectOnFocus	: false,
							allowBlank		: true
						}
					},{	dataIndex:	'dept_name'				, width: 120, align : 'left'   , text: Language.get( 'dept_name'	, '부서명'		),
						editor	: {
							maxLength		: 100,
							maxLengthText	: '한글 100자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'drtr_tele_numb'		, width: 100, align : 'left'   , text: Language.get( 'tele_numb'	, '전화번호'		),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'drtr_hdph_numb'		, width: 100, align : 'left'   , text: Language.get( 'hdph_numb'	, '휴대폰번호'	),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'drtr_faxi_numb'		, width: 100, align : 'left'   , text: Language.get( 'faxi_numb'	, '팩스번호'		),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'drtr_mail_addr'		, width: 180, align : 'left'   , text: Language.get( 'mail_addr'	, '이메일'		),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'drtr_dvcd'				, width: 100, align : 'left'   , text: Language.get( 'drtr_oprt'	, '담당업무'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'drtr_dvcd' ),
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('drtr_dvcd'),
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'rpst_drtr_yorn'		, width:  70, align : 'left'   , text: Language.get( 'rpst_drtr_yorn', '대표담당'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'remk_text'				, flex :   1, align : 'left'   , text: Language.get( 'remk_text'	, '비고'			),
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
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;

			if(field === 'istt_qntt' && value > 999999){
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
			Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
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
			mlister		= Ext.ComponentQuery.query('module-cstmmast-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-cstmmast-editor')[0]
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
		Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
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
		Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
	},
 });





