/**
 */
Ext.define('lookup.popup.view.hntopItemModelPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-hntop-model-popup',
	store	: 'lookup.popup.store.hntopItemModelPopup',
	requires: [
		'lookup.popup.view.ClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.VendPopup'
	],
	title	: Language.get('item_model_popup','모델 찾기'),
	closable: true,
	autoShow: true,

	width	: 900,
	height	: 508,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this,
			autoSelect = false
		;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }

		//  품목이 즉시 검색 되는 경우
		if ((me.popup.values.barcode && me.popup.values.barcode != '') || (me.popup.values.item_name && me.popup.values.item_name != '')
			|| (me.popup.params.find)) {
			autoSelect = true ;
			if (me.popup.option.direct_result) {
				console.debug( )
				me.autoShow = false;
			}
		}
		me.items = [me.createForm()];
		me.callParent(arguments);

		if (autoSelect) {
			me.selectAction();
		}

		if(me.popup.params.dvcd){
			if(me.popup.params.dvcd == 'esti'){
				if(me.popup.params.brnd_bacd){
					me.selectAction();
				}else{
					var btn = me.down('grid').down('[id = closeBtn]');
					setTimeout(function() {
						btn.fireHandler();
						Ext.Msg.alert("알림","브랜드를 먼저 선택하여 주십시오.");
					}, 100);
				}
			}
		}
	},

	/**
	 * 화면폼
	 */
	 createForm: function(){
		var	me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.searchForm() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},
	/**
	 * 검색폼
	 */
	searchForm: function(){
		var me = this,
			form = {
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
											flex	: 1,
											emptyText	: '모델코드 또는 모델명을 입력하세요....',
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
//			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
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
				header		: false,
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store	: Ext.create(me.store),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style', id : 'closeBtn'
						}
					]
				},
				columns: [
					{	dataIndex: 'wndw_modl_code'			, text : Language.get('wndw_modl_code'			,'창호모델코드'			)  , width : 120 , align : 'center'
					},{ dataIndex: 'wndw_modl_idcd'			, text : Language.get('modl_name'				,'모델명'					)  , width : 180 , align : 'left'
					},{ dataIndex: 'wdbf_itid'				, text : Language.get('wdbf_itid'				,'BF품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdsf_itid'				, text : Language.get('wdsf_itid'				,'SF품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdmc_itid'				, text : Language.get('wdmc_itid'				,'MC품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdmf_itid'				, text : Language.get('wdmf_itid'				,'MF품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdgb_itid'				, text : Language.get('wdgb_itid'				,'GB품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdbf_rein_itid'			, text : Language.get('wdbf_rein_name'			,'BF보강재'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdsf_rein_itid'			, text : Language.get('wdsf_rein_name'			,'SF보강재'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdbf_widh'				, text : Language.get('wdbf_widh'				,'BF폭'					)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdsf_widh'				, text : Language.get('wdsf_widh'				,'SF폭'					)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdbf_rail_hght'			, text : Language.get('wdbf_rail_hght'			,'<center style="margin-top:5px;">BF레일</br>높이</center>'		)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdbf_hght'				, text : Language.get('wdbf_hght'				,'BF높이'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdsf_hght'				, text : Language.get('wdsf_hght'				,'SF높이'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'side_clmm'				, text : Language.get('side_clmm'				,'<center style="margin-top:5px;">측부</br>걸림차수</center>'		)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmc_tick'				, text : Language.get('wdmc_tick'				,'MC두께'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'glss_fixh_hght'			, text : Language.get('glss_fixh_hght'			,'<center style="margin-top:5px;">유리고정</br>턱높이</center>'	)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'topp_clmm'				, text : Language.get('topp_clmm'				,'<center style="margin-top:5px;">상부</br>걸림치수</center>'		)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'bttm_clmm'				, text : Language.get('bttm_clmm'				,'<center style="margin-top:5px;">하부</br>걸림치수</center>'		)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmf_side_clmm'			, text : Language.get('wdmf_side_clmm'			,'<center style="margin-top:5px;">MF측부</br>걸림치수</center>'	)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmf_topp_clmm'			, text : Language.get('wdmf_topp_clmm'			,'<center style="margin-top:5px;">MF상부</br>걸림치수</center>'	)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmf_bttm_clmm'			, text : Language.get('wdmf_bttm_clmm'			,'<center style="margin-top:5px;">MF하부</br>걸림치수</center>'	)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'ssbr_hght'				, text : Language.get('ssbr_hght'				,'<center style="margin-top:5px;">SS바</br>높이</center>'		)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'moss_rail_hght'			, text : Language.get('moss_rail_hght'			,'<center style="margin-top:5px;">BF방충망</br>레일높이</center>'	)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmf_hght'				, text : Language.get('wdmf_hght'				,'MF높이'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdbf_auto_cutt_yorn'	, text : Language.get('wdbf_auto_cutt_yorn'		,'<center style="margin-top:5px;">BF자동</br>절단여부</center>'		)  , width :  65 , align : 'center'	   ,xtype : 'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'wdbf_auto_weld_yorn'	, text : Language.get('wdbf_auto_weld_yorn'		,'<center style="margin-top:5px;">BF자동</br>용접여부</center>'		)  , width :  65 , align : 'center'	   ,xtype : 'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'wdsf_auto_cutt_yorn'	, text : Language.get('wdsf_auto_cutt_yorn'		,'<center style="margin-top:5px;">SF자동</br>절단여부</center>'		)  , width :  65 , align : 'center'	   ,xtype : 'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'wdsf_auto_weld_yorn'	, text : Language.get('wdsf_auto_weld_yorn'		,'<center style="margin-top:5px;">SF자동</br>용접여부</center>'		)  , width :  65 , align : 'center'	   ,xtype : 'lookupcolumn',lookupValue:resource.lookup('yorn')
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					render: function(){
						var me = this,
							popup	= me.ownerCt.ownerCt
						;
						new Ext.util.KeyMap({
							target: me.getEl(),
							eventName : 'keyup',
							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { if(popup.enterDelay===true){popup.enterDelay = false;return;}else{me.fireEvent('itemdblclick', me.getView());}}}]
						});
					}
				}
			};
		return grid;
	},

	/**
	 * 조회
	 */
	selectAction: function(){
		var me = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), me.popup.params , {hq_id : _global.hq_id});
		console.log(param);
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				if (success && me.popup.option.direct_result && records.length === 1) {
					me.finishAction(records);
				} else {
					if(!me.autoShow) {
						me.autoShow = !me.autoShow;
						me.show();
					}
				}
			}
		});
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function( records ){
		var me = this,
			selects = records ? records : me.down('grid').getSelectionModel().getSelection(),
			request = []
		;

		if ( selects.xtype ){
			selects = me.down('grid').getSelectionModel().getSelection() ;
		}

		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						full_invc_numb : eachrow.get('invc_numb') + eachrow.get('line_seqn')
					});
				});
				var store = Ext.create(me.store );
					param = Ext.merge( me.popup.params, {
						records : request
					});
					store.getProxy().api.read = me.popup.apiurl.master ;
					store.load({
						params   : {param:JSON.stringify(param)},
						scope    : me,
						callback : function(records, operation, success) {
							if (success) {
//	임시로 막아둔다.. 향후 조건에 따라 조정 가능 함(2019.06.10 pbj)
//								records.forEach( function( data ) {
//									if ( !Ext.isEmpty( data.get('item_ds') ) ) { /* item_ds 값이 있으면 */
//										data.set('item_name', data.get('item_ds') );
//									} else {
//										var brand_nm = data.get('brand_nm');
//										if (brand_nm) {
//											if (brand_nm != ""){
//												data.set('item_name', data.get('brand_nm')+"/"+data.get('item_name') );
//											}
//										}
//									}
//								});
								me.setResponse(records);
							}
					}
					});
			} else {
				me.setResponse(selects);
			}
		}
	},

});

