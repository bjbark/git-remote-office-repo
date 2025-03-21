Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastBomLister', { extend : 'Axt.grid.Panel',
	alias		: 'widget.module-fabcmast-bomlister',
	store		: 'module.custom.iypkg.item.fabcmast.store.FabcMastBomLister',

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
				items	: [
					{	dataIndex:	'mixx_dvcd'		, width: 150, align : 'left'   , text: Language.get( 'mixx_dvcd'	, '배합구성'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup('mixx_dvcd'),
						editor	: {
							xtype		:'lookupfield',
							lookupValue : resource.lookup('mixx_dvcd'),
							selectOnFocus: true,
							allowBlank	: true,
						}
					},{	dataIndex:	'pper_name'		, width: 250, align : 'left'   , text: Language.get( 'pper_name'	, '원지명'		), name : 'pper_name'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						allowBlank	: true,
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '원지찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-pper-popup',
										title	: '원지찾기',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records) {
											var	parent          = records[0],
												editor          = Ext.ComponentQuery.query('module-fabcmast-editor')[0],
												fabc_name_field = editor.down('[name=fabc_name]'),
												stnd_pric_field = editor.down('[name=stnd_pric]'),
												fabc_name       = fabc_name_field.getValue()
											;
											
											record.set('pper_idcd',parent.data.pper_idcd);
											record.set('pper_name',parent.data.pper_name);
											record.set('pnyg_volm',parent.data.pnyg_volm);
											record.set('stnd_pric',parent.data.mxm2_pric);
											if(fabc_name.length > 0){
												fabc_name_field.setValue(fabc_name+"."+parent.data.pper_name);
											}else{
												fabc_name_field.setValue(parent.data.pper_name);
											}
											var stnd_pric = stnd_pric_field.getValue();
											stnd_pric_field.setValue(stnd_pric?stnd_pric:0+parent.data.mxm2_pric);
											
											editor.down('[name=change]').setValue('Y');
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'pnyg_volm'		, width: 100, align : 'right' , text: Language.get( 'pnyg_volm'	, '평량g/m2'	), xtype: 'numericcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
						}
					},{	dataIndex:	'stnd_pric'		, width: 100, align : 'right' , text: Language.get( 'stnd_pric'	, '표준단가/m2'), xtype: 'numericcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
						}
					},{	dataIndex:	'pper_idcd'		, hidden : true
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
							if(records.length != 0){
								Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
									fn : function (button) {
										if (button==='yes') {
											me.getStore().remove (records);
										}
									}
								});
							}
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
		if(records.length != 0){
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					me.getStore().remove(records);
					Ext.ComponentQuery.query('module-fabcmast-editor')[0].down('[name=change]').setValue('Y');
				}
			}
		});
		}
	},

});
