Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkEntryStartMtrlPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-sjflv-workentry-popup-start-mtrl'			,

	title: '생산시작',

	closable: true,
	autoShow: true,
	width	: 790,
	height	: 350,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
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
				xtype		: 'form-panel' ,
				region		: 'center',
				border		: false,
				dockedItems	: [
					{	xtype : 'toolbar',
						dock  : 'bottom',
						items : [
							'->' ,
							{ text : '<span class="write-button">저장 </span>'	, scope: me , handler : me.nextAction  , cls: 'button1-style'},'-',
							{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
						]
					}
				],
				items : [me.searchForm(),me.createGrid() ]
			};
		return form;
	},

	searchForm: function(){
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			margin	: '0 0 0 0',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					items	: [
						{	xtype	: 'panel',
							layout	: 'hbox',
							margin	: '5 0 5 0',
							border	: 0,
							items	: [
								{	fieldLabel	: '지시번호',
									name		: 'invc_numb',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.invc_numb
								},{	fieldLabel	: '거래처명',
									name		: 'cstm_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.cstm_name
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '제품코드',
									name		: 'item_code',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.item_code
								},{	fieldLabel	: '제품명',
									name		: 'item_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.item_name
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('inqy_term','계획일자'),
									xtype		: 'textfield',
									name		: 'plan_strt_dttm',
									width		: 300,
									labelWidth	: 65,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.plan_strt_dttm.substring(0, 10),
								},{	text		: '~',
									xtype		: 'label',
									width		: 35,
									style		: 'text-align:center'
								},{	xtype		: 'textfield',
									name		: 'plan_endd_dttm',
									width		: 265,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.plan_endd_dttm.substring(0, 10),
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '지시수량',
									name		: 'indn_qntt',
									xtype		: 'numericfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: Ext.util.Format.number(me.popup.params.indn_qntt, '#,###.##9'),
								},{	fieldLabel	: '포장단위',
									name		: 'pckg_unit',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.pckg_unit
								},{	fieldLabel	: '라벨수',
									name		: 'labl_qntt',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.labl_qntt
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('wigh_wker_name','계량작업자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									name		: 'wigh_wker_name',
									width		: 300,
									labelWidth	: 65,
									pair		: 'wigh_wker_idcd',
									value		: _global.login_nm,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									},
									listeners	: {
										change	: function() {
											var val = this.getValue();
											if(val=='' || val == null){
												me.down('[name=wigh_wker_idcd]').reset();
											}
										}
									}
								},{	name : 'wigh_wker_idcd', xtype : 'textfield' , hidden : true , value : _global.login_pk
								},
							]
						},
					]
				},
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
				scrollable	: true,
				height		: 150,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } ),
					scrollable: true,
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },

				store: Ext.create('Ext.data.Store', {
					fields: ['line_seqn','item_code', 'item_name', 'mixx_rate','ostt_qntt','stnd_unit_qntt','lott_numb','used'],
					data: []  // 초기 데이터가 없으므로 빈 배열
				}),
				columns: [
					{	text : Language.get('line_seqn'	, '순번'	)	, dataIndex: 'line_seqn'	,  width : 50 , align : 'center', hidden : true,
					},{	text : Language.get('item_code'	, '원료코드')	, dataIndex: 'item_code'	,  width : 120, align :'center'
					},{	text : Language.get('item_name'	, '원료명'	)	, dataIndex: 'item_name'	,  width : 150, align :'center'
					},{ text : Language.get('mixx_rate'	, '배합비'	)	, dataIndex: 'mixx_rate'	,  width : 80 , align : 'center', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ text : Language.get('ostt_qntt'	, '소요량'	)	, dataIndex: 'ostt_qntt'	,  width : 80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.###',
					},{ text : Language.get('stnd_unit_qntt', '투입량'	)	, dataIndex: 'stnd_unit_qntt'	,  width : 80  , align:'center',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var value = this.getValue();
									var grid = self.up('grid-panel');
									var store = grid.getStore();
									var selection = grid.view.getSelectionModel().getSelection()[0];
									var row = store.indexOf(selection);

									var record = store.getAt(row);

									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										if(value>0){
											Ext.Msg.confirm("확인", "계량을 완료하시겠습니까?", function(button) {
												if (button == 'yes') {
													record.set('used', '1');
												}else{
													record.set('stnd_unit_qntt', '0');
													record.set('used', '0');
													return;
												}
											})
										}
									}
								},
								blur: function(self) {
									var value = this.getValue();
									var grid = self.up('grid-panel');
									var store = grid.getStore();
									var selection = grid.view.getSelectionModel().getSelection()[0];
									var row = store.indexOf(selection);

									var record = store.getAt(row);
									if(value>0){
										Ext.Msg.confirm("확인", "계량을 완료하시겠습니까?", function(button) {
											if (button == 'yes') {
												record.set('used', '1');
											}else{
												record.set('stnd_unit_qntt', '0');
												record.set('used', '0');
												return;
											}
										})
									}
								}
							}
						}
					},{ text : Language.get('lott_numb'	, 'lot번호'	)	, dataIndex: 'lott_numb'	,  width : 170 , align:'center',
					},{	text : Language.get('used'		, '사용여부'	)	, dataIndex: 'used'	,  width : 70 , align:'center',  xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							editable		: false,
							selectOnFocus	: true,
							enableKeyEvents : true,
							listeners:{

							}
						}
					},
				]
			}
		;
		return grid;
	},

	selectAction :  function(){
		var me = this,
			grid = me.down('grid-panel'), // 그리드를 참조
			store = grid.getStore(),
			resId = _global.hq_id.toUpperCase()
		;

		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workentry/get/ivstMtrl.do',
			method		: "POST",
			params		: {
			 	token	: _global.token_id,
				param	: Ext.encode({
					stor_idc	: resId,
					invc_numb	: me.popup.params.invc_numb,
					item_idcd	: me.popup.params.item_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					var indn_qntt = me.popup.params.indn_qntt;
					result.records.forEach(function(record) {
						record.need_qntt = indn_qntt * (record.mixx_rate / 100);
					});
					store.loadData(result.records);
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	/**
	 * 확인 버튼 이벤트
	 */
	nextAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			grid = me.down('grid-panel'), // 그리드를 참조
			store = grid.getStore(),
			uper_seqn   = 1
		;
		var records2 = [];
		var new_invc_numb;

		store.each(function(record) {
			var recordData = record.getData(); // 각 record 데이터를 가져옴

			records2.push({
				invc_numb		: me.popup.params.work_invc,
				line_seqn		: recordData.line_seqn,
				stnd_unit_qntt	: recordData.stnd_unit_qntt,
			});
		});

		Ext.Msg.confirm("확인", "계량을 완료하시겠습니까?", function(button) {
			if (button == 'yes') {
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/sjflv/prod/workbook/set/setMaster.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							_set			: 'insert',
							//pror_mast 및 pror_item
							wkod_numb		: values.invc_numb,
							wkod_seqn		: '1',
							prog_stat_dvcd	: '5',
							wigh_wker_idcd	: values.wigh_wker_idcd,

							//work_book
							invc_numb		: me.popup.params.work_invc,
							records			: records2,
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						Ext.Msg.alert("알림", "생산시작이 되었습니다.");
						lister1.getStore().reload();
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							me.setResponse( {success : true , values :  values });
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				})
			}else{
				return;
			};
		});

		me.close();
	}
});