Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2PackingPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast2-packing-popup',
	store		: 'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2PackingPopup',

	title		: 'Packing List 등록',
	closable	: true,
	autoShow	: true,
	width		: 700 ,
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
					{	xtype : 'fieldset', layout: 'vbox', border		: 0, region:'north',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('', 'Order No' ),
										xtype		: 'textfield',
										name		: 'ordr_numb',
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										value		: me.params.invc_numb?me.params.invc_numb:''
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('pckg_unit','Packing Size'),
										xtype		: 'textfield',
										name		: 'pckg_unit',
										value		: me.params.pckg_unit?me.params.pckg_unit:''
									},
									{	fieldLabel	: Language.get('','Gross Weight'),
										xtype		: 'textfield',
										name		: 'pckg_totl_wigt',
										value		: me.params.pckg_totl_wigt?me.params.pckg_totl_wigt:'',
										margin		: '0 0 0 15',
									}
								]
							}
						]
					},{
						xtype   : 'grid-panel',
						header  : false,
						region  : 'center',
						height	: 260,
						viewConfig: {
							loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
						},
						selModel: {selType:'cellmodel'},
						features: [{ftype :'grid-summary'}],
						plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
						store    : Ext.create( me.store ),
						columns: [
							  {   text : Language.get( 'line_seqn'	,'항번'		),   dataIndex: 'line_seqn'	, width: 40
							},{   text : Language.get( 'item_code'	,'품목코드' 	),   dataIndex: 'item_code'	, width: 80
							},{   text : Language.get( 'item_name'	,'품명' 		),   dataIndex: 'item_name'	, flex : 1, minWidth: 180
							},{   text : Language.get( 'item_spec'	,'규격'		),   dataIndex: 'item_spec'	, width: 180
							},{   text : Language.get( 'pckg_size'	,'Packing'	),   dataIndex: 'pckg_size'	, width: 160 ,
								tdCls	: 'editingcolumn',
								editor	: {
									xtype		:'textfield',
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
							},
						],
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
			store	= grid.getStore(),
			master	= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-lister-master')[0]
		;
		if(store.getUpdatedRecords().length>0 || me.params.pckg_unit != values.pckg_unit || me.params.pckg_totl_wigt != values.pckg_totl_wigt){
			if(me.params.pckg_unit != values.pckg_unit || me.params.pckg_totl_wigt != values.pckg_totl_wigt){
				Ext.Ajax.request({
					url		: _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/set/packing.do",
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
			}
			store.sync({
			});
			master.getStore().reload();
			baseform.ownerCt.close();
		}
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
			}, { invc_numb : me.params.invc_numb});

		}
	}
});
