Ext.define('module.custom.sjflv.prod.prodplan.view.ProdPlanPopup', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-sjflv-prodplan-popup',

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
			items		: [ me.createGrid() ]
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
						},{	xtype		: 'button',
							text		: '일자일괄적용',
							name		: 'set_date_btn',
							height		: 23,
							margin		: '0 0 0 20',
							listeners	: {
								click	: function() {
									me.setAllPlanDate();
								}
							}
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					margin	: '3 0 3 0',
					items	: [
						{	fieldLabel	: Language.get('','포장단위'),
							xtype		: 'numericfield',
							name		: 'pckg_unit',
							width		: 100,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
							value		: 10,
							enableKeyEvents: true,
							listeners	: {
								keydown	: function(self, e, eOpts) {
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										me.down('[name=labl_qntt_apply_btn]').fireEvent('click');
									}
								}
							}
						},{	xtype		: 'button',
							text		: '적용',
							name		: 'labl_qntt_apply_btn',
							height		: 23,
							listeners	: {
								click	: function() {
									var pckgUnit = me.down('[name="pckg_unit"]').value;
									me.applyLabelQntt(pckgUnit);
								}
							}
						},{	xtype		: 'checkbox',
							boxLabel	: '분할생산',
							name		: 'isSplit',
							checked		: false,
							margin		: '0 0 0 90',
							handler		: function(checkbox, checked) {
								if (checked) {
									me.down('button[text='+Const.ROWINSERT.text+']').show();
									me.down('button[text='+Const.ROWDELETE.text+']').show();
									me.down('numericfield[name="splt_unit"]').show();
									me.down('button[name="apply_btn"]').show();
								} else {
									me.down('button[text='+Const.ROWINSERT.text+']').hide();
									me.down('button[text='+Const.ROWDELETE.text+']').hide();
									me.down('numericfield[name="splt_unit"]').hide();
									me.down('button[name="apply_btn"]').hide();
								}
							}
						},{	xtype		: 'numericfield',
							fieldLabel	: '분할단위',
							name		: 'splt_unit',
							margin		: '0 0 0 131',
							labelWidth	: 45,
							width		: 100,
							hidden		: true,
							enableKeyEvents: true,
							listeners	: {
								keydown	: function(self, e, eOpts) {
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										me.down('[name=apply_btn]').fireEvent('click');
									}
								}
							}
						},{	xtype		: 'button',
							text		: '적용',
							name		: 'apply_btn',
							height		: 23,
							hidden		: true,
							listeners	: {
								click	: function() {
									var spltUnit = me.down('[name="splt_unit"]');
									me.applyPlanQntt(spltUnit.value);
								}
							}
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
				plugins 	: {
					ptype  : 'cellediting-directinput',
					clicksToEdit: 1,
					listeners: {
						beforeedit: function(editor, e) {
							if (e.column.getEditor().getName() === 'plan_date') {
								e.column.getEditor().setMaxValue(e.record.get('deli_date'));
							}
						}
					} 
				},
				store		: Ext.create('module.custom.sjflv.prod.prodplan.store.ProdPlanPopupLister'),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->',
						{ xtype: 'button' , text: Const.ROWINSERT.text	, iconCls: Const.INSERT.icon , scope: me , handler: me.insertRow	, cls: 'button-style' , hidden: true },'-',
						{ xtype: 'button' , text: Const.ROWDELETE.text	, iconCls: Const.DELETE.icon , scope: me , handler: me.deleteRow	, cls: 'button-style' , hidden: true },
						'->' ,
						{ xtype: 'button' , text: finishText			, iconCls: Const.FINISH.icon , scope: me , handler: me.finishAction	, cls: 'button-style' },'-',
						{ xtype: 'button' , text: Const.CLOSER.text		, iconCls: Const.CLOSER.icon , scope: me , handler: me.close		, cls: 'button-style' }
					]
				},
				columns: [
					{	text: Language.get('invc_numb'		, '주문번호'	)	, dataIndex: 'invc_numb'		,  width : 100	, style: 'text-align:center'	, align: 'center'
					},{	text: Language.get('line_seqn'		, '항번'		)	, dataIndex: 'line_seqn'		,  width : 35	, style: 'text-align:center'	, align: 'center'
					},{ text: Language.get('deli_date'		, '납기일자'	)	, dataIndex: 'deli_date'		,  width : 80	, style: 'text-align:center'	, align: 'center'
					},{ text: Language.get('prod_trst_dvcd'	, '생산구분'	)	, dataIndex: 'prod_trst_dvcd'	,  width : 100	, style: 'text-align:center'	, align: 'center'		, xtype: 'lookupcolumn'	, lookupValue: resource.lookup('prod_trst_dvcd')
					},{ text: Language.get('invc_qntt'		, '주문수량'	)	, dataIndex: 'invc_qntt'		,  width : 80	, style: 'text-align:center'	, xtype: 'numericcolumn', format: '#,##0.###'	,
					},{	text: Language.get('plan_baln_qntt'	, '계획잔량'	)	, dataIndex: 'plan_baln_qntt'	,  width : 80	, style: 'text-align:center'	, xtype: 'numericcolumn', format: '#,##0.###'	,
					},{ text: Language.get(''				, '계획일자'	)	, dataIndex: 'plan_date'		,  width : 80	, style: 'text-align:center'	, align: 'center'
						, editor: {
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							plugins		: ['clearbutton']
						}
					},{	text: Language.get('plan_qntt'		, '생산계획량'	)	, dataIndex: 'plan_qntt'		,  width : 90	, style: 'text-align:center'	, xtype: 'numericcolumn' , format: '#,##0.###'	, summaryType: 'sum'
						, editor: {
							xtype		: 'numberfield',
							allowBlank	: false,
							listeners	: {
								blur	: function(){
									Ext.defer(function() {
										var store = me.down('grid-panel').getStore();
										me.calculateRemainingPlan(store);
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
					},{	text: Language.get('labl_qntt'		, '라벨수량'	)	, dataIndex: 'labl_qntt'		, width: 80		, style: 'text-align:center'	, xtype: 'numericcolumn', format: '#,##0.###'
						, editor: {
							xtype		: 'numberfield'
							
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
		formData = me.down('form-panel').getValues(),
		store = me.down('grid-panel').getStore(),
		totalPlanQntt = 0,
		isQntt = false,
		isDate = false,
		seqn = 1;
		
		store.each(function(record){
			if (record.get('plan_qntt') === 0) {
				isQntt = true;
				return false;
			}
			record.set('plan_line_seqn', seqn);
			record.set('pckg_unit', formData.pckg_unit);
			totalPlanQntt += record.get('plan_qntt');
		});
		
		if (formData.pckg_unit === undefined) {
			Ext.Msg.alert('알림', '포장단위와 라벨수를 모두 입력해 주세요.');
			return false;
		}
		if (totalPlanQntt > me.popup.params.get('plan_baln_qntt') && _global.hq_id.toUpperCase()==='N1000SJUNG') {
			Ext.Msg.alert('알림', '생산계획량이 계획잔량을 초과할 수 없습니다.');
			return false;
		}
		if (isQntt) {
			Ext.Msg.alert('알림', '생산계획량을 입력해 주세요.');
			return false;
		} else if (isDate) {
			Ext.Msg.alert('알림', '계획 일자를 입력해 주세요.');
			return false;
		}
		
		mask.show();
		Ext.Array.forEach(store.getNewRecords(), function(newRec){
			Ext.Ajax.request({
				url		: _global. location.http () + '/listener/seq/maxid.do',
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
					newRec.set('plan_invc_numb', result.records[0].seq);
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
		})
		
		store.sync({
			success: function(records, operation){
				Ext.Msg.alert('알림', '생산계획 완료.');
				me.popup.caller.getStore().reload();
			},
			callback: function(results, record, operation){
				mask.hide();
				me.close();
			}
		}, {item_idcd: me.popup.params.get('item_idcd'), acpt_numb: me.popup.params.get('invc_numb'), acpt_seqn: me.popup.params.get('line_seqn')});
	},
	
	insertRow: function(){
		var me = this,
		store = me.down('grid-panel').getStore(),
		data = me.down('grid-panel').getSelectionModel().getSelection()[0];
		
		if (data == undefined) {
			Ext.Msg.alert('알림', '분할할 수주를 선택한 후 다시 시도해 주세요.');
			return false;
		}
		
		store.add({
			invc_numb: data.get('invc_numb'),
			cstm_idcd: data.get('cstm_idcd'),
			line_seqn: data.get('line_seqn'),
			invc_qntt: data.get('invc_qntt'),
			deli_date: data.get('deli_date'),
			item_idcd: data.get('item_idcd'),
			item_code: data.get('item_code'),
			item_name: data.get('item_name'),
			item_spec: data.get('item_spec'),
			revs_numb: data.get('revs_numb'),
			plan_qntt: 0,
			plan_baln_qntt: data.get('plan_baln_qntt'),
			prod_trst_dvcd: data.get('prod_trst_dvcd'),
			stok_asgn_qntt: data.get('stok_asgn_qntt'),
			crte_idcd: _global.login_id
		});
		me.calculateRemainingPlan(store);
	},
	
	deleteRow: function(){
		var me = this,
		grid = me.down('grid-panel'),
		store = grid.getStore();
		
		store.remove(grid.getSelectionModel().getSelection());
		me.calculateRemainingPlan(store);
	},
	
	calculateRemainingPlan: function(store){
		var me = this,
		planQntt = 0,
		balnQntt = me.popup.params.get('plan_baln_qntt'),
		incmLossRate = me.popup.params.get('incm_loss_rate');
										
		store.each(function(record){
			planQntt += record.get('plan_qntt');
		});
		store.each(function(record){
			record.set('plan_baln_qntt', balnQntt - planQntt);
			record.set('indn_qntt', record.get('plan_qntt')+((incmLossRate/100)*record.get('plan_qntt')));
		});
	},
	
	applyPlanQntt: function(unitVal) {
		var me = this,
		store = me.down('grid').getStore(),
		balnQntt = me.popup.params.get('plan_baln_qntt'),
		quotient = Math.floor(balnQntt/unitVal),
		remainder = balnQntt%unitVal,
		currentCount = store.getCount(),
		requiredRows = quotient + (remainder > 0 ? 1 : 0);
		
		if (quotient > 50) {
			return false;
		}
		
		if (currentCount > requiredRows) {
			store.removeAt(requiredRows, currentCount - requiredRows);
		} else if (currentCount < requiredRows) {
			me.down('grid').getSelectionModel().select(0);
			for (var i = currentCount; i < requiredRows; i++) {
				me.insertRow();
			}
		}
		
		store.each(function(rec, index) {
			if (index < quotient) {
				rec.set('plan_qntt', unitVal);
			} else {
				rec.set('plan_qntt', remainder);
			}
		});

		me.calculateRemainingPlan(store);
	},
	
	applyLabelQntt: function(pckgUnit) {
		var store = this.down('grid').getStore();
		var pckgUnit = pckgUnit;
		
		store.each(function(rec) {
			if (rec.get('plan_qntt')%pckgUnit > 0) {
				rec.set('labl_qntt', Math.floor(rec.get('indn_qntt')/pckgUnit)+1);
			} else {
				rec.set('labl_qntt', Math.floor(rec.get('indn_qntt')/pckgUnit));
			}
		})
	},
	
	setAllPlanDate: function() {
		var me = this,
		store = me.down('grid').getStore(),
		selection = me.down('grid').getSelectionModel().getSelection()[0];
		
		store.each(function(rec) {
			rec.set('plan_date', selection.get('plan_date'));
		})
	}
});