Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2NegoPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast2-nego-popup',
	store		: 'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2NegoPopup',

	title		: 'NEGO 등록',
	closable	: true,
	autoShow	: true,
	width		: 890 ,
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
									},{	xtype		: 'textfield', name : 'invc_numb',hidden :true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('mney_unit','화폐단위'),
										xtype		: 'lookupfield',
										name		: 'mney_unit',
										lookupValue	: resource.lookup('crny_dvcd')
									},{	fieldLabel	: Language.get('exrt','적용환율'),
										xtype		: 'numericfield',
										name		: 'exrt',
									}
								]
							},
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
							{   text : Language.get( 'line_seqn'	,'항번'		),   dataIndex: 'line_seqn'	,width: 60  ,align:'center'},
							{   text : Language.get( 'item_code'	,'품목코드'	),   dataIndex: 'item_code'	,width: 100 ,align:'center'},
							{   text : Language.get( 'item_name'	,'품명'		),   dataIndex: 'item_name'	,flex : 1 , minWidth: 160 ,align:'left'},
							{   text : Language.get( 'item_spec'	,'규격'		),   dataIndex: 'item_spec'	,width: 160 ,align:'left'},
							{   text : Language.get( 'qntt'			,'수량'	 	),   dataIndex: 'qntt'		,width: 60  ,xtype:'numericcolumn',summaryType:'sum'},
							{	text: Language.get(''	,'업체커미션'		), dataIndex : 'mtrl'	, align : 'center',
								columns: [
									{   text : Language.get( 'cmis_pric'	,'kg당 가격' 	),   dataIndex: 'cmis_pric'	,width: 80  ,xtype:'numericcolumn',
										tdCls	: 'editingcolumn',
										editor	: {
											xtype		:'numericfield',
											selectOnFocus: true,
											allowBlank	: false,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
														var grid = self.up('grid'),
															store = me.getStore(),
															selection = me.getSelectionModel().getSelection()[0],
															row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, grid.columns[6]);
													}
												}
											}
										}
									},{	text : Language.get( 'cmis_amnt'	,'금액' 			),   dataIndex: 'cmis_amnt'	,width: 80  ,xtype:'numericcolumn',summaryType:'sum',
										tdCls	: 'editingcolumn',
										editor	: {
											xtype		:'numericfield',
											selectOnFocus: true,
											allowBlank	: false,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
														var grid = self.up('grid'),
															store = me.getStore(),
															selection = me.getSelectionModel().getSelection()[0],
															row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, grid.columns[6]);
													}
												}
											}
										}

									},
								]
							},{	text: Language.get(''	,'Net가(마진)'		), dataIndex : 'mtrl'	, align : 'center',
								columns: [
									{   text : Language.get( 'pfit_pric'	,'kg당 가격' 	),   dataIndex: 'pfit_pric'	,width: 80  ,xtype:'numericcolumn',
										tdCls	: 'editingcolumn',
										editor	: {
											xtype		:'numericfield',
											selectOnFocus: true,
											allowBlank	: false,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
														var grid = self.up('grid'),
															store = me.getStore(),
															selection = me.getSelectionModel().getSelection()[0],
															row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, grid.columns[6]);
													}
												}
											}
										}
									},
									{   text : Language.get( 'pfit_amnt'	,'금액' 			),   dataIndex: 'pfit_amnt'	,width: 80  ,xtype:'numericcolumn',summaryType:'sum',
										tdCls	: 'editingcolumn',
										editor	: {
											xtype		:'numericfield',
											selectOnFocus: true,
											allowBlank	: false,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
														var grid = self.up('grid'),
															store = me.getStore(),
															selection = me.getSelectionModel().getSelection()[0],
															row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, grid.columns[6]);
													}
												}
											}
										}
									},
								]
							},
						],
						cellEditAfter : function (editor, context) {
							var	me		= this,
								field	= context.field,
								index	= context.rowIdx,
								grid	= context.grid,
								form	= me.ownerCt,
								store	= grid.getStore(),
								models	= grid.getStore().getRange(),
								invc_numb = ''
							;

							if(field=='pfit_pric'){
								models[index].set('pfit_amnt',models[index].get('qntt')*context.value);
							}
							if(field=='cmis_pric'){
								models[index].set('cmis_amnt',models[index].get('qntt')*context.value);
							}

							if(form.down('[name=invc_numb]').getValue()==''){
								Ext.Ajax.request({
									url			: _global.location.http() + '/listener/seq/maxid.do',
									params		: {
										token	: _global.token_id ,
										param	: JSON.stringify({
											stor_id	: _global.stor_id,
											table_nm: 'expt_nego_mast'
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
											invc_numb = result.records[0].seq;
										}
									},
									failure : function(result, request) {
										Ext.Msg.error(result.mesage);
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								form.down('[name=invc_numb]').setValue(invc_numb);
							}
							if(store.getAt(index).get('invc_numb')==''){
								store.getAt(index).set('invc_numb',form.down('[name=invc_numb]').getValue());
							}
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
			store	= grid.getStore(),
			master	= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-lister-master')[0]
		;

		if(	store.getUpdatedRecords().length>0
			|| store.getAt(0).get('exrt') != baseform.down('[name=exrt]').getValue()
			|| store.getAt(0).get('mney_unit') != baseform.down('[name=mney_unit]').getValue()
		){
			Ext.Ajax.request({
				url		: _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/set/nego.do",
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
			store.sync({
			});
			master.getStore().reload();
			baseform.ownerCt.close();
		}else{
			Ext.Msg.alert('알림','변경사항이 없습니다.');
		}
	},
	selection:function(){
		var	me		= this,
			grid	= me.down('grid'),
			form	= me.down('form')
		;
		if(me.params.invc_numb){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });

			mask.show();

			grid.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);
					}
					if(grid.getStore().getAt(0)){
						form.down('[name=exrt]').setValue(grid.getStore().getAt(0).get('exrt'));
						form.down('[name=mney_unit]').setValue(grid.getStore().getAt(0).get('mney_unit'));
						form.down('[name=invc_numb]').setValue(grid.getStore().getAt(0).get('invc_numb'));
					}
					mask.hide();
				}, scope:me
			}, { invc_numb : me.params.invc_numb});


		}
	}
});
