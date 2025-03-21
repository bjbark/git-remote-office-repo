Ext.define('module.custom.sjflv.prod.prodplan.view.ProdPlanPopup2', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-sjflv-prodplan-popup2',

	title: '생산계획',

	closable: true,
	autoShow: true,
	width	: 980,
	height	: 500,
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
			xtype		: 'form-search',
			bodyStyle	: { padding: '0', background: 'transparent' },
			layout		: 'vbox',
			items	: [
				{	xtype	: 'fieldset',
					layout	: 'hbox',
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('item_code','제품코드'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'item_code',
							margin		: '0 0 0 15',
							width		: 150,
							labelWidth	: 45,
							value		: me.popup.params.get('item_code'),
							fieldCls	: 'readonlyfield'
						},{	fieldLabel	: Language.get('item_name','품명'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'item_name',
							width		: 200,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							value		: me.popup.params.get('item_name'),
							fieldCls	: 'readonlyfield'
						},{	fieldLabel	: Language.get('item_spec','규격'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'item_spec',
							width		: 200,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							value		: me.popup.params.get('item_spec'),
							fieldCls	: 'readonlyfield'
						},
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					margin	: '3 0 3 0',
					items	: [
						{	fieldLabel	: Language.get('invc_date','계획일자'),
							xtype		: 'datefield',
							name		: 'plan_date',
							width		: 150,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							maxValue	: me.popup.params.get('deli_date'),
							value		: me.popup.params.get('plan_date'),
						},{	fieldLabel	: Language.get('','포장단위'),
							xtype		: 'numericfield',
							name		: 'pckg_unit',
							width		: 200,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							value		: 10,
							listeners	: {
								blur	: function(self, e, opt) {
									var lablQntt = me.down('[name=labl_qntt]');
									var planQntt = 0;
									var store  = me.down('grid').getStore();
									
									store.each(function(rec) {
										planQntt += rec.get('plan_qntt');
									});
									if (planQntt%this.value > 0) {
										lablQntt.setValue(Math.floor(planQntt/this.value)+1);
									} else {
										lablQntt.setValue(planQntt/this.value);
									}
								}
							}
						},{	fieldLabel	: Language.get('','라벨수'),
							xtype		: 'numericfield',
							name		: 'labl_qntt',
							width		: 200,
							margin		: '0 0 0 15',
							labelWidth	: 45,
						}
					]
				},
			],
		};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
		finishText = '<span style="font-size: small !important; color: white;">계획확정</span>',
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create('module.custom.sjflv.prod.prodplan.store.ProdPlanPopupLister2'),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{ xtype: 'button' , text: finishText			, iconCls: Const.FINISH.icon , scope: me , handler: me.finishAction	, cls: 'button-style' },'-',
						{ xtype: 'button' , text: Const.CLOSER.text		, iconCls: Const.CLOSER.icon , scope: me , handler: me.close		, cls: 'button-style' }
					]
				},
				columns: [
					{	text: Language.get('invc_numb'		, '주문번호'	)	, dataIndex: 'invc_numb'		,  width: 100	, style: 'text-align:center'	, align: 'center'
					},{	text: Language.get('line_seqn'		, '항번'		)	, dataIndex: 'line_seqn'		,  width: 35	, style: 'text-align:center'	, align: 'center'
					},{ text: Language.get('deli_date'		, '납기일자'	)	, dataIndex: 'deli_date'		,  width: 80	, style: 'text-align:center'	, align: 'center'
					},{ text: Language.get('prod_trst_dvcd'	, '생산구분'	)	, dataIndex: 'prod_trst_dvcd'	,  width: 100	, style: 'text-align:center'	, align: 'center'	, xtype: 'lookupcolumn'	, lookupValue: resource.lookup('prod_trst_dvcd')
					},{ text: Language.get('invc_qntt'		, '주문수량'	)	, dataIndex: 'invc_qntt'		,  width: 80	, style: 'text-align:center'	, xtype: 'numericcolumn' , format: '#,##0.###'	,
					},{	text: Language.get('plan_baln_qntt'	, '계획잔량'	)	, dataIndex: 'plan_baln_qntt'	,  width: 80	, style: 'text-align:center'	, xtype: 'numericcolumn' , format: '#,##0.###'	,
					},{	text: Language.get('plan_qntt'		, '생산계획량'	)	, dataIndex: 'plan_qntt'		,  width: 90	, style: 'text-align:center'	, xtype: 'numericcolumn' , format: '#,##0.###'	, summaryType: 'sum'
						, editor: {
							xtype		: 'numberfield',
							allowBlank	: false,
							listeners	: {
								blur	: function(a){
									Ext.defer(function() {
										var store = me.down('grid-panel').getStore();
										me.calculateUpidQntt(store);
									}, 50);
								}
							}
						}
					},{	text: Language.get('indn_qntt'		, '작업지시량'	)	, dataIndex: 'indn_qntt'		, width: 90		, align: 'right'				, xtype: 'numericcolumn', format: '#,##0.###'
						, editor: {
							xtype		: 'numberfield',
							allowBlank	: false,
							listeners	: {
								focus: function(self) {
									self.setValue(0);
								}
							}
						}
					},{	text: Language.get('remk_text'		, '특이사항'	)	, dataIndex: 'remk_text'		, minWidth: 100	, flex: 1
					},
				]
			}
		;
		return grid;
	},

	/**
	 * 계획확정 버튼 이벤트
	 */
	finishAction: function(){
		var me = this,
		mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.INSERT.mask}),
		store = me.down('grid-panel').getStore(),
		planDate = me.down('datefield[name=plan_date]'),
		isQntt = false,
		isSuccess = false;
		
		store.each(function(record){
			if (record.get('plan_qntt') === 0) {
				isQntt = true;
				return false;
			}
		});
		if (isQntt) {
			Ext.Msg.alert('알림', '생산계획량을 입력 해주세요.');
			return false;
		}
		if (planDate.getValue()==null) {
			Ext.Msg.alert('알림', '계획 일자를 입력 해주세요.');
			return false;
		}
		
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http () + '/listener/seq/maxid.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'prod_plan'
				})
			},
			async	: false,
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				var invcNumb = result.records[0].seq;
				isSuccess = me.prodPlanSave(invcNumb);
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		
		if (isSuccess) {
			Ext.Msg.alert('알림', '생산계획 완료.');
			me.popup.caller.getStore().reload();
			me.close();
		} else {
			Ext.Msg.alert('알림', '생산계획 실패.');
			me.close();
		}
		mask.hide();
	},
	
	prodPlanSave: function(invcNumb){
		var me = this,
		formData = me.down('form-panel').getValues(),
		store = me.down('grid-panel').getStore(),
		planQntt = 0,
		indnQntt = 0,
		deliDate = store.getAt(0).get('deli_date'),
		data = [],
		seqn = 1,
		isSuccess = false;
		
		store.each(function(record){
			planQntt += record.get('plan_qntt');
			indnQntt += record.get('indnQntt');
			if (Date.parse(deliDate) > Date.parse(record.get('deli_date'))) {
				deliDate = record.get('deli_date');
			}
			record.set('plan_invc_numb', invcNumb);
			record.set('plan_line_seqn', seqn); // <--- 이 부분
			record.set('plan_date', formData.plan_date);
			seqn++;
			data.push(record.getData());
		});
		
		data.push({
			invc_numb: invcNumb,
			item_idcd: store.getAt(0).get('item_idcd'),
			cstm_idcd: store.getAt(0).get('cstm_idcd'),
			deli_date: Ext.util.Format.date(deliDate, 'Ymd'),
			plan_qntt: planQntt,
			indn_qntt: indnQntt,
			revs_numb: store.getAt(0).get('revs_numb'),
			plan_date: formData.plan_date,
			pckg_unit: formData.pckg_unit,
			labl_qntt: formData.labl_qntt,
			isMaster : true,
			crt_id   : _global.login_id,
			upt_id   : _global.login_id,
			_set     : "insert"
		});
		
		Ext.each(data, function(rec) {
			if (rec.isMaster) {
			
			} else {
				rec.deli_date = Ext.util.Format.date(rec.deli_date, 'Ymd');
				rec.plan_date = Ext.util.Format.date(rec.plan_date, 'Ymd');
				rec._set = 'insert';
			}
		})
		
		Ext.Ajax.request({
			url		: _global.location.http () + '/custom/sjflv/prod/prodplan/set/prodplan2.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					records: data,
					item_idcd: me.popup.params.get('item_idcd'), 
					acpt_numb: me.popup.params.get('invc_numb'), 
					acpt_seqn: me.popup.params.get('line_seqn')
				})
			},
			async	: false,
			success : function(response, request) {
				isSuccess = true;
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
				
			}
		});
		
		return isSuccess;
	},
	
	calculateUpidQntt: function(store){		
		var me = this;
		var incmLossRate = me.popup.params.get('incm_loss_rate');
		
		store.each(function(record){
			record.set('plan_baln_qntt', record.raw.plan_baln_qntt - record.get('plan_qntt'));
			record.set('indn_qntt', record.get('plan_qntt')+((incmLossRate/100)*record.get('plan_qntt')));
		});
		me.down('[name=pckg_unit]').fireEvent('blur');
	},
});