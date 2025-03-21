Ext.define('module.custom.dhtec.prod.workentry.view.WorkEntryMtrlPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-dhtec-workenty-mtrl-popup',
	alias	: 'widget.module-dhtec-workenty-mtrl-popup',
	store	: 'module.custom.dhtec.prod.workentry.store.WorkEntryMtrlPopup',

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
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	searchForm: function(){
		var me		= this,
			search	= Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
			value	= search.getValues()
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
							height	: 60,
							margin	: '0 5 0 1',
							items	: [
								{	xtype		: 'textfield',
									labelSeparator : '',
									name		: 'bar_code',
									cls			: 'textTemp',
									height		: 60,
									width		: 640,
									emptyText	: '바코드를 스캔해주세요.',
									labelStyle	: 'text-align:right;font-size:2.5em !important;line-height:50px;',
									fieldStyle	: 'text-align:center;font-size:2.5em !important;line-height:40px;',
									enableKeyEvents : true,
									listeners	:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER ) {
												var	grid  = me.down('grid'),
													store = me.down('grid').getStore(),
													value = this.getValue(),
													idx   = store.find('lott_numb',value)
												;

												if(idx == -1){
													Ext.Msg.alert('알림','일치하는 LOT 번호가 없습니다.')
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
						'->' ,
						{xtype: 'button' , text : '<span class="btnTemp">확인</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style', width: 150,height:50},'-',
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
					},{	dataIndex: 'stok_qntt'		, text : Language.get(''		,'수량'		) , width : 120, xtype:'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return Ext.util.Format.number(value, '0,000');
						},
					}
//					,{	dataIndex: 'qntt'			, text : Language.get(''		,'사용량'	) , width : 120 , xtype:'numericcolumn',
//						renderer: function(value, meta){
//							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
//							return Ext.util.Format.number(value, '0,000');
//						},
//						tdCls	: 'editingcolumn',
//						editor	: {
//							xtype		: 'popupfield',
//							editable	: true,
//							enableKeyEvents : true,
//							selectOnFocus: true,
//							allowBlank	: false,
//							listeners:{
//								focus:function(comp,event){
//									var	trigger1 = Ext.dom.Query.select('.mtrlTrigger')[0];
//									var	grids = me.down('grid'),
//										select = grids.getSelectionModel().getSelection()[0]
//									;
//									if(select.get('unit_name')=="시각"){
//										this.popup.params = { stor_grp : _global.stor_grp, dvcd:1};
//									}else{
//										this.popup.params = { stor_grp : _global.stor_grp};
//									}
//									Ext.get(trigger1).dom.click();
//								}
//							},
//							popup: {
//								select	: 'SINGLE',
//								widget	: 'lookup-keypad-popup',
//								params	: { stor_grp : _global.stor_grp},
//								result	: function(records, nameField, pairField){
//									var grids = me.down('grid');
//									var select = grids.getSelectionModel().getSelection()[0];
//									select.set('qntt',records[0].result);
//								}
//							},
//							trigger1Cls : 'hideCls mtrlTrigger',
//						}
//					}
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


	/**
	 * 조회
	 */
	selectAction: function(bar_code){
		var me		= this,
			store	= me.down('grid').getStore(),
			search	= Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
			value	= search.getValues(),
			detail	= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
			select	= detail.getSelectionModel().getSelection()[0]
		;
		store.load({
			params		: {param:JSON.stringify({hq_id:_global.hq_id,item_idcd:select.get('item_idcd'),bar_code:bar_code })},
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
			store		= panel.getStore(),
			lister		= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
			selects		= panel.getSelectionModel().getSelection(),
			select		= lister.getSelectionModel().getSelection()[0],
			changes		= store.getUpdatedRecords().length,
			line_seqn	= 1,
			ostt_invc_numb =""
		;
		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/dhtec/prod/workentry/get/mtrlseqn.do',
			method		: "POST",
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					invc_numb	: select.get('invc_numb')
				})
			},
			async	: false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records[0].seqn){
					line_seqn = result.records[0].seqn+1;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			method		: "POST",
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'mtrl_ostt_mast'
				})
			},
			async	: false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				ostt_invc_numb = result.records[0].seq;
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		for(var i=0;i<selects.length;i++){
			selects[i].set('invc_date',me.Datafomat(new Date())); //YYYYmmdd로 format
			selects[i].set('invc_numb', select.get('invc_numb'));
			selects[i].set('wkod_numb', select.get('wkod_numb'));
			selects[i].set('wkod_seqn', select.get('wkod_seqn'));
			selects[i].set('wkct_idcd', select.get('wkct_idcd'));
			selects[i].set('ostt_invc_numb', ostt_invc_numb);
			selects[i].set('line_seqn', line_seqn++);
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
	Datafomat : function(date){
	    var yyyy = date.getFullYear().toString();
	    var mm = (date.getMonth() + 1).toString();
	    var dd = date.getDate().toString();
	    return yyyy + (mm[1] ? mm : '0'+mm[0]) + (dd[1] ? dd : '0'+dd[0]);
	}
});
