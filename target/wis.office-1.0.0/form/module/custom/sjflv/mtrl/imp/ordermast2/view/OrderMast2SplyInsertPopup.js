Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2SplyInsertPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast2-sply-insert-popup',
	store		: 'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2SplyInsertPopup',

	title		: '공급가 등록',
	closable	: true,
	autoShow	: true,
	width		: 1200 ,
	height		: 400,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
		me.selection();
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var	me	= this,
			form = {
				xtype		: 'form-panel' ,
				bodyStyle	: { padding: '5px' },
				flex		: 1 ,
				height		: 400,
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' , },
				items			: [
					{	xtype   : 'grid-panel',
						header  : false,
						region  : 'center',
						height	: 330,
						viewConfig: {
							loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
						},
						selModel: {selType:'cellmodel'},
						features: [{ftype :'grid-summary'}],
						plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
						store    : Ext.create( me.store ),
						columns: [
							{   text : Language.get( 'line_seqn'	,'항번'		),   dataIndex: 'line_seqn'	, width: 40
							},{   text : Language.get( 'invc_numb'	,''	),   dataIndex: 'invc_numb'	, width: 80,hidden: true
							},{   text : Language.get( 'item_code'	,'품목코드'	),   dataIndex: 'item_code'	, width: 80
							},{   text : Language.get( 'item_name'	,'품명' 		),   dataIndex: 'item_name'	, flex : 1, minWidth: 180
							},{   text : Language.get( 'item_spec'	,'규격'		),   dataIndex: 'item_spec'	, width: 180
							},{   text : Language.get( 'qntt'		,'수량'	),   dataIndex: 'qntt'	, width: 70 , align : 'right',
							},{   text : Language.get( 'exch_pric'	,'판매단가'	),   dataIndex: 'exch_pric'	, width: 80 , align : 'right',xtype:'numericcolumn',
							},{   text : Language.get( 'cmis_pric'	,'Commission'	),   dataIndex: 'cmis_pric'	, width: 90  , align : 'right',xtype:'numericcolumn',
								tdCls	: 'editingcolumn',
								editor	: {
									xtype		:'numericfield',
									selectOnFocus: true,
									allowBlank	: false,
									enableKeyEvents : true,
									listeners:{
										keydown : function(self, e) {
											var grid = self.up('grid'),
												store = grid.getStore(),
												selection = grid.getSelectionModel().getSelection()[0],
												row = store.indexOf(selection)
											;
											if(e.keyCode == 38){
												grid.plugins[0].startEdit(row-1, grid.columns[4]);
											}else if(e.keyCode == 40){
												grid.plugins[0].startEdit(row+1, grid.columns[4]);
											}
										}
									}
								}
							},{   text : Language.get( 'cmis_amnt'	,'Commission Total'	),	dataIndex: 'cmis_amnt'	, width: 115  , align : 'right',xtype:'numericcolumn',
							},{   text : Language.get( 'pfit_pric'	,'Net Price'),			dataIndex: 'pfit_pric'	, width: 90  , align : 'right',xtype:'numericcolumn',
							},{   text : Language.get( 'pfit_amnt'	,'Net Total Price'	),	dataIndex: 'pfit_amnt'	, width: 110 , align : 'right',xtype:'numericcolumn',
							}
						],
						cellEditAfter : function (editor, context) {
							var	me		= this,
								field	= context.field,
								index	= context.rowIdx,
								grid	= context.grid,
								form	= me.ownerCt,
								store	= grid.getStore(),
								select = grid.getStore().getAt(index)
							;
							var		qntt  = select.get('qntt'),
								exch_pric = select.get('exch_pric'),
								cmis_pric = select.get('cmis_pric'),
								cmis_amnt = select.get('cmis_amnt'),
								pfit_pric = select.get('pfit_pric')
								pfit_amnt = select.get('pfit_amnt')
							;

							var
							cmis_amnt2 = (Number(select.get('qntt')) * Number(select.get('cmis_pric')));
							pfit_pric2 = (Number(select.get('exch_pric')) - Number(select.get('cmis_pric')));
							pfit_amnt2 = (Number(select.get('qntt')) * pfit_pric2 );

							select.set('cmis_amnt',cmis_amnt2);
							select.set('pfit_pric',pfit_pric2);
							select.set('pfit_amnt',pfit_amnt2);

							},
							listeners: {
								edit: function(editor, context) {
									var me = this;
									me.cellEditAfter(editor, context);
							},
						},
					}
				]
			};
		return form;
	},


	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			grid	= me.down('grid'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			store	= grid.getStore()
			master	= Ext.ComponentQuery.query('module-ordermast2-lister-master')[0]
		;
//		if(store.getUpdatedRecords().length>0 || me.params.pckg_unit != values.pckg_unit || me.params.pckg_totl_wigt != values.pckg_totl_wigt){
//			if(me.params.pckg_unit != values.pckg_unit || me.params.pckg_totl_wigt != values.pckg_totl_wigt){
				Ext.Ajax.request({
					url		: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast2/set/sply.do",
					params	: {
						token : _global.token_id,
						param : JSON.stringify(values)
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
					},
					failure : function(result, request) {
						Ext.Msg.error(result.mesage);
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
//			}
			store.sync({
			});
			master.getStore().reload();
			baseform.ownerCt.close();
//		}
	},

	selection:function(){
		var	me		= this,
			grid	= me.down('grid')
		;
		if(me.params.invc_numb){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });

			mask.show();

			grid.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, { invc_numb : me.params.invc_numb,amnd_degr : me.params.amnd_degr});

		}
	}
});
