Ext.define('module.item.colormix.view.ColorMixItemLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-colormix-item-lister',
	store		: 'module.item.colormix.store.ColorMixItem',
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
					{	dataIndex : 'line_seqn' , width :  70, align : 'center' , text: Language.get( 'line_seqn' , '배합순서' ),
						editor	: {
							maxLength		: 20,
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex : 'detail_chge_degr' , width : 250, align : 'left' , text: Language.get( 'detail_chge_degr' , '차수' ), hidden: true
					},{	dataIndex : 'detail_item_name' , width : 250, align : 'left' , text: Language.get( 'detail_item_name' , '안료 및 첨가제' ),
						editor	: {
							maxLength		: 100,
							maxLengthText	: '한글 100자 이내로 작성하여 주십시오.',
							selectOnFocus	: false,
							allowBlank		: true
						}
					},{	dataIndex : 'detail_unit_perc_wigt' , width : 80, align : 'right' , text: Language.get( 'detail_unit_perc_wigt' , '단위당중량' ),
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex : 'detail_wigt_unit' , width :  80, align : 'left' , text: Language.get( 'detail_wigt_unit' , '단위' ),
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
		var me = this
			editor.grid.view.getSelectionModel().onKeyDown()
		;
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			Ext.ComponentQuery.query('module-colormix-editor')[0].down('[name=change]').setValue('Y');
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
										Ext.ComponentQuery.query('module-colormix-editor')[0].down('[name=change]').setValue('Y');
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
			mlister		= Ext.ComponentQuery.query('module-colormix-lister-master')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-colormix-editor')[0]
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
			line_seqn				: seq,
			prnt_item_idcd			: editor.getValues().prnt_item_idcd,
			chge_degr				: editor.getValues().chge_degr,
			detail_item_name		: '',
			detail_unit_perc_wigt	: '',
			detail_wigt_unit		: ''
		});
		Ext.ComponentQuery.query('module-colormix-editor')[0].down('[name=change]').setValue('Y');
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
		Ext.ComponentQuery.query('module-colormix-editor')[0].down('[name=change]').setValue('Y');
	},
});