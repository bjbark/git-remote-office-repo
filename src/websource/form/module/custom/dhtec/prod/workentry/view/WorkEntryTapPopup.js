Ext.define('module.custom.dhtec.prod.workentry.view.WorkEntryTapPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-dhtec-workenty-tap-popup',
	alias	: 'widget.module-dhtec-workenty-tap-popup',
	store	: 'module.custom.dhtec.prod.workentry.store.WorkEntryTapPopup',

	title	: Language.get('tap_popup','탭가공 작업조건입력'),
	closable: true,
	autoShow: true,
	width	: 830,
	height	: 775,
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
		var me = this,
			form = {
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
							height	: 120,
							margin	: '0 5 0 1',
							items	: [
								{	xtype	: 'fieldset',
									border	: 0,
									flex	: 1,
									region	: 'center',
									height	: 120,
									margin	: '3 0 0 0',
									layout	: 'vbox',
									fieldDefaults	: { labelSeparator : '' },
									items	: [
										{	xtype	: 'label',
											text	: 'LCD BAKT 탭가공 작업일지',
											cls		: 'textTemp',
											style	: 'font-size:3em;'
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
											items	:[
												{	fieldLabel	: Language.get('','일자'),
													xtype		: 'datefield',
													name		: 'invc_date',
													cls			: 'textTemp',
													height		: 50,
													width		: 300,
													format		: Const.DATE_FORMAT_YMD_BAR,
													submitFormat: Const.DATE_FORMAT_YMD,
													labelStyle	: 'text-align:right;font-size:2.5em !important;line-height:45px;',
													value		: new Date(),
													readOnly	: true,
													fieldStyle	: 'text-align:center;font-size:2.5em !important;line-height:40px;'
												},{	fieldLabel	: Language.get('','공정'),
													xtype		: 'textfield',
													name		: 'wkct_name',
													cls			: 'textTemp',
													value		: '탭 가공',
													readOnly	: true,
													height		: 50,
													width		: 250,
													format		: Const.DATE_FORMAT_YMD_BAR,
													submitFormat: Const.DATE_FORMAT_YMD,
													labelStyle	: 'text-align:right;font-size:2.5em !important;line-height:45px;',
													fieldStyle	: 'text-align:center;font-size:2.5em !important;line-height:40px;'
												},{	fieldLabel	: Language.get('','시간'),
													xtype		: 'timefield',
													name		: 'msmt_time',
													cls			: 'textTemp',
													increment	: 30,
													editable	: false,
													height		: 50,
													width		: 250,
													format		: 'H:i',
													submitFormat: 'Hi',
													labelStyle	: 'text-align:right;font-size:2.5em !important;line-height:45px;',
													value		: new Date(),
													fieldStyle	: 'text-align:center;font-size:2.5em !important;line-height:40px;',
													trigger1Cls : 'hideCls timecombox1',
													listConfig	:{
														itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
													},
												}
											]
										},
									]
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
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				bodyStyle		: { padding: '5px' },
				dockedItems	: {
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
						'->' ,
						{xtype: 'button' , text : '<span class="btnTemp">확인</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style', width: 150,height:50},'-',
						{xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style', width: 150,height:50}
					]
				},
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	xtype		: 'label',
										text		: '항목',
										cls			: 'textTemp',
										style		: 'font-size:3em; background-color:lightgray; text-align:center;',
										width		: 300
									},{	xtype		: 'label',
										text		: '점검주기',
										cls			: 'textTemp',
										style		: 'font-size:3em; background-color:lightgray; text-align:center;',
										width		: 150
									},{	xtype		: 'label',
										text		: '검사수',
										cls			: 'textTemp',
										style		: 'font-size:3em; background-color:lightgray; text-align:center;',
										width		: 200
									},{	xtype		: 'label',
										text		: '검사 LOT',
										cls			: 'textTemp',
										style		: 'font-size:3em; background-color:lightgray; text-align:center;',
										width		: 150
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,
										items	:[
											{	xtype		: 'label',
												text		: '탭검사',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 300
											},{	xtype		: 'label',
												text		: '[M3/M4/M5]',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 300
											},
										]
									},{	xtype		: 'label',
										text		: ' ',
										cls			: 'textTemp',
										style		: 'font-size:3em; ',
										width		: 150
									},{	xtype		: 'label',
										text		: ' 1 EA ',
										cls			: 'textTemp',
										style		: 'font-size:3em; text-align:center;',
										width		: 200
									},{	xtype		: 'lookupfield',
										name		: 'msnt_valu',
										lookupValue	: resource.lookup('yorn'),
										editable	: false,
										height		: 45,
										fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
										value		: '1',
										listConfig	:{
											itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
										},
										style		: 'font-size:3em; text-align:center !important;',
										width		: 150,
										trigger1Cls : 'hideCls combox1',
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,
										items	:[
											{	xtype		: 'label',
												text		: '시간별3EA',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 300
											},{	xtype		: 'label',
												text		: '　',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 300
											},
										]
									},{	xtype		: 'label',
										text		: '1회/1Hr',
										cls			: 'textTemp',
										style		: 'font-size:3em; text-align:center; ',
										width		: 150
									},{	xtype		: 'label',
										text		: ' 2 EA ',
										cls			: 'textTemp',
										style		: 'font-size:3em; text-align:center;',
										width		: 200
									},{	xtype		: 'lookupfield',
										name		: 'msnt_valu',
										lookupValue	: resource.lookup('yorn'),
										editable	: false,
										height		: 45,
										fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
										listConfig	:{
											itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
										},
										value		: '1',
										style		: 'font-size:3em; text-align:center !important;',
										width		: 150,
										trigger1Cls : 'hideCls combox2',
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,
										items	:[
											{	xtype		: 'label',
												text		: 'Tap Plug Gauge',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 300
											},{	xtype		: 'label',
												text		: '　',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 300
											},
										]
									},{	xtype		: 'label',
										text		: ' ',
										cls			: 'textTemp',
										style		: 'font-size:3em; text-align:center;',
										width		: 150
									},{	xtype		: 'label',
										text		: ' 3 EA ',
										cls			: 'textTemp',
										style		: 'font-size:3em; text-align:center;',
										width		: 200
									},{	xtype		: 'lookupfield',
										name		: 'msnt_valu',
										lookupValue	: resource.lookup('yorn'),
										editable	: false,
										height		: 45,
										fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
										listConfig	:{
											itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
										},
										value		: '1',
										style		: 'font-size:3em; text-align:center !important;',
										width		: 150,
										trigger1Cls : 'hideCls combox3',
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,
										items	:[
											{	xtype		: 'label',
												text		: '탭 카운터수량',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 300
											},{	xtype		: 'label',
												text		: '(2,000회시 탭 교체)',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 300
											},
										]
									},{	xtype		: 'label',
										text		: '1회/1Hr',
										cls			: 'textTemp',
										style		: 'font-size:3em; text-align:center;line-height:100px;',
										width		: 150
									},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,
										items	:[
											{	xtype		: 'label',
												text		: '탭 카운터',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 200
											},{	xtype		: 'label',
												text		: '(작업수량)',
												cls			: 'textTemp',
												style		: 'font-size:3em; text-align:center;',
												width		: 200
											},
										]
									},{	xtype		: 'popupfield',
										editable	: false,
										enableKeyEvents : true,
										name		: 'msnt_valu',
										height		: 100,
										fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
										listConfig	:{
											itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
										},
										style		: 'font-size:3em; text-align:center !important;',
										width		: 150,
										trigger1Cls : 'hideCls calpopup1',
										listeners:{
											focus:function(){
												var trigger1 = Ext.dom.Query.select('.calpopup1')[0];
												Ext.get(trigger1).dom.click();
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
									}
								]
							}
						]
					},
				]
			}
		;
		return item;
	},



	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me			= this,
			invc_date	= me.down('[name=invc_date]'),
			msmt_time	= me.down('[name=msmt_time]'),
			request		= [],
			detail		= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
			select		= detail.getSelectionModel().getSelection()[0],
			values		= me.down('form').getValues(),
			msmt_time_value,
			invc_date_value,
			line_seqn,
			records
		;

		invc_date_value = Ext.Date.format(new Date(invc_date.getValue()),'Ymd');

		if(msmt_time.getValue()){
			msmt_time_value = Ext.Date.format(new Date(msmt_time.getValue()),'His');

		}else{
			Ext.Msg.alert('알림','시간을 선택해주세요.')
		}

		for (var i = 0; i < values.msnt_valu.length; i++) {
			if(values.msnt_valu[i]==""){
				Ext.Msg.alert('알림','검사값을 확인해주세요.');
				return;
			}
		}
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/dhtec/prod/workentry/get/assy_seqn.do',
			method		: "POST",
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					invc_numb	: select.get('invc_numb'),
				})
			},
			async	: false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				line_seqn = result.records[0].seqn;
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var store = Ext.create(me.store);

		for (var i = 0; i < values.msnt_valu.length; i++) {
			records = Ext.create( store.model.modelName,{
				invc_numb	: select.get('invc_numb'),
				wkct_idcd	: select.get('wkct_idcd'),
				cvic_idcd	: select.get('cvic_idcd'),
				invc_date	: invc_date_value,
				msmt_time	: msmt_time_value,
				frst_msmt	: values.msnt_valu[i],
				assi_seqn	: i+1,
				line_seqn	: line_seqn,
				updt_idcd	: _global.login_pk,
				crte_idcd	: _global.login_pk
			})
			store.add(records);
		}
		store.sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback : function(results, record ) {
				if (results.operations[0].success) {
					me.destroy();
				}
			},
			finished : function(results, record, operation){
			}
		});
	}
});
