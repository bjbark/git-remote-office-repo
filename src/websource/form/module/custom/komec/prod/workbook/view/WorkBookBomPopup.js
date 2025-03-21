Ext.define('module.custom.komec.prod.workbook.view.WorkBookBomPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-komec-workbook-bom-popup',
	alias	: 'widget.module-komec-workbook-bom-popup',
	store	: 'module.custom.komec.prod.workbook.store.WorkBookBomPopup',

	title	: '<span style="font-size:1.5em !important;">'+Language.get('cast_popup','BOM 수정')+'</span>',
	closable: true,
	autoShow: true,
	width	: 1010,
	height	: 850,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
//		Ext.Ajax.request({
//			url		: _global.location.http() + '/custom/komec/prod/workbook/get/bomsearch.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					stor_id			: _global.stor_id,
//					hqof_idcd		: _global.hqof_idcd
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				if	(!result.success ){
//					return;
//				} else {
//					for(var i =0; i<result.records.length;i++){
//						wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_name]);
//					}
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//			}
//		});
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

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				cls: _global.options.work_book_tema+'grid',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel: {selType:'cellmodel'},
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
					{	dataIndex: 'acct_name'		, text : Language.get(''		,'계정구분'	) , width : 80 , align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'item_code'		, text : Language.get(''		,'품목코드'	) , width : 130, align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'item_name'		, text : Language.get(''		,'품명'		) , width : 350 , align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'item_spec'		, text : Language.get(''		,'규격'		) , width : 250  , align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'mixx_rate'		, text : Language.get(''		,'배합비율'	) , width : 135 , align : 'right',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.Cast_trigger2')[0];
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
									select.set('mixx_rate',records[0].result);
								}
							},
							trigger1Cls : 'hideCls Cast_trigger2',
						}
					}
				],
			}
		;
		return grid;
	},


	/**
	 * 조회
	 */
	selectAction: function(){
		var me		= this,
			store	= me.down('grid').getStore(),
			search	= Ext.ComponentQuery.query('module-komec-workbook-search')[0],
			value	= search.getValues(),
			select	= Ext.ComponentQuery.query('module-komec-workbook-detail')[0].getSelectionModel().getSelection()[0]
		;
		store.load({
			params		: {
				param:JSON.stringify({
					hq_id     : _global.hq_id,
					invc_numb : me.popup.params.invc_numb
				})
			},
			scope		: me,
			callback	: function(records, operation, success) {
			}
		});
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me			= this,
			panel		= me.down('grid'),
			store		= panel.getStore()
		;

		Ext.each(store.getUpdatedRecords(),function(rec){
//			rec.set('invc_date',Ext.Date.format(new Date(),'Ymd'));
//			rec.set('wkct_idcd',me.popup.params.wkct_idcd);
			rec.set('invc_numb',me.popup.params.invc_numb);
		});
		store.sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback : function(results, record ) {
				if (results.operations[0].success) {
					me.destroy();
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.destroy();
				}
			}
		});
	},
});
