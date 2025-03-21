Ext.define('module.custom.hjsys.prod.workentry.view.WorkEntryMtrlPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-hjsys-workenty-mtrl-popup',
	alias	: 'widget.module-hjsys-workenty-mtrl-popup',
	store	: 'module.custom.hjsys.prod.workentry.store.WorkEntryMtrlPopup',

	title	: Language.get('mtrl_popup','자재투입'),
	closable: true,
	autoShow: true,
	width	: 665,
	height	: 850,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;

		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				cls: _global.options.work_book_tema+'grid',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
				features: [{ftype :'grid-summary'}],
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create(me.store),
				dockedItems	: {
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
						'->' ,
						{xtype: 'button' , text : '<span class="btnTemp">확인</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style', width: 150,height:50},'-',
						{xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style', width: 150,height:50}
					]
				},
				columns: [
					{	dataIndex: 'acct_bacd'		, text : Language.get('acct_bacd'		,'구분'		) , width : 120, align : 'center', xtype:'lookupcolumn', lookupValue : [["1001","원자재"],["1002","부자재"]],
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'자재명'		) , width : 180, align : 'center', xtype:'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'base_qntt'		, text : Language.get('base_qntt'		,'재고수량'		) , width : 100, align : 'center', xtype:'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'useqntt'		, text : Language.get(''				,'재고발주사용'	) , width : 110 , align : 'center', xtype:'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'qntt'			, text : Language.get(''		,'사용량'	) , width : 120 , xtype:'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return Ext.util.Format.number(value, '0,000');
						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(comp,event){
									var	trigger1 = Ext.dom.Query.select('.mtrlTrigger')[0];
									var	grids = me.down('grid'),
										select = grids.getSelectionModel().getSelection()[0]
									;
									if(select.get('unit_name')=="시각"){
										this.popup.params = { stor_grp : _global.stor_grp, dvcd:1};
									}else{
										this.popup.params = { stor_grp : _global.stor_grp};
									}
									Ext.get(trigger1).dom.click();
								}
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									var grids = me.down('grid');
									var select = grids.getSelectionModel().getSelection()[0];
									select.set('qntt',records[0].result);
								}
							},
							trigger1Cls : 'hideCls mtrlTrigger',
						}
					},{	dataIndex: 'line_seqn'		, hidden : true, name : 'line_seqn'
					}
				],
				listeners: {
//					itemdblclick: function(dataview, index, item, e) {
//						me.finishAction();
//					},
//					 render: function(){
//						var me = this ;
//						new Ext.util.KeyMap({
//							target		: me.getEl(),
//							eventName	: 'keyup',
//							binding		: [
//								{	key: Ext.EventObject.ENTER,
//									fn: function(key,e){
//										me.fireEvent('itemdblclick', me.getView() );
//									}
//								}
//							]
//						});
//					}
				}
			}
		;
		return grid;
	},


	selectAction: function(){
		var me		= this,
			store	= me.down('grid').getStore(),
			editor	= Ext.ComponentQuery.query('module-workentry-editor')[0]
		;
		var pror_numb = editor.down('[name=pror_numb]').getValue();
		store.load({
			params		: {param:JSON.stringify({
				hq_id		: _global.hq_id,
				invc_numb	: pror_numb.split('-')[0],
				prnt_idcd	: editor.down('[name=item_idcd]').getValue() })},
			scope		: me,
			callback	: function(records, operation, success) {
			}
		});
	},

	finishAction: function(){
		var me			= this,
			panel		= me.down('grid'),
			store		= panel.getStore(),
			changes		= store.getUpdatedRecords().length,
			editor		= Ext.ComponentQuery.query('module-workentry-editor')[0]
		;

		var pror_numb = editor.down('[name=pror_numb]').getValue();
		for (var i = 0; i < changes; i++) {
			var seqn = 0;
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hjsys/prod/workentry/get/seqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb		: pror_numb.split('-')[0],
						line_seqn		: store.data.items[0].data.line_seqn
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
					} else {
						seqn = result.records[0].seqn;
						if(result.records.length == '0'){
						}else{
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			store.getUpdatedRecords()[i].data.wkct_idcd = me.popup.params.wkct_idcd;
			store.getUpdatedRecords()[i].data.seqn = seqn;
		}
		store.sync({
			success : function(operation){ me.close()},
			failure : function(operation){ },
			callback : function(results, record ) {
				if (results.success) {
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					console.log('성공');
				}
			}
		});
		return;
	},
});
