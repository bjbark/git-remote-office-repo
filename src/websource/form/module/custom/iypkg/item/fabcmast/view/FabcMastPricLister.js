Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastPricLister', { extend : 'Axt.grid.Panel',
	alias		: 'widget.module-fabcmast-priclister',
	store		: 'module.custom.iypkg.item.fabcmast.store.FabcMastPricLister',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	dataIndex:	'cstm_name'			, width:  200, align : 'left'   , text: Language.get( 'cstm_name'	, '거래처명'		)
					},{	xtype	: 'actioncolumn',
							header	: '',
							width	: 20,
							align	: 'center',
							items	: [
								{	iconCls	: Const.SELECT.icon,
									tooltip	: '거래처명 찾기',
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-cstm-popup',
											params:{ stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn:'1' },
											result	: function(records) {
												var	parent = records[0],
													editor = Ext.ComponentQuery.query('module-fabcmast-editor')[0],
													fabc   = editor.down('[name=fabc_idcd]').getValue()
												;
												record.set('cstm_idcd',parent.data.cstm_idcd);
												record.set('cstm_name',parent.data.cstm_name);
												Ext.Ajax.request({
													url		: _global.location.http() + '/custom/iypkg/item/fabcmast/get/cstmpric.do',
													params	: {
														token : _global.token_id,
														param : JSON.stringify({
															cstm_idcd	: parent.data.cstm_idcd,
															fabc_idcd	: fabc
														})
													},
													async	: false,
													method	: 'POST',
													success	: function(response, request) {
														var result = Ext.decode(response.responseText);
														if	(!result.success ){
															return;
														} else {
															var pric = result.records[0].puch_pric;
															record.set('befr_pric',pric);
														}
													},
													failure : function(result, request) {
													},
													callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
													}
												});
												Ext.ComponentQuery.query('module-fabcmast-editor')[0].down('[name=change]').setValue('Y');

											},
										})
									},
									scope : me
								}
							]
					},{	dataIndex:	'puch_pric'		, width: 100, align : 'right'  , text: Language.get( 'puch_pric'	, '단가/m2'	), xtype: 'numericcolumn',
						editor	: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'adpt_date'		, width: 100, align : 'center' , text: Language.get( 'adpt_date'	, '적용일자'), xtype : 'datecolumn',
						editor	: {
							xtype			:'datefield',
							allowBlank		: false,
							format			: Const.DATE_FORMAT_YMD_BAR,
						},
						renderer:function(val){
							a = Ext.util.Format.strToDate(val);
							return a;
						}
					},{	dataIndex:	'befr_pric'		, width: 100, align : 'right'  , text: Language.get( 'befr_pric'	, '이전단가/m2'), xtype: 'numericcolumn'
					},{	dataIndex:	'updt_dttm'		, width: 100, align : 'center' , text: Language.get( 'updt_dttm'	, '변경일자'),
						renderer:function(val){
							var value;
							if(val != ''){
								value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							}else{
								value = '';
							}
							return value;
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

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-fabcmast-editor')[0].down('[name=change]').setValue('Y');
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
							me.lineInsert({});
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
			mlister		= Ext.ComponentQuery.query('module-fabcmast-master')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor		= Ext.ComponentQuery.query('module-fabcmast-editor')[0]
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
			fabc_idcd		: editor.down('[name=fabc_idcd]').getValue(),
			adpt_date		: Ext.Date.format(new Date(), 'Ymd'),
			updt_dttm		: Ext.Date.format(new Date(), 'Ymd')
//			puch_pric		: editor.down('[name=]').getValue()
		});
		editor.down('[name=change]').setValue('Y');
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records[0]){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
						Ext.ComponentQuery.query('module-fabcmast-editor')[0].down('[name=change]').setValue('Y');
					}
				}
			});
		}
	},

 });





