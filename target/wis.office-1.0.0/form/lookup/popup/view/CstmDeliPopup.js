/**
 */
Ext.define('lookup.popup.view.CstmDeliPopup', { extend: 'Axt.popup.Search',
	id   : 'lookup-cstm-deli-popup',
	alias: 'widget.lookup-cstm-deli-popup',
	store: 'lookup.popup.store.CstmDeliPopup',
	requires: [
		'lookup.popup.view.CstmDeliAddPopup'
	],
	title: Language.get( 'cstm_deli' , '배송지 찾기') ,
	closable: true,
	autoShow: true,
	width: 830,
	height: 500,
	layout: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me		= this,
			tema	= ''
		;
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}
		me.items = [me.createForm(tema)];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm	: function(tema){
		var me		= this,
			form	= {
				xtype : 'form-layout',
				region : 'center',
				border:false,
				dockedItems : [ me.searchForm() ] , items : [ me.createGrid(tema) ]
			}
		;
		return form;
	},

	searchForm: function(){
		var me		= this,
			form	= {
			xtype		: 'form-search',
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
							height	: 40,
							margin	: '0 5 0 1',
							items	: [
								{	xtype	: 'fieldset',
									border	: 3,
									flex	: 1,
									style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
									region	: 'center',
									height	: 34,
									margin	: '3 0 0 0',
									layout	: 'hbox',
									items	: [
										{	xtype	: 'label',
											text	: 'SEARCH  | ',
											margin	: '7 10 0 0',
											style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											value	: _global.login_nm,
											flex	: 1,
											emptyText	: '',
											value	: me.popup.params.find,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == 9) {
														var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
														searchButton.fireEvent('click', searchButton);					 /* 조회버튼 Click */
													}
												},
											}
										}
									]
								},
							]
			 		 	},
						{	xtype : 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',action : Const.SELECT.action ,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						}
					]
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
				}
			],
			layout: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items :	[] // 기타 검색 조건이 필요한 경우
		};
		return form;
    },


	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(tema){
		var	me		= this,
			grid	= {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create( me.store ),
				cls			: tema,
				paging		:
				{
					xtype: 'grid-paging',
					items:[
						{xtype: 'button' , text : '<span class="write-button">배송지 등록</span>', scope: me, handler: me.updateDeliAction, cls: 'button1-style'},'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
					]
				},
				columns		:[
					{	text		: Language.get('dely_cstm_name'  , '납품처명')	, dataIndex: 'dely_cstm_name'	, width: 90,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text	: Language.get('trnt_mean_dvcd'    , '운송수단')	, dataIndex: 'trnt_mean_dvcd'	, width: 70, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'trnt_mean_dvcd' ),
					},{	text		: Language.get('dlvy_drtr_name'  , '납품담당자명')	, dataIndex: 'dlvy_drtr_name'	, width: 90,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},
					{	text	: Language.get('dlvy_tele_numb'    , '배송전화번호'  )	, dataIndex: 'dlvy_tele_numb'	, width: 100 ,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text	: Language.get('dlvy_zpcd'    , '우편번호'  )	, dataIndex: 'dlvy_zpcd'	, width: 70 ,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[3].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text	: Language.get('dlvy_addr_1fst'    , '배송주소1'  )	, dataIndex: 'dlvy_addr_1fst'	, width: 200 ,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[4].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text	: Language.get('dlvy_addr_2snd'    , '배송주소2'  )	, dataIndex: 'dlvy_addr_2snd'	, width: 180 , hidden	: _global.hq_id.toUpperCase()=='N1000SJUNG' ? true : false ,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text	: Language.get('dlvy_remk_text'    , '납품비고'  )	, dataIndex: 'dlvy_remk_text'	, width: 180 , hidden	: _global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false ,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get('rpst_dlvy_yorn'    , '대표납품여부'  )	, dataIndex: 'rpst_dlvy_yorn'	, width: 80 , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
					},{	text : Language.get( 'cstm_idcd'		, '거래처id'	)	, dataIndex: 'cstm_idcd'		, width: 100 , hidden : true
					},{	text : Language.get( 'dlvy_cstm_idcd'	, '납품처id'	)	, dataIndex: 'dlvy_cstm_idcd'		, width: 100 , hidden : true
					}
				],
				listeners	: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					render		: function(){
						var me = this
						;
						new Ext.util.KeyMap({
							target		: me.getEl(),
							eventName	: 'keyup',
							binding		:[
								{	key	: Ext.EventObject.ENTER,
									fn	: function(key,e){
										me.fireEvent('itemdblclick', me.getView() );
										me.down('[name=cstm_idcd]').reset();
									}
								}
							]
						});
					},
				}
			}
		;
		return grid;
	},
	/**
	 * 조회
	 */
	selectAction	: function(){
		var me		= this,
			store	= me.down('grid').getStore(),
			param	= Ext.merge( me.down('form').getValues(), { hq_id : _global.hq_id
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params		: {param:JSON.stringify(param)},
			scope		: me,
			callback	: function(records, operation, success) {
				if(records){
//						me.down('grid').getSelectionModel().select(0);
				}
				if (me.popup.values && me.popup.values.barcode) {
					delete me.popup.values.barcode ;
				}
			}
		});
	},

	/**
	 * 배송지 등록 - 삼정만 사용하여 widget 변경
	 */
	updateDeliAction: function(){
		var me		= this,
		store	= me.down('grid').getStore(),
		dlvy_cstm_idcd;

		Ext.Ajax.request({
	         url : _global.location.http() + '/listener/seq/maxid.do',
	         object     : resource.keygen,
	         params     : {
	            token   : _global.token_id ,
	            param   : JSON.stringify({
	               stor_id    : _global.stor_id,
	               table_nm   : 'cstm_deli'
	            })
	         },
	         async   : false,
	         success   : function(response, request) {
	            var result = Ext.decode(response.responseText);
	            dlvy_cstm_idcd = result.records[0].seq;
	         }
	      });
		resource.loadPopup({
			widget	: 'lookup-cstm-deli-add-popup',
			param	: { dlvy_cstm_idcd : dlvy_cstm_idcd,
						cstm_idcd : me.popup.params.cstm_idcd
			}
		});
	},

	/**
	 * 선택
	 */
	finishAction	: function(){
		var me		= this,
			panel	= me.down('grid'),
			selects	= panel.getSelectionModel().getSelection(),
			request	= []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
//						user_idcd	: eachrow.get('user_idcd' )
					});
				});
				var store	= Ext.create( me.store ),
					param	= Ext.merge( me.popup.params, {
						records : request
					})
				;
				store.getProxy().api.read = me.popup.apiurl.master ;
				store.load({
					params		: {param:JSON.stringify(param)},
					scope		: me,
					callback	: function(records, operation, success) {
						if (success) {
							me.setResponse(records);
						}
					}
				});
			} else {
				me.setResponse(selects);
			}
		}
	}


});
