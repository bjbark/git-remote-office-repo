Ext.define('module.custom.komec.prod.workbook.view.WorkBookMtrlPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-komec-workbook-mtrl-popup',
	alias	: 'widget.module-komec-workbook-mtrl-popup',
	store	: 'module.custom.komec.prod.workbook.store.WorkBookMtrlPopup',

	title	: Language.get('mtrl_popup','자재투입'),
	closable: true,
	autoShow: true,
	width	: 950,
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
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	searchForm: function(){
		var me		= this
		;
		var	form	= {
			xtype		: 'panel',
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'top',
					items	: [
						{	xtype	: 'container',
							border	: 0,
							style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
							region	: 'center',
							flex	: 1,
							layout	: 'fit',
							height	: 60,
							margin	: '0 5 0 1',
							items	: [
								{	xtype		: 'textfield',
									labelSeparator : '',
									name		: 'bar_code',
									cls			: 'textTemp',
									height		: 60,
									emptyText	: '바코드를 스캔해주세요.',
									labelStyle	: 'text-align:right;font-size:2.5em !important;line-height:50px;',
									fieldStyle	: 'text-align:center;font-size:2.5em !important;line-height:40px;',
									enableKeyEvents : true,
									listeners	:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER ) {
												var	grid  = me.down('grid'),
													store = me.down('grid').getStore(),
													idx   = store.find('lott_numb',this.getValue())
												;
												if(idx == -1){
													me.addMtrl(this.getValue());
												}else{
													grid.getSelectionModel().select(idx,true);
												}
												this.setValue('');
											}
										}
									}
								}
							]
						}
					]
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
				}
			],
			layout			: { type: 'vbox' },
			fieldDefaults	: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items			: [
				// 기타 검색 조건이 필요한 경우
			]
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
				selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
				features: [{ftype :'grid-summary'}],
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create(me.store),
				dockedItems	: {
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
					    {text : '<span class="btnTemp">'+Language.get('delete'	,'삭제') +'</span>', iconCls: Const.DELETE.icon, handler : me.deleteAction, cls: 'button1-style', width: 120, height : 50}
					    ,'->',
					    {text : '<span class="btnTemp">'+Language.get('delete'	,'소분') +'</span>', handler : me.divAction ,cls: 'button1-style', width: 120, height : 50}
						,'->',
						,'-',
						{xtype: 'button' , text : '<span class="btnTemp">저장</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style', width: 150,height:50},'-',
						{xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style', width: 150,height:50}
					]
				},
				columns: [
					{	dataIndex: 'istt_date'	, text : Language.get(''	,'입고일자'	) , width : 140, align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'lott_numb'		, text : Language.get(''		,'lotNo'	) , width : 240 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'	,'품명'	) , flex : 1 , minWidth : 240 , align : 'left',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'stok_qntt'		, text : Language.get(''		,'재고수량'		) , width : 120, xtype:'numericcolumn', format	: '#,##0.###',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return Ext.util.Format.number(value, '#,##0.###');
						},
					},{	dataIndex: 'ivst_qntt'		, text : Language.get(''		,'사용량'	) , width : 120 , xtype:'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return Ext.util.Format.number(value, '#,##0.###');
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
									var	trigger1 = Ext.dom.Query.select('.barcodeMtrlTrigger')[0];
									var	grids = me.down('grid'),
										select = grids.getSelectionModel().getSelection()[0]
									;
									var dvcd = "2";
									if(_global.login_pk=="RE122"){
										dvcd = "2";
									}else if( _global.login_pk=="RE63"){
										dvcd = "3";
									}
									var value = 0;
									Ext.Ajax.request({
										url			: _global.api_host_info + '/' + _global.app_site + '/custom/komec/prod/workbook/get/weight.do',
										method		: "POST",
										async		: false,
										params		: {
											token	: _global.token_id,
											param	: Ext.encode({
												dvcd	: dvcd,
											})
										},
										success : function(response, request) {
											var object = response,
												result = Ext.decode(object.responseText)
											;
											if(result.records.length>0){
												value = result.records[0].param;
											}
										},
										failure : function(response, request) {
											resource.httpError(response);
										},
										callback : function() {
										}
									});
									this.popup.params = { stor_grp : _global.stor_grp,value : value};
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
									select.set('ivst_qntt',records[0].result);
								},
							},
							trigger1Cls : 'hideCls barcodeMtrlTrigger',
						}
					}
				]
			}
		;
		return grid;
	},


	/**
	 * 조회
	 */
	selectAction: function(bar_code){
		var me		= this,
			store	= me.down('grid').getStore(),
			param	= me.popup.param
		;
		//TODO 바코드 읽고와서 데이터 add해줘야함.
		store.load({
			params		: {
				param:JSON.stringify({
					hq_id     : _global.hq_id,
					invc_numb : param.invc_numb,
					line_seqn : param.line_seqn
				})
			},
			scope		: me,
			callback	: function(records, operation, success) {
			}
		});
	},
	addMtrl : function(value){
		var	me    = this,
			grid  = me.down('grid'),
			store = grid.getStore()
		;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/komec/prod/workbook/get/lottCheck.do',
			method		: "POST",
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					lott_numb	: value,
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records[0].lott_numb ===  value){
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/komec/prod/workbook/get/barcodeMtrl.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								lott_numb	: value,
								invc_numb   : me.popup.param.invc_numb,
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if(result.records.length>0){
								var records = result.records[0],
									invc_numb = me.popup.param.work_numb,
									idx = 1
								;
								if(store.max('line_seqn')!= undefined){
									idx = store.max('line_seqn')+1;
								}
								var record = Ext.merge({
									invc_numb : invc_numb,
									line_seqn : idx,
								},records);
								var model = Ext.create(store.model.modelName,record);
								store.add(model);
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
						}
					});
				}else{
					Ext.Msg.alert("알림","먼저 입고된 제품이 있습니다.");
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
	},

	divAction:function(){
		var	me = this,
			lister = me.up('grid'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			console.log(select);
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				itemId : 'div',
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('divs_lott','소분LOT'),
						name		: 'divs_lott',
						xtype		: 'textfield',
						allowBlank	: false,
						emptyText	: Const.invalid.emptyValue,
						width		: 535,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field requiredindex',
						cls			: 'textTemp',
					},{	fieldLabel	: Language.get('divs_qntt','소분수량'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						allowBlank	: false,
						emptyText	: Const.invalid.emptyValue,
						name		: 'divs_qntt',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field requiredindex',
						cls			: 'textTemp',
						width		: 548,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.options.work_book_tema+'searchTrigger',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						handleMouseEvents:true,
						listeners:{
							render:function(field ){
								field.getEl().on('click', function( event, el ) {
									var trigger1 = Ext.dom.Query.select('.divs_qntt_trigger')[0];
									Ext.get(trigger1).dom.click();
								});
							}
						},
						popup: {
							select	: 'SINGLE',
							widget	: 'lookup-keypad-popup',
							params	: { stor_grp : _global.stor_grp},
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].result);
							}
						},
						trigger1Cls : 'hideCls divs_qntt_trigger',
					},{	fieldLabel	: Language.get('unit_idcd','단위명'),
						name		: 'unit_idcd',
						xtype		: 'textfield',
						hidden		: true,
					},
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var values = this.up('form').getValues();
							var message = "";
							if(this.up('form').getForm().isValid()){
								if(values.divs_qntt < 1){
									message = "수량을 확인해주세요.";
								}
							}else{
								message = "입력 값을 확인해주세요.";
							}
							if(values.divs_qntt > select.get('stok_qntt')){
								message = "수량을 확인해주세요.";
							}
							if(message!=""){
								var msg = Ext.MessageBox.show({        
									title: '<span style="font-size:2em !important;line-height: 20px;">Error</span>',
									msg: '<span style="font-size:3em !important;line-height: 25px;">'+message+'</span>',
									icon: Ext.MessageBox.ERROR,
									closable: false
								});
								setTimeout(function(){
									msg.close();
								}, 1000);
								return;
							}else{
								var wind = this.up('window');
								Ext.Ajax.request({
									url			: _global.api_host_info + '/' + _global.app_site + '/custom/komec/prod/workbook/set/div.do',
									method		: "POST",
									async		: false,
									params		: {
										token	: _global.token_id,
										param	: Ext.encode({
											invc_numb	: select.get('invc_numb'),
											lott_numb	: select.get('lott_numb'),
											divs_qntt	: values.divs_qntt,
											divs_lott	: values.divs_lott,
										})
									},
									success : function(response, request) {
										var object = response,
											result = Ext.decode(object.responseText)
										;
										lister.getStore().reload();
										wind.close();
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
									}
								});
							}

						}
					},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').destroy();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">소분</span>',
				closeAction: 'destroy',
				width: 650,
				height: 300,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
		}else{

		}
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me			= this,
			panel		= me.down('grid'),
			store		= panel.getStore()
		;
		store.sync({
			success : function(operation){ me.close()},
			failure : function(operation){ },
			callback : function(results, record ) {
				if (results.success) {
				}
			},
			finished : function(results, record, operation){
				if (results.success){
				}
			}
		});
	},
	deleteAction : function(){
		var me			= this,
			grid		= me.ownerCt.ownerCt
			select		= grid.getSelectionModel().getSelection()[0],
			store		= grid.getStore()
		;
		console.log(grid);
		console.log(select);
		if(select){
			store.remove(select);
		}
	}
});
